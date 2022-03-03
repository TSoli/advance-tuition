import { useContext } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, TouchableOpacity } from 'react-native';

import { AuthContext  } from '../components/context';

export default function HomeScreen({navigation}) {

  const { Logout } = useContext(AuthContext);

  return (
    <View style={styles.container} >
      <Text>HOME</Text>
      <Button title="Logout" onPress={() => {Logout()}} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});