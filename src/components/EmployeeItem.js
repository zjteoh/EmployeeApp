import React, { Component } from 'react';
import { Text } from 'react-native';
import { CardSection } from './common';

export default class EmployeeItem extends Component {
  render() {
    const { name } = this.props.employee;

    return (
      <CardSection>
        <Text>{name}</Text>
      </CardSection>
    );
  }
}


