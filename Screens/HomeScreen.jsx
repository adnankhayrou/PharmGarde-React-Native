import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const LeftContent = (props) => <Avatar.Image size={70} style={{marginTop: 20}} source={require('../assets/images/appLogo.png')} />;



const HomeScreen = () => {
  // const addToFavotites = async () => {
  //   try {
  //     const oldData = (await AsyncStorage.getItem('favorites')) || '[]';
  //     const newData = JSON.parse(oldData);
  //     newData.push(data);
  //     await AsyncStorage.setItem('favorites', JSON.stringify(newData));
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
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
      // console.log('pharm data ', pharmData);
      // const test = AsyncStorage.getItem('favorites');
      // console.log('test', test);
      
    })
    .catch(error => {
      console.error('Error occurred:', error.message);
      Alert.alert('Error', 'Failed to log in. Please try again later.');
    });
  },[])

  return (
    <View>
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
        <Text style={{ marginLeft: 113, marginBottom:10 }}>{item.telephone} </Text>

        {/* <Card.Actions>
          <Avatar.Icon size={24} icon="heart" style={{ backgroundColor: 'green' }} />
          {(
            <Button icon="plus" mode="outlined " textColor="green" onPress={() => addToFavotites()}>
              Add to favorite
            </Button>
          )}
        </Card.Actions> */}
      </Card>
      </TouchableOpacity>
      ))}
      </ScrollView>
    </View>
  )
}

export default HomeScreen
