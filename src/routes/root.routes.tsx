import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabRoutes } from './tab.routes';
import NewClient from '../screens/newClient';
import { Header } from '../components/Header';
import { AuthStack } from './auth.stack';

const Stack = createNativeStackNavigator();

export function RootRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      <Stack.Screen
        name="Auth"
        component={AuthStack}
      />

      <Stack.Screen 
        name="MainTabs" 
        component={TabRoutes} 
      />

      <Stack.Screen 
        name="NewClient" 
        component={NewClient}
        options={{
          headerShown: true,
          header: ({ navigation }) => (
            <Header
              title="Novo Atendimento"
              showAddButton={false}
              showBackButton={true}
              onBackPress={() => navigation.goBack()}
            />
          )
        }}
      />

    </Stack.Navigator>
  );
}
