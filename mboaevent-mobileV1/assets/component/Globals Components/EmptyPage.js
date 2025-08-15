import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import IconReseauIm1SvgComponent from "../SVG/imgReseau1";
import IconsearchSvgComponent from "../SVG/iconSearch";

import SearchBar from "./SearchBar";


/**
 * Composant générique d'état vide
 * @param {Object} props
 * @param {string} [props.title] Titre principal
 * @param {string[]} [props.lines] Lignes descriptives
 * @param {string} [props.actionText] Texte du bouton d'action
 * @param {() => void} [props.onAction] Callback du bouton d'action
 * @param {React.ReactNode} [props.icon] Icône/illustration optionnelle
 * @param {Object} [props.containerStyle]
 */
const EmptyPage = ({
    title = 'Rien à afficher',
    lines = ['Aucun élément disponible pour le moment.'],
    actionText,
    onAction,
    icon,
    containerStyle,
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
                <View style={styles.img} >
                    <IconReseauIm1SvgComponent />
                </View>
                <View>
                    <View><Text style={[styles.textnouveau, { fontFamily: 'regularBold', textAlign: 'center' }]}>Nouveau dans votre réseau?</Text></View>

                    <View>
                        <Text style={[styles.textexplicatif, { fontFamily: 'regular', textAlign: 'center' }]}>Il y a encore aucun évènement dans votre réseau</Text>

                    </View>
                </View>
                <SearchBar
                    titleText="Recherchez et ajoutez un ami ou un partenaire pour commencer à batir votre réseau"
                    placeholder="Rechercher dans l’application ..."
                    onSubmit={() => { }}
                    textAlign="center"
                />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 24,
        paddingHorizontal: 16,
        gap: 12,
       
    },
    icon: {
        marginBottom: 8,
    },
    title: {
        color: '#041578',
        fontSize: 18,
        textAlign: 'center',
    },
    linesWrapper: {
        gap: 4,
    },
    line: {
        color: '#3C4260',
        fontSize: 14,
        textAlign: 'center',
    },
    button: {
        marginTop: 8,
        backgroundColor: '#041578',
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 14,
    },
});

export default EmptyPage;


