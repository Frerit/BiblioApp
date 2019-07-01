import React from "react";
import {  createAppContainer, createSwitchNavigator, createStackNavigator } from "react-navigation";
import Login from "../views/Login";
import Register from "../views/Register";
import Books from "../views/Books";
import Detail from "../views/Detail";

const Stack = createStackNavigator({
    Register: {
        screen: Register,
        navigationOptions: {
            headerStyle: {
                elevation: 0,       // remove shadow on Android
                shadowOpacity: 0,
                backgroundColor: '#f6f6f6'
            }
        }
    },
    Books,
    Detail
},{
    initialRouteName: 'Register'
});


const AppNavigator = createSwitchNavigator({
    Login,
    Stack
},{
    initialRouteName: 'Stack'
});


export default createAppContainer(AppNavigator);