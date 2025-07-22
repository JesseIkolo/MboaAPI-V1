import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useRouter } from 'expo-router';
import Icon from '../../ressource/svg/globalIcons';

function ButtonText({ styleName, navigateTo, TextButton, ButtonTextStyle, iconLeft, iconRight, large, outLined }) {
    const router = useRouter();
    let textStyle = globalStyles.txbt1; // style par défaut

    if (styleName === "transparent") {
        textStyle = globalStyles.textWhite;
    } else if (styleName === "blue") {
        textStyle = globalStyles.textWhite;
    } else if (styleName === "white") {
        textStyle = globalStyles.textBlue;
    }

    // Prépare le tableau de globalStyles dynamiques
    const buttonStyles = [globalStyles.button, globalStyles[styleName]];
    if (large) buttonStyles.push(globalStyles.large);
    if (outLined) buttonStyles.push(globalStyles.outlined);

    return (
        <TouchableOpacity style={buttonStyles} onPress={() => router.replace(navigateTo)}>
            {iconLeft ? <Icon iconName={iconLeft} /> : null}
            <Text style={[textStyle, globalStyles.text]}>{TextButton}</Text>
            {iconRight ? <Icon iconName={iconRight} /> : null}
        </TouchableOpacity>
    );
}

const globalStyles = StyleSheet.create({
    button: {
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 48,
        columnGap: 8,
        borderRadius: 8,
        position: 'relative',
        height: 64,

    },
    btnEmpty: {},
    blue: {
        backgroundColor : "#041578"
    },
    white: {
        backgroundColor: "#FFF"
    },
    textBlue: {
        color: "#041578",
        fontFamily: 'TitilliumWeb-Bold',
        fontSize: 16,
    },
    transparent: {
        backgroundColor: '#ffffff00',
    },
    textWhite: {
        color: '#FFF',
    },
    text: {
        fontFamily: 'TitilliumWeb-Bold',
        fontSize: 16,
        textAlign: 'center',
        height: 'auto',
        width: 'fit-content'
    },
    icon: {
        width: 24,
        height: 24,
    },
    large: {
        width: '100%',
    },
    outlined: {
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderStyle: 'solid',
    },

    ///////////////////// Tous les styles pour Onboard   ////////
    OnBoad_body: {
        backgroundColor: '#020931',
        //borderColor: '#FFFFFF',
        //borderWidth: 1,
        //borderStyle: 'solid',
        width: '100%',
        height: '100%',
        flex: 1,
        padding: 0,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },

    imageBKG: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 0
    },
    imgO1: {
        width: '100%',
        height: '100%',
    },

    onBoardingContent: {
        //borderColor: '#FFFAAA',
        //borderWidth: 1,
        //borderStyle: 'solid',
        width: '100%',
        //height : '100%',
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 24,
        position: 'relative',
        zIndex: 2,

    },

    onboardHeader: {
        fontFamily: 'TitilliumWeb-Bold',

        fontSize: 28,
        color: '#FFF',
        marginBottom: 12,
        //borderColor: '#FFFAAA',
        //borderWidth: 1,
        //borderStyle: 'solid',
    },

    onboardSubTitle: {
        fontFamily: 'TitilliumWeb-Regular',
        fontSize: 16,
        fontWeight: 'normal',
        color: '#FFF'
    },

    onBoardingIndicators: {
        flexDirection: 'row',
        //borderColor: '#FFFAAA',
        //borderWidth: 1,
        //borderStyle: 'solid',
        width: '100%',
        position: 'relative',
        display: 'flex',
        zIndex: 2,
        paddingLeft: 16,
        paddingRight: 16,
        //rowGap: 12,
        columnGap: 12,
        marginBottom: 64
    },
    actionSide: {
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        //borderColor: '#FFFAAA',
        //borderWidth: 1,
        //borderStyle: 'solid',
        height: 'fit-content',
        width: "100%",
        marginBottom: 64,
        paddingHorizontal: 16,
        flexDirection: 'row',
        columnGap: 16,
        justifyContent: 'space-between'
    },
    gradient: {
        borderColor: '#FFFAAA',
        borderWidth: 1,
        borderStyle: 'solid',
        position: "absolute",
        zIndex: 99,
        width: 100,
        height: 100,
        top: 0,
        left: 0,
    },
    linearFilter:{
        position:'absolute', 
        top:0,
        bottom: 0,
        right: 0,
        left:0,
        zIndex : 1
    },


    //////////////////////// Form Pages   ////////////////
    formBody: {
        boxSizing: 'border-box',
        // backgroundColor: '#020931',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        height: '100%',
        paddingHorizontal: 16,
        paddingBottom: 64,
        rowGap: 32,
        position: 'relative',
        width : "100%",
        
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderStyle: 'solid',

    },
    innerPagePadding : { // Pour mettre un padding dans une page de tyle forme
        marginTop : 64,
    },
    line: {
        boxSizing: 'border-box',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        rowGap: 16,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

        height: 'fit-content',
        zIndex: 2,
        position :'relative',
    },
    separator: {
        boxSizing: 'border-box',
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        rowGap: 16,
        width: '100%',
        height: 'fit-content',
        //borderColor: '#FFFFFF',
        //borderWidth: 1,
        //borderStyle: 'solid',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex : 2,
        //alignSelf: 'stretch'

    },
    dividerSemi: {
        boxSizing: 'border-box',
        display: 'flex',
        width: '40%',
        height: 1,
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderStyle: 'solid',
        position: 'relative'
    },
    normalText: {
        boxSizing: 'border-box',
        color: 'white',
        fontSize: 16,
        fontFamily: 'TitilliumWeb-Bold',

    },

    icon: {
        width: 24,
        height: 24,
    },

    blankSpace64 : {
        height : 64,
        width : '100%',
    },
    blankSpace48 : {
        height : 48,
        width : '100%',
    },
    blankSpace24 : {
        height : 24,
        width : '100%',
    },
    blankSpace16 : {
        height : 16,
        width : '100%',
    },
    blankSpace32 : {
        height : 16,
        width : '100%',
    },
    imageBKG: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1
    },

    overlay :{
        backgroundColor : "#020931",
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left : 0,
        zIndex: 2,
        opacity : 0.9

    },
    alignCenter : {
        alignItems : 'center'
    },
    formHeader :{
        fontSize: 16,
        fontFamily: 'TitilliumWeb-Bold',
        fontSize :  24,
        width: '100%',
        height : 'fit-content',
        color : '#020931',
        textAlign  : "center"
    },
    ScrollViewContent : {
        backgroundColor : '#ffffff',

        borderColor: '#FF6AAA',
        borderWidth: 1,
        borderStyle: 'solid',
        width :  '100%',
        height : 'auto',
        flex : 1
    },

    formContainer : {
        width: '100%',
        height: '80%',
        top: 0,
        left: 0,
        borderRadius: 16,
        padding: 24,
        backgroundColor: '#fff',

        
    },

    ScrollViewContainer: {
        paddingVertical: 0,
        height: 650,
        top: 0,
        paddingVertical : 0,
        //borderColor: 'red',
        //borderWidth: 1,
        //borderStyle: 'solid',
    },
    ScrollViewContent: {
        display: 'flex',
        height: 'fit-content',
        bottom: 100,
    },
    inputLine :{ //Input line
        display : 'row',
        flexDirection : 'column',

        width : 100,
        height : 64,
        
        borderColor: 'red',
        borderWidth: 1,
        borderStyle: 'solid',  
    },
    inputText :{
        backgroundColor : 'red',
        width :  '100%',
        height : '64',

        borderColor: 'red',
        borderWidth: 1,
        borderStyle: 'solid',
    },
    name: {
        display: 'flex',
        top: 115,
        left: 10,
        color: '#1E2448',
        fontSize: 16
    },
    input : {
        borderColor: '#000',
        borderWidth: 3,
        borderStyle: 'solid',
    }

    
});

export  {ButtonText, globalStyles};