import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import NewClient from '../screens/newClient';
import ClientDetails from '../screens/ClientDetails';
import { Header } from '../components/Header';
import { Alert } from 'react-native';
import apiService from '../services/apiService';

export type HomeStackParamList = {
  HomeMain: undefined;
  ClientDetails: {
    id: string;
    name: string;
    time: string;
    service: string;
    date: string;
    description: string;
    status: string;
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
              actionLabel="Sair"
              onActionPress={() => {
                Alert.alert('Sair', 'Deseja realmente sair da conta?', [
                  { text: 'Cancelar', style: 'cancel' },
                  {
                    text: 'Sair',
                    style: 'destructive',
                    onPress: async () => {
                      await apiService.limparAutenticacao();
                      const rootNav = navigation.getParent()?.getParent() as any;
                      rootNav?.reset({
                        index: 0,
                        routes: [{ name: 'Auth' }],
                      });
                    },
                  },
                ]);
              }}
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
