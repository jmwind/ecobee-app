import React from 'react';
import { View, Animated, ScrollView, StyleSheet, PanResponder, Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Easing } from 'react-native-reanimated';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  animatedValue = new Animated.Value(0);

  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY()
    }
    this.panResponder = PanResponder.create({    
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null,{ 
          dx : this.state.pan.x,
          dy : this.state.pan.y
      }]),
      onPanResponderRelease: (e, gesture) => {} 
    });
  }

  componentDidMount() {
    //this.animate();
  }

  animate() {
    console.log("starting animation");
    this.animatedValue.setValue(0);
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear
      }
    ).start();
  }

  render() {
    const marginLeft = this.animatedValue.interpolate({
      inputRange: [0,1],
      outputRange: [0,100]
      });

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          {/* Go ahead and delete ExpoLinksView and replace it with your
            * content, we just wanted to provide you with some helpful links */}
          <ExpoLinksView />
        </ScrollView>
        <View 
            onPress={this._pressBox}             
            style={{
              position: 'absolute',
              top: 300,
              left: 100
            }}>
          <Animated.View
            {...this.panResponder.panHandlers}  
            style={[
              this.state.pan.getLayout(),
              {
                height: 50,
                width: 50,                      
                //marginLeft: marginLeft,
                backgroundColor: 'blue'
              }
            ]}>              
            <Text>Drag me!</Text>
          </Animated.View>
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
