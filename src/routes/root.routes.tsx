import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabRoutes } from './tab.routes';
import NewClient from '../screens/newClient';
import { Header } from '../components/Header';

const Stack = createNativeStackNavigator();

export function RootRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      
      <Stack.Screen 
        name="MainTabs" 
        component={TabRoutes} 
      />

      <Stack.Screen 
        name="NewClient" 
        component={NewClient}
        options={{
          headerShown: true,
          header: () => (
            <Header
              title="Novo Atendimento"
              showAddButton={false}
            />
          )
        }}
      />

    </Stack.Navigator>
  );
}
