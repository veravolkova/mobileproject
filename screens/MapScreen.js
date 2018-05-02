import React from 'react';
import { StyleSheet, Text, View, Dimensions, Keyboard } from 'react-native';
import { MapView } from 'expo';
import { Marker } from 'react-native-maps';
import { Button, FormInput } from 'react-native-elements';


var width = Dimensions.get('window').width;

export default class App extends React.Component {
  static navigationOptions = { title: 'STORE FINDER', };

  constructor(props) {
    super(props);
    this.state = { markers: [], address: '' };
  }

  showMap = () => {

    const url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=lankakauppa+' + this.state.address + '&key=YourKey'

    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {

        this.setState({
          markers: responseData.results
        })
      })
      .catch((error) => {
        Alert.alert(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>

        <MapView
          style={{ height: 480, width: 300, flex: 5 }}
          region={this.state.region}
          onRegionChange={this.onRegionChange} >

          {this.state.markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{

                latitude: marker.geometry.location.lat,
                longitude: marker.geometry.location.lng

              }}

              title={marker.name}
              description={marker.formatted_address}
            />
          ))}


        </MapView>


        <View style={{ width: width * .97 }} >

          <FormInput
            style={{ fontSize: 18, height: 30, marginBottom: 5 }}
            placeholder='Where are you now?'
            onChangeText={(address) => this.setState({ address })}
            value={this.state.address} />

        </View>

        <View style={styles.container}>

          <Button
            buttonStyle={styles.button}
            title="SHOW" onPress={this.showMap} />
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },

  button: {
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5,
    marginBottom: 15,
    width: width * .97
  }
});