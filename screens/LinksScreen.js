import React from 'react';
import { View, Animated, ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Easing } from 'react-native-reanimated';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  animatedValue = new Animated.Value(0);

  componentDidMount() {
    this.animate();
  }

  animate() {
    this.animatedValue.setValue(0);
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 8000,
        easing: Easing.linear
      }
    ).start(()=>this.animate());
  }

  render() {
    const marginLeft = this.animatedValue.interpolate({
      inputRange: [0,1],
      outputRange: [0,500]
      });

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          {/* Go ahead and delete ExpoLinksView and replace it with your
            * content, we just wanted to provide you with some helpful links */}
          <ExpoLinksView />
        </ScrollView>
        <View style={styles.container}>
          <Animated.View
            style={{
              height: 25,
              width: 25,            
              marginLeft: marginLeft,
              backgroundColor: 'red'
            }} />
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
