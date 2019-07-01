import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigationParam, useNavigation} from "react-navigation-hooks";
import {FlatGrid, SectionGrid} from 'react-native-super-grid';
import { getBooksByPage } from "../../repository/BooksRepository";
import {SearchBar, Tile} from 'react-native-elements';
import _ from "lodash";


const Books = () => {
    const user = useNavigationParam('user');
    const { navigate } = useNavigation();

    const [starPage, setStarPage] = useState(0);
    const [query, setQuery] = useState('poli');
    const [books, setBooks] = useState([]);

    useEffect( _.debounce(() => {
        getBooksByPage(query, starPage)
                .then(resp => responseData(resp))
        },[query] ), [query]
    );


    function responseData(resp) {
        console.log(JSON.stringify(resp));
        if (resp.total >= 0) {
            setBooks(resp.books);
        }
    }

    function goDetalleBook(idl) {
        console.log(idl);
        navigate('Detail', {
            id: idl,
            user: user
        })
    }


    const renderSectionList = () => (
        <FlatGrid
            itemDimension={140}
            items={books}
            style={styles.gridView}
            renderItem={({ item, index }) => (

                <Tile
                    imageContainerStyle={{width: 200}}
                    containerStyle={{ width: 180, justifyContent: 'center'}}
                    imageSrc={{ uri: item.image }}
                    height={200}
                    onPress={() => goDetalleBook(item.isbn13)}
                    contentContainerStyle={{ height: 0 }} >
                </Tile>
            )}
        />
    );

    return (
        <View style={{flex: 1}}>
            <SearchBar
                placeholder="Type Here..."
                onChangeText={ value => setQuery(value) }
                value={query}
            />
            { renderSectionList() }
        </View>
    );
};

export default Books;


const styles = StyleSheet.create({
    gridView: {
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 150,
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },
    sectionHeader: {
        flex: 1,
        fontSize: 15,
        fontWeight: '600',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        color: 'gray',
        padding: 10,
    },
});