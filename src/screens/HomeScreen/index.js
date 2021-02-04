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
    marginTop: '100%',
    marginBottom: '20%',
  },
});

const users = [{
  id: 'it-drixit-1',
  avatar: 'https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png',
  email: 'it@drixit.com',
  password: 'some-password',
  name: 'IT',
  surname: 'Drixit',
  age: 25,
  role: 'admin'
}, {
  id: 'info-drixit-2',
  avatar: 'https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png',
  email: 'info@drixit.com',
  password: 'other-password',
  name: 'Info',
  surname: 'Drixit',
  age: 30,
  role: 'user'
}];

const mapDispatchToProps = (dispatch) => (
  {
    saveTokens: (action) => dispatch(saveToken(action)),
  }
);

const mapStateToProps = (state) => {
  const { rootReducer } = state;
  return {
    tokenUse: rootReducer.token,
  };
};

class HomeScreen extends Component {
  onPressPlace = () => {
    console.log('place');
  }

  onPressTel = (number) => {
    Linking.openURL(`tel://${number}`).catch(err => console.log('Error:', err));
  }

  onPressSms = () => {
    console.log('sms');
  }

  onPressEmail = (email) => {
    Linking.openURL(`mailto://${email}?subject=subject&body=body`).catch(err => console.log('Error:', err));
  }

  renderHeader = () => (
    <View style={styles.headerContainer}>
      <ImageBackground
        style={styles.headerBackgroundImage}
        blurRadius={10}
      >
        <View style={styles.headerColumn}>
          <Image
            style={styles.userImage}
            source={{ uri: users[0].avatar }}
          />
          <View style={styles.userAddressRow}>
            <View style={styles.userCityRow}>
              <Text style={styles.userCityText}>
                {users[0].name}
                ,
                {users[0].surname}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  )

  renderEmail = () => (
    <Email
      key={`email-${users[0].id}`}
      name={users[0].role}
      email={users[0].email}
      onPressEmail={this.onPressEmail}
    />
  )

  navigate = (route, params) => {
    const { navigation: { navigate } } = this.props;
    return navigate(route, params);
  }

  close = () => {
    const {saveTokens, tokenUse} = this.props;
    console.log("tokenUseHome", tokenUse)
    saveTokens(null);
    this.navigate('LoginScreen');
  }

  render() {
    const {saveTokens, tokenUse} = this.props;
    console.log("tokenUseHome", tokenUse)
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            {this.renderHeader()}
            {Separator()}
            {this.renderEmail()}
          </Card>
        </View>
        <View style={styles.button}>
          <Button onPress={this.close}>Sign Out</Button>
        </View>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen);
