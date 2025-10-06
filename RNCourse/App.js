import { config } from '@gluestack-ui/config';
import { GluestackUIProvider, Text, View } from '@gluestack-ui/themed';

import { StatusBar } from 'expo-status-bar';

export default function App() {

  return (
    <GluestackUIProvider config={config}>
    <View alignItems='center' justifyContent='center' flex={1} backgroundColor={'#d8fffcff'}> 
      <Text color='black'>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
    </GluestackUIProvider>
  );
}
