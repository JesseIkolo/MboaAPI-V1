import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { globalStyles } from '../../../assets/component/Globals Components/globals';

import Icon from '../../../assets/ressource/svg/globalIcons';

const Register1 = () => {

    const navigation = useNavigation();
    const [mood, setMood] = useState('');
    return (
        <View style={globalStyles.formBody}>

            <View style={globalStyles.formContainer}>
                <View style={[globalStyles.line, globalStyles.alignCenter]}>
                    <Icon iconName={'mboaEventLarge-blue'} />
                    <Text style={globalStyles.formHeader}>Creer un compte</Text>
                </View>
                <View style={globalStyles.blankSpace48}></View>
                
                <ScrollView
                    contentContainerStyle={globalStyles.ScrollViewContainer}
                    showsVerticalScrollIndicator={false}
                    style={styles.false}
                >

                    <View style={globalStyles.ScrollViewContent}>

                        <View style={globalStyles.inputText}>
                            <Text style={globalStyles.name}>Nom d'utilisateur</Text>
                            <TextInput style={globalStyles.input} />
                        </View>
                        <View style={styles.dv5}>
                            <Text style={styles.names}>Adresse email</Text>
                            <TextInput style={styles.inputs} />
                        </View>
                        <View style={styles.dv5}>
                            <Text style={styles.names}>Nom</Text>
                            <TextInput style={styles.inputs} />
                        </View>
                        <View style={styles.dv5}>
                            <Text style={styles.names}>Prenom</Text>
                            <TextInput style={styles.inputs} />
                        </View>
                        <View style={styles.dv5}>
                            <Text style={styles.names}>Mot passe</Text>
                            <TextInput style={styles.inputs} />
                        </View>
                        <View style={styles.dv5}>
                            <Text style={styles.names}>Confirm Mot de passe</Text>
                            <TextInput style={styles.inputs} />
                        </View>
                        <View style={styles.dv6}>
                            <View>
                                {['happy'].map(feeling => (
                                    <View key={feeling}>
                                        <TouchableOpacity style={styles.outter} onPress={() => setMood(feeling)}>

                                            {mood === feeling && <View style={styles.inner} />}
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                        </View>
                        <View style={styles.dv7}>
                            <Text style={styles.con}>En creant votre compte, vous acceptez nos Termes et condition</Text>
                        </View>
                        <View style={styles.dv8}>
                            <TouchableOpacity style={styles.btn1} onPress={() => navigation.navigate('Register2')}>
                                <Text style={styles.val}>Suivant</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </ScrollView>
            </View>
            <View style={styles.dv9}>
                <Text style={styles.forgot2}>Déjà un compte?</Text>
                <TouchableOpacity style={styles.btn2}>
                    <Text style={styles.val1}>Se connecter</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({


    tti: {
        display: 'flex',
        height: 160
    },
    body: {
        backgroundColor: '#020931',
        height: '100%'
    },
    div1: {
        width: '100%',
        height: '80%',
        top: 0,
        left: 0,
        borderRadius: 16,
        padding: 32,
        backgroundColor: '#fff',

        borderColor: 'red',
        borderWidth: 1,
        borderStyle: 'solid',
    },
    img1: {
        display: 'flex',
        left: 10
    },
    img2: {
        display: 'flex',
        top: 50,
        left: 60
    },
    name: {
        display: 'flex',
        top: 115,
        left: 10,
        color: '#1E2448',
        fontSize: 16
    },
    input1: {
        width: 262,
        height: 53,
        //borderWidth: 1,
        borderRadius: 8,
        display: 'flex',
        top: 115,
        left: 10,
        backgroundColor: '#F5F5F6'
    },
    names: {
        display: 'flex',
        top: 115,
        left: 10,
        color: '#1E2448',
        fontSize: 16,
        top: 135
    },
    inputs: {
        width: 262,
        height: 53,
        //borderWidth: 1,
        borderRadius: 8,
        display: 'flex',
        top: 115,
        left: 10,
        backgroundColor: '#F5F5F6',
        top: 135
    },
    dv5: {
        marginBottom: 20
    },
    outter: {
        display: 'flex',
        justifyContent: 'space-between',
        width: 25,
        height: 25,
        borderWidth: 1,
        borderRadius: 15,
        top: 135,
        left: 15
    },
    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        width: 15,
        height: 15,
        backgroundColor: 'gray',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        left: 3.5,
        top: 3.5
    },
    con: {
        display: 'flex',
        top: 105,
        left: 45,
    },
    dv9: {
        top: 120
    },
    btn1: {
        width: 262,
        height: 56,
        backgroundColor: '#041578',
        borderRadius: 8,
        display: 'flex',
        left: 0,
        top: 160
    },
    val: {
        textAlign: 'center',
        top: 16,
        color: 'white'
    },
    forgot2: {
        top: 20,
        textAlign: 'center',
        color: '#fff'
    },
    btn2: {
        width: 132,
        height: 37,
        backgroundColor: '#fff',
        borderRadius: 8,
        display: 'flex',
        left: 150,
        top: 50
    },
    val1: {
        textAlign: 'center',
        top: 8,
        color: '#041578'
    },
    dv4: {
        backgroundColor: 'red',

    }

});

export default Register1;