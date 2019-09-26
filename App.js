import React, { Component/*, useState, useEffect*/ } from 'react';
import { Button, Text, View, Animated, Dimensions, PanResponder } from 'react-native';
import { Provider as PaperProvider, Card } from 'react-native-paper';
import strategies from './helpers/strategies';
import styles from './helpers/styles';

class Main extends Component {
  constructor() {
    super();
    this.position = new Animated.ValueXY();
    this.panResponder = new PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => true,
      onPanResponderMove: (e, g) => this.updatePositionMove(e, g),
      onPanResponderRelease: (e, g) => this.updatePositionRelease(e, g)
    });
    const initDeck = strategies.slice();
    this.state = {
      deck: initDeck
    };
    this.swipeArea = 120;
    this.renderCard = this.renderCard.bind(this);
    this.handleUpdateDeck = this.handleUpdateDeck.bind(this);
    this.updatePositionMove = this.updatePositionMove.bind(this);
    this.updatePositionRelease = this.updatePositionRelease.bind(this);
    this.isSwipeOutside = this.isSwipeOutside.bind(this);
  }

  updatePositionMove(e, gestureState) {
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
      inputRange: [-width/2.0, -(width/2.8), 0.0, width/2.8, width/2.0],
      outputRange: [0.0, 0.9, 1.0, 0.9, 0.0],
      extrapolate: 'clamp'
    });
    this.setState({
      transformStyle:[{
        rotateZ: rotateVal
      }],
      topCardOpacityVal
    });
  }

  isSwipeOutside({dx, dy}) {
    return dx > this.swipeArea ||
    dx < -this.swipeArea ||
    dy > this.swipeArea ||
    dy < -this.swipeArea/3;
  }

  updatePositionRelease (e, gestureState) {
    this.updatePositionMove(e, gestureState);
    if (this.isSwipeOutside(gestureState)) this.handleUpdateDeck();
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
      transform: isTopCard ? this.state.transformStyle : [],
      opacity: isTopCard ? this.state.topCardOpacityVal : 1,
      ...styles.animatedView,
      ...cardPosStyle
    };
    const handlers = isTopCard ? {...this.panResponder.panHandlers} : { undefinedHandler: () => undefined };
    return (
      <Animated.View
        key={strategy}
        style={viewStyle}
        {...handlers}
      >
        <Card style={styles.card}>
          <View style={styles.card}>
            <Text style={styles.paragraph}>{strategy}</Text>
          </View>
        </Card>
      </Animated.View>
    );
  }

  render() {
    const visibleCards = this.state.deck.slice(0, 2).map((strategy, ind) => this.renderCard(strategy, ind)).reverse();
    return (
      <View style={styles.appContainer}>
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