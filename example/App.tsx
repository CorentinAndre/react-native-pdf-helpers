import { StyleSheet, Text, View } from 'react-native';

import * as ReactNativePdfHelpers from 'react-native-pdf-helpers';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ReactNativePdfHelpers.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
