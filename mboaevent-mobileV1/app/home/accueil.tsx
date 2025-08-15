import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Image, TextInput, Text, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { useScreenDimensions, calculateCardWidth, calculateCardWidthByPercentage } from '../../hooks/useScreenDimensions';
import IconsearchSvgComponent from "../../assets/component/SVG/iconSearch";
import ElipseSvgComponent from "../../assets/component/SVG/elipse";
import ArrowRightSvgComponent from "../../assets/component/SVG/arrowright";
import MoreSvgComponent from "../../assets/component/SVG/more";
import BookmarlSvgComponent from "../../assets/component/SVG/bookmarl";
import MessageSvgComponent from "../../assets/component/SVG/message";
import SendSvgComponent from "../../assets/component/SVG/send";
import HeartSvgComponent from "../../assets/component/SVG/Heart";
import JusteSvgComponent from "../../assets/component/SVG/juste";
import VideoSvgComponent from "../../assets/component/SVG/Video";
import Main2SvgComponent from "../../assets/component/SVG/777m";
import BynuitSvgComponent from "../../assets/component/SVG/Bynuit";
import CoeurbriseSvgComponent from "../../assets/component/SVG/coeurbrisé";
import SacSvgComponent from "../../assets/component/SVG/sac";
import ArrowsSvgComponent from "../../assets/component/SVG/arrows";
import Event from '../../assets/component/Globals Components/EventCard';
import EventSectionBlock from '../../assets/component/Globals Components/EventSectionBlock';
import { mockEvents, getEventsByCategory } from '../../assets/component/Globals Components/mockEventData';



const Accueil = () => {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState<'all' | 'byNight' | 'sante' | 'professionnel'>('all');
    const screenDimensions = useScreenDimensions();

    return (
        <View style={styles.container}>
            <View style={styles.contscrol}>
                <ScrollView contentContainerStyle={styles.scrollcontain}>

                    {/** Searchbar Block */}
                    <View style={styles.searchbarBlock}>
                        <Text style={[{ fontFamily: 'regularBold' }, styles.text1]}>Rechercher un évènement, ou scroller pour parcourir</Text>
                    {/* Barre de recherche */}
                    <View style={styles.fin}>
                        <TextInput style={styles.textinpunt} placeholder="Rechercher dans l’application ..." />
                        <TouchableOpacity style={styles.btnrechercher}>
                            <IconsearchSvgComponent />
                        </TouchableOpacity>
                        </View>
                    </View>
                    {/* Fin Barre de recherche */}

                    {/* Evenement mis en avant */}
                    <EventSectionBlock
                        title="Mis en avant"
                        events={getEventsByCategory('featured')}
                        styleType="Highlight"
                        navigation={navigation}
                        showViewAll={false}
                        maxEvents={2}
                    />
                    {/* Fin Evenement mis en avant */}


                    {/* Evenement Nouveautés */}
                    <EventSectionBlock
                        title="Nouveautés"
                        events={getEventsByCategory('nouveautes')}
                        styleType="Card"
                        navigation={navigation}
                        showViewAll={true}
                        viewAllText="Voir tout"
                    />

                    {/* Carte pour les annonces */}
                    <View style={styles.adsCardContainer}>
                            <Event 
                            styleType="AdsCard"
                                navigation={navigation}
                            eventId=""
                            eventImage={undefined}
                            eventDate=""
                            eventLocation=""
                            eventTitle=""
                            adsTitle="Invitez un ami"
                            adsSubtitle="Et gagnez un ticket de 600 XAF gratuitement"
                            adsButtonText="Inviter"
                            onAdsPress={() => { }}
                        />
                    </View>

                    {/* Fin de carte pour les annonces */}

                    {/** Tabbar pour filtrer les evenements */}
                    {/** Tabbar hearder */}
                    <View style={styles.tabbarContainer}>
                        <Text style={[styles.textmis, { fontFamily: 'regularBold' }]}>Tous les évènements</Text>
                    <View>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrolhorizontal}>
                            <View>
                                    <TouchableOpacity
                                        style={[
                                            styles.touchtout,
                                            activeTab === 'all' ? null : { backgroundColor: '#E6E8F2' }
                                        ]}
                                        onPress={() => setActiveTab('all')}
                                    >
                                    <Text style={[{ fontFamily: 'regular' }, styles.texttout]}>Tout</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                    <TouchableOpacity
                                        style={[
                                            styles.touchbynuit,
                                            activeTab === 'byNight' ? { backgroundColor: '#041578' } : null
                                        ]}
                                        onPress={() => setActiveTab('byNight')}
                                    >
                                    <BynuitSvgComponent style={{ marginTop: 2 }} />
                                    <Text style={[{ fontFamily: 'regular' }, styles.textbynuit]}>By Night</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                    <TouchableOpacity
                                        style={[
                                            styles.touchsante,
                                            activeTab === 'sante' ? { backgroundColor: '#041578' } : null
                                        ]}
                                        onPress={() => setActiveTab('sante')}
                                    >
                                    <CoeurbriseSvgComponent style={{ marginTop: 2 }} />
                                    <Text style={[{ fontFamily: 'regular' }, styles.textbynuit]}>Santé</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                    <TouchableOpacity
                                        style={[
                                            styles.touchpro,
                                            activeTab === 'professionnel' ? { backgroundColor: '#041578' } : null
                                        ]}
                                        onPress={() => setActiveTab('professionnel')}
                                    >
                                    <SacSvgComponent style={{ marginTop: 2 }} />
                                    <Text style={[{ fontFamily: 'regular' }, styles.textbynuit]}>Proffessionel</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                        </View>
                    {/* Section contrôlée par la tabbar */}
                    <EventSectionBlock
                        title={activeTab === 'all' ? 'Tous les évènements' : activeTab === 'byNight' ? 'By Night' : activeTab === 'sante' ? 'Santé' : 'Professionnel'}
                        events={activeTab === 'all' ? mockEvents.nouveautes : getEventsByCategory(activeTab)}
                        styleType="Card"
                        navigation={navigation}
                        showViewAll={true}
                        viewAllText="Voir tout"
                    />
                    {/** Fin Tabbar pour filtrer les evenements */}
                    {/** End Tabbar hearder */}

                    {/** End Tabbar content */}
                    {/** EventBlock - Cette semaine */}
                    <EventSectionBlock
                        title="Cette semaine"
                        events={getEventsByCategory('cetteSemaine')}
                        styleType="Card"
                        navigation={navigation}
                        showViewAll={true}
                        viewAllText="Voir tout"
                    />

                    <EventSectionBlock
                        title="A venir"
                        events={getEventsByCategory('aVenir')}
                        styleType="Card"
                        navigation={navigation}
                        showViewAll={true}
                        viewAllText="Voir tout"
                    />


                    <EventSectionBlock
                        title="Proche de chez vous"
                        events={getEventsByCategory('procheDeChezVous')}
                        styleType="Card"
                        navigation={navigation}
                        showViewAll={true}
                        viewAllText="Voir tout"
                    />
                    {/** End Tabbar content */}
                </ScrollView>
            </View>
            {/* Bouton flottant*/}
            <View style={styles.mont}>
                <TouchableOpacity style={styles.montagne} onPress={() => (navigation as any).navigate('CreateEventDesign')}>
                    <Image source={require('../../assets/component/Image/add-event.png')} style={styles.imgprofil} />
                </TouchableOpacity>
            </View>
            {/* Fin Bouton flottant*/}

        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFFF',
        gap: 2,
        // marginTop: 1
    },
    contscrol: {
        flex: 1,
    },
    searchbarBlock: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 0,
        gap: 16
    },
    adsCardContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        gap: 16,
    },
    scrollcontain: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingBottom: 20,
        paddingHorizontal: 0,
        paddingVertical: 24,
        gap: 24,
    },

    text1: {
        color: '#020931',
        fontSize: 15
    },
    textinpunt: {
        backgroundColor: '#E6E8F2',
        height: 53,
        borderRadius: 8,
        paddingHorizontal: 16,
        alignSelf: 'stretch',
        flex: 1
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
        gap: 10,
        //borderColor : '#000',
        //borderStyle : 'solid',
        //borderWidth : 1
    },
    textmis: {
        color: '#041578',
        fontSize: 20
    },
    scrolhorizontal: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10
    },
    contelement1: {
        width: 266,
        height: 140,
        backgroundColor: '#041578',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    textExplication: {
        color: '#FFFFFF',
        fontSize: 20
    },
    date: {
        display: 'flex',
        flexDirection: 'row',
        gap: 4
    },
    textdate: {
        color: '#DEDFE4',
        fontSize: 9
    },
    troispoint: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6
    },
    grospoints: {
        width: 39,
        height: 8,
        backgroundColor: '#041578',
        borderRadius: 100
    },
    petitpoints: {
        width: 8,
        height: 8,
        backgroundColor: '#767A90',
        borderRadius: 100
    },
    ligne2: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    voir: {
        width: 'auto',
        height: 'auto',
        borderWidth: 1,
        borderColor: '#041578',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
        gap: 8
    },
    textvoir: {
        color: '#041578',
        fontSize: 14
    },
    contelement2: {
        width: calculateCardWidthByPercentage(90, 10), // 90% de la largeur d'écran avec 10px de gap
        height: 418,
        borderWidth: 2,
        borderColor: '#767A90',
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',

    },
    line1: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        paddingVertical: 8
    },
    image: {
        width: '100%',
        height: 44,
        //borderRadius:50
    },
    imageview: {
        width: 44
    },
    nom: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8
    },
    textnom: {
        fontSize: 14,

    },
    textmin: {
        fontSize: 11,
        color: '#767A90'
    },
    background: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optionnel : pour ajouter un effet de superposition
        padding: 20,
        borderRadius: 10,
    },
    line2: {
        width: 316,
        height: 154
    },
    contline2: {
        paddingHorizontal: 8,
        paddingVertical: 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dates: {
        width: 58,
        height: 59,
        borderRadius: 9,
        backgroundColor: '#E6E8F2',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textdates: {
        color: '#041578',
        fontSize: 24
    },
    line3: {
        paddingHorizontal: 8,
        paddingVertical: 8
    },
    textconcert: {
        color: '#041578',
        fontSize: 16
    },
    textplace: {
        color: '#3C4260',
        fontSize: 14
    },
    textPapo: {
        color: '#3C4260',
        fontSize: 14
    },
    line4: {
        paddingHorizontal: 8,
        paddingVertical: 8,
        display: 'flex',
        flexDirection: 'row',
        //justifyContent:'space-between'
        gap: 14
    },
    viewprix: {
        width: 68,
        height: 26,
        backgroundColor: '#FFDE00'
    },
    texprix: {
        fontSize: 12,
        color: '#020931',
        padding: 4
    },
    viewimage: {
        display: 'flex',
        flexDirection: 'row',
    },
    imagesrond: {
        display: 'flex',
        flexDirection: 'row'
    },
    imgerond1: {
        width: 24,
        height: 24,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#FFFFFF',

    },
    imgerond2: {
        width: 24,
        height: 24,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        position: 'relative',
        right: 10
        //zIndex:5
    },
    imgerond3: {
        width: 24,
        height: 24,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        position: 'relative',
        right: 18,
        // zIndex:5
    },
    texnombre: {
        fontSize: 11,
        color: '#3C4260',
        marginTop: 2,
        right: 10
    },
    line5: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    viewcomment: {
        display: 'flex',
        flexDirection: 'row',
        gap: 2
    },
    texjaime: {
        fontSize: 11,
        color: '#3C4260'
    },
    lineimg: {
        //width:288,
        paddingHorizontal: 14
    },
    btnvert: {
        display: 'flex',
        flexDirection: 'row',
        gap: 12,
        //justifyContent:'space-between',
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: '#27AE60',
        width: 124,
        height: 37,
        borderRadius: 8
    },
    texparticipe: {
        color: '#E2F8EB',
        fontSize: 14
    },
    btnrouge: {
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        //justifyContent:'space-between',
        paddingHorizontal: 2,
        paddingVertical: 2,
        backgroundColor: '#F52424',
        width: 63,
        height: 28,
        borderRadius: 8,
        marginTop: 2
    },
    viewjaune: {
        width: '95%',
        height: 150,
        backgroundColor: '#FFDE00',
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 2,
        paddingVertical: 10
    },
    inviterami: {
        fontSize: 16,
        color: '#041578'
    },
    gagnez: {
        fontSize: 14,
        color: '#1E2448',
        width: 145
    },
    text: {
        paddingHorizontal: 4,
        width: 135,
        gap: 12
    },
    btninviter: {
        width: 72,
        height: 37,
        backgroundColor: '#041578',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 6
    },
    textinvibtn: {
        color: '#EAE9EF',
        fontSize: 14
    },
    touchtout: {
        width: 62,
        height: 40,
        borderRadius: 20.96,
        backgroundColor: '#041578',
        paddingHorizontal: 12,
        paddingVertical: 6
    },
    texttout: {
        color: '#EAE9EF',
        fontSize: 16
    },
    touchbynuit: {
        width: 118,
        height: 40,
        borderRadius: 20.96,
        backgroundColor: '#E6E8F2',
        paddingHorizontal: 12,
        paddingVertical: 6,
        display: 'flex',
        flexDirection: 'row',
        gap: 8
    },
    textbynuit: {
        color: '#041578',
        fontSize: 16
    },
    touchsante: {
        width: 99,
        height: 40,
        borderRadius: 20.96,
        backgroundColor: '#E6E8F2',
        paddingHorizontal: 12,
        paddingVertical: 6,
        display: 'flex',
        flexDirection: 'row',
        gap: 8
    },
    touchpro: {
        width: 153,
        height: 40,
        borderRadius: 20.96,
        backgroundColor: '#E6E8F2',
        paddingHorizontal: 12,
        paddingVertical: 6,
        display: 'flex',
        flexDirection: 'row',
        gap: 8
    },
    btnparticiper: {
        display: 'flex',
        flexDirection: 'row',
        gap: 12,
        //justifyContent:'space-between',
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: '#041578',
        width: 161,
        height: 37,
        borderRadius: 8
    },
    montagne: {
        backgroundColor: '#041578',
        height: 72,
        width: 72,
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 16
    },
    imgprofil: {
        width: 41,
        height: 41
    },
    mont: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingRight: 20,
        backgroundColor: 'transparent',
        marginHorizontal: 19

    },
    tabbarContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 0,
        gap: 16,
        
        overflow: 'visible',
    }

})

export default Accueil