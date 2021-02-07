import React, { Component } from 'react';
import { Card } from 'react-native-elements';
import {
  Image,
  ImageBackground,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Email from '../../components/Email';
import Separator from '../../components/Separator';
import Button from '../../components/Button';
import { connect } from 'react-redux';
import { saveToken } from '../../stores/actions';
import * as SecureStore from 'expo-secure-store';

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  emailContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 45,
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
  },
  placeIcon: {
    color: 'white',
    fontSize: 26,
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  telContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userCityRow: {
    backgroundColor: 'transparent',
  },
  userCityText: {
    color: '#A5A5A5',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  userImage: {
    borderColor: '#FFF',
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  },
  button: {
    marginTop: '60%',
    marginBottom: '20%',
    marginLeft: '10%',
    marginRight: '10%',
  },
});

const mapDispatchToProps = (dispatch) => (
  {
    saveTokens: (action) => dispatch(saveToken(action)),
    saveUsers: (action) =>  dispatch(onUserData(action)),
  }
);

const mapStateToProps = (state) => {
  const { rootReducer } = state;
  return {
    tokenUse: rootReducer.token,
    userData: rootReducer.user,
  };
};

class HomeScreen extends Component {
  componentDidMount(){
  }

  onPressEmail = (email) => {
    Linking.openURL(`mailto://${email}?subject=subject&body=body`).catch(err => console.log('Error:', err));
  }

  renderHeader = (name,surname,avatar) => (
    <View style={styles.headerContainer}>
      <ImageBackground
        style={styles.headerBackgroundImage}
        blurRadius={10}
      >
        <View style={styles.headerColumn}>
          <Image
            style={styles.userImage}
            source={{ uri: avatar }}
          />
          <View style={styles.userAddressRow}>
            <View style={styles.userCityRow}>
              <Text style={styles.userCityText}>
                {name}
                ,
                {surname}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  )

  renderEmail = (email, role,id) => (
    <Email
      key={`email-${id}`}
      name={role}
      email={email}
      onPressEmail={this.onPressEmail}
    />
  )

  navigate = (route, params) => {
    const { navigation: { navigate } } = this.props;
    return navigate(route, params);
  }


  _close = async () => {
    const {saveTokens, tokenUse} = this.props;
    saveTokens(null);
    await SecureStore.setItemAsync('email', '');
    await SecureStore.setItemAsync('password', '');
    await SecureStore.setItemAsync('tokens', '');
    this.navigate('LoginScreen');
  };

  render() {
    const {saveTokens, tokenUse, userData} = this.props;
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            {this.renderHeader(userData[0].name,userData[0].surname,userData[0].avatar)}
            {Separator()}
            {this.renderEmail(userData[0].email,userData[0].role,userData[0].id)}
          </Card>
        </View>
        <View style={styles.button}>
          <Button onPress={this._close}>Sign Out</Button>
        </View>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen);
