// Entry point to the App
import { AuthProvider } from './context/AuthContext';
import MainNavigationContainer from './screens/navigation/MainNavigationContainer';

export default function App() {

  return (
    <AuthProvider>
      <MainNavigationContainer/>
    </AuthProvider>
  );
}
