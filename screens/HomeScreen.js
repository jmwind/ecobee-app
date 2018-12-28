import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated
} from 'react-native';
import { 
  Card, 
  Button, 
  Icon 
} from 'react-native-elements';
import { AreaChart, LineChart, BarChart, Grid, YAxis, HorizontalLine } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  
  constructor(props) {
    super(props);
    this.state = {
      data1: [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      data2: [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      data3: [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      h: 110,
      collapsed: false
    }
  }

  setNewChartData() {
    this.state.data1 = [ 1, 22, 31, 22, 19, 20, 19, 18 ];
    this.state.data2 = [ -1, 2, -3, 22, 19, 20, 19, 18 ];
    this.state.data3 = [ -1, 2, -3, 22, 19, 20, 19, 18 ];
    setTimeout(() => {
      this.setState({state: this.state});
    }, 1000);  
  }

  componentDidMount() {
    this.setNewChartData();
  }

  render() {
    return (
      <View style={styles.container}>
          <Animated.View style={styles.topBar} height={this.state.h}>

              <Text style={styles.topBarText}>Our Home</Text>
              {!this.state.collapsed && 
                <Text style={styles.topBarTextSmall}>Last 5 days. High 23ºC and Low 10ºC</Text>
              }

          </Animated.View>
        <ScrollView 
          style={styles.container} 
          contentContainerStyle={styles.contentContainer} 
          scrollEventThrottle={50} 
          onScroll={this._handleScroll.bind(this)}>
          <Card
            title='Living Room'
            featuredTitle='High 1, Low 2'> 
            <View style={{ height: 200, flexDirection: 'row' }}>
              <YAxis
                    data={ this.state.data1 }
                    contentInset={{ top: 20, bottom: 20 }}
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    numberOfTicks={ 8 }
                    formatLabel={ value => `${value}ºC` }
                />            
              <BarChart
                style={{ flex: 1 }}
                animate
                animationDuration={1000}
                data={ this.state.data1 }
                contentInset={{ top: 20, bottom: 20 }}
                curve={ shape.curveNatural }
                svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
              >                
              <Grid/>                   
            </BarChart>
            </View>
            <Text style={{margin: 3, flex:2}}>
              High: 23ºC Low: 18ºC Heat Requets: 10
            </Text>
          </Card>
          <Card
            title='Garage'>
            <AreaChart
                  style={{ height: 150 }}
                  data={ this.state.data2 }
                  contentInset={{ top: 30, bottom: 30 }}
                  curve={ shape.curveNatural }
                  svg={{ fill: 'rgba(23, 90, 244, 0.8)' }}>
              <Grid/>
            </AreaChart>
            <Text style={{margin: 8}}>
              Average temperature is high. Lower desired temperature.
            </Text>           
          </Card>
          <Card
            title='Master Bedroom'>

            <AreaChart
                  style={{ height: 150 }}
                  data={ this.state.data3 }
                  contentInset={{ top: 30, bottom: 30 }}
                  curve={ shape.curveNatural }
                  svg={{ fill: 'rgba(23, 90, 244, 0.8)' }}
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

  _handleScroll (event) {
    if(event.nativeEvent.contentOffset.y <= 10) {
      this.setState({h: 110, collapsed: false});
    } else {
      if(event.nativeEvent.contentOffset.y > 15 && ! this.collapsed) {
        this.setState({h: 80, collapsed: true});
      }
    }    
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
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 0,
    borderBottomColor: '#c0c0c0',
    borderBottomWidth: 1,
  },
  topBarText: {
    fontSize: 20,
    margin: 4,
    textAlign: 'center'
  },
  topBarTextSmall: {
    fontSize: 12,
    marginBottom: 6,
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
