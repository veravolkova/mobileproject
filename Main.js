import React from 'react';
import { StyleSheet, View, Dimensions, ImageBackground } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';

var width = Dimensions.get('window').width;

export default class Main extends React.Component {
  static navigationOptions = { title: 'KNITTING ROCKS' };

  render() {

    const { navigate } = this.props.navigation;
    const link = 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Gfp-white-yard-texture.jpg';

    return (

      <View style={styles.MainContainer}>

        <View style={styles.SecondaryContainer}>
          <ImageBackground
            style={styles.Background}
            source={{ uri: link }}
          >

            <Button
              buttonStyle={styles.Button}
              onPress={() => navigate('Calc')} title="TEX CALCULATOR" />
          </ImageBackground>
        </View>

        <View style={styles.SecondaryContainer}>
          <ImageBackground
            style={styles.Background}
            source={{ uri: link }}
          >

            <Button
              buttonStyle={styles.Button}
              onPress={() => navigate('Calc2')} title="NM CALCULATOR" />
          </ImageBackground>
        </View>

        <View style={styles.SecondaryContainer}>
          <ImageBackground
            style={styles.Background}
            source={{ uri: link }}
          >

            <Button
              buttonStyle={styles.Button}
              onPress={() => navigate('Map')} title="STORE FINDER" />
          </ImageBackground>
        </View>

        <View style={styles.SecondaryContainer}>
          <ImageBackground
            style={styles.Background}
            source={{ uri: link }}
          >

            <Button
              buttonStyle={styles.Button}
              onPress={() => navigate('Youtube')} title="TUTORIALS" />
          </ImageBackground>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  MainContainer: {
    flexDirection: 'column',
    margin: 10,
    marginTop: 15,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },

  SecondaryContainer: {
    width: width * .97,
    height: 102,
    borderWidth: 0.5,
    marginBottom: 20,
    borderRadius: 5
  },

  Background: {
    backgroundColor: '#ccc',
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },

  Button: {
    backgroundColor: "rgb(93, 171, 234)",
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
  }
},
);