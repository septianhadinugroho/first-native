import * as api from '@/services/api';
import { Note } from '@/types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { styled } from 'nativewind';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function NoteDetailScreen() {
  const { id } = useLocalSearchParams();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchNote = async () => {
        const data = await api.getNoteById(id as string);
        if (data) {
          setNote(data);
        }
        setLoading(false);
      };
      fetchNote();
    }
  }, [id]);

  const handleDelete = () => {
    Alert.alert(
        "Delete Note",
        "Are you sure you want to delete this note?",
        [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: async () => {
                await api.deleteNote(id as string);
                router.back();
            }}
        ]
    )
  }

  if (loading) {
    return (
      <StyledView className="flex-1 justify-center items-center bg-background dark:bg-dark-background">
        <ActivityIndicator size="large" color="#3b82f6" />
      </StyledView>
    );
  }

  if (!note) {
    return (
        <StyledView className="flex-1 justify-center items-center bg-background dark:bg-dark-background">
            <StyledText className="font-poppins text-text dark:text-dark-text">Note not found.</StyledText>
        </StyledView>
    )
  }

  return (
    <StyledView className="flex-1 bg-background dark:bg-dark-background p-5">
      <StyledText className="text-2xl font-poppins-bold text-text dark:text-dark-text mb-4 p-2">
        {note.title}
      </StyledText>
      <StyledText className="flex-1 font-poppins text-lg text-text dark:text-dark-text mb-4 p-2">
        {note.content}
      </StyledText>
       <StyledTouchableOpacity 
        className="bg-red-500 p-4 rounded-lg flex-row justify-center items-center"
        onPress={handleDelete}
      >
        <MaterialCommunityIcons name="delete" size={20} color="white" />
        <StyledText className="text-white font-poppins-bold text-lg ml-2">Delete Note</StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  );
}