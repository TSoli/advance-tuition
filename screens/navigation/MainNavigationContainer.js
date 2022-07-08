import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import MainNavigation from './MainNavigation';
import LoginStackNavigator from './LoginStackNavigator';

export default function MainNavigationContainer() {
  const { user } = useAuth();
  return (
    <NavigationContainer>{user ? <MainNavigation /> : <LoginStackNavigator />}</NavigationContainer>
  );
}
