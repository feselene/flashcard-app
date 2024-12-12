import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
    const [flashcards, setFlashcards] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/flashcards')
            .then(response => setFlashcards(response.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <View>
            <Button title="Add Flashcard" onPress={() => navigation.navigate('AddFlashcard')} />
            <FlatList
                data={flashcards}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View>
                        <Text>Q: {item.question}</Text>
                        <Text>A: {item.answer}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default HomeScreen;
