import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import NewClient from '../screens/newClient';
import { Header } from '../components/Header';

const Stack = createNativeStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator>
      
      <Stack.Screen 
        name="HomeMain" 
        component={Home}
        options={{
          header: ({ navigation }) => (
            <Header
              title="AgendaNails"
              showAddButton={true}
              onAddPress={() => navigation.getParent()?.navigate('NewClient')}

            />
          )
        }}
      />

    </Stack.Navigator>
  );
}
