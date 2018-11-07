import React from 'react';
import { Text, View, Image } from 'react-native';

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
      <View>
          <Image
          style={style}
          source={{uri: userInfo.avatar}}
          />
          <Text>{userInfo.login}</Text>
           <Text>{userInfo.name}</Text>
      </View>
    );
  }
}
