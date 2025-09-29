import { Note } from '@/types';

// Alamat API backend-mu
const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

// --- DUMMY DATA (Simulasi Respons dari Backend) ---
let DUMMY_NOTES: Note[] = [
  { id: '1', user_id: 'dummy_user_id', title: 'Rencana Meeting', content: 'Bahas progres kuartal 3 dengan tim produk dan marketing.', created_at: '2025-09-29T10:00:00Z' },
  { id: '2', user_id: 'dummy_user_id', title: 'Daftar Belanja Bulanan', content: '1. Susu\n2. Roti Gandum\n3. Telur\n4. Kopi Bubuk\n5. Sabun Mandi', created_at: '2025-09-28T15:30:00Z' },
];
// --------------------------------------------------

// Di masa depan, fungsi-fungsi ini akan melakukan fetch ke backend-mu.
// Backend-mu lah yang akan berkomunikasi dengan Supabase.

export const getNotes = async (): Promise<Note[]> => {
  console.log(`Fetching all notes from: ${BASE_URL}/notes`);
  // NANTI: const response = await fetch(`${BASE_URL}/notes`, { headers: ... });
  return new Promise(resolve => setTimeout(() => resolve([...DUMMY_NOTES].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())), 500));
};

export const getNoteById = async (id: string): Promise<Note | undefined> => {
    console.log(`Fetching note with id: ${id}`);
    // NANTI: const response = await fetch(`${BASE_URL}/notes/${id}`, { headers: ... });
    return new Promise(resolve => setTimeout(() => resolve(DUMMY_NOTES.find(note => note.id === id)), 300));
};

export const createNote = async (noteData: { title: string, content: string }): Promise<Note> => {
    console.log("Creating new note:", noteData.title);
    const newNote: Note = {
        ...noteData,
        id: Math.random().toString(36).substring(2, 9),
        user_id: 'dummy_user_id', // Nanti didapat dari backend
        created_at: new Date().toISOString(),
    };
    DUMMY_NOTES.push(newNote);
    return new Promise(resolve => setTimeout(() => resolve(newNote), 500));
};

export const deleteNote = async (id: string): Promise<void> => {
    console.log(`Deleting note with id: ${id}`);
    DUMMY_NOTES = DUMMY_NOTES.filter(note => note.id !== id);
    return new Promise(resolve => setTimeout(resolve, 500));
};