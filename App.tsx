import { NavigationContainer } from '@react-navigation/native';
import { RootRoutes } from './src/routes/root.routes';
import { AuthProvider } from './src/contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootRoutes />
      </NavigationContainer>
    </AuthProvider>
  );
}
