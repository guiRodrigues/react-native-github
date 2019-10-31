import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

import api from '../../service/api';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('userInfo').name,
  });

  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    navigation: PropTypes.shape({ getParam: PropTypes.func }).isRequired,
  };

  // eslint-disable-next-line react/state-in-constructor
  state = {
    starred: [],
  };

  async componentDidMount() {
    const { navigation } = this.props;
    const user = navigation.getParam('userInfo');

    const response = await api.get(`/users/${user.login}/starred`);

    this.setState({ starred: response.data });
  }

  render() {
    const { starred } = this.state;
    return <Text>STARRED REPOSITORIES</Text>;
  }
}
