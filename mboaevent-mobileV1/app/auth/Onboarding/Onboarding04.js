
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import { useRouter } from 'expo-router';

import GradientBackground from "../../../assets/component/Globals Components/globals"

import {ButtonText,globalStyles} from "../../../assets/component/Globals Components/globals";

import Linear from '../../../assets/ressource/svg/Linear'
import Fleche from '../../../assets/ressource/svg/Fleche'
import OnboardIndicator from "../../../assets/ressource/svg/OnboardIndicator";



const Onboarding04 = () => {
    const router = useRouter();

    return (
        <View style={globalStyles.OnBoad_body}>
            <View style={globalStyles.imageBKG}>
                <Image style={globalStyles.imgO1} source={require('../../../assets/ressource/femO3.png')}/>
            </View>
            <View style={globalStyles.linearFilter}>
                <Linear />
            </View>
            <View style={globalStyles.onBoardingContent}>
                <Text style={globalStyles.onboardHeader}>Faites des rencontres bénéfiques pour votre business</Text>
                <Text style={globalStyles.onboardSubTitle}>Crée, partage, profite : avec MboaEvent, tes événements deviennent inoubliables !</Text>
            </View>
            <View style={globalStyles.onBoardingIndicators}>

                <TouchableOpacity style={globalStyles.bt1} onPress={() => router.replace('/auth/Onboarding/Onboarding02')}>
                    <OnboardIndicator actived={false} /></TouchableOpacity>
                <TouchableOpacity style={globalStyles.bt1} onPress={() => router.replace('/auth/Onboarding/Onboarding03')}>
                    <OnboardIndicator actived={false} /></TouchableOpacity>
                <OnboardIndicator actived={true} />
            </View>

            <View style={globalStyles.actionSide}>
                <ButtonText styleName="white" navigateTo="/auth/Onboarding/Onboarding5" TextButton={'Continuer'} large/>
            </View>

        </View>
    )
}

// Les styles sont dans le fichier global 

export default Onboarding04;
