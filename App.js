import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import MyTabs from './navigation/bottomNav';

export default function App() {

  console.log("App executed");

  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
