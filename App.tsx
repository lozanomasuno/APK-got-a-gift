import { StatusBar } from 'expo-status-bar';

import { AppNavigation } from './src/app/navigation';

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <AppNavigation />
    </>
  );
}
