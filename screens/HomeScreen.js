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
  Card   
} from 'react-native-elements';
import { AreaChart, LineChart, BarChart, Grid, YAxis, HorizontalLine } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 78;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

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
      collapsed: false,
      scrollY: new Animated.Value(
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0
      )
    }
  }

  setNewChartData() {
    this.state.data1 = [ 1, 22, 31, 22, 19, 20, 19, 18 ];
    this.state.data2 = [ -1, 2, -3, 22, 19, 20, 19, 18 ];
    this.state.data3 = [ -1, 2, -3, 22, 19, 20, 19, 18 ];
    setTimeout(() => {
      this.setState({state: this.state});
    }, 250);  
  }

  componentWillMount() {
    this.props.navigation.setParams({
      scrollToTop: this._scrollToTop
    });
  }

  componentDidMount() {
    this.setNewChartData();
  }

  _scrollToTop = () => {
    if (this.scrollView) {
      this.scrollView.scrollTo({x: 0, y: 0, animated: true});
    }
  }

  _renderRoomContent(name, chartData) {
    return (
      <Card
            title={name}> 
            <View style={{ height: 200, flexDirection: 'row' }}>
              <YAxis
                    data={ chartData }
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
                animate={true}
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
    );
  }

  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    });

    const marginTopMove = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MAX_HEIGHT - HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    });

    const titleScale = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0.8],
      extrapolate: 'clamp',
    });

    const titleTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, -8],
      extrapolate: 'clamp',
    });

    return (   
        <View style={styles.container}>

          <Animated.View 
              style={[styles.topBar, 
                { transform: [{ translateY: headerHeight }]}]}
              onPress={() => { this.scrollview.scrollTo(0); }}>
          </Animated.View>   

          <Animated.View 
              style={[
                styles.topBarView,
                {
                  transform: [
                  { scale: titleScale },
                  { translateY: titleTranslate }]
                }              
              ]}
              onPress={() => { this.scrollviewscrollTo(0); }}>
                <Text style={styles.topBarText}>Comfort</Text>                  
                <Text style={styles.topBarTextSmall}>Last 5 days. High 23ºC and Low 10ºC</Text>                  
          </Animated.View> 
          

          <Animated.ScrollView 
            style={[
              styles.scrollContainer,
              {
                marginTop: marginTopMove
              }
            ]} 
            scrollEventThrottle={16}   
            ref={(scrollview) => { this.scrollview = scrollview }}            
            onScroll={
              Animated.event(
                [{
                    nativeEvent: {contentOffset: {y: this.state.scrollY}}
                }])
            }>
            {this._renderRoomContent('Living Room', this.state.data1)}
            {this._renderRoomContent('Master', this.state.data2)}
            {this._renderRoomContent('Garage', this.state.data3)}
            {this._renderRoomContent('Foyer', this.state.data3)}
            {this._renderRoomContent('Basement', this.state.data3)}
            {this._renderRoomContent('Office', this.state.data3)}
          </Animated.ScrollView>                      
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
    backgroundColor: 'red',
  },
  scrollContainer: {
    marginTop: HEADER_MAX_HEIGHT - 5,
    backgroundColor: '#f9f9f9',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 0,
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f9f9f9',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
    shadowColor: '#000000',
    shadowOffset: {
      width: 4,
      height: 3
    },
    shadowRadius: 3,
    shadowOpacity: 0.5
  },
  topBarView: {
    position: 'absolute',
    marginTop: 45,
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarText: {
    backgroundColor: 'transparent',
    color: 'black',
    fontSize: 28,
    textAlign: 'center'
  },
  topBarTextSmall: {
    fontSize: 14,
    marginBottom: 6,
    marginTop: 5,
    color: "black",
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
