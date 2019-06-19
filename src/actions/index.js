import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'

export const loginSuccess = (user) => {
  return {
    type: 'USER_LOGIN_SUCCESS',
    payload: user
  }
};

export const employeeCreate = ({name, phone, email, salary}) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .push({name, phone, email, salary})
      .then(() => {
        dispatch({type: 'EMPLOYEE_CREATED'});
        Actions.employeeList({type: 'reset'});
      });
  }
};

export const employeeFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .on('value', snapshot => {
        dispatch({type:'EMPLOYEE_FETCH_SUCCESS', payload: snapshot.val()});
      });
  };
};
