import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, View, Image, TouchableOpacity, Text, ImageBackground,  } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Linear from '../../assets/ressource/svg/Linear'
import Barre2 from '../../assets/ressource/svg/Barre2'
import Fleche from '../../assets/ressource/svg/Fleche'
  
const Onboarding03 = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.body}>
            <View style={styles.dv1}>
                <Image style={styles.imgO1} source={require('../../assets/ressource/femO2.png')}/>
            </View>
            <View style={styles.imgO2}>
                <Linear/>
            </View>
            <View style={styles.dV2}>
                <Text style={styles.txtO}>Faites des rencontres bénéfiques pour votre business</Text>
            </View>
            <View style={styles.df2}>
                <Text style={styles.txtO1}> Lorem ipsum dolor sit amet consectetur. Tellus enim ac aliquam tortor. Eu est iaculis ut hac cursus. Feugiat volutpat elit sit sed. </Text>
            </View>
            <View style={styles.dv2}>
                <Barre2/>
            </View>
            <View style={styles.dv3}>
                <Text style={styles.txdv3} onPress={()=>navigation.navigate('Onboarding04')}>Sauter</Text>
            </View>
            <View style={styles.dv4}>
                <TouchableOpacity style={styles.bt1} onPress={()=>navigation.navigate('Onboarding04')}>
                    <Text style={styles.txbt1}>Continuer</Text>
                    <Fleche style={styles.fle}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        // backgroundColor: '#020931',
    },
    imgO1:{
        width: '100%',
        height: '100%',
    },
    imgO2:{
        position:'absolute', 
        top:0,
        bottom: 0,
        right: 0,
        left:0
    },
    txtO:{
        display: 'flex',
        fontSize: 40,
        color: 'white',
        bottom: 670,
        left: 30
    },
    txtO1:{
        display: 'flex',
        color: 'white',
        bottom: 660,
        fontSize: 20,
        left: 30
    },
    dv2:{
        display: 'flex',
        bottom: 640,
        left: 30
    },
    txdv3:{
        display: 'flex',
        bottom: 600,
        left: 30,
        color: 'white',
        fontSize: 18
    },
    bt1:{
        display: 'flex',
        width: 160,
        height: 56,
        borderRadius: 8,
        bottom: 635,
        backgroundColor: '#E6E8F2',
        left: 250
    },
    txbt1:{
        textAlign: 'center',
        fontSize: 18,
        color: '#041578',
        top: 15,
        right: 20
    },
    fle:{
        left: 120,
        bottom: 5
    },
})


module.exports =  Onboarding03