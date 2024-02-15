const {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} = require('react-native');
import {useNavigation} from '@react-navigation/native';
import styles from './style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useEffect, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spacing from "../../constants/Spacing";

function LoginPage({props}) {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit() {
    const userData = {
      email: email,
      password: password,
    };

    axios.post('http://10.0.2.2:3001/auth/login', userData)
  .then(res => {
    const userData = res.data;
    if (res.status == 201) {
      Alert.alert('Logged In Successfull');
      AsyncStorage.setItem('isLoggedIn', JSON.stringify(userData));
      navigation.navigate('Home');
    }
  })
  .catch(error => {
    console.error('Error occurred:', error.message);
    Alert.alert('Error', 'Failed to log in. Please try again later.');
  });

  }
  
  async function getData() {
    const data = await AsyncStorage.getItem('isLoggedIn'); 
    console.log('in app.jsx',data);
    if(data){
      navigation.navigate('Home');
    }
  }

  useEffect(()=>{
    getData();
  },[])

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps={'always'}
      style={{
        backgroundColor: 'white',
        height:"100%",
        paddingHorizontal: Spacing ,
        paddingTop: Spacing * 3,
      }}
      >
      <View style={{backgroundColor: 'white'}}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../../assets/images/loginLogo2.jpg')}
          />
        </View>
        <View style={styles.loginContainer}>
          <Text style={styles.text_header}>Welcome Back</Text>
          <View style={styles.action}>
            <FontAwesome
              name="user-o"
              color="#008083"
              style={styles.smallIcon}
            />
            <TextInput
              placeholder="Email"
              style={styles.textInput}
              onChange={e => setEmail(e.nativeEvent.text)}
            />
          </View>
          <View style={styles.action}>
            <FontAwesome name="lock" color="#008083" style={styles.smallIcon} />
            <TextInput
              placeholder="Password"
              style={styles.textInput}
              onChange={e => setPassword(e.nativeEvent.text)}
            />
          </View>
         
        </View>
        <View style={styles.button}>
          <TouchableOpacity style={styles.inBut} onPress={() => handleSubmit()}>
            <View>
              <Text style={styles.textSign}>Log in</Text>
            </View>
          </TouchableOpacity>

          <View style={{padding: 15}}>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={{fontSize: 14, fontWeight: 'bold', color: '#919191'}}>
                ----Don't have an account----
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
export default LoginPage;
