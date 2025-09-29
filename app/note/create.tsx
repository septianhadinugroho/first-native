import * as api from '@/services/api';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import auth from '@react-native-firebase/auth';
import { router } from 'expo-router';
import { styled } from 'nativewind';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function CreateNoteScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = async () => {
    if (!title || !content) {
        alert("Title and content cannot be empty.");
        return;
    }
    const userId = auth().currentUser?.uid;
    if (!userId) {
        alert("You must be logged in to create a note.");
        router.replace('/login');
        return;
    }
    
    await api.createNote({ title, content, user_id: userId });
    router.back();
  };

  return (
    <StyledView className="flex-1 bg-background dark:bg-dark-background p-5">
      <StyledTextInput
        className="text-2xl font-poppins-bold text-text dark:text-dark-text mb-4 p-2 border-b-2 border-primary dark:border-dark-primary"
        placeholder="Note Title"
        placeholderTextColor="#94a3b8"
        value={title}
        onChangeText={setTitle}
      />
      <StyledTextInput
        className="flex-1 font-poppins text-lg text-text dark:text-dark-text mb-4 p-2"
        placeholder="Start writing..."
        placeholderTextColor="#94a3b8"
        multiline
        value={content}
        onChangeText={setContent}
        textAlignVertical="top"
      />
       <StyledTouchableOpacity 
        className="bg-accent dark:bg-dark-accent p-4 rounded-lg flex-row justify-center items-center"
        onPress={handleSave}
      >
        <MaterialCommunityIcons name="content-save" size={20} color="white" />
        <StyledText className="text-white font-poppins-bold text-lg ml-2">Save Note</StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  );
}