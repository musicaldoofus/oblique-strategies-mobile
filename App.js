import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Provider as PaperProvider, Card } from 'react-native-paper';
import strategies from './helpers/strategies';

const AppCardStyles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center'
  }
});

const AppCard = ({strategy, onPress}) => {
  return (
    <Card style={AppCardStyles.card} onPress={onPress}>
      <View style={AppCardStyles.view}>
        <Text>{strategy}</Text>
      </View>
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
    alignItems: 'center',
    justifyContent: 'center',
  }
});