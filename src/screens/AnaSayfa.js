import React, { Component } from 'react';
import { View, StyleSheet, Animated, Easing, TextInput } from 'react-native';

//useNativeDriver: true,

/*
class ImageLoader extends Component {
  state = {
    opacity: new Animated.Value(-5),
  }

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 1000,
      easing: Easing.in,
      delay: 1000,
    }).start();
  }

  render() {
    return (
      <Animated.Image
        onLoad={this.onLoad}
        {...this.props}
        style={[
          {
            opacity: this.state.opacity,
            transform: [
              {
                scale: this.state.opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.85, 1],
                })
              },
            ],
          },
          this.props.style,
        ]}
      />
    );
  }
}
*/

class ImageLoader extends Component {
  state = {
    opacity: new Animated.Value(-5),
  }

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      delay: 200,
    }).start();
  }

  render() {
    return (
      <Animated.Image
        onLoad={this.onLoad}
        {...this.props}
        style={[
          {
            opacity: this.state.opacity,
            transform: [
              {
                scale: this.state.opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.85, 1],
                })
              },
            ],
          },
          this.props.style,
        ]}
      />
    );
  }
}






const App = () => (
  <View style={styles.container}>
    <View style={styles.head}>
    <ImageLoader
      style={styles.image}
      source={{ uri: 'https://images.unsplash.com/photo-1485832329521-e944d75fa65e?auto=format&fit=crop&w=1000&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D' }}
    />
    </View>
    <View style={styles.body}>
    <TextInput
      style={{ height: 40,width: 100, borderColor: 'gray', borderWidth: 1 }}

    />

    </View>


  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  head: {
    flex:6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body:{
    flex:2,

  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
});

export default App;
