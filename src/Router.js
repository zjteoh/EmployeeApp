import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key='root' hideNavBar>
        <Scene key='auth'>
          <Scene key='login' component={LoginForm} title='Login'/>
        </Scene>
        <Scene key='main'>
          <Scene 
            initial
            key='employeeList' 
            component={EmployeeList} 
            title='Employees'
            rightTitle="Add"
            onRight={() => Actions.employeeForm()}
          />
          <Scene
            key='employeeForm'
            component={EmployeeForm}
            title="Add Employee"
          />
        </Scene>
      </Scene>
    </Router>
  );
}

export default RouterComponent;
