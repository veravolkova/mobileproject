import React from 'react';
import { Text, StyleSheet, View, Dimensions, ImageBackground } from 'react-native';
import { StackNavigator } from 'react-navigation';

var width = Dimensions.get('window').width;

export default class HistoryScreen extends React.Component {
        static navigationOptions = { title: 'HISTORY', };


    constructor(props) {
        super(props);
        this.state = ({ data: props.navigation.state.params.history, result: '' })
    }

    render() {

        return (
            <View style={styles.MainContainer}>

                <ImageBackground
                    style={styles.back}
                    source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Gfp-white-yard-texture.jpg' }}
                >
                    <View style={styles.secondary}>
                        <Text style={{ marginTop: 10 }}>YOUR PREVIOUS SEARCHES:{"\n"}</Text>
                        <Text>{this.state.data}</Text>

                    </View>
                </ImageBackground>

            </View>
        );
    }
}

const styles = StyleSheet.create({

    MainContainer: {
        flex: 1,
        alignItems: 'center'
    },

    secondary: {
        height: 450,
        width: 300,
        marginTop: 30,
        marginLeft: 10,
        borderRadius: 10,
        marginRight: 10,
        marginBottom: 30,
        alignItems: 'center',
        backgroundColor: 'white'
    },

    back: {
        backgroundColor: '#ccc',
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    }
});