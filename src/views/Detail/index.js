import React, { useEffect, useState } from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {useNavigation, useNavigationParam} from "react-navigation-hooks";
import {getBooksByID} from "../../repository/DetailRepository";
import { Col, Row, Grid } from "react-native-easy-grid";
import {Button, Image, Rating} from "react-native-elements";
import {Item, Icon, Input} from "native-base";




const Detail = () => {
    const idlibro = useNavigationParam('id');
    const user = useNavigationParam('user');
    const { navigate } = useNavigation();

    const [book, setBook] = useState(null);

    useEffect(() => {
            getBooksByID(idlibro)
                .then(resp => setBook(resp))
    },[idlibro] );

    function createResgistro() {
        
    }

    const renderInfoLoading = () => {
        return(
            <Grid>
                <Row size={35}>
                    <Col size={45}>
                        <Image
                            source={{ uri: book.image }}
                            style={{ width: 200, height: 200, marginTop: 30}}
                            PlaceholderContent={<ActivityIndicator />}
                        />
                    </Col>
                    <Col size={55} style={styles.columnadetalle}>
                        <Text style={styles.titleBook}>{ book.title }</Text>
                        <Text>{ book.subtitle }</Text>
                        <Rating
                            type='custom'
                            imageSize={30}
                            startingValue={parseInt( book.rating )}
                            style={{ paddingVertical: 10, paddingRight: 30}} />
                        <Item style={styles.itemStyle}>
                            <Icon type="Entypo" name='feather' />
                            <Text style={{width: 150}}>{ book.authors }</Text>
                        </Item>
                    </Col>
                </Row>
                <Row size={65}>
                    <Col style={{paddingVertical: 20, paddingHorizontal: 30}}>
                        <Text style={{fontWeight: 'bold', fontSize: 18}}>
                            Descripcion:
                        </Text>
                        <Text style={{marginVertical: 20}}>{book.desc}</Text>
                        <Button
                            icon={<Icon type="Entypo" name="book" size={15} style={{color: 'white', marginRight: 10}}/>}
                            title="Crear Reserva"
                            onPress={createResgistro}
                            />
                    </Col>
                </Row>
            </Grid>
        )
    };

    return (
        <Grid>
            { book && renderInfoLoading() }
        </Grid>
    );
};

export default Detail;

const styles = StyleSheet.create( {
    titleBook: {
        marginTop: 30,
        marginBottom: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
    itemStyle: {
        marginTop: 20,
        borderWidth: 0,
        borderColor: 'white'
    },
    columnadetalle: {
        paddingRight: 5
    }
});