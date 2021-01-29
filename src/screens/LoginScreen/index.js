import React, { Component } from 'react';
import { Input } from 'react-native-elements';

import { connect } from 'react-redux';
import {
  Container,
  Logo,
  Image,
  InputBox,
  RightIconInput,
} from './styled';
import Box from '../../components/Box';
import Button from '../../components/Button';
import user from '../../utils/user.ts';

const logoSource = require('../../../assets/logo.png');
const loginImageSource = require('../../../assets/images/login-image.png');

// const mapStateToProps = (state) => {
//   const { rootReducer } = state;
//   return {
//     tokenUse: rootReducer.token,
//   };
// };

class LoginScreen extends Component {
  state = {
    /** Flag that indicates whether image should. */
    imageShow: true,
    username: '',
    password: '',
  };

  componentWillUnmount() {
    if (this.timoutImageShow !== undefined) {
      this.timoutImageShow = null;
    }
  }

  changeUsername = username => this.setState({ username });

  changePassword = password => this.setState({ password });

  changeToken = token => this.setState({ token });

  disableImage = () => {
    if (this.timoutImageShow !== undefined) {
      clearTimeout(this.timoutImageShow);
    }
    this.setState({ imageShow: false });
  };

  enableImage = () => {
    const timeoutShow = 20;
    this.timoutImageShow = setTimeout(() => this.setState({ imageShow: true }), timeoutShow);
  };

  navigate = (route, params) => {
    const { navigation: { navigate } } = this.props;
    return navigate(route, params);
  }

  continue = () => {
    const { username, password, token } = this.state;

    // eslint-disable-next-line no-console
    console.log(`username: ${username} password: ${password}`);
    //console.log(`usernameBACK: ${user}`);
    this.navigate('HomeScreen');
    // if ((username === users[0].email || users[1].email)
    // && (password === users[0].password || users[1].password)) {
    //   this.navigate('HomeScreen');
    // }
  };

  render() {
    const { imageShow, username, password } = this.state;

    return (
      <Container behavior="padding">
        <Logo source={logoSource} />

        <Box title="Login">
          {imageShow === true && (<Image source={loginImageSource} />)}

          <InputBox>
            <Input
              placeholder="User Name"
              onFocus={this.disableImage}
              onEndEditing={this.enableImage}
              value={username}
              RightIconInput
              onChangeText={this.changeUsername}
            />
            <Input
              placeholder="Password"
              onFocus={this.disableImage}
              onEndEditing={this.enableImage}
              value={password}
              onChangeText={this.changePassword}
              secureTextEntry
            />
          </InputBox>

          <Button onPress={this.continue}>Continue</Button>
        </Box>
      </Container>
    );
  }
}

LoginScreen.propTypes = {
};

LoginScreen.defaultProps = {
  tokenUse: '',
};

// export default connect(mapStateToProps)(LoginScreen);
export default LoginScreen;
