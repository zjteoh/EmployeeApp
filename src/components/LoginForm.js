import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Text , View, TouchableOpacity} from 'react-native';
import { Input, Button, Card, CardSection, Spinner } from './common';
import { loginSuccess } from '../actions';
import { Actions } from 'react-native-router-flux';

class LoginForm extends Component {
  state = { email: '' , password: '', password_check: '', statusText: '', error: false, loading: false, signup: false};

  onLoginPress() {
    this.setState({statusText: '', loading: true});

    const { email, password } = this.state;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess())
  }

  onSignupPress() {
    this.setState({statusText: '', loading: true});
  
    const { email, password, password_check } = this.state;

    if (password != password_check) {
      this.setState({
        statusText: 'Passwords entered differed',
        loading: false,
        email: '',
        password: '',
        password_check: '',
        error: true
      });
    }
    else {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(this.onSignupSuccess())
    }
  }
  
  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }
    else
      return (
        <Button onPress={this.state.signup ? this.onSignupPress.bind(this) : this.onLoginPress.bind(this)}>
          {this.state.signup ? "Sign up" : "Log in"}
        </Button>
      );
  }

  changeForm() {
    if (this.state.signup) {
      this.setState({signup: false, statusText: '', error: false});
    }
    else {
      this.setState({signup: true, statusText: '', error: false});
    }
  }

  changeFormText() {
    if (!this.state.signup) {
      return (
        "New user? Signup now"
      );
    }
    
    return "Already a user? Login now";
  }

  onLoginFail() {
    this.setState({
      password: '',
      password_check: '',
      statusText: "Login failed",
      loading: false,
      error: true
    });
  }

  onLoginSuccess() {
    const { currentUser } = firebase.auth();

    this.props.loginSuccess(currentUser);

    this.setState({
      email: '',
      password: '',
      password_check: '',
      loading: false,
      statusText: 'Successfully logged in',
      error: false
    });

    Actions.main();
  }

  onSignupSuccess() {
    this.setState({
      statusText: "Successfully signed up",
      loading: false,
      password: '',
      password_check: '',
      email: '',
      error: false,
      signup: false
    });
  }

  onSignupFail() {
    this.setState({
      email: '',
      password: '',
      password_check: '',
      loading: false,
      statusText: 'An error occured when signing up',
      error: true
    });
  }
    
  render() {
    return (
      <View style={{flex: 1}}>
      <Card style={{flex: 1}}>
        <CardSection>
          <Input
            autoCapitalize={'none'}
            secureTextEntry={false}
            placeholder={"johndoe@gmail.com"}
            label={"email"}
            value={this.state.email}
            onChangeText={(text) => this.setState({email: text})}
          />
        </CardSection>

        <CardSection>
          <Input
            autoCapitalize={'none'}
            secureTextEntry={true}
            placeholder={"********"}
            label={"password"}
            value={this.state.password}
            onChangeText={(text) => this.setState({password: text})}
          />
        </CardSection>
        
        {
          this.state.signup ? 
            <CardSection>
              <Input
                autoCapitalize={'none'}
                secureTextEntry={true}
                placeholder={"********"}
                label={"reenter password"}
                value={this.state.password_check}
                onChangeText={(text) => this.setState({password_check: text})}
              />
            </CardSection>
          : null
        }

        <CardSection>
          {this.renderButton()}
        </CardSection>
        
        <Text style={this.state.error ? styles.errorTextStyle : styles.successTextStyle}>
          {this.state.statusText}
        </Text>
      </Card>

      <View style={styles.changeFormStyle}>
        <TouchableOpacity onPress={this.changeForm.bind(this)}>
          <Text style={styles.changeFormButtonStyle}>{this.changeFormText()}</Text>
        </TouchableOpacity>
      </View>
      </View>
    );
  }
}

const styles = {
  errorTextStyle: {
    marginTop: 20,
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  successTextStyle: {
    marginTop: 20,
    fontSize: 20,
    alignSelf: 'center',
    color: 'green'
  },
  changeFormStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  changeFormButtonStyle: {
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
  }
};

export default connect(null, {loginSuccess})(LoginForm);
