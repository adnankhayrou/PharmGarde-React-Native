import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";

const navigationBar = ({ navigation }) => {
    function navigateTo(e) {
        if(e == "Home"){
          navigation.navigate('Home');
        }else{
          navigation.navigate('Favorite');
        }
      }
  return (
    <View
          style={styles.content}
        >
          <TouchableOpacity
            onPress={() => navigateTo('Home')}
            style={{
              backgroundColor: Colors.green,
              paddingVertical: Spacing * 1.5,
              width: "50%",
            }}
          >
            <Text
              style={{
                color: Colors.onPrimary,
                fontSize: FontSize.large,
                textAlign: "center",
              }}
            >
              Pharmacies
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigateTo('Favorite')}
            style={{
              backgroundColor: Colors.green,
              paddingVertical: Spacing * 1.5,
              width: "50%",
              shadowColor: Colors.primary,
            }}
          >
            {/* <Avatar.Icon size={24} icon="heart" style={{ backgroundColor: 'green' }} /> */}
            <Text
              style={{
                color: Colors.onPrimary,
                fontSize: FontSize.large,
                textAlign: "center",
              }}
            >
              Favorites
            </Text>
          </TouchableOpacity>
        </View>
  )
}

const styles = StyleSheet.create({
    content: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
  });
  

export default navigationBar