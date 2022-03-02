import { StyleSheet, Text, View, Button, Image, TextInput, TouchableOpacity } from 'react-native';

export default function HomeScreen({navigation}) {
  return (
    <View style={styles.container} >
      <Text>HOME</Text>
      <Button title="Logout" onPress={() => alert("LOGOUT")} />
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