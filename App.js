/**
 * Assignemt 1
 * Author : Satender Yadav
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  Button,
  TouchableOpacity,
  View,
  Switch,
} from 'react-native';

export default class App extends Component {

  state = {
    height: "",
    weight: "",
    bmiValue: "",
    resultText: '',
    heightFeet: "",
    MetricEnabled: false,
    heightMeasurement: "(Cm)",
    heightMeasurementFeet: "(Ft)",
    weightMeasurement: "(Kg)",
  }

  toggleMeasurement = () => {
    if (this.state.MetricEnabled === false) {
      this.setState({
        MetricEnabled: true,
        heightMeasurement: "(Inch)",
        weightMeasurement: "(Lb)",
        ƒ: "",
      });
      this.TextInput.clear();
      this.TextInputInch.clear();
    } else {
      this.setState({
        MetricEnabled: false,
        heightMeasurement: "(Cm)",
        weightMeasurement: "(Kg)",
      });
      this.TextInput.clear();
      this.TextInputInch.clear();
    }
  };


  handleCalculate = (height, weight) => {
    var inputData = 0;
    if (this.state.MetricEnabled) {
      height =
        parseFloat(this.state.heightFeet * 12) + parseFloat(this.state.height);
      console.log("height", height);
      inputData =
        (parseFloat(weight) / (parseFloat(height) * parseFloat(height))) *
        parseFloat(703);
    } else {
      inputData =
        (parseFloat(weight) * 10000) /
        (parseFloat(height) * parseFloat(height));
    }

    this.setState({ bmiValue: inputData });
    if (inputData < 18.5) {
      this.setState({ resultText: 'UnderWeight' })
    } else if (inputData >= 18.5 && inputData < 24.9) {
      this.setState({ resultText: 'Normal Weight' })
    } else if (inputData >= 25 && inputData < 29.9) {
      this.setState({ resultText: 'OverWeight' })
    } else {
      this.setState({ resultText: 'Obesity' })
    }
  }

  render() {
    return (
        <View style={styles.container}>
            <View style={styles.heading}>
                <Text style={styles.headingTitle}>BMI Calculator</Text>
            </View>
            <View style={styles.wrapper}>
                <Text style={styles.metric}>Metric</Text>
                <Switch
                  style={styles.toggleMeasurement}
                  trackColor={{ false: "gray", true: "green" }}
                  thumbColor={this.state.MetricEnabled ? "white" : "black"}
                  onValueChange={this.toggleMeasurement}
                  value={this.state.MetricEnabled}
                />
              <Text style={styles.standard}>Standard</Text>
            </View>
            <View style={styles.heightText}>
                <Text style={styles.height}>Height : </Text>
            </View>
            <View style={styles.inputHeight}>
                {this.state.MetricEnabled ? (
                  <TextInput
                    style={styles.initialInput}
                    ref={(input) => {
                      this.TextInput = input;
                    }}
                    underlineColorAndroid="transparent"
                    placeholder={`Height ${this.state.heightMeasurementFeet}`}
                    autoCapitalize="none"
                    onChangeText={heightFeet => this.setState({ heightFeet })}
                  />
                ) : (
                  ""
                )}
                <TextInput
                  style={styles.initialInput}
                  ref={(input) => {
                    this.TextInputInch = input;
                  }}
                  underlineColorAndroid="transparent"
                  placeholder={`Height ${this.state.heightMeasurement}`}
                  autoCapitalize="none"
                  onChangeText={height => this.setState({ height })}
                />
            </View>
            <View style={styles.inputWeight}>
              <Text style={styles.weight}>Weight : </Text>
              <TextInput
                  style={styles.input}
                  ref={(input) => {
                    this.TextInput = input;
                  }}
                  underlineColorAndroid="transparent"
                  placeholder={`Weight ${this.state.weightMeasurement}`}
                  autoCapitalize="none"
                  onChangeText={weight => this.setState({ weight })}
                />
            </View>
            <View style={styles.result}>
              <TouchableOpacity style={styles.button} onPress={() => this.handleCalculate(this.state.height, this.state.weight)} color="#841584">
                  <Text> Calculate </Text>
              </TouchableOpacity>
              <Text style={styles.resultText}>{this.state.bmiValue}</Text>
              <Text style={[styles.resultText, { fontSize: 35 }]}>{this.state.resultText}</Text>
            </View>
        </View >

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  headingTitle: {
    height: 40,
    width: '50%',
    fontSize: 30,
    textAlign: 'center',
    color: '#6200EA'
  },
  heightText: {
    flexDirection: 'row',
    marginTop: 60,
  },
  inputHeight: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 8,
    marginRight: 8,
  },
  height: {
    height: 40,
    width: '50%',
    fontSize: 30,
    textAlign: 'center',
    color: '#0c4f42',
  },
  inputWeight: {
    flex: 1,
    flexDirection: 'row',
  },
  weight: {
    height: 40,
    width: '50%',
    fontSize: 30,
    textAlign: 'center',
    color: '#0c4f42',
  },
  result: {
    flex: 8,
    marginTop: 100,
    fontSize: 30,
  },
  button: {
    backgroundColor: "#1DE9B6",
    alignSelf: 'center',
    padding: 20,
    fontSize: 40,
  },
  resultText: {
    alignSelf: 'center',
    color: '#000000',
    fontSize: 30,
    padding: 15,
  },
  toggleMeasurement: {
    marginLeft: 10,
    marginRight: 10,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 53,
  },
  metric: {
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  standard: {
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  initialInput:{
    margin: 15,
    height: 40,
    width: "42.25%",
  },
});
