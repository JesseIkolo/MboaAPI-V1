import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function DebugTest() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Page de Debug - Navigation Test</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Retour</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: '#27AE60' }]}
        onPress={() => router.push('/home/accueil')}
      >
        <Text style={styles.buttonText}>Aller à Accueil</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: '#F52424' }]}
        onPress={() => router.push('/home/profil2')}
      >
        <Text style={styles.buttonText}>Aller à Profil2</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#041578',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
