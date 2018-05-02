import React from 'react';
import { Text, StyleSheet, View, Dimensions, Alert, FlatList, Image, Keyboard } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button, FormInput, List, ListItem } from 'react-native-elements';
import Expo, { SQLite } from 'expo';


const db = SQLite.openDatabase('calcdb.db');
var width = Dimensions.get('window').width;

export default class Calculator extends React.Component {
  static navigationOptions = { title: 'TEX CALCULATOR', };


  constructor(props) {
    super(props);
    this.state = { text: '', text1: '', result: '', data: [] }
  }

  componentDidMount() {
    // Create calc table
    db.transaction(tx => {
      tx.executeSql('create table if not exists calc (id integer primary key not null, result text);');
    });
    this.updateList();
  }

  // Save result
  saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into calc (result) values (?)', [this.state.result]);
    }, null, this.updateList)
  }

  // Delete item
  deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql('delete from calc where id = ?;', [id]);
      }, null, this.updateList
    )
  }


  updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from calc', [], (_, { rows }) =>
        this.setState({ data: rows._array })
      );
    });
  }



  showItem = (id) => {
    db.transaction(tx => {
      tx.executeSql('select * from calc where id = ?', [id], (_, { rows }) =>   
      Alert.alert(rows._array[0].result)
    );
    });    
  }

 
  buttonPressed = () => {
    Keyboard.dismiss();
    const tex = Math.round(100000 / (parseInt(this.state.text) * parseInt(this.state.text1)));
    this.setState({ result: this.state.text + ' TEX means that 100 g of yarn is about ' + tex + ' meters.' });
    this.saveItem(this.state.result);
    this.setState({ text: {} });
    this.setState({ text1: {} });
  }


  render() {

    const { navigate } = this.props.navigation;

    return (

      <View style={styles.MainContainer}>

        <Image style={{ marginLeft: 190, width: 90, height: 50 }}
          source={{ uri: 'https://cdn.pixabay.com/photo/2013/07/12/15/50/yarn-150415_960_720.png' }} />

        <View style={{ marginTop: 20, width: width * .97 }}>


          <FormInput keyboardType={'numeric'} style={styles.form}
            placeholder="tex number, e.g. 140"
            onChangeText={(text) => this.setState({ text })} string={this.state.text}

          />
          <View>

            <FormInput keyboardType={'numeric'} style={styles.form}
              placeholder="number of threads, e.g. 4"
              onChangeText={(text1) => this.setState({ text1 })} string={this.state.text1}
            />

          </View>


        </View>

        <View>
          <Button
            buttonStyle={styles.button}
            raisedicon={{ name: 'save' }} onPress={this.buttonPressed} title="CALCULATE" />
        </View>

        <View style={{ marginTop: 10, width: width * .97 }}>
          <Text style={styles.text}> {this.state.result} </Text>
        </View>


        <View style={{ marginTop: 25 }}>
          <List >
            {
              this.state.data.map((value, index) => (
                <ListItem
                  style={{ height: 55 }}
                  key={index}
                  title={value.result}
                  rightTitle="delete"
                  onPress={() =>
                    this.showItem(value.id)}
                  onLongPress={() =>
                    this.deleteItem(value.id)}

                />
              ))
            }
          </List>
        </View>






      </View>
    );
  }
}

const styles = StyleSheet.create({

  MainContainer: {
    flex: 1,
    margin: 10,
    marginTop: 10
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

  form: {
    borderColor: 'gray',
    borderWidth: 1,
    width: width * .97,
    marginBottom: 10
  },

  button: {
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5,
    marginTop: 10,
  },

  text: {
    marginTop: 10,
    width: width * .87,
    marginLeft: 10,
    marginHorizontal: 10
  },

    TextInputStyle: {
    textAlign: 'center',
  }
}
);