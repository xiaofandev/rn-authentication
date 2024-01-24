import * as React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// --- Main screens ---
const Tab = createBottomTabNavigator();
const HomeScreen = () => (
  <View>
    <Text>Home</Text>
  </View>
)
const FeedScreen = () => (
  <View>
    <Text>Feed</Text>
  </View>
)
const CatalogScreen = () => (
  <View>
    <Text>Catalog</Text>
  </View>
)
const AccountScreen = () => { 
  const navigation = useNavigation();
  const {setUser} = React.useContext(UserContext);
  return (
    <View>
      <Text>Log out</Text>
      <Button title="Log out" onPress={() => setUser(false)} />
    </View>
  )
}
const AccountNavigator = () => (
    <Stack.Navigator>
      <Stack.Screen name="Account" component={AccountScreen}/>
      <Stack.Screen name="Signin" component={SignInScreen}/>
    </Stack.Navigator>
)
const MainNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Feed" component={FeedScreen} />
    <Tab.Screen name="Catalog" component={CatalogScreen} />
    <Tab.Screen name="Account" component={AccountScreen} />
  </Tab.Navigator>
)

// --- Onboarding screens ---
const Stack = createStackNavigator();
const SignInScreen = () => {
  const navigation = useNavigation();
  const {setUser} = React.useContext(UserContext);
  return (
    <View>
      <Text>Sign in</Text>
      <Button title="Submit" onPress={() => setUser(true)}/>
      <Button title="Sign Up" onPress={() => navigation.navigate('Signup')}/>
    </View>
  );
}
const SignUpScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Sign up</Text>
      <Button title="Sign In" onPress={() => navigation.navigate('Signin')}/>
    </View>
  );
}

// --- App ---
const UserContext = React.createContext({
  hasUser: false,
  setUser: () => {}
});
const App = () => {
  const [hasUser, setUser] = React.useState(false);
  return (
    <NavigationContainer>
      <UserContext.Provider value={{hasUser, setUser}}>
        <Stack.Navigator headerShown={false}>
          {
            hasUser?<Stack.Screen name="Main" component={MainNavigator}/>
            :<Stack.Screen name="Signin" component={SignInScreen}/>
          }
          <Stack.Screen name="Signup" component={SignUpScreen}/>
        </Stack.Navigator>
      </UserContext.Provider>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
  title: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
