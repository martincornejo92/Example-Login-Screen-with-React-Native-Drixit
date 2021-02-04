import React, { Component } from 'react';
import { Input } from 'react-native-elements';
import {
  Text,
} from 'react-native';
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
import {saveToken, onUserData} from '../../stores/actions';
import { TextInput } from 'react-native-gesture-handler';

const logoSource = require('../../../assets/logo.png');
const loginImageSource = require('../../../assets/images/login-image.png');

const mapStateToProps = (state) => {
  const { rootReducer } = state;
  return {
    tokenUse: rootReducer.token,
    Users: rootReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => (
  {
    saveTokens: (action) => dispatch(saveToken(action)),
    saveUsers: (action) =>  dispatch(onUserData(action)),
  }
);

class LoginScreen extends Component {
  state = {
    /** Flag that indicates whether image should. */
    imageShow: true,
    username: null,
    password: null,
    message:null,
    token: null,
  };

  componentDidMount(){
    const { tokenUse } = this.props;
    console.log("tokenuUSE:",tokenUse);
    if (tokenUse !== null){
      this.navigate('HomeScreen');
    }
  }

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

  async getUser(){
    const {saveUsers} = this.props;
     await fetch('http://localhost:3001/api/getuser', {
      method: 'GET',
      params:{
        email: this.state.username,
      }
   })
   .then((response) => response.json())
    .then((responseJson) => {
    console.log("responseUser:", responseJson)
    saveUsers(responseJson.user);
      if(responseJson.user !== undefined){

        this.navigate('HomeScreen');
        }
   })
   .catch((error) => {
      console.error(error);
   });
  }

   async getToken() {
     const {saveTokens} = this.props;
     await fetch('http://localhost:8000/auth/login', {
      method: 'POST',
      headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    },
      body: JSON.stringify({
        email: this.state.username,
        password: this.state.password
   })
  })
   .then((response) => response.json())
   .then((responseJson) => {
    console.log("response:", responseJson)
    saveTokens(responseJson.access_token);
    this.setState({ message : responseJson.message });
     //this.getUser();
     if(responseJson.access_token !== undefined){

      this.navigate('HomeScreen');
      }
   })
   .catch((error) => {
      console.error(error);
   });
  }

  continue = async () => {
    const { username, password } = this.state;
    this.getToken();
  };

  render() {
    const { imageShow, username, password, message } = this.state;
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
             {this.state.username  !== null ? (<Input
              placeholder="Password"
              onFocus={this.disableImage}
              onEndEditing={this.enableImage}
              value={password}
              onChangeText={this.changePassword}
              secureTextEntry
            /> ) : null}
          </InputBox>
          {this.state.message  !== null ? ( <Text style={{color: 'red'}}>{message}</Text>) : null}
          <Button onPress={this.continue}>Continue</Button>
        </Box>
      </Container>
    );
  }
}

LoginScreen.propTypes = {
};

LoginScreen.defaultProps = {
};

// export default connect(mapStateToProps)(LoginScreen);
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
