import React, { Component/*, useState, useEffect*/ } from 'react';
import { Button, Text, View, Animated, Dimensions, PanResponder } from 'react-native';
import { Provider as PaperProvider, Card } from 'react-native-paper';
import strategies from './helpers/strategies';
import styles from './helpers/styles';

class Main extends Component {
  constructor() {
    super();
    this.position = new Animated.ValueXY();
    this.updatePositionMove = (e, gestureState) => {
      const { dx, dy } = gestureState;
      this.position.setValue({
        x: dx,
        y: dy
      });
      const { width } = Dimensions.get('window');
      const rotateVal = this.position.x.interpolate({
        inputRange: [-width/2.0, 0.0, width/2.0],
        outputRange: ['-10deg', '0deg', '10deg'],
        extrapolate: 'clamp'
      });
      const topCardOpacityVal = this.position.x.interpolate({
        inputRange: [-width/2.0, 0.0, width/2.0],
        outputRange: [0.0, 1.0, 0.0],
        extrapolate: 'clamp'
      });
      this.setState({
        transformStyle:[{
          rotateZ: rotateVal
        }],
        topCardOpacityVal
      }, () => console.log(rotateVal));
    };
    this.updatePositionRelease = (e, gestureState) => {
      this.updatePositionMove(e, gestureState);
      if (gestureState.dx > 120 ||
        gestureState.dx < -120 ||
        gestureState.dy > 120 ||
        gestureState.dy < -40
      ) this.handleUpdateDeck();
      else {
        Animated.spring(this.position, {
          toValue: {
            x: 0,
            y: 0
          },
          friction: 6
        }).start();
      }
    };
    this.panResponder = new PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => true,
      onPanResponderMove: this.updatePositionMove,
      onPanResponderRelease: this.updatePositionRelease
    });
    const _arr = strategies.slice();
    for (let i = (_arr.length - 1); i > 0; i -= 1) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [_arr[i], _arr[randomIndex]] = [_arr[randomIndex], _arr[i]];
    }
    const initDeck = _arr;
    this.state = {
      deck: initDeck
    };
    this.renderCard = this.renderCard.bind(this);
    this.handleUpdateDeck = this.handleUpdateDeck.bind(this);
  }

  handleUpdateDeck() {
    this.setState({
      deck: this.state.deck.slice(1)
    });
    this.position.setValue({
      x: 0,
      y: 0
    });
  }

  renderCard(strategy, ind) {
    const isTopCard = ind === 0;
    const cardPosStyle = isTopCard ? this.position.getLayout() : {};
    const viewStyle = {
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      border: 'none',
      ...cardPosStyle,
      transform: isTopCard ? this.state.transformStyle : [],
      opacity: isTopCard ? this.state.topCardOpacityVal : 1
    };
    const handlers = isTopCard ? {...this.panResponder.panHandlers} : { undefinedHandler: () => undefined };
    return (
      <Animated.View
        key={strategy}
        style={viewStyle}
        {...handlers}
      >
        <Card style={styles.card}>
          <Text style={styles.paragraph}>{strategy}</Text>
        </Card>
      </Animated.View>
    );
  }

  render() {
    const visibleCards = this.state.deck.slice(0, 2).map((strategy, ind) => this.renderCard(strategy, ind)).reverse();
    return (
      <View style={styles.appContainer}>
        <View style={styles.controlsContainer}>
          <Button onPress={() => console.log('about')} title="About"/>
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