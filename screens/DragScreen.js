import React,{ Component } from 'react';
import { 
    StyleSheet,
    View,
    Text,
    PanResponder,
    Animated,
    Easing,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import Confetti from 'react-native-confetti';

export default class DragScreen extends Component{
    constructor(props){
        super(props);

        this.state = {
            showDraggable: true,
            dropZoneValues: null,
            pan: new Animated.ValueXY(),
            targetText: 'Drag the circle here!'
        };

        this.panResponder = PanResponder.create({            
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([null,{  
                dx: this.state.pan.x,
                dy: this.state.pan.y
            }]),
            onPanResponderRelease: (e, gesture) => {
                if(this.isDropZone(gesture)) {
                    this.setState({
                        showDraggable: false,
                        targetText: "THANK YOU!!\nPress here to start again"
                    });
                    if(this._confettiView) {
                        this._confettiView.startConfetti();
                    }
                } else {
                    Animated.spring(
                        this.state.pan,
                        {toValue:{x:0,y:0}, bounciness: 30, speed: 40}
                    ).start();
                }
            }
        });
    }

    isDropZone(gesture){
        var dz = this.state.dropZoneValues;
        return gesture.moveY > dz.y && gesture.moveY < (dz.y + dz.height + 100);
    }

    setDropZoneValues(event){
        this.setState({
            dropZoneValues : event.nativeEvent.layout
        });
    }

    render(){
        return (
            <TouchableOpacity style={styles.mainContainer} onPress={this._spawnCircle.bind(this)}>
                <View 
                    onLayout={this.setDropZoneValues.bind(this)}
                    style={styles.dropZone}>
                    <Text style={styles.text}>{this.state.targetText}</Text>
                </View>
                <Confetti ref={(node) => this._confettiView = node}/>
                {this.renderDraggable()}
            </TouchableOpacity>
        );
    }

    renderDraggable(){
        if(this.state.showDraggable){
            return (
                <View style={styles.draggableContainer}>
                    <Animated.View 
                        {...this.panResponder.panHandlers}
                        style={[this.state.pan.getLayout(), styles.circle]}>
                        <Text style={styles.text}>Drag</Text>
                    </Animated.View>
                </View>
            );
        }
    }

    _spawnCircle() {
        this.setState({
            showDraggable : true,
            targetText: "Drop here again!"
        });
        this._confettiView.stopConfetti();
        Animated.spring(
            this.state.pan,
            {toValue:{x:0,y:0}, bounciness: 30, speed: 10}
        ).start();
    }
}

let CIRCLE_RADIUS = 36;
let Window = Dimensions.get('window');
let styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    dropZone: {
        height: 100,
        backgroundColor:'#03A9F4'
    },
    text: {
        marginTop: 25,
        marginLeft: 5,
        marginRight: 5,
        fontSize: 22,
        textAlign: 'center',
        color: '#fff'
    },
    draggableContainer: {
        position: 'absolute',
        top: Window.height/2 - CIRCLE_RADIUS,
        left: Window.width/2 - CIRCLE_RADIUS,
    },
    circle: {
        backgroundColor: 'rgba(134, 65, 244, 0.8)',
        width: CIRCLE_RADIUS*2,
        height: CIRCLE_RADIUS*2,
        borderRadius: CIRCLE_RADIUS
    }
});