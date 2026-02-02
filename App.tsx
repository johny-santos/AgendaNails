import { NavigationContainer } from '@react-navigation/native';
import { RootRoutes } from './src/routes/root.routes';

export default function App() {
  return (
    <NavigationContainer>
      <RootRoutes />
    </NavigationContainer>
  );
}
