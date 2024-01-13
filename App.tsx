// Entry point to the App
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { connectEmulators } from 'advance-tuition-backend';
import { AuthProvider } from './context/AuthContext';
import MainNavigationContainer from './screens/navigation/MainNavigationContainer';
import { LOCAL_IP } from './localIp';

connectEmulators(LOCAL_IP);

function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <MainNavigationContainer />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

export default App;
