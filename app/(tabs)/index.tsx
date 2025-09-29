import { supabase } from '@/lib/supabase';
import * as api from '@/services/api'; // Menggunakan lapisan API
import { Note } from '@/types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, router, useFocusEffect } from 'expo-router';
import { styled } from "nativewind/dist/pre-v4/styled";
import { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function HomeScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  // useFocusEffect akan menjalankan fetchNotes setiap kali layar ini menjadi fokus
  useFocusEffect(
    useCallback(() => {
      const fetchNotes = async () => {
        try {
          setLoading(true);
          const data = await api.getNotes(); // Memanggil dari service
          setNotes(data);
        } catch (error) {
          console.error("Error fetching notes:", error);
          // Di sini kamu bisa menambahkan notifikasi error ke pengguna
        } finally {
          setLoading(false);
        }
      };
      fetchNotes();
    }, [])
  );

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/login');
  };

  if (loading) {
    return (
      <StyledView className="flex-1 justify-center items-center bg-background dark:bg-dark-background">
        <ActivityIndicator size="large" color="#3b82f6" />
      </StyledView>
    );
  }

  return (
    <StyledView className="flex-1 bg-background dark:bg-dark-background p-5 pt-16">
      <View className="flex-row justify-between items-center mb-4">
        <StyledText className="text-3xl font-poppins-bold text-primary dark:text-dark-primary">
          My Notes
        </StyledText>
        <TouchableOpacity onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={24} color="#ef4444" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={{ pathname: "/note/[id]", params: { id: item.id } }} asChild>
            <StyledTouchableOpacity className="bg-white dark:bg-slate-800 p-4 rounded-lg mb-3 shadow-md">
              <StyledText className="text-lg font-poppins-bold text-text dark:text-dark-text">{item.title}</StyledText>
              <StyledText className="font-poppins text-slate-500 dark:text-slate-400 mt-1" numberOfLines={2}>{item.content}</StyledText>
            </StyledTouchableOpacity>
          </Link>
        )}
        ListEmptyComponent={() => (
          <StyledView className="mt-20 items-center">
            <StyledText className="font-poppins text-slate-500 dark:text-slate-400">Belum ada catatan. Ayo buat satu!</StyledText>
          </StyledView>
        )}
      />
      <Link href="/note/create" asChild>
        <StyledTouchableOpacity className="absolute bottom-10 right-5 bg-accent dark:bg-dark-accent w-16 h-16 rounded-full justify-center items-center shadow-lg">
          <MaterialCommunityIcons name="plus" size={32} color="white" />
        </StyledTouchableOpacity>
      </Link>
    </StyledView>
  );
}