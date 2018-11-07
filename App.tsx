import React from 'react';
import { StyleSheet, Text, TextInput, Button, View, Image } from 'react-native';
import { UserInfo } from './components/UserInfo';

const apiUrl = "https://api.github.com"

interface State {
  userName: string;
  userInfo: {
    login: string,
    name: string,
    avatar: string
  }
  noUser: boolean
}

export default class App extends React.Component<null, State> {

  constructor(props) {
    super(props)
    this.state = {
      userName: 'Enter userName',
      userInfo: null,
      noUser: false
    }
  }

  getUser = () => {
      let user = this.state.userName
        fetch( `${apiUrl}/users/${user}`, {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((data: any) => {
        if(data.message) {
          this.setState({userInfo: null, noUser: true})
        } else {
          this.setState({
           userInfo: {
            login: data.login,
            name: data.name,
            avatar: data.avatar_url
           },
           noUser: false
         })
        } 
      })
      .catch((error) => {
         console.error(error);
      });
  }

  render() {
    const {userInfo, userName, noUser} = this.state;
    return (
      <View style={styles.container}>
        <TextInput value={userName} onChangeText={(value) => this.setState({userName: value})}/>
        <Button onPress={this.getUser} title="Get user"/>
        {noUser && <Text>No user found!</Text>}
        {userInfo &&
          <UserInfo userInfo={userInfo} style={styles.image}/>
        
        }
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
  },
  image: {
    width: 50, 
    height: 50,
  },
});
