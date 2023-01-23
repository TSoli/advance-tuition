import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import LoginStackNavigator from './LoginStackNavigator';
import MainNavigation from './MainNavigation';

export default function MainNavigationContainer() {
  const { user, isVerified } = useAuth();
  return (
    <NavigationContainer>
      {user && isVerified() ? <MainNavigation /> : <LoginStackNavigator />}
    </NavigationContainer>
  );
}
