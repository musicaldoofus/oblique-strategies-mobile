import React, { Component/*, useState, useEffect*/ } from 'react';
import { StyleSheet, Text, View, Animated, Dimensions, PanResponder } from 'react-native';
import { Provider as PaperProvider, Card } from 'react-native-paper';
import strategies from './helpers/strategies';

const AppCard = ({strategy, onPress}) => {
  return (
    <Card onPress={onPress}>
      <Text style={styles.paragraph}>{strategy}</Text>
    </Card>
  );
}

/*
export default function App() {
  const position = new Animated.ValueXY();

  const getCard = () => {
    const restOfDeck = strategies.filter(s => s !== strategy);
    const index = Math.floor(Math.random() * restOfDeck.length);
    const newStrategy = restOfDeck[index];
    return newStrategy;
  }

  useEffect(() => {
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => true,
      onPanResponderMove: (e, gestureState) => {
        console.log(e, gestureState);
        position.setValue({
          x: gestureState.dx,
          y: gestureState.dy
        });
      },
      onPanResponderRelease: (e, gestureState) => {
        console.log(e, gestureState);
      }
    })
  }, []);

  const [strategy, setStrategy] = useState(getCard());

  const handlers = {...panResponder.panHandlers};
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Animated.View style={
          { transform: position.getTranslateTransform() }
        }>
          {handlers}
          <AppCard
            strategy={strategy}
            onPress={() => setStrategy(getCard())}
          />
        </Animated.View>
      </View>
    </PaperProvider>
  );
}
*/

class Main extends Component {
  constructor() {
    super();
    this.position = new Animated.ValueXY();
    this.updatePosition = (e, gestureState) => {
      this.position.setValue({
        x: gestureState.dx,
        y: gestureState.dy
      });
    };
    this.panResponder = new PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => true,
      onPanResponderMove: this.updatePosition,
      onPanResponderRelease: (e, gestureState) => {
        this.position.setValue({
          x: gestureState.dx,
          y: gestureState.dy
        });
      }
    });
    const initDeck = strategies.slice();
    this.state = {
      deck: initDeck
    };
    this.renderCard = this.renderCard.bind(this);
  }

  renderCard(strategy, ind) {
    const isTopCard = ind === 1;
    const cardPosStyle = isTopCard ? this.position.getLayout() : {};
    const style = Object.assign({
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0
    }, cardPosStyle);
    console.log(style);
    const handlers = isTopCard ? {...this.panResponder.panHandlers} : { undefinedHandler: () => undefined };
    return (
      <Animated.View
        key={strategy}
        {...style}
        {...handlers}
      >
        <Card style={styles.card}>
          <Text style={styles.paragraph}>{strategy}</Text>
        </Card>
      </Animated.View>
    );
  }

  render() {
    const visibleCards = this.state.deck.slice(0, 2).map((strategy, ind) => this.renderCard(strategy, ind));
    return (
      <View style={styles.appContainer}>
        <View style={styles.controlsContainer}>

        </View>
        <View style={styles.cardContainer}>
          {visibleCards}
        </View>
      </View>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <PaperProvider>
        <Main/>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#000',
    padding: 32,
    paddingTop: 64
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center'
  },
  controlsContainer: {
    flex: 1
  },
  cardContainer: {
    flex: 5,
    flexDirection: 'column',
    position: 'relative'
  },
  card: {
    flex: 1,
    height: '100%',
    width: '100%'
  }
});