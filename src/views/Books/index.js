import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigationParam, useNavigation} from "react-navigation-hooks";
import {FlatGrid, SectionGrid} from 'react-native-super-grid';
import { getBooksByPage, getBoosByUser } from "../../repository/BooksRepository";
import {Button, Card, SearchBar, Tile} from 'react-native-elements';
import {Icon} from "native-base";

import _ from "lodash";


const Books = () => {
    const user = useNavigationParam('user');
    const { navigate } = useNavigation();

    const [starPage, setStarPage] = useState(0);
    const [query, setQuery] = useState('poli');
    const [books, setBooks] = useState([]);
    const [haveReserva, setHaveReserva] = useState(false);
    const [isAutorization, setAutorization ]= useState(false);
    const [reserPendiente, setReservaPend] = useState(null);

    useEffect( _.debounce(() => {
            if (haveReserva) {
                getBooksByPage(query, starPage)
                    .then(resp => responseData(resp))
            } else {
                getBoosByUser(user.cedula)
                    .then( reps => validateReseva(reps))
            }
        },[query] ), [query, haveReserva]
    );

    function validateReseva(res) {
        console.log("||||" + JSON.stringify(res));
        if (res !== undefined && res.usuario === user.cedula) {
            setReservaPend(res);
        } else {
            setHaveReserva(true);
            setAutorization(true)
        }
    }


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

    const renderNoAutorizado = () => {
        return(
            <View style={styles.container}>
                <View style={styles.topBox}>
                    <Card containerStyle={{justifyContent: 'center', alignItems: 'center', height: 300, paddingHorizontal: 40 }}>
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 30, marginBottom: 0}}>
                            <Text style={{fontSize: 18}}>
                                El Usuario:
                            </Text>
                            <Text style={{fontWeight: 'bold', fontSize: 18, marginLeft: 10}}>
                                {reserPendiente && reserPendiente.usuario}
                            </Text>
                        </View>
                        <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
                            Tiene Reserva Pendiente
                        </Text>
                        <Text style={{fontWeight: 'bold', marginBottom: 5, fontSize: 18}}>Datos:</Text>
                        <Text>Fecha de Prestamo: {reserPendiente && reserPendiente.fecha.slice(0, 10)}</Text>
                        <Text>Id Lbro: {reserPendiente && reserPendiente.libro}</Text>
                        <Button
                            icon={<Icon type="Entypo" name='download' style={{ color: 'white', marginRight: 15}}/>}
                            buttonStyle={styles.btnEntrega}
                            title='ENTREGA LIBRO' />
                    </Card>
                </View>
            </View>
        )
    };

    return (
        <View style={{flex: 1}}>
            {isAutorization ?
                <SearchBar
                    placeholder="Type Here..."
                    onChangeText={ value => setQuery(value) }
                    value={query} />  : true }

            { isAutorization ? renderSectionList() : reserPendiente && renderNoAutorizado() }

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
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerIner: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    topBox: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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
    btnEntrega: {
        borderRadius: 50,
        marginTop: 20,
        marginHorizontal:0,
        paddingHorizontal: 40,
        marginBottom: 0,
        backgroundColor:'#00355a'
    }
});