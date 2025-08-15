
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { getScreenWidth, calculateCardWidth, calculateCardWidthByPercentage } from '../../../hooks/useScreenDimensions';


import IconsearchSvgComponent from "../SVG/iconSearch";
import ElipseSvgComponent from "../SVG/elipse";
import ArrowRightSvgComponent from "../SVG/arrowright";
import MoreSvgComponent from "../SVG/more";
import BookmarlSvgComponent from "../SVG/bookmarl";
import MessageSvgComponent from "../SVG/message";
import SendSvgComponent from "../SVG/send";
import HeartSvgComponent from "../SVG/Heart";
import JusteSvgComponent from "../SVG/juste";
import VideoSvgComponent from "../SVG/Video";
import Main2SvgComponent from "../SVG/777m";
import BynuitSvgComponent from "../SVG/Bynuit";
import CoeurbriseSvgComponent from "../SVG/coeurbrisé";
import SacSvgComponent from "../SVG/sac";
import ArrowsSvgComponent from "../SVG/arrows";
import ParticipantsAvatars from './ParticipantsAvatars';

/**
 * @typedef {Object} Participant
 * @property {any} avatar - L'image de profil du participant
 */

/**
 * @param {Object} props
 * @param {string} props.styleType
 * @param {string} [props.eventId]
 * @param {any} [props.eventImage]
 * @param {string} [props.eventDate]
 * @param {string} [props.eventLocation]
 * @param {string} [props.eventTitle]
 * @param {string} [props.eventAuthor]
 * @param {string} [props.eventTime]
 * @param {string} [props.eventPlaces]
 * @param {string} [props.eventPrice]
 * @param {string} [props.eventParticipants]
 * @param {string} [props.eventLikes]
 * @param {string} [props.eventComments]
 * @param {string} [props.eventShares]
 * @param {Participant[]} [props.participants]
 * @param {any} [props.eventOrganizerAvatar]
 * @param {any} props.navigation
 * @param {string} [props.adsTitle]
 * @param {string} [props.adsSubtitle]
 * @param {string} [props.adsButtonText]
 * @param {Function} [props.onAdsPress]
 * @param {any} [props.adsIllustration]
 */



const Event = ({ 
    styleType, 
    eventId, 
    eventImage, 
    eventDate, 
    eventLocation, 
    eventTitle, 
    eventAuthor = 'Eric Fotso', 
    eventTime = 'Il y a 3min', 
    eventPlaces = '250 places', 
    eventPrice = '25,000 XAF', 
    eventParticipants = '+20 personnes participent', 
    eventLikes = '+23 J\'aime', 
    eventComments = '+58 Commentaires', 
    eventShares = '+54M Partages', 
    participants = [], 
    eventOrganizerAvatar,
    navigation,
    adsTitle = 'Invitez un ami',
    adsSubtitle = 'Et gagnez un ticket de 600 XAF gratuitement',
    adsButtonText = 'Inviter',
    onAdsPress,
    adsIllustration
}) => {
    if (styleType === 'Highlight') {
        return (
            <ImageBackground 
                source={eventImage} 
                style={[styles.contelement1, !eventImage && { backgroundColor: '#041578' }]} 
                imageStyle={{ borderRadius: 16 }}
            >
                <Text style={[{ fontFamily: 'regularBold' }, styles.textExplication]}>{eventTitle}</Text>
                <View style={styles.date}>
                    <Text style={[styles.textdate, { fontFamily: 'regular' }]}>{eventDate}</Text>
                    <ElipseSvgComponent style={{ marginTop: 4 }} />
                    <Text style={[styles.textdate, { fontFamily: 'regular' }]}>{eventLocation}</Text>
                </View>
            </ImageBackground>
        );
    }

    if (styleType === 'Card') {
        return (
            <View style={styles.contelement2} onPress={() => navigation.navigate('Event1')}>
                {/** Ici on va mettre le nom de l'organisateur et le temps */}
                <View style={styles.line1}>
                    <View style={styles.nom}>
                        <View style={styles.imageview}>
                            <Image source={eventOrganizerAvatar || require('./GCRessources/userAvatar.png')} style={styles.image} />
                        </View>

                        <View >
                            <Text style={[styles.textnom, { fontFamily: 'regular' }]}>Par <Text style={{ fontFamily: 'regularBold', color: '#041578' }}>{eventAuthor || 'Chargement...'}</Text></Text>
                            <Text style={[{ fontFamily: 'regular' }, styles.textmin]}>{eventTime || 'Il y a 3min'}</Text>
                        </View>
                    </View>
                    <View>
                        <MoreSvgComponent />
                    </View>
                </View>
                {/** fin du nom de l'organisateur et le temps */}

                {/** Ici on va mettre la date et le bookmark */}
                <View style={styles.line2}>
                    <ImageBackground source={eventImage}
                        style={styles.background}>
                        <View style={styles.contline2}>
                            <View style={styles.dates}>
                                <Text style={[{ fontFamily: 'regularBold' }, styles.eventdates]}>{eventDate}</Text>
                            </View>
                            <View><BookmarlSvgComponent /></View>
                        </View>
                    </ImageBackground>
                </View>
                {/** fin de la date et le bookmark */}
                
                <View style={styles.line3}>
                    <Text style={[styles.textconcert, { fontFamily: 'regularBold' }]}>{eventTitle || 'Chargement...'} </Text>
                    <View style={styles.date}>
                        <Text style={[styles.textplace, { fontFamily: 'regularBold' }]}>{eventPlaces || '250 places'}</Text>
                        <ElipseSvgComponent style={{ marginTop: 8 }} />
                        <Text style={[styles.textPapo, { fontFamily: 'regular' }]}>{eventLocation}</Text>
                    </View>
                </View>


                <View style={styles.line4}>
                    <View style={styles.viewprix}>
                        <Text style={[styles.texprix, { fontFamily: 'regularBold' }]}>{eventPrice || '25,000 XAF'}</Text>
                    </View>
                    <ParticipantsAvatars participants={participants} />
                </View>
                <View style={styles.line5}>
                    <View style={styles.viewcomment}>
                        <HeartSvgComponent />
                        <Text style={[styles.texjaime, { fontFamily: 'regular' }]}>{eventLikes || '+23 J\'aime'}</Text>
                    </View>
                    <View style={styles.viewcomment}>
                        <MessageSvgComponent />
                        <Text style={[styles.texjaime, { fontFamily: 'regular' }]}>{eventComments || '+58 Commentaires'}</Text>
                    </View>
                    <View style={styles.viewcomment}>
                        <SendSvgComponent />
                        <Text style={[styles.texjaime, { fontFamily: 'regular' }]}>{eventShares || '+54M Partages'}</Text>
                    </View>
                </View>
                
                <View style={styles.lineActionButton}>
                    <View>
                        <TouchableOpacity style={styles.btnvert}>
                            <Text style={[{ fontFamily: 'regular' }, styles.texparticipe]}>Je participe</Text>
                            <JusteSvgComponent style={{ marginTop: 6 }} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.btnrouge}>
                            <VideoSvgComponent style={{ marginTop: 1 }} />
                            <Text style={[styles.texparticipe, { fontFamily: 'regular' }]}>LIVE</Text>

                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    if (styleType === 'CatalogCard') {
        return (
            <View style={styles.contelement2}>
                <View style={styles.line1}>
                    <View style={styles.nom}>
                        <View style={styles.imageview}>
                            <Image source={eventOrganizerAvatar || require('./GCRessources/userAvatar.png')} style={styles.image} />
                        </View>
                        <View>
                            <Text style={{ fontFamily: 'regularBold', color: '#041578' }}>{eventAuthor || 'Organisateur'}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.line2}>
                    <ImageBackground source={eventImage} style={styles.background} />
                </View>

                <View style={styles.line3}>
                    <Text style={[styles.textconcert, { fontFamily: 'regularBold' }]}>{eventTitle || 'Titre du catalogue'}</Text>
                </View>

                <View style={styles.line5}>
                    <View style={styles.viewcomment}>
                        <HeartSvgComponent />
                        <Text style={[styles.texjaime, { fontFamily: 'regular' }]}>{eventLikes || '+0 J’aime'}</Text>
                    </View>
                    <View style={styles.viewcomment}>
                        <MessageSvgComponent />
                        <Text style={[styles.texjaime, { fontFamily: 'regular' }]}>{eventComments || '+0 Commentaires'}</Text>
                    </View>
                    <View style={styles.viewcomment}>
                        <SendSvgComponent />
                        <Text style={[styles.texjaime, { fontFamily: 'regular' }]}>{eventShares || '+0 Partages'}</Text>
                    </View>
                </View>

                <View style={styles.line5}>
                    <View>
                        <TouchableOpacity style={styles.btnparticiper}>
                            <Text style={[{ fontFamily: 'regularBold' }, styles.texparticipe]}>Details</Text>
                            <ArrowsSvgComponent style={{ marginTop: 4 }} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.btnrouge}>
                            <VideoSvgComponent style={{ marginTop: 1 }} />
                            <Text style={[styles.texparticipe, { fontFamily: 'regular' }]}>LIVE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    if (styleType === 'AdsCard') {
        return (
            <View style={styles.adsCardContainer}>
                <View style={styles.text}>
                    <Text style={[styles.inviterami, { fontFamily: 'regularBold' }]}>{adsTitle}</Text>
                    <Text style={[styles.gagnez, { fontFamily: 'regular' }]}>{adsSubtitle}</Text>
                    <TouchableOpacity style={styles.btninviter} onPress={onAdsPress}>
                        <Text style={[{ fontFamily: 'regularBold' }, styles.textinvibtn]}>{adsButtonText}</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {adsIllustration ? adsIllustration : <Main2SvgComponent />}
                </View>
            </View>
        );
    }

    // You can add more style types here later
    return null;
};

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
    scrollcontain: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingBottom: 20,
        paddingHorizontal: 8,
        paddingVertical: 14,
        gap: 20
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
        width: calculateCardWidthByPercentage(98, 16), // 95% de la largeur d'écran avec 16px de gap
        height: 140,
        borderRadius: 16,
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
        width: 109,
        height: 37,
        borderWidth: 2,
        borderColor: '#041578',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 4
    },
    textvoir: {
        color: '#041578',
        fontSize: 14
    },
    contelement2: {
        width: calculateCardWidthByPercentage(98, 16), // 95% de la largeur d'écran avec 16px de gap
        height: 'auto',
        borderWidth: 1,
        borderColor: '#F5F5F7',
        borderRadius: 16,
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
        width: '100%',
        height: 154
    },
    background: {
        width: '100%',
        flex: 1,
    },
    contline2: {
        paddingHorizontal: 8,
        paddingVertical: 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dates: {
        width: 'auto',
        height: 'auto',
        paddingHorizontal: 8,
        paddingVertical: 0,
        borderRadius: 8,
        backgroundColor: '#E6E8F2',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textdates: {
        color: '#041578',
        fontSize: 24
    },
    eventdates: {
        color: '#041578',
        fontSize: 12
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
        paddingHorizontal: 8,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderColor: '#F5F5F7'
    },

    lineActionButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingTop: 12,
        paddingBottom: 12,

        borderColor: '#F5F5F7'
    }
    ,
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
        gap: 8,
        //justifyContent:'space-between',
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: '#27AE60',
        width: 'auto',
        height: 'auto',
        borderRadius: 12
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
        paddingHorizontal: 8,
        paddingVertical: 2,
        backgroundColor: '#F52424',
        width: 'auto',
        height: 34,
        alignItems: 'center',
        borderRadius: 12,
        marginTop: 2
    },
    adsCardContainer: {
        width: '100%',
        height: 150,
        backgroundColor: '#FFDE00',
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 12
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

    }

});

export default Event;
