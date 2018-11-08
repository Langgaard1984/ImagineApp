import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export interface Props {
    userInfo: {
    login: string,
    name: string,
    avatar: string
  }
  style: {}
}
export class UserInfo extends React.Component<Props, null> {

  constructor(props) {
    super(props)
  }

render() {
    const {userInfo, style} = this.props;
    return (
      <View style={styles.container}>
          <Image
          style={styles.image}
          source={{uri: userInfo.avatar}}
          />
          <Text>{userInfo.login}</Text>
           <Text>{userInfo.name}</Text>
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
    width: 50, 
    height: 50,
    }
  })
