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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  controlAboutBtn: {
    alignSelf: 'flex-end'
  },
  cardContainer: {
    flex: 8,
    flexDirection: 'column',
    position: 'relative'
  },
  animatedView: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0
  },
  card: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center'
  }
});

export default styles;