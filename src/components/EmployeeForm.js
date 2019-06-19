import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card, CardSection, Input, Button} from './common';
import { employeeCreate } from '../actions';

class EmployeeForm extends Component {
  state = { name: '', email: '', phone: '', salary: ''};

  onButtonPress() {
    this.props.employeeCreate(this.state);
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            autoCapitalize={"words"}
            label={"Name"}
            placeholder={"John Doe"}
            value={this.state.name}
            onChangeText={name => this.setState({name})}
          />
        </CardSection>

        <CardSection>
          <Input
            autoCapitalize={"none"}
            label={"Email"}
            placeholder={"johndoe@gmail.com"}
            value={this.state.email}
            onChangeText={email => this.setState({email})}
          />
        </CardSection>

        <CardSection>
          <Input
            autoCapitalize={"none"}
            label={"Phone"}
            placeholder={"0123456789"}
            value={this.state.phone}
            onChangeText={phone => this.setState({phone})}
          />
        </CardSection>

        <CardSection>
          <Input
            autoCapitalize={"none"}
            label={"Salary"}
            placeholder={"4500"}
            value={this.state.salary}
            onChangeText={salary => this.setState({salary})}
          />
        </CardSection>

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Add Employee
          </Button>
        </CardSection>
      </Card>
    );
  }
}

export default connect(null, { employeeCreate })(EmployeeForm);
