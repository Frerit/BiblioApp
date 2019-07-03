import React, { useEffect, useState } from 'react';
import {View, Text, ActivityIndicator, StyleSheet, Alert} from 'react-native';
import {useNavigation, useNavigationParam} from "react-navigation-hooks";
import {getBooksByID, registerReserva} from "../../repository/DetailRepository";
import { Col, Row, Grid } from "react-native-easy-grid";
import {Button, Image, Rating} from "react-native-elements";
import {Item, Icon, Input} from "native-base";




const Detail = () => {
    const idlibro = useNavigationParam('id');
    const user = useNavigationParam('user');
    const { navigate } = useNavigation();

    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
            getBooksByID(idlibro)
                .then(resp => setBook(resp))
    },[idlibro] );

    async function createResgistro() {
        setLoading(true);
        const dataReserva = {
            title: book.title,
            idLibro: book.isbn13,
            subtitle: book.subtitle,
            authors: book.authors,
            pages: book.pages,
            categoria: "1",
            estado: 1,
            fechaInicio: new Date().toISOString().slice(0,10),
            user: user,
        };
        await registerReserva(dataReserva)
            .then(resp => responseDataReserva(resp))
            .catch(err => responseError(err))
    }

    function responseDataReserva(reserv) {
        setLoading(false);
        if (reserv.id !== undefined && reserv.id >= 0) {
            Alert.alert(
                'Reserva Creada',
                'Se ha creado una resera \n' +
                'Usuario: ' + reserv.usuario + ' \n' +
                'Libro Reservado: ' + reserv.libro,
                [
                    {text: 'OK', onPress: () => navigate("Register")},
                ],
                {cancelable: false},
            );

        }
    }

    function responseError(error) {
        Alert.alert(
            'Error',
            error,
            [
                {text: 'OK', onPress: () => console.log("OK")},
            ],
            {cancelable: false},
        );
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
                            buttonStyle={{backgroundColor: '#00355a' , borderRadius: 50,}}
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