import { Button, Text, View, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import React, { useState } from 'react';

import Musique from '../../../assets/img/Vector (2)'
import Basket from '../../../assets/img/2476154'
import Nouriture from '../../../assets/img/685352'
import FlecheBas from '../../../assets/img/FlecheBas'
import Free from '../../../assets/img/free'
import Paye from '../../../assets/img/paye'
import Calendar_edit from '../../../assets/img/calendar-edit'
import Group18294 from '../../../assets/img/Group 18294'
import Art from '../../../assets/img/art'
import All from '../../../assets/img/all'
import message_2 from '../../../assets/img/message-2'
import Arrow from '../../../assets/img/arrow'

import Bouton from '../../components/bouton'
import CustomTextInput from '../../components/input'
import Bouton1 from '../../components/bouton1'
import ImageFlou from '../../components/imageFlou3'

function Statistique({ navigation },) {


    const [text, setText] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    const listes = [
        'Par nom, de A à Z',
        'Par nom, de Z à A',
        'Plus récent au plus ancien',
        'Plus ancien au plus récent',
        'Par Ratio de participation',
        'Par nombre de vues',
        'Par nombre de likes'
    ]

    const handleTextChange = (newText) => {
        setText(newText);
        setShowSuggestions(newText.length > 0); // Afficher les suggestions si le texte n'est pas vide
    };

    const renderItem = ({ item }) => (
        <View style={styles.suggestionItem}>
            <Text>{item.title}</Text>
            <Text style={styles.suggestionContent}>{item.content}</Text>
        </View>
    );

    const toggleFilters = () => {
        setShowFilters(!showFilters); // Toggle filter visibility on click
    };

    return (
        <View style={{ height: '100%', backgroundColor: '#fff' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <ImageFlou />
                </View>
                <View style={styles.page}>
                    <View style={styles.overlay}>
                        <View style={{ display: 'flex', alignItems: 'center' }}>
                            <View style={{ width: 150, height: 5, backgroundColor: '#D9D9D9', marginTop: 20 }}></View>
                        </View>
                    </View>
                    <View>
                        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Text style={[styles.texteSimple, { fontSize: 18, color: '#000' }]}>Vous avez marqué l’evènement</Text>
                            <Text style={[styles.texteBold, { fontSize: 18 }]}>Ko-C, nouvelle tournée</Text>
                        </View>
                        <Text style={[styles.texteSimple, { fontSize: 16, color: '#000', marginVertical: 20 }]}>Voulez-vous être notifié avant le début de l’évènement?</Text>

                        <View style={{ backgroundColor: '#fff', width: '100%' }}>
                            <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                                <TouchableOpacity onPress={() => navigation.navigate('Event_Search_Events_05')} style={{ width: '50%' }}>
                                    <Bouton texte={'Non'} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('Create3')} style={{ width: '50%' }}>
                                    <Bouton block={styles.botton_back} text={styles.botton_text} texte={'Oui'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 15
                        }}>
                            <View style={{
                                backgroundColor: '#F5F5F6',
                                paddingHorizontal: 10,
                                paddingVertical: 20,
                                borderColor: '#041578',
                                borderWidth: 3,
                                borderRadius: 15,
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <Text style={[styles.texteBold, { fontSize: 18 }]}>03 jours avant</Text>
                                <View style={{
                                    backgroundColor: '#041578',
                                    padding: 10,
                                    borderRadius: 20
                                }}>
                                    <Arrow />
                                </View>
                            </View>

                            <View style={{
                                backgroundColor: '#F5F5F6',
                                paddingHorizontal: 10,
                                paddingVertical: 20,
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <Text style={[styles.texteBold, { fontSize: 18 }]}>Le jour-J</Text>
                            </View>
                            <View style={{
                                backgroundColor: '#F5F5F6',
                                paddingHorizontal: 10,
                                paddingVertical: 20,
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <Text style={[styles.texteBold, { fontSize: 18 }]}>3 heures avant</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={{ position: 'absolute', bottom: 0, backgroundColor: '#fff', width: '100%', alignItems: 'center' }}>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 30 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Event_Search_Events_05')} style={{ width: '95%' }}>
                        <Bouton texte={'Marquer l’évènement'} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    page: {
        display: 'flex',
        flexDirection: 'column',
        paddingHorizontal: 16,
        paddingVertical: 26,
        gap: 26,
        backgroundColor: '#fff',
        height: '100%',
        // alignItems: 'center',
    },
    texteSimple: {
        fontWeight: '400',
        fontSize: 24,
        color: '#041578'
    },
    texteBold: {
        fontWeight: '700',
        fontSize: 24,
        color: '#041578'
    },
    categorie: {
        paddingTop: 26,
        paddingBottom: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 16
    },
    titre: {
        fontFamily: 'TitilliumWeb-Regular',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
    },
    categorie_menu_actif: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#041578',
        borderRadius: 20,
        gap: 8,
        alignItems: 'center',
        marginRight: 12
    },
    categorie_menu_titre_actif: {
        color: '#fff'
    },
    categorie_menu: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#E6E8F2',
        borderRadius: 20,
        gap: 8,
        alignItems: 'center',
        marginRight: 12
    },
    categorie_menu_titre: {
        color: '#041578'
    },
    input: {
        height: 50,
        width: '100%',
        borderRadius: 8, // Correction: borderRadius était défini deux fois
        padding: 16,
        fontSize: 16,
        backgroundColor: '#F5F5F6',
    },
    filtersList: {
        elevation: 4,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        width: '100%',
        left: 0,
        top: 0,
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    filterText: {
        color: '#767A90',
        fontSize: 14
    },
    btn_actif: {
        backgroundColor: '#041578',
        borderRadius: 30,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        width: '50%',
        paddingHorizontal: 25,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn_not_actif: {
        backgroundColor: '#E6E8F2',
        borderRadius: 30,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        width: '50%',
        paddingHorizontal: 25,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
    },
    horaires: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F5F5F6',
        width: '49%',
        height: 50,
        padding: 8,
        borderRadius: 8
    },
    horaires_date: {
        width: 220,
    },
    horaires_texte: {
        fontFamily: 'TitilliumWeb-Regular',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 21.29,
        textAlign: 'left',
        color: '#767A90'
    },
    botton_back: {
        backgroundColor: '#E6E8F2',
        width: 180
    },
    botton_text: {
        color: '#041578'
    },
    overlay: {
        position: 'absolute',
        top: -30,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#fff',
        height: 40,
        zIndex: -1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
});
module.exports = Statistique