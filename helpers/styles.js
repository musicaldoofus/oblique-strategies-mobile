import { StyleSheet } from 'react-native';

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

export default styles;