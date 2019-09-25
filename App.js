import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Provider as PaperProvider, Card } from 'react-native-paper';
import strategies from './helpers/strategies';

const AppCardStyles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignContent: 'center'
  }
});

const AppCard = ({strategy, onPress}) => {
  return (
    <Card style={AppCardStyles.card} onPress={onPress}>
      <Text>{strategy}</Text>
    </Card>
  );
}

export default function App() {
  const getCard = () => {
    const restOfDeck = strategies.filter(s => s !== strategy);
    const index = Math.floor(Math.random() * restOfDeck.length);
    const newStrategy = restOfDeck[index];
    return newStrategy;
  }

  const [strategy, setStrategy] = useState(getCard());

  return (
    <PaperProvider>
      <View style={styles.container}>
        <AppCard
          strategy={strategy}
          onPress={() => setStrategy(getCard())}
        />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 32,
    paddingTop: 64
  }
});