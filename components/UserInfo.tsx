import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export interface User {
  login: string;
  name: string;
  avatar: string;
}

interface Props {
  user: User;
}
export class UserInfo extends React.Component<Props, null> {
  constructor(props) {
    super(props);
  }

  render() {
    const { user } = this.props;
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: user.avatar }} />
        <Text style={styles.userlogin}>{user.login}</Text>
        <Text>{user.name}</Text>
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
    width: 80,
    height: 80
  },
  userlogin: {
    marginTop: 40,
    fontSize: 20
  }
});
