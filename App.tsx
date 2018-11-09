import React from "react";
import { StyleSheet, Text, TextInput, Button, View, Image } from "react-native";
import { UserInfo, User } from "./components/UserInfo";

const apiUrl = "https://api.github.com";
const params = {
  client_id: "Iv1.bc3b35e3b9b4f1dc",
  redirect_uri: "https://expo.io/@langgaard/ImagineApp",
  state: "random"
};

interface State {
  token: string;
  userName: string;
  userInfo: User;
  noUser: boolean;
}

export default class App extends React.Component<null, State> {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      userName: "",
      userInfo: null,
      noUser: false
    };
  }

  getUserInfo = () => {
    let user = this.state.userName;
    fetch(`${apiUrl}/users/${user}`, {
      method: "GET"
    })
      .then(response => response.json())
      .then((data: any) => {
        if (data.message) {
          this.setState({ userInfo: null, noUser: true });
        } else {
          this.setState({
            userInfo: {
              login: data.login,
              name: data.name,
              avatar: data.avatar_url
            },
            noUser: false
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  // connectGithub = () => {
  //   let token = this.state.token;
  //   fetch(
  //     this.encodeParams("https://github.com/login/oauth/authorize", params),
  //     {
  //       method: "GET",
  //       headers: {
  //         Authorization: "a4c83af90193a591c02d022390dfcc61f7c6ceb6"
  //       }
  //     }
  //   )
  //     .then(response => response.json())
  //     .then((data: any) => {
  //       console.log("API connected");
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // };

  // encodeParams = (url: string, parameters: {}) => {
  //   let qs = "";
  //   for (const key in parameters) {
  //     if (parameters.hasOwnProperty(key)) {
  //       const value = parameters[key];
  //       qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
  //     }
  //   }
  //   if (qs.length > 0) {
  //     qs = qs.substring(0, qs.length - 1); //chop off last "&"
  //     url = url + "?" + qs;
  //   }

  //   return url;
  // };

  render() {
    const { token, userInfo, userName, noUser } = this.state;
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Ei-sc-github.svg/768px-Ei-sc-github.svg.png"
          }}
        />
  {/*      <TextInput
          style={styles.input}
          placeholder="Type in token"
          value={token}
          onChangeText={value => this.setState({ token: value })}
        />
        <Button
          style={styles.button}
          onPress={this.connectGithub}
          title="Connect Github API"
        />*/}
        <TextInput
          style={styles.input}
          placeholder="Type in username"
          value={userName}
          onChangeText={value => this.setState({ userName: value })}
        />
        <Button
          style={styles.button}
          onPress={this.getUserInfo}
          title="Get user"
        />
        {noUser && <Text style={styles.noUser}>No user found!</Text>}
        {userInfo && <UserInfo user={userInfo} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 50
  },
  image: {
    width: 100,
    height: 100
  },
  input: {
    height: 30,
    fontSize: 25
  },
  button: {
    marginTop: 10
  },
  noUser: {
    marginTop: 50,
    fontSize: 20
  }
});
