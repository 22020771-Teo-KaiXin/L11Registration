import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, ImageBackground, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Assuming you are using FontAwesome icons for the search icon

const styles = StyleSheet.create({
    listStyle: {
        borderWidth: 1,
        margin: 10,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '120%',
        height: '120%',
        resizeMode: 'cover',
    },
    title: {
        position: 'absolute',
        top: 70,
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
        backgroundColor: 'transparent',
    },
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
    },
    listContainer: {
        flex: 1,
        width: '100%',
        marginTop: 50,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 150,
        width: '90%',
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 5,
    },
    searchBox: {
        flex: 1,
        height: 40,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 16
    },
});

const ContestantInformation = ({ navigation, route }) => {
    const [myData, setMyData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [searchText, setSearchText] = useState('');

    // Fetch data when the component mounts
    useEffect(() => {
        fetch("https://a481afc26f3049febc2fbe88de865f81.api.mockbin.io/")
            .then((response) => response.json())
            .then((myJSON) => {
                setMyData(myJSON);  // Set the filtered data
                setOriginalData(myJSON); // Store the original data for reference
            })
            .catch((error) => console.error(error)); // Handle errors if any
    }, []);

    // Filter the data based on the username
    const filterData = (text) => {
        setSearchText(text);
        const searchText = text.toLowerCase();
        if (searchText !== '') {
            const filteredData = originalData.filter(item =>
                item.username.toLowerCase().includes(searchText)
            );
            setMyData(filteredData);
        } else {
            setMyData(originalData); // Reset to original data if search is empty
        }
    };

    const renderItem = ({ item }) => {
        return (
            <View style={styles.listStyle}>
                <Text>{item.username}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar />
            <ImageBackground
                source={{ uri: 'https://wallpapers.com/images/featured/clouds-phone-background-hxlgadjgsrq7yrtk.jpg' }}
                style={styles.image}
            >
                <Text style={styles.title}>Flash Fiction Contestants</Text>
            </ImageBackground>

            <View style={styles.searchContainer}>
                <Icon name="search" size={24} />
                <TextInput
                    style={styles.searchBox}
                    placeholder="Search by Username..."
                    value={searchText}
                    onChangeText={filterData}
                />
            </View>

            <View style={styles.listContainer}>
                <FlatList
                    data={myData}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </View>
    );
};

export default ContestantInformation;



