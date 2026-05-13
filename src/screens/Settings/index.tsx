import { View, Text, StyleSheet  } from 'react-native';

export default function Settings() {
  return (
    <View style={styles.main}>
      <Text>Configurações</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    main:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
