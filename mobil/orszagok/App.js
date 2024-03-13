/*
* File: App.js
* Author: Szekeres András
* Copyright: 2024, Szekeres András
* Group: Szoft 2/2/N
* Date: 2024.03.13
* Github: https://github.com/8UVUVUV8/Dolgozat_2024_02_28_tomtestin
* Licenc: GNU GPL
*/

import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, ActivityIndicator, SafeAreaView, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';

const URL = "http://localhost:3000/"
const OrszagokEndpoint = "orszagok"

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [orszagok, setOrszagok] = useState([]);

  useEffect(() => {
    let orszag ;
    let orszagokArray = [];
    fetch(URL+OrszagokEndpoint)
    .then((response) => response.json())
    .then(data => {
        data.forEach(o => {
            console.log(o)
            orszag = new Orszag(o.id, o.nev, o.terulet, o.nepesseg, o.fovaros)
            orszagokArray.push(orszag)
        });
        setOrszagok(orszagokArray)
    })
    .catch((error) => alert(error))
    .finally(()=>{setLoading(false)});
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Országok</Text>
      <View>
        {isLoading ? (
          <View>
            <ActivityIndicator size="small" color="#0000ff" />
            <Text>Országok betöltése....</Text>
          </View>
        ) : (
          <View style={styles.container}>

            <SafeAreaView style={styles.SafeAreaView}>
              <ScrollView style={styles.scrollView}>   
                <FlatList
                  data={orszagok}
                  renderItem={({item}) => (
                  <View style={styles.listItem}>
                    <Text>Orszag: {item.nev}</Text>
                    <Text>Terulet: {item.terulet}</Text>
                    <Text>Nepessege: {item.nepesseg}</Text>
                    <Text>Fövárosa: {item.fovaros}</Text>
                  </View>)}
                />
              </ScrollView>
            </SafeAreaView>
          </View>
        )}
        </View>
        <Text style={styles.footer}>Made by: Szekeres András 2024.02.28</Text>
    </View>
  );
  
}

class Orszag {
  constructor(id, nev, terulet, nepesseg, fovaros) {
    this.id = id
    this.nev = nev
    this.terulet = terulet
    this.nepesseg = nepesseg
    this.fovaros = fovaros
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1:{
    fontSize: 50,
    margin: 10
  },
  scrollView: {
    backgroundColor: 'lightgray',
    margin: 2
  },
  SafeAreaView:{
    height: 200,
    width: 300,
    borderColor: "black",
    borderWidth: 2
  },
  listItem: {
    paddingBottom: 2,
    borderBottomColor: "black",
    borderBottomWidth: 1
  },
  footer: {
    position: 'absolute',
    bottom: 0
  }
});
