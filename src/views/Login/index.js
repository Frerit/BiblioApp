import React, {useState} from 'react';
import {View, Text, ImageBackground, Image, KeyboardAvoidingView, Dimensions} from 'react-native';
import { Icon} from "native-base";
import {Input, Button} from 'react-native-elements';
import {useNavigation} from "react-navigation-hooks";
import {loginUserById} from "../../repository/LoginRepository";
import {Base64} from "../../util/deco";



const {width} = Dimensions.get('window');

const Login = () => {
    const [usercredencial, setCredencial] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [isUserAutenticate, setAutenticate] = useState(false);
    const [messajeError, setMessajeError] = useState("");
    const [userAuth, setUsuarioAuten] = useState(null);
    const [loading, setLoading] = useState(false);
    const { navigate } = useNavigation();

    async function handlesLogin() {
        setLoading(true);
        if (usercredencial !== "") {
            await loginUserById(usercredencial)
                .then( response => responseData(response))
                .catch();
            setLoading(false);
        } else {
            setLoading(false);
            setMessajeError("Falta ingresar Usuario")
        }
    }

    function responseData(resp) {
        console.log(JSON.stringify(resp));
        if (resp.status !== undefined && resp.status === 500) {
            setMessajeError('Usuario Incorecto')
        } else {
            setUsuarioAuten(resp);
            setMessajeError('');
            setAutenticate(true);
            setLoading(true);
        }
    }

    function atenpiLogin() {
        setLoading(true);
        const decodePass = Base64.atob(userAuth.usuario.password)
        console.log(userPassword);
        console.log(decodePass);
        console.log(userAuth.estado.id);
        console.log(userAuth.usuario.tiposUsuario);
        if (userPassword === decodePass && userAuth.estado.id === 3 && userAuth.usuario.tiposUsuario === '3') {
            setLoading(true);
            navigate('Register')
        }
    }

    function renderUnputPass() {
        return(
            <Input
                value={userPassword}
                onChangeText={ (text) => setUserPassword(text)}
                placeholder='Contraseña'
                shake={true}
                containerStyle={{borderWidth: 1, borderRadius: 50, paddingVertical: 5, marginTop: 10}}
                inputContainerStyle={{borderWidth:0, borderColor: 'transparent'}}
                leftIcon={ <Icon type="Entypo" name="key" style={{color:'gray'}} /> }
            />
        )
    }

    return (
            <ImageBackground source={require("../../assets/fodo2.png")} style={{width: '100%', height: 780, alignItems: 'center'}}>
                <View style={{alignItems: 'center', marginTop: 120}}>
                    <Image
                        style={{ height: 230, width:300, resizeMode:'contain', paddingTop: 20}}
                        source={require("../../assets/logo.png")}
                    />
                </View>
                <KeyboardAvoidingView behavior="padding" >
                    <View style={{ marginTop: !isUserAutenticate ? 100 : 50, width: width - 70 }}>
                        <Input
                            value={usercredencial}
                            onChangeText={ (text) => setCredencial(text)}
                            textContentType='telephoneNumber'
                            keyboardType='numeric'
                            placeholder='Usuario'
                            shake={true}
                            containerStyle={{borderWidth: 1, borderRadius: 50, paddingVertical: 5}}
                            inputContainerStyle={{borderWidth:0, borderColor: 'transparent'}}
                            leftIcon={ <Icon type="Entypo" name="user" style={{color:'gray'}} /> }
                        />
                        {messajeError !== "" ? <Text>{ messajeError }</Text> : true }
                        {isUserAutenticate && renderUnputPass()}
                        <Button
                            onPress={!isUserAutenticate ? handlesLogin: atenpiLogin}
                            title="Ingresar"
                            loading={loading}
                            buttonStyle={{marginTop: 20, borderRadius: 50, height: 50, backgroundColor: '#00355a'}}
                        />
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
    );
};

export default Login;