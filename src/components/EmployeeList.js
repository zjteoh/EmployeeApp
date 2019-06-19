import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { FlatList, ListView, Text} from 'react-native';
import { employeeFetch } from '../actions';
import EmployeeItem from './EmployeeItem';

class EmployeeList extends Component {
  componentDidMount() {
    this.props.employeeFetch();
  }

  render() {
    return (
      <FlatList
        data={this.props.employees}
        keyExtractor={item => item.uid}
        renderItem={({item}) => (
          <EmployeeItem employee={item} />
        )}
      />
    );
  }
}

const mapStateToProps = state => {
  const employees = _.map(state.employee, (val, uid) => {
    return {...val, uid};
  });

  return { employees };
}

export default connect(mapStateToProps, {employeeFetch})(EmployeeList);
