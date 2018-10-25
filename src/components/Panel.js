import React from "react";
import {
  Component,
  Text,
  View,
  Image,
  TouchableHighlight,
  Animated
} from "react-native";
import { Icon } from "native-base";

export default class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      expanded: props.expanded,
      animation: new Animated.Value()
    };
  }

  toggle() {
    let initialValue = this.state.expanded
        ? this.state.maxHeight + this.state.minHeight
        : this.state.minHeight,
      finalValue = this.state.expanded
        ? this.state.minHeight
        : this.state.maxHeight + this.state.minHeight;

    this.setState({
      expanded: !this.state.expanded
    });

    this.state.animation.setValue(initialValue);
    Animated.spring(this.state.animation, {
      toValue: finalValue
    }).start();
  }

  _setMaxHeight(event) {
    this.setState({
      maxHeight: event.nativeEvent.layout.height
    });
  }

  _setMinHeight(event) {
    if (!this.state.expanded) {
      this.state.animation.setValue(event.nativeEvent.layout.height);
    }
    this.setState({
      minHeight: event.nativeEvent.layout.height
    });
  }

  render() {
    return (
      <Animated.View style={{ height: this.state.animation }}>
        <TouchableHighlight
          style={{ margin: 0, overflow: "hidden" }}
          onPress={this.toggle.bind(this)}
          underlayColor="#f1f1f1"
        >
          <View
            style={{
              padding: 10,
              backgroundColor: this.props.titleBackgroundColor,
              flexDirection: "row"
            }}
            onLayout={this._setMinHeight.bind(this)}
          >
            <Text
              style={{
                color: this.props.titleColor,
                fontSize: this.props.titleFontSize,
                flex: 1
              }}
            >
              {this.state.title}
            </Text>
            <Icon
              name={this.state.expanded ? "ios-arrow-up" : "ios-arrow-down"}
              style={{ color: this.props.iconColor }}
            />
          </View>
        </TouchableHighlight>
        <View
          style={{
            backgroundColor: this.props.bodyBackgroundColor,
            padding: 10
          }}
          onLayout={this._setMaxHeight.bind(this)}
        >
          {this.props.children}
        </View>
      </Animated.View>
    );
  }
}

Panel.defaultProps = {
  title: "TITRE",
  colorTitle: "black",
  iconColor: "black",
  titleBackgroundColor: "white",
  bodyBackgroundColor: "grey",
  titleFontSize: 20,
  expanded: false
};
