import { StyleSheet, View, Image, TouchableOpacity, Text, ImageBackground, } from "react-native";
import { useRouter } from 'expo-router';

import Icon from "../../../assets/ressource/svg/globalIcons";

import Linear from '../../../assets/ressource/svg/Linear'
import Barre3 from '../../../assets/ressource/svg/Barre3'
import Fleche from '../../../assets/ressource/svg/Fleche'


import {ButtonText,globalStyles} from "../../../assets/component/Globals Components/globals";


const Onboarding5 = () => {
    const router = useRouter();

    return (
        <View>
            <View style={globalStyles.overlay}></View>
            <View style={globalStyles.imageBKG}>
                <Image style={globalStyles.imgO1} source={require('../../../assets/ressource/femO3.png')}/>
            </View>

            <View style={globalStyles.formBody}>
            
            
            <View style={[globalStyles.line,globalStyles.alignCenter]}>
                <Icon iconName={'mboaEventLarge'} />
            </View>
            <View style={globalStyles.blankSpace64}>

            </View>
            <View style={globalStyles.line}>
                <ButtonText styleName="white" navigateTo="/auth/Login/Register1" TextButton={"Créer un compte"} large={true} />
                <ButtonText styleName="blue" navigateTo="/auth/Login/Logins" TextButton={"Se connecter"} large={true} />
            </View>
            <View style={globalStyles.separator}>
                <View style={globalStyles.dividerSemi}></View>
                <Text style={globalStyles.normalText}>Ou</Text>
                <View style={globalStyles.dividerSemi}></View>
            </View>

            <View style={globalStyles.line}>
                <ButtonText styleName="transparent" navigateTo="/auth/Onboarding/Onboarding5" TextButton={"Se connecter avec Google"} iconLeft='google' large={true} outLined={true} />
                <ButtonText styleName="transparent" navigateTo="/auth/Onboarding/Onboarding5" TextButton={"Se connecter avec Facebook"} iconLeft='facebook' large={true} outLined={true} />
            </View>
        </View>

        </View>
        
    )
}

export default Onboarding5;


