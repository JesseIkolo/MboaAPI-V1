import React, { useState } from "react";
import { StyleSheet, View, Image, TextInput, Text, TouchableOpacity, ScrollView } from 'react-native';
import IconsearchSvgComponent from "../../assets/component/SVG/iconSearch";
import { useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BynuitSvgComponent from "../../assets/component/SVG/Bynuit";
import CoeurbriseSvgComponent from "../../assets/component/SVG/coeurbrisé";
import SacSvgComponent from "../../assets/component/SVG/sac";
import CatalogueByNight from "./cataloguebynight";


import BynuitActifSvgComponent from "../../assets/component/SVG/sacActif";
import CoeurActifSvgComponent from "../../assets/component/SVG/coeurractif";
import TabViewExample from "./tabbar";
import SearchBar from "../../assets/component/Globals Components/SearchBar";

import { mockEvents, getEventsByCategory } from '../../assets/component/Globals Components/mockEventData';
import EventSectionBlockCatalog from '../../assets/component/Globals Components/EventSectionBlockCatalog';


const Tab = createMaterialTopTabNavigator();

const Catalogue = () => {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState<'all' | 'byNight' | 'sante' | 'professionnel'>('all');
    return (
        <View style={styles.container}>
                    {/** Searchbar Block */}
                    <View style={styles.searchbarBlock}>
                        <SearchBar
                            titleText="Rechercher un évènement, ou scroller pour parcourir"
                            placeholder="Rechercher dans l’application ..."
                            onSubmit={() => { }}
                        />
                    </View>
                    {/* Fin Barre de recherche */}

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
                    {/* Section contrôlée par la tabbar - liste verticale des catalogues business */}
                    <EventSectionBlockCatalog
                        title={activeTab === 'all' ? 'Tous les catalogues' : activeTab === 'byNight' ? 'By Night' : activeTab === 'sante' ? 'Santé' : 'Professionnel'}
                        events={
                            activeTab === 'all'
                                ? [
                                    ...mockEvents.businessByNight,
                                    ...mockEvents.businessSante,
                                    ...mockEvents.businessProfessionnel,
                                  ]
                                : activeTab === 'byNight'
                                    ? mockEvents.businessByNight
                                    : activeTab === 'sante'
                                        ? mockEvents.businessSante
                                        : mockEvents.businessProfessionnel
                        }
                        navigation={navigation}
                        showViewAll={true}
                        viewAllText="Voir tout"
                        onEndReached={() => { /* TODO: fetch next page */ }}
                        onEndReachedThreshold={0.5}
                    />
                    
                    {/** Fin Tabbar pour filtrer les evenements */}
                    {/** End Tabbar hearder */}

                    {/** End Tabbar content */}

                    
                </View>

    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFFF',
        gap: 10,
        paddingVertical: 32,
        // marginTop: 1

    },

    text1: {
        color: '#020931',
        fontSize: 15
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
    },
    cont1: {
        paddingHorizontal: 8,
        paddingVertical: 10,
    },
    scrolhorizontal: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10
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
        color: '#041578',
        fontSize: 16
    },
    touchbynuit: {
        width: 118,
        height: 40,
        borderRadius: 20.96,
        backgroundColor: '#041578',
        paddingHorizontal: 12,
        paddingVertical: 6,
        display: 'flex',
        flexDirection: 'row',
        gap: 8
    },
    textbynuit: {
        color: '#EAE9EF',
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
    activeTabStyle: {
        width: 118,
        height: 40,
        borderRadius: 20.96,
        backgroundColor: '#041578',
        paddingHorizontal: 12,
        paddingVertical: 6,
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
    inactiveTabStyle: {
        width: 118,
        height: 40,
        borderRadius: 20.96,
        backgroundColor: '#E6E8F2',
        paddingHorizontal: 12,
        paddingVertical: 6,
        display: 'flex',
        flexDirection: 'row',
        gap: 6
    },
    searchbarBlock: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingHorizontal: 0,
        paddingVertical: 0,
        gap: 16
    },
    tabbarContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 0,
        gap: 16,
        overflow: 'visible',
    },
    textmis: {
        color: '#041578',
        fontSize: 20
    },
})

export default Catalogue