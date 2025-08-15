import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Accueil from "./accueil";
import Reseau from "./reseau";
import Catalogue from "./catalogue";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LogoSvgComponent from "../../assets/component/SVG/logo";
import HommeSvgComponent from "../../assets/component/SVG/hommevert";
import TroisbarreSvgComponent from "../../assets/component/SVG/troisbarre";
import HorlogeSvgComponent from "../../assets/component/SVG/horloge";
import IconReseauSvgComponent from "../../assets/component/SVG/iconreseau";
import IconHomeSvgComponent from "../../assets/component/SVG/iconAccueil";
import IconCatalogueSvgComponent from "../../assets/component/SVG/iconCatologue";
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';

const Tab = createMaterialTopTabNavigator();

export default function HomeIndex() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    'regular': require('../../assets/component/font/TitilliumWeb-Regular.ttf'),
    'regularBold': require('../../assets/component/font/TitilliumWeb-Bold.ttf')
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Vue personnalisée avant le top tab navigator */}
      <View style={styles.logo}>
        <LogoSvgComponent />
        <View style={styles.logos}>
          <HorlogeSvgComponent />
          <TouchableOpacity onPress={() => router.push('./profil1')}>
            <TroisbarreSvgComponent />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('./profil2')}>
            <HommeSvgComponent />
          </TouchableOpacity>
          
          {/* Bouton de test pour navigation */}
          <TouchableOpacity 
            style={{
              backgroundColor: '#27AE60',
              padding: 8,
              borderRadius: 6,
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: 60
            }}
            onPress={() => router.push('./test-profil')}
          >
            <Text style={{ 
              color: '#fff', 
              fontSize: 12, 
              fontFamily: 'regularBold',
              textAlign: 'center'
            }}>
              TEST
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Top Tab Navigator */}
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#041578',
          tabBarInactiveTintColor: '#3C4260',
          tabBarLabelStyle: { fontSize: 12, textTransform: 'none', fontFamily: 'regularBold' },
          tabBarStyle: { width: '100%', marginBottom: 2, borderColor: 'transparent' },
          tabBarIndicatorStyle: {
            backgroundColor: '#FEF0F0',
            width: 112,
            height: 56,
            borderTopLeftRadius: 14,
            marginLeft: 8,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 3,
            borderBottomColor: '#F52424'
          },
          tabBarPressColor: 'transparent',
        }}
      >
        <Tab.Screen
          name="Accueil"
          component={Accueil}
          options={{
            tabBarLabel: ({ focused }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <IconHomeSvgComponent />
                <Text style={{ color: focused ? '#041578' : '#3C4260', fontFamily: focused ? 'regularBold' : 'regular', fontSize: 16 }}>Accueil</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Reseau"
          component={Reseau}
          options={{
            tabBarLabel: ({ focused }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <IconReseauSvgComponent />
                <Text style={{ color: focused ? '#041578' : '#3C4260', fontFamily: focused ? 'regularBold' : 'regular', fontSize: 16 }}>Mon Reseau</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Catalogue"
          component={Catalogue}
          options={{
            tabBarLabel: ({ focused }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <IconCatalogueSvgComponent />
                <Text style={{ color: focused ? '#041578' : '#3C4260', fontFamily: focused ? 'regularBold' : 'regular', fontSize: 16 }}>Catalogue</Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    gap: 18,
  },
  logo: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 40,
    paddingHorizontal: 14,
    justifyContent: 'space-between'
  },
  logos: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    gap: 10
  },
});
