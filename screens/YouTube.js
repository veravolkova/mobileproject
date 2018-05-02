import React from 'react';
import { StyleSheet, Text, View, Linking, Image, Video, FlatList, Alert, StatusBar, Dimensions, ImageBackground } from 'react-native';

var width = Dimensions.get('window').width;

export default class YouTube extends React.Component {
  static navigationOptions = { title: 'VIDEOS', };

  constructor(props) {
    super(props);
    this.state = { videos: [] };
  }

  componentDidMount = () => {
    const url = 'https://www.googleapis.com/youtube/v3/search?part=snippet%20&maxResults=50&q=villasukat+neulominen%20&type=video&key=YourKey';
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({ videos: responseJson.items });

      })
      .catch((error) => {
        Alert.alert(error);
      });
  }

  listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          marginLeft: "10%",
          marginBottom: 10
        }}
      />
    );
  };

  render() {

    return (
      <View style={styles.container}>

        <ImageBackground
          style={styles.background}
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Gfp-white-yard-texture.jpg' }}
        >

          <StatusBar hidden={true} />
          <FlatList
            style={{ marginLeft: "5%", marginRight: "5%", height: 200, marginTop: 10 }}
            keyExtractor={item => item.id.videoId}
            renderItem={({ item }) =>

              <View style={styles.secondary}>
                <Image style={styles.image}
                  source={{ uri: item.snippet.thumbnails.default.url }} />
                <Text style={styles.textd}
                  onPress={() => Linking.openURL('https://www.youtube.com/watch?v=' + item.id.videoId)}>{item.snippet.title}</Text>
              </View>

            } data={this.state.videos}
            ItemSeparatorComponent={this.listSeparator} />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },

  secondary: {
    flexDirection: 'row',
    borderWidth: 0.5,
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 5,
    maxWidth: width * .97
  },

  background: {
    backgroundColor: '#ccc',
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },

  image: {
    width: 90,
    height: 65,
    borderRadius: 5,
    borderRadius: 2,
    borderColor: "rgb(93, 171, 234)"
  },

  text: {
    fontWeight: 'bold',
    color: "rgb(75, 77, 79)",
    marginLeft: 5,
    alignSelf: 'center',
    width: 180
  }
});