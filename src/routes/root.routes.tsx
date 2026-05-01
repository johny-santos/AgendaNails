import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStack } from './auth.stack';
import { TabRoutes } from './tab.routes';
import NewClient from '../screens/newClient';
import { Header } from '../components/Header';
import { useAuth } from '../contexts/AuthContext';

const Stack = createNativeStackNavigator();

export function RootRoutes() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
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

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="Auth" 
        component={AuthStack}
      />
    </Stack.Navigator>
  );
}
