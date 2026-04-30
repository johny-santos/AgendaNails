import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import NewClient from '../screens/newClient';
import ClientDetails from '../screens/ClientDetails';
import { Header } from '../components/Header';

export type HomeStackParamList = {
  HomeMain: undefined;
  ClientDetails: {
    name: string;
    time: string;
    service: string;
  };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

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

      <Stack.Screen 
        name="ClientDetails" 
        component={ClientDetails}
      />

    </Stack.Navigator>
  );
}
