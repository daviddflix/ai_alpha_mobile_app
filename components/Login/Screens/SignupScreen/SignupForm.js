import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Image, StyleSheet, useWindowDimensions, ScrollView, Text, Linking, TouchableOpacity } from 'react-native';
import Logo from '../../../../assets/images/AIAlphalogonew.png'
import GreenTick from '../../../../assets/images/greenTick.png';
import CustomInput from '../../CustomInput/CustomInput';
import CustomButton from '../../CustomButton';
import Separator from '../../CustomButton/Separator';
import SocialSignInButton from '../../SocialSignInButton';
import { useNavigation } from '@react-navigation/core';
import axios from 'axios';

const onTermsPressed =()=> {
    const url = "https://aialpha.ai/termsofservice";
    
    Linking.canOpenURL(url)
        .then((supported) => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.warn("Don't know how to open URI: " + url);
            }
        })
        .catch((err) => console.error('An error occurred', err));
};

const SignupForm = () => {
    const {height} = useWindowDimensions();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordRepeat, setPasswordRepeat] = useState();
    const navigation = useNavigation();
    const [isFormValid, setIsFormValid] = useState(false);
    const [signupSuccessful, setSignupSuccessful] = useState(false);

    const validateForm = () => {
        const formIsValid =
            username &&
            email &&
            password &&
            passwordRepeat &&
            password === passwordRepeat;
        setIsFormValid(formIsValid);
    };
    useEffect(() => {
        // This effect will re-validate the form every time the inputs change
        const formIsValid = username && email && password && password === passwordRepeat;
        setIsFormValid(formIsValid);
    }, [username, email, password, passwordRepeat]);

    const onSignInPressed =()=> {
        //validate user logic missing
        navigation.navigate('SignIn');
    }
    const onRegisterPressed = async () => {
        // Check if the passwords match
        if (password !== passwordRepeat) {
            alert("Passwords do not match");
            return;
        }
    
        // Continue with the signup process
        try {
            const response = await axios.post('https://dev-kqugsqvoounaylft.us.auth0.com/dbconnections/signup', {
                client_id: 'Rr0xvkmUdxACllY2wFPq9k6CFRnq01CO',
                email: email,
                password: password,
                connection: 'Username-Password-Authentication', // Update this to your Auth0 Database connection name
                user_metadata: { // Adding user_metadata object with username
                    username: username,
                },
            });
    
            console.log('Signup successful', response.data);
            setSignupSuccessful(true);

            // Navigate to login screen after 2 seconds
            setTimeout(() => {
                navigation.navigate('SignIn');
            }, 2000);
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Signup error', error.response.data);
                alert('Signup failed: ' + error.response.data.error_description || error.response.data.message);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Signup error', error.request);
                alert('No response received.');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error', error.message);
                alert('Error: ' + error.message);
            }
        }
    };
    if (signupSuccessful) {
        return (
            <View style={styles.successContainer}>
                <Image source={GreenTick} style={styles.tickImage} />
                <Text style={styles.successText}>Sign Up Successful</Text>
            </View>
        );
    }
    

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
        <Image source={Logo} style={[styles.logo, {height: height*0.3}]} resizeMode='contain'/>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Username</Text>
                <CustomInput placeholder='' value={username} setValue={setUsername} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Email</Text>
                <CustomInput placeholder='' value={email} setValue={setEmail} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Password</Text>
                <CustomInput placeholder='' value={password} setValue={setPassword} secureTextEntry={true}/>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Repeat Password</Text>
                <CustomInput placeholder='' value={passwordRepeat} setValue={setPasswordRepeat} secureTextEntry={true}/>
            </View>
            <View style={styles.termsContainer}>
                    <Text style={styles.termsText}>By registering you agree to our </Text>
                    <TouchableOpacity onPress={onTermsPressed}>
                        <Text style={styles.termsButton}>Terms and Conditions</Text>
                    </TouchableOpacity>
            </View>
            <CustomButton text="Register" onPress={onRegisterPressed} disabled={!isFormValid}/>
            <Separator />
            <SocialSignInButton />
            <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Already have an account? </Text>
                    <TouchableOpacity onPress={onSignInPressed}>
                        <Text style={styles.loginButton}>Log In</Text>
                    </TouchableOpacity>
            </View>


        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root:{
        alignItems: 'center',
        backgroundColor:'#242427',
        padding: 20,
    },
    logo: {
        margin:0,
        padding:0,
        width: '40%',
        maxHeight: 100,
        maxWidth: 200,
        marginBottom: 20,
    },
    mainTitle:{
        fontSize: 24,
        fontWeight: 'bold',
        color:'white',
        margin: 5,
    },
    inputContainer: {
        alignSelf: 'stretch',
    },
    title: {
        color: '#b8bbbd',
        textAlign: 'left',
        marginLeft: 0,
        fontWeight:'bold',
    },
    loginContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    loginText: {
        color: 'white',
        
    },
    loginButton: {
        color: '#fc5505',
        fontWeight: 'bold',
    },
    termsContainer: {
        flexDirection: 'row',
        marginTop: 0,
        marginBottom: 10,
    },
    termsText: {
        color: 'white',
        fontSize: 10,
    },
    termsButton: {
        color: '#fc5505',
        fontSize: 10,
    },
    successContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#242427',
    },
    successText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    tickImage: {
        width: 120, // Adjust the size as needed
        height: 88, // Adjust the size as needed
        marginBottom: 10,
    },
});




export default SignupForm;
