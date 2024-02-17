import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { Avatar, Card, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationBar from '../Navigation/NavigationBar';

const LeftContent = () => <Avatar.Image size={70} style={{ marginTop: 40 }} source={require('../assets/images/appLogo.png')} />;

const FavoriteScreen = ({ navigation }) => {

    const removeFromFavorites = async (itemToRemove) => {
        try {
            let oldData = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
            const newData = oldData.filter(existingItem => existingItem.codeCog !== itemToRemove.codeCog);
            await AsyncStorage.setItem('favorites', JSON.stringify(newData));
            console.log('Item removed from favorites successfully.');
        } catch (error) {
            console.error('Error removing from favorites:', error);
        }
    };

    const [data, setData] = useState([]);

    const handlePress = (url) => {
        Linking.openURL(url);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const getingData = await AsyncStorage.getItem('favorites');
                if (getingData) {
                    const parsedData = JSON.parse(getingData);
                    setData(parsedData);
                } else {
                    console.log('No favorites data found.');
                }
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        fetchData();
    }, [data]);

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 10,
                    paddingVertical: 30,
                }}
            >
                {data.map((item) => (
                    <TouchableOpacity key={item.codeCog} onPress={() => handlePress(item.gmaps)}>
                        <Card style={{ marginBottom: 10 }}>
                            <TouchableOpacity onPress={() => removeFromFavorites(item)}>
                                <Card.Actions>
                                    <Avatar.Icon size={20} icon="close" style={{
                                        backgroundColor: 'green',
                                        marginEnd: 5,
                                        marginBottom: 0
                                    }} />
                                </Card.Actions>
                            </TouchableOpacity>

                            <Card.Title style={{ marginTop: 0 }}
                                titleStyle={{ marginLeft: 40 }}
                                title={item.type}
                                subtitle={item.nom}
                                subtitleStyle={{ marginLeft: 40 }}
                                titleVariant="bodyLarge"
                                left={LeftContent}
                            />
                            <Text style={{ marginLeft: 113, marginBottom: 0 }}>{item.telephone} </Text>

                            <Card.Actions>
                                <Avatar.Icon size={20} icon="heart" style={{
                                    backgroundColor: 'red',
                                    marginBottom: 5,
                                    marginEnd: 5
                                }} />
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
});

export default FavoriteScreen;
