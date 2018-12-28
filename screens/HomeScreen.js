import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { 
  Card, 
  Button, 
  Icon 
} from 'react-native-elements';
import { AreaChart, Grid , YAxis} from 'react-native-svg-charts'
import { WebBrowser } from 'expo';
import * as shape from 'd3-shape'

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  data1 = [ 21, 22, 22, 21, 21.2, 20, 19, 18, 18, 18, 18.5, 19, 19.3, 21 ]
  data2 = [ 4, 6, 8, 9, 21.2, 20, 19, 18, 18, 18, 18.5, 19, 19.3, 21 ]
  data3 = [ 18, 16, 16.5, 10, 21.2, 11, 22, 18, 22, 12, 22, 11, 22.3, 21 ]
  h = 110;
  collapsed = false;

  render() {

    let topSummaryText;
    if(! this.collapsed) {
      topSummaryText = "2344 samples over last 5 days";
    } else {
      topSummaryText = "";
    }

    return (
      <View style={styles.container}>
          <View style={styles.topBar} height={this.h}>
            <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
              <Text style={styles.topBarText}>Kirchoffer Comfort</Text>
              {!this.collapsed && 
                <Text style={styles.topBarTextSmall}>{topSummaryText}</Text>
              }
            </TouchableOpacity>
          </View>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} scrollEventThrottle={50} onScroll={this._handleScroll.bind(this)}>
          <Card
            title='Living Room'
            >             
              <AreaChart
                  style={{ height: 200 }}
                  data={ this.data1 }
                  animate= {true}
                  animationDuration={500}
                  contentInset={{ top: 30, bottom: 30 }}
                  curve={ shape.curveNatural }
                  svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
              >
              <Grid/>
            </AreaChart>
            <Text style={{margin: 8}}>
              High: 23C Low: 18C Heat Requets: 10
            </Text>
          </Card>
          <Card
            title='Garage'>
            <AreaChart
                  style={{ height: 200 }}
                  data={ this.data2 }
                  contentInset={{ top: 30, bottom: 30 }}
                  curve={ shape.curveNatural }
                  svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
              >
              <Grid/>
            </AreaChart>
            <Text style={{margin: 8}}>
              Average temperature is high. Lower desired temperature.
            </Text>           
          </Card>
          <Card
            title='Master Bedroom'>
            <AreaChart
                  style={{ height: 200 }}
                  data={ this.data3 }
                  contentInset={{ top: 30, bottom: 30 }}
                  curve={ shape.curveNatural }
                  svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
              >
              <Grid/>
            </AreaChart>
            <Text style={{margin: 8}}>
              Average temperature is high. Lower desired temperature.
            </Text>           
          </Card>
        </ScrollView>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleScroll (event) {
    //console.log(event.nativeEvent);   
    if(event.nativeEvent.contentOffset.y <= 10) {
      this.h = 110;
      this.collapsed = false;
      styles.topBarTextSmall.fontSize = 12;
      this.forceUpdate();
    } else {
      if(event.nativeEvent.contentOffset.y > 15 && ! this.collapsed) {
        this.h = 80;
        this.collapsed = true;
        styles.topBarTextSmall.fontSize = 1;
        this.forceUpdate();
      }
    }
    //console.log(this.h);     
  }
}

styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 15,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  topBar: {
    //height: 125,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 0,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  topBarText: {
    fontSize: 20,
    textAlign: 'center'
  },
  topBarTextSmall: {
    fontSize: 12,
    textAlign: 'center'
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
