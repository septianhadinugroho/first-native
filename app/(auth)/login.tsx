import { styled } from "nativewind/dist/pre-v4/styled";
import { Alert, Button, Text, View } from 'react-native';

const StyledView = styled(View);
const StyledText = styled(Text);

export default function LoginScreen() {
    
    // Fungsi ini akan kamu implementasikan dengan benar saat setup OAuth Supabase
    const handleGoogleSignIn = async () => {
        Alert.alert("Fitur Segera Hadir", "Login dengan Google akan segera diimplementasikan menggunakan Supabase Auth.");
        // Kode asli untuk Supabase OAuth:
        // try {
        //   const { data, error } = await supabase.auth.signInWithOAuth({
        //     provider: 'google',
        //   });
        //   if (error) throw error;
        // } catch (error: any) {
        //   Alert.alert('Login Error', error.message);
        // }
    }
  
  return (
    <StyledView className="flex-1 justify-center items-center bg-background dark:bg-dark-background p-5">
      <StyledText className="text-4xl font-poppins-bold text-primary dark:text-dark-primary mb-2">
        Estetik Notes
      </StyledText>
      <StyledText className="text-lg font-poppins text-text dark:text-dark-text mb-8">
        Your beautiful note-taking companion.
      </StyledText>
      <Button title="Sign in with Google" onPress={handleGoogleSignIn} />
    </StyledView>
  );
}