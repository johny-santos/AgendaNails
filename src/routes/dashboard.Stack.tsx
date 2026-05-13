import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../screens/Dashboard';
import { Header } from '../components/Header';

const Stack = createNativeStackNavigator();

export function DashboardStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <Header title="Painel" />,
      }}
    >
      <Stack.Screen name="DashboardMain" component={Dashboard} />
    </Stack.Navigator>
  );
}
