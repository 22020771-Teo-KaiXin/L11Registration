import React, { useState } from 'react';
import { StyleSheet, StatusBar, View, Text, TextInput, Alert, ImageBackground } from 'react-native';

const styles = StyleSheet.create({
    listStyle: {
        flex: 1, // Full height of the screen
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100%', // Ensure full screen height
        overflow: 'hidden', // Prevents any overflow
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '120%',
        height: '120%', // Increase this value slightly to make sure the image extends beyond the screen
        resizeMode: 'cover', // Ensures the image covers the entire area
    },
    title: {
        position: 'absolute',
        top: 109,
        left: 79,
        width: 262,
        textAlign: 'center',
        color: 'rgba(0, 0, 0, 1)',
        fontFamily: 'Inter',
        fontSize: 32,
        fontWeight: 'bold',
        lineHeight: 32,
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 2,
        flexWrap: 'wrap',
        backgroundColor: 'transparent',
    },
    inputField: {
        position: 'absolute',
        top: 255,
        left: 78,
        width: 255,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        rowGap: 8,
    },
    label: {
        textAlign: 'left',
        color: 'rgba(30, 30, 30, 1)',
        fontFamily: 'Inter',
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        borderStyle: 'solid',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderWidth: 0,
        borderColor: 'transparent',
        borderRadius: 8,
        width: '100%',
        fontSize: 18
    },
    _inputField: {
        position: 'absolute',
        top: 410,
        left: 84,
        width: 251,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        rowGap: 8,
    },
    _label: {
        textAlign: 'left',
        color: 'rgba(30, 30, 30, 1)',
        fontFamily: 'Inter',
        fontSize: 18,
        fontWeight: 'bold',
    },
    _input: {
        borderStyle: 'solid',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderWidth: 0,
        borderColor: 'transparent',
        borderRadius: 8,
        width: '100%',
        fontSize: 18
    },
    __inputField: {
        position: 'absolute',
        top: 565,
        left: 84,
        width: 251,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        rowGap: 8,
    },
    __label: {
        textAlign: 'left',
        color: 'rgba(30, 30, 30, 1)',
        fontFamily: 'Inter',
        fontSize: 18,
        fontWeight: 'bold',
    },
    __input: {
        borderStyle: 'solid',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderColor: 'transparent',
        borderRadius: 8,
        width: '100%',
        fontSize: 18
    },
    button: {
        position: 'absolute',
        top: 720,
        left: 100,
        width: 220,
        borderStyle: 'solid',
        backgroundColor: 'rgba(44, 44, 44, 1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'white'
    },
    _button: {
        color: 'rgba(255, 255, 255, 1)',
        fontFamily: 'Inter',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

const Home = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    return (
        <View style={styles.listStyle}>
            <StatusBar />
            <ImageBackground source={{ uri: 'https://wallpapers.com/images/featured/clouds-phone-background-hxlgadjgsrq7yrtk.jpg' }} style={styles.image}>
                <Text style={styles.title}>Registration for Flash Fiction Contest</Text>
                <View style={styles.inputField}>
                    <Text style={styles.label}>Username:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setUsername}
                        value={username}
                    />
                </View>

                <View style={styles._inputField}>
                    <Text style={styles._label}>Email:</Text>
                    <TextInput
                        style={styles._input}
                        onChangeText={setEmail}
                        value={email}
                    />
                </View>

                <View style={styles.__inputField}>
                    <Text style={styles.__label}>Phone Number:</Text>
                    <TextInput
                        style={styles.__input}
                        onChangeText={setPhoneNumber}
                        value={phoneNumber}
                        keyboardType="phone-pad"
                    />
                </View>

                <View style={styles.button}>
                    <Text
                        style={styles._button}
                        onPress={() => {
                            // Check if any of the fields are empty
                            if (!username || !email || !phoneNumber) {
                                Alert.alert('Validation Error', 'All fields are required!');
                                return;
                            }

                            // Validation for email
                            const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com)$/;
                            if (!emailRegex.test(email)) {
                                Alert.alert('Invalid Email', 'Please enter a valid email with @gmail.com or @hotmail.com');
                                return;
                            }

                            // Validation for phone number
                            const phoneRegex = /^[89]\d{7}$/;
                            if (!phoneRegex.test(phoneNumber)) {
                                Alert.alert('Invalid Phone Number', 'Phone number must be 8 digits and start with 8 or 9.');
                                return;
                            }

                            // New user data from input fields
                            const item = {
                                username: username,
                                email: email,
                                phoneNumber: phoneNumber,
                            };

                            // Fetch the existing data first
                            fetch('https://a481afc26f3049febc2fbe88de865f81.api.mockbin.io/')
                                .then((response) => response.json()) // Parse the existing data
                                .then((existingData) => {
                                    // Add the new contestant data to the existing data
                                    existingData.push(item);

                                    // Send the updated list back to the API
                                    return fetch('https://a481afc26f3049febc2fbe88de865f81.api.mockbin.io/', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            Authorization: 'ydhg14uhuoayowhrjzvfqmenpvaucn3h',
                                        },
                                        body: JSON.stringify(existingData), // Send the updated data with the new contestant
                                    });
                                })
                                .then((response) => {
                                    if (response.ok) {
                                        // Show success alert after sign-up
                                        Alert.alert('Success', 'You have successfully signed up for the Flash Fiction contest!');
                                        // After successful submission, navigate to ContestantInformation screen
                                        navigation.navigate('ContestantInformation', { username: username });
                                    } else {
                                        console.error('Failed to submit data');
                                    }
                                })
                                .catch((error) => {
                                    console.error('Error:', error);
                                });
                        }}
                    >
                        Sign Up
                    </Text>
                </View>
            </ImageBackground>
        </View>
    );
};

export default Home;

