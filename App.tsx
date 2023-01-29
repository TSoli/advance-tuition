// Entry point to the App
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './context/AuthContext';
import MainNavigationContainer from './screens/navigation/MainNavigationContainer';

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
