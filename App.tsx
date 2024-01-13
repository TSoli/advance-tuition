// Entry point to the App
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { connectEmulators } from 'advance-tuition-backend';
import { AuthProvider } from './context/AuthContext';
import MainNavigationContainer from './screens/navigation/MainNavigationContainer';

connectEmulators('192.168.20.13');

const App = () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <MainNavigationContainer />
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;
