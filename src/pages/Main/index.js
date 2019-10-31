import React, { Component } from 'react';
import { Keyboard, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';

import api from '../../service/api';
import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from './styles';

export default class Main extends Component {
  // eslint-disable-next-line react/sort-comp
  static navigationOptions = {
    title: 'GitHub Users',
  };

  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
  };

  // eslint-disable-next-line react/state-in-constructor
  state = {
    newUser: '',
    users: [],
    loading: false,
  };

  async componentDidMount() {
    console.tron.log(this.props);
    const users = await AsyncStorage.getItem('users');
    if (users) {
      this.setState({ users: JSON.parse(users) });
    }
    // AsyncStorage.removeItem('users');
  }

  async componentDidUpdate(_, prevState) {
    const { users } = this.state;
    if (prevState.users !== users) {
      await AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  handleAddUser = async () => {
    const { newUser, users } = this.state;

    this.setState({ loading: true });

    const response = await api.get(`/users/${newUser}`);

    const data = {
      login: response.data.login,
      name: response.data.name,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };

    this.setState({ users: [...users, data], newUser: '', loading: false });

    Keyboard.dismiss();
  };

  handleNavigate = userInfo => {
    const { navigation } = this.props;
    navigation.navigate('User', { userInfo });
  };

  render() {
    const { newUser, users, loading } = this.state;
    return (
      <Container>
        <Form>
          <Input
            autoCaptalize={false}
            autoCorrect={false}
            placeholder="Add user"
            value={newUser}
            onChangeText={text => this.setState({ newUser: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <SubmitButton loading={loading} onPress={this.handleAddUser}>
            {loading ? (
              <ActivityIndicator color="#fff" size={14} />
            ) : (
              <Icon name="add" color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>
        <List
          data={users}
          keyExtractor={user => user.login}
          renderItem={({ item }) => (
            <User>
              <Avatar source={{ uri: item.avatar }} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>

              <ProfileButton onPress={() => this.handleNavigate(item)}>
                <ProfileButtonText>View Profile</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    );
  }
}
