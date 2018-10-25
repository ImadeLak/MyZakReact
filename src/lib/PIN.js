import React, { Component } from "react";

const {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} = require("react-native");

const window = Dimensions.get("window");

module.exports = class Pin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pins: []
    };
  }

  reset() {
    pins = [];
    this.setState({ pins });
    if (this.props.onChangeStatus) {
      this.props.onChangeStatus(false);
    }

    if (this.props.onChangeValue) {
      this.props.onChangeValue("");
    }
  }

  addNumber(i) {
    if (this.state.pins.length > 3) return;

    pins = this.state.pins;

    pins.push(i);

    this.setState({ pins });

    //if (this.props.onChangeValue) {
    this.props.onChangeValue(pins.join(""));
    //}
    if (pins.length == 4) {
      if (this.props.onChangeStatus) {
        this.props.onChangeStatus(true);
      }
    }
  }

  deleteNumber() {
    if (this.state.pins.length == 0) return;

    pins = this.state.pins;

    pins.splice(-1, 1);

    this.setState({ pins });

    if (this.props.onChangeStatus) {
      this.props.onChangeStatus(false);
    }

    if (this.props.onChangeValue) {
      this.props.onChangeValue("");
    }
  }

  getPins() {
    let tmp = [];
    let obj = null;
    for (i = 0; i < 4; i++) {
      if (this.state.pins[i] == undefined) {
        obj = (
          <View key={i} style={[styles.emptyBox, this.props.styleEmptyBox]} />
        );
      } else {
        obj = (
          <View key={i} style={[styles.fullBox, this.props.styleFullBox]} />
        );
      }

      tmp.push(obj);
    }

    return tmp;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.row, { paddingLeft: 50, paddingRight: 50 }]}>
          {this.getPins()}
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              this.addNumber(1);
            }}
            style={styles.button}
          >
            <Text style={[styles.text, this.props.styleText]}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.addNumber(2);
            }}
            style={styles.button}
          >
            <Text style={[styles.text, this.props.styleText]}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.addNumber(3);
            }}
            style={styles.button}
          >
            <Text style={[styles.text, this.props.styleText]}>3</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              this.addNumber(4);
            }}
            style={styles.button}
          >
            <Text style={[styles.text, this.props.styleText]}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.addNumber(5);
            }}
            style={styles.button}
          >
            <Text style={[styles.text, this.props.styleText]}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.addNumber(6);
            }}
            style={styles.button}
          >
            <Text style={[styles.text, this.props.styleText]}>6</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              this.addNumber(7);
            }}
            style={styles.button}
          >
            <Text style={[styles.text, this.props.styleText]}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.addNumber(8);
            }}
            style={styles.button}
          >
            <Text style={[styles.text, this.props.styleText]}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.addNumber(9);
            }}
            style={styles.button}
          >
            <Text style={[styles.text, this.props.styleText]}>9</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <View style={[styles.button, { backgroundColor: "transparent" }]} />
          <TouchableOpacity
            onPress={() => {
              this.addNumber(0);
            }}
            style={styles.button}
          >
            <Text style={[styles.text, this.props.styleText]}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.deleteNumber();
            }}
            style={styles.button}
          >
            <Text style={[styles.text, this.props.styleText]}> {"<"} </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: window.width * 0.65,
    marginBottom: 20
  },

  button: {
    borderRadius: (window.width * 0.18) / 2,

    backgroundColor: "rgba(255, 255, 255, 0.2)",
    width: window.width * 0.18,
    height: window.width * 0.18,
    justifyContent: "center",
    alignItems: "center"
  },

  text: {
    color: "#fff",
    //fontFamily: "Arial",
    fontWeight: "bold"
  },

  emptyBox: {
    backgroundColor: "transparent",
    width: 10,
    height: 10,
    borderRadius: 5,
    borderColor: "#504b4d",
    borderWidth: 1
  },

  fullBox: {
    backgroundColor: "#333333",
    width: 10,
    height: 10,
    borderRadius: 5,
    borderColor: "#504b4d",
    borderWidth: 1
  }
});
