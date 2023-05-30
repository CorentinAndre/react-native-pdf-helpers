import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as ReactNativePdfHelpers from 'react-native-pdf-helpers';

export default function App() {
  useEffect(() => {
    ReactNativePdfHelpers.getPageCount("https://www.africau.edu/images/default/sample.pdf").then((res) => {
      console.log(res)
    })
  }, [])
  return (
    <View style={styles.container}>
      <Text>{}</Text>
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
