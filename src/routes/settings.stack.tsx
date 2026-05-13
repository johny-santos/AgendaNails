import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Settings from '../screens/Settings';
import { Header } from '../components/Header';

const Stack = createNativeStackNavigator();

export function SettingsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <Header title="Configurações" />,
      }}
    >
      <Stack.Screen name="SettingsMain" component={Settings} />
    </Stack.Navigator>
  );
}
