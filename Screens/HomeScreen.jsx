import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Linking, Alert, StyleSheet } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import NavigationBar from '../Navigation/NavigationBar'


const LeftContent = () => <Avatar.Image size={70} style={{marginTop: 50}} source={require('../assets/images/appLogo.png')} />;

const HomeScreen = ({ navigation }) => {
  const addToFavorites = async (item) => {
    try {
        let oldData = JSON.parse(await AsyncStorage.getItem('favorites'));
        if (!Array.isArray(oldData)) {
            oldData = [];
        }
        const isDuplicate = oldData.some(existingItem => existingItem && existingItem.nom === item.nom);
        if (!isDuplicate) {
            oldData.push(item);
            await AsyncStorage.setItem('favorites', JSON.stringify(oldData));
            console.log('Data added to favorites successfully.');
            Alert.alert('Success', 'Pharmacy added to favorites successfully.');
        } else {
            console.log('This item is already in favorites.');
            Alert.alert('Alert', 'Pharmacy is already in favorites.');
        }
    } catch (error) {
        console.error('Error adding to favorites:', error);
    }
};
  
  const [data, setData] = useState();
  const options = {
    method: 'GET',
    url: 'https://pharmacies-de-garde-nc.p.rapidapi.com/gardes',
    headers: {
      'X-RapidAPI-Key': '38bb0f6e0cmsh9909597bd7d7f88p1c43a5jsn1ed9e0b1586e',
      'X-RapidAPI-Host': 'pharmacies-de-garde-nc.p.rapidapi.com'
    }
  };

  const handlePress = (url) => {
    Linking.openURL(url);
  };

  useEffect(()=>{
    axios.request(options)
    .then(res => {
      const pharmData = res.data;
      const uniqueData = Array.from(new Set(pharmData.map(item => item.nom))).map(nom => {
        return pharmData.find(item => item.nom === nom);
      });
      setData(uniqueData)
    })
    .catch(error => {
      console.error('Error occurred:', error.message);
      Alert.alert('Error', 'Failed to log in. Please try again later.');
    });
  },[])

  return (
    <View style={styles.container}>
      <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 10,
        paddingVertical: 30,
      }}
    >
      {Array.isArray(data) && data.filter(item => item.gmaps).map((item) => (
      <TouchableOpacity onPress={() => handlePress(item.gmaps)}>
      <Card style={{ marginBottom: 10 }}>
        <Card.Title
          titleStyle={{ marginLeft: 40 }}
          title={item.type}
          subtitle={item.nom}
          subtitleStyle={{ marginLeft: 40 }}
          titleVariant="bodyLarge"
          left={LeftContent}
        />
        <Text style={{ marginLeft: 113 }}>{item.telephone} </Text>

        <Card.Actions>
          {/* <Avatar.Icon size={24} icon="heart" style={{ backgroundColor: 'green' }} /> */}
          {(
            <Button icon="plus" mode="outlined " textColor="green" onPress={() => addToFavorites(item)}>
              Add to favorite
            </Button>
          )}
        </Card.Actions>
      </Card>
      </TouchableOpacity>
      ))}
      </ScrollView>
      
      <NavigationBar navigation={navigation} />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 20,
    width: '48%',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomeScreen
