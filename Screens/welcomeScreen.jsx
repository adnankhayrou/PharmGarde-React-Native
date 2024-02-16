import React from "react";
import { Dimensions, ImageBackground,SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height } = Dimensions.get("window");

const WelcomeScreen = ({ navigation }) => {
  async function navigateTo() {
    const data = await AsyncStorage.getItem('isLoggedIn'); 
    // console.log('in app.jsx',data);
    // if(data){
    //   navigation.navigate('Home');
    // }else{
      navigation.navigate('Login');
    // }
  }
  return (
    <SafeAreaView style={{
      backgroundColor: 'white',
      height:"100%"
    }}>
      <View style={{
            paddingHorizontal: Spacing * 4,
            paddingTop: Spacing * 10,
          }}>
        <ImageBackground
          style={{
            height: height / 3,
          }}
          resizeMode="contain"
          source={require("../assets/images/appLogo.png")}
        />
        <View
          style={{
            paddingHorizontal: Spacing * 4,
            paddingTop: Spacing * 4,
          }}
        >
          <Text
            style={{
              fontSize: FontSize.xxLarge,
              color: Colors.primary,
              textAlign: "center",
            }}
          >
            Welcome to PharmGrade
          </Text>

          <Text
            style={{
              fontSize: FontSize.small,
              color: Colors.text,
              textAlign: "center",
              marginTop: Spacing * 2,
            }}
          >
            PharmGrade is dedicated to providing pharmacists who are available 24/7.
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: Spacing * 2,
            paddingTop: Spacing * 6,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={() => navigateTo()}
            style={{
              backgroundColor: Colors.green,
              paddingVertical: Spacing * 1.5,
              paddingHorizontal: Spacing * 2,
              width: "100%",
              borderRadius: Spacing,
              shadowColor: Colors.primary,
              shadowOffset: {
                width: 0,
                height: Spacing,
              },
              shadowOpacity: 0.3,
              shadowRadius: Spacing,
            }}
          >
            <Text
              style={{
                color: Colors.onPrimary,
                fontSize: FontSize.large,
                textAlign: "center",
              }}
            >
              Join Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;