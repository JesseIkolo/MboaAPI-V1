import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import { useRouter } from 'expo-router';

import GradientBackground from "../../../assets/component/Globals Components/globals"

import {ButtonText,globalStyles} from "../../../assets/component/Globals Components/globals";

import Linear from '../../../assets/ressource/svg/Linear'
import Fleche from '../../../assets/ressource/svg/Fleche'
import OnboardIndicator from "../../../assets/ressource/svg/OnboardIndicator";



const Onboarding02 = () => {
    const router = useRouter();

    return (
        <View style={globalStyles.OnBoad_body}>
            <View style={globalStyles.imageBKG}>
                <Image style={globalStyles.imgO1} source={require('../../../assets/ressource/femO11.png')} />
            </View>
            <View style={globalStyles.linearFilter}>
                <Linear />
            </View>
            <View style={globalStyles.onBoardingContent}>
                <Text style={globalStyles.onboardHeader}>Organisez vos évènements en toute sérénité </Text>
                <Text style={globalStyles.onboardSubTitle}>Rassemble tes amis, crée l’événement, et laisse la magie opérer !</Text>
            </View>
            <View style={globalStyles.onBoardingIndicators}>

                <OnboardIndicator actived={true} />
                <TouchableOpacity style={globalStyles.bt1} onPress={() => router.replace('/auth/Onboarding/Onboarding03')}>
                    <OnboardIndicator actived={false} /></TouchableOpacity>
                <TouchableOpacity style={globalStyles.bt1} onPress={() => router.replace('/auth/Onboarding/Onboarding04')}>
                    <OnboardIndicator actived={false} /></TouchableOpacity>
            </View>

            <View style={globalStyles.actionSide}>
                <ButtonText styleName="transparent" navigateTo="/auth/Onboarding/Onboarding5" TextButton={'Sauter'}/>
                <ButtonText styleName="white" navigateTo="/auth/Onboarding/Onboarding03" TextButton={'Continuer'}/>
            </View>

        </View>
    )
}



export default Onboarding02;
