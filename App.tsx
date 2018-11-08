import React from 'react';
import { StyleSheet, Text, TextInput, Button, View, Image } from 'react-native';
import { UserInfo } from './components/UserInfo';

const apiUrl = "https://api.github.com"

interface State {
  token: string,
  userName: string,
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
      token: '',
      userName: '',
      userInfo: null,
      noUser: false
    }
  }

  getUserInfo = () => {
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
    const {token, userInfo, userName, noUser} = this.state;
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Ei-sc-github.svg/768px-Ei-sc-github.svg.png"}}>
          </Image>
        <TextInput style={styles.input} placeholder="Type in username" value={userName} onChangeText={(value) => this.setState({userName: value})}/>
        <Button onPress={this.getUserInfo} title="Get user"/>
        {noUser && <Text style={styles.nouser}>No user found!</Text>}
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
    marginTop: 50,
  },
  image: {
    width: 100, 
    height: 100,
  },
  input: {
    height: 40,
    fontSize: 40,
  },
  nouser: {
    marginTop: 50,
    fontSize: 20
  }


});
