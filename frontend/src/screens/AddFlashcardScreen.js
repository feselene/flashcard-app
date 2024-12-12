import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

const AddFlashcardScreen = ({ navigation }) => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const createFlashcard = () => {
        const flashcardData = { question, answer };
        axios.post('http://localhost:5000/api/flashcards', flashcardData)
            .then(() => {
                setQuestion('');
                setAnswer('');
                navigation.navigate('Home');
            })
            .catch(error => console.log(error));
    };

    return (
        <View>
            <Text>Question</Text>
            <TextInput
                value={question}
                onChangeText={setQuestion}
                placeholder="Enter question"
            />
            <Text>Answer</Text>
            <TextInput
                value={answer}
                onChangeText={setAnswer}
                placeholder="Enter answer"
            />
            <Button title="Save Flashcard" onPress={createFlashcard} />
        </View>
    );
};

export default AddFlashcardScreen;
