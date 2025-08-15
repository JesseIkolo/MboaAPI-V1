import React from "react";
import { StyleSheet, View, Image, TextInput, Text, TouchableOpacity, ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import EventSectionBlockCatalog from '../../assets/component/Globals Components/EventSectionBlockCatalog';

const Reseau = () => {
    const navigation = useNavigation();
    return (


        <View style={styles.container}>
            {/* Section vide (placeholder) */}
            <EventSectionBlockCatalog
                title=""
                events={[]}
                navigation={navigation}
                showViewAll={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        gap: 28,

        // justifyContent:'center',
        // alignItems:'center'
    },
    img: {
        marginTop: 28,
        justifyContent: 'center',
        alignItems: 'center'

    },
    textnouveau: {
        textAlign: 'center',
        fontSize: 20,
        color: '#041578'
    },
    textexplicatif: {
        textAlign: 'center',
        fontSize: 16,
        color: '#767A90'
    },
    textinpunt: {
        backgroundColor: '#E6E8F2',
        width: 256,
        height: 53,
        borderRadius: 8,
        paddingHorizontal: 13

    },
    btnrechercher: {
        backgroundColor: '#041578',
        width: 53,
        height: 53,
        borderRadius: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    fin: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    }

})

export default Reseau