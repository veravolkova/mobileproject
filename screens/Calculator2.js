import React from 'react';
import { Text, StyleSheet, View, Dimensions, Alert, Image, AsyncStorage, Keyboard } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { FormLabel, Button, FormInput } from 'react-native-elements';


var width = Dimensions.get('window').width;

export default class Calculator2 extends React.Component {
  static navigationOptions = { title: 'NM CALCULATOR', };


  constructor(props) {
    super(props);
    this.state = { text: '', text1: '', result: '', data: '' }
    AsyncStorage.getItem('result').then((value) => {
      this.setState({ data: value });
    });
  }


  saveData(value) {

    if (value == null) {
      this.setState({ value: '' })
      AsyncStorage.setItem('result', value);
      this.setState({ data: value });
    }
    else {
      AsyncStorage.setItem('result', value);
      this.setState({ data: value });
    }
  }


  // button1Pressed = () => {
  //   AsyncStorage.clear();
  // }

  buttonPressed = () => {
    const nm = Math.round(1000 / (parseInt(this.state.text) / parseInt(this.state.text1)) / 10);
    this.setState({ result: this.state.text + ' NM means that 100 g of yarn is about ' + nm + ' meters.\n' });

    const s = '';

    if (this.state.data == null) {
      const s = this.state.text + ' NM means that 100 g of yarn is about ' + nm + ' meters.\n';
      this.setState({ data: s });
      this.saveData(s);
    }

    else {
      const s = this.state.data + this.state.text + ' NM means that 100 g of yarn is about ' + nm + ' meters.\n';
      this.setState({ data: s });
      this.saveData(s);
    }

    Keyboard.dismiss();
  }


  render() {

    const { navigate } = this.props.navigation;

    return (

      <View style={styles.MainContainer}>

        <Image style={{ marginLeft: 190, width: 90, height: 50 }}
          source={{ uri: 'https://cdn.pixabay.com/photo/2013/07/12/15/50/yarn-150415_960_720.png' }} />

        <View style={{ marginTop: 20 }}>
          <FormInput style={styles.form}
            placeholder="number of threads, e.g. 2"
            onChangeText={(text) => this.setState({ text })} string={this.state.text}
            keyboardType={'numeric'}
          />

          <FormInput style={styles.form}
            placeholder="tex number, e.g. 10"
            onChangeText={(text1) => this.setState({ text1 })} string={this.state.text1}
            keyboardType={'numeric'} />
        </View>

        <View>
          <Button
            buttonStyle={styles.button}
            onPress={this.buttonPressed} title="CALCULATE" />
        </View>

        <View style={{ marginTop: 10, margin: 10 }}>
          <Text > {this.state.result} </Text>
        </View>

        <View style={{ marginTop: 150, flexDirection: 'row', justifyContent: 'center' }}>

          <Button
            buttonStyle={styles.button}
            onPress={() => navigate('History', { history: this.state.data })} title="History" />


          {/* <Button
            buttonStyle={styles.button}
            raisedicon={{ name: 'save' }} onPress={this.button1Pressed} title="RESET" /> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  MainContainer: {
    flex: 1,
    margin: 10,
    marginTop: 10,
    width: width * .97
  },

  header: {
    height: 60,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: '#03A9F4',
    zIndex: 10,
    borderRadius: 5,
  },

  button: {
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5,
    marginTop: 10,
  },

  form: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10
  },

  TextInputStyle: {
    textAlign: 'center',
  }
});

