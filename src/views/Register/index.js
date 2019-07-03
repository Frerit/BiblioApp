import React,{useState, useEffect} from 'react';
import {View, ScrollView, Text, KeyboardAvoidingView, StyleSheet} from 'react-native';
import {Input, Button, Divider, Image} from 'react-native-elements';
import {Icon, Picker, DatePicker} from "native-base";
import {useNavigation} from "react-navigation-hooks";
import {getAllCOuntry, getCountryById, getUserById, registerUser} from "../../repository/RegisterRepository";

import _ from "lodash";

const Register = () => {
    const [needRegister, setRegister] = useState(false);
    const [userConsult, setUserConsult] = useState(undefined);
    const [loading, setLoading] = useState(false);

    const [message, setMesageError] = useState("");

    const [nombre, setNombre] = useState();
    const [apellido, setApellido] = useState();
    const [telefono, setTelefono] = useState();
    const [celular, setCelular] = useState();
    const [direccion, setDireccion] = useState();
    const [selectCountry, setSelectCountry] = useState(undefined);
    const [birtDate, setBirDate] = useState(new Date());
    const [alfaCode, setAlfaCode] = useState();
    const [country, setCountry] = useState([
        { name: 'name', alpha2_code: "NA"},
        { name: 'name', alpha2_code: "NA"}
    ]);

    const { navigate } = useNavigation();

    useEffect( async () => {
        await getAllCOuntry()
            .then(value => {
                console.log("Couto" + JSON.stringify(value))
                setCountry(value)
            }
            );
    },[]);

    useEffect( _.debounce(() => {
        getCountryById(selectCountry)
                .then( value =>
                    setAlfaCode(value.alpha2Code))
        }
    ) , [selectCountry]);

    async function validateUserRegister() {
        console.log(userConsult);
        if (userConsult !== undefined) {
            setLoading(true);
            setMesageError("");

            await getUserById(userConsult)
                .then( response => responseServerData(response));

        } else {
            setLoading(false);
            setMesageError("Falta el Usuario");
        }
    }

    function responseServerData(response) {
        if (response.status !== undefined && response.status === 500) {
            setRegister(true);
            setLoading(false);
        } if (response.cedula !== undefined && response.cedula === userConsult) {
            setLoading(false);
            navigate('Books', {
                user: response
            })
        }
    }

    function registerNewUser() {
        if ( validateCampos() ) {
            setLoading(true);
            const data = {
                cedula: userConsult,
                nombre,
                primerApellido: apellido,
                segundoApellido: apellido,
                telefono,
                celular,
                direccion,
                paisNacimiento: alfaCode,
                fechaNacimiento: birtDate.toISOString().slice(0,10),
                tiposUsuario: "3",
                estadoUsuario: 5
            };

            registerUser(data)
                .then( value => {
                    setLoading(false);
                    setRegister(false);
                    setUserConsult(undefined);
                    responseSaveData(value)
                });
        }
        setLoading(false);
    }

    function responseSaveData(resp) {
        navigate('Books', {
            user: resp
        })
    }

    function validateCampos() {
        if (nombre === undefined || nombre === '') {
            setMesageError('Falta el nombre');
            return false;
        }
        if (apellido === undefined || apellido  === '') {
            setMesageError('Falta el Apellido');
            return false;
        }
        if (telefono === undefined || telefono  === '') {
            setMesageError('Falta el Telefono');
            return false;
        }
        if (celular === undefined || celular  === '') {
            setMesageError('Falta el Celular');
            return false;
        }
        if (direccion === undefined || direccion  === '') {
            setMesageError('Falta el Direccion');
            return false;
        }

        if (birtDate.toISOString().slice(0,10) === new Date().toISOString().slice(0,10)) {
            setMesageError('Falta el Corregir la Fecha');
            return false;
        }

        return true;
    }

    const generateForms = () => {
        return(
            <View>
                <Input placeholder='Nombre'
                       value={nombre}
                       onChangeText={(value) => setNombre(value)}
                       inputStyle={{fontSize: 15}}
                       containerStyle={styles.inputs}
                       inputContainerStyle={styles.contstyle}
                />
                <Input placeholder='Apellidos'
                       value={apellido}
                       onChangeText={(value) => setApellido(value)}
                       inputStyle={{fontSize: 15}}
                       containerStyle={styles.inputs}
                       inputContainerStyle={styles.contstyle}
                />
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Input
                        placeholder='Telefono'
                        value={telefono}
                        onChangeText={(value) => setTelefono(value)}
                        keyboardType='phone-pad'
                        inputStyle={{fontSize: 15}}
                        containerStyle={ [styles.rowinputs, {marginRight: 10}] }
                        inputContainerStyle={styles.contstyle}
                    />
                    <Input
                        placeholder='Celular'
                        value={celular}
                        onChangeText={(value) => setCelular(value)}
                        keyboardType='phone-pad'
                        inputStyle={{fontSize: 15}}
                        containerStyle={styles.rowinputs}
                        inputContainerStyle={styles.contstyle}
                    />
                </View>
                <Input
                    placeholder='Direccion'
                    shake={true} value={direccion}
                    onChangeText={(value) => setDireccion(value)}
                    inputStyle={{fontSize: 15}}
                    containerStyle={styles.inputs}
                    inputContainerStyle={styles.contstyle}
                />
                <View style={styles.countround}>
                    <Picker mode="dropdown"
                        iosIcon={ <Icon type="Entypo" name="v-card" style={{color:'gray'}} /> }
                        placeholder="Pais de Nacimiento"
                        style={{ width: '100%', color: 'gray'}}
                        selectedValue={selectCountry}
                        onValueChange={ (value) => setSelectCountry(value) } >

                        {country.map( item => (
                            <Picker.Item label={item.name} value={item.alpha2Code} />
                        ))}

                    </Picker>
                </View>
                <View style={[styles.countround, {paddingVertical: 2}]}>
                    <DatePicker
                        defaultDate={new Date(1999, 4, 4)}
                        minimumDate={new Date(1900, 1, 1)}
                        maximumDate={new Date(2000, 12, 31)}
                        locale={"es"}
                        timeZoneOffsetInMinutes={undefined}
                        modalTransparent={false}
                        animationType={"fade"}
                        androidMode={"spinner"}
                        placeHolderText="Fecha de Nacimiento"
                        textStyle={{ color: "#000" }}
                        placeHolderTextStyle={{ color: "gray" }}
                        onDateChange={ date => setBirDate(date)}
                        disabled={false}
                    />
                </View>
            </View>
        )
    };

    return (
        <KeyboardAvoidingView style={styles.container}
                              behavior="padding">
            <ScrollView style={{ paddingHorizontal: 20, backgroundColor: '#f6f6f6'}}>
                <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 20}}>
                    { !needRegister ? (
                            <Image
                            source={ require('../../assets/books.png') }
                            style={{ width: 150, height: 180 }}/>
                        ) : (
                            <Text style={{color: 'gray', fontSize: 24}}> Registro </Text>
                        ) }

                </View>
                <Input
                    onChangeText={(value) => setUserConsult(value)}
                    placeholder='Cedula'
                    keyboardType='phone-pad'
                    leftIcon={ <Icon type="Entypo" name="v-card" style={{color:'#ababab'}} /> }
                    containerStyle={styles.inputs}
                    inputContainerStyle={styles.contstyle}
                />
                { needRegister && generateForms() }
                <Text style={message ? styles.message : styles.noMesage }> { message } </Text>
                <Button
                    loading={loading}
                    title={!needRegister ? 'Consultar' : 'Guardar'}
                    buttonStyle={{height: 50, borderRadius: 50, backgroundColor: '#00355a'}}
                    onPress={() => !needRegister ? validateUserRegister() : registerNewUser() }
                />
                <Text> {alfaCode} </Text>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Register;

const styles = StyleSheet.create( {
    inputs: {
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 50,
    },
    contstyle: {
        borderWidth:0,
        borderColor: 'transparent'
    },
    countround: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius:50,
        paddingHorizontal: 10,
        marginBottom: 20
    },
    rowinputs: {
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 50,
        flex: 1
    },
    noMesage: {
        position: 'absolute'
    },
    message: {
        position: 'relative',
        textAlign: 'right',
        marginBottom: 4,
        color: '#ff7a60'
    }
});