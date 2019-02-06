import React, { Component } from 'react';
import { View, TextInput, ActivityIndicator, Alert } from 'react-native';
import firebase from 'firebase';
import Button from './Button';

export default class LoginForm extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            loading: false
        };
        this.pushLogin = this.pushLogin.bind(this);
        this.loginSuccess = this.loginSuccess.bind(this);
        this.loginFail = this.loginFail.bind(this);
        this.createIndicator = this.createIndicator.bind(this);
    }

    pushLogin() {
        this.setState({ loading: true });
        const { email, password } = this.state;

        if (!email && !password) {
            Alert.alert(
                'Message',
                'fill in the full input!',
                [
                    { text: 'OK', onPress: () => this.setState({ loading: false }) }
                ]
            );
            return;
        }

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.loginSuccess)
        .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(this.loginSuccess)
            .catch(this.loginFail);
        });
    }
    
    createIndicator() {
        if (!this.state.loading) {
            return <Button onPress={this.pushLogin}>Login</Button>;
        }
        return <ActivityIndicator size={'small'} color={'#0000ff'} />;
    }

    loginSuccess() {
        this.setState({ email: '', password: '', loading: false });
    }

    loginFail() {
        Alert.alert(
            'Message',
            'Username or Password is wrong!',
            [
                { text: 'OK', onPress: () => this.setState({ loading: false }) }
            ]
        );
    }

    render() {
        const { inputStyle, containerViewStyle, subContainerStyle } = styles;
        return (
            <View style={containerViewStyle}>
                <View style={subContainerStyle}>
                    <TextInput
                        style={inputStyle}
                        placeholder={'E-mail'} 
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                    />
                </View>

                <View style={subContainerStyle}>
                    <TextInput
                        secureTextEntry
                        style={inputStyle} 
                        placeholder={'Password (at least six characters)'} 
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />
                </View>

                <View style={subContainerStyle}>
                    { this.createIndicator() }
                </View>
                
            </View>
        );
    }
}

const styles = {
    inputStyle: {
        paddingLeft: 5,
        paddingRight: 5,
        flex: 2,
        lineHeight: 23,
        fontSize: 18,
        color: '#000',
    },
    containerViewStyle: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    },
    subContainerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
    },
};

