import React from 'react'
import { Text , View } from 'react-native'

const Header = (props) => {
  const { textStyle, viewStyle } = styles
  
  return (
    <View style={viewStyle}>
      <Text style={textStyle}>
        {props.headerText}  
      </Text>
    </View>
  )
};

const styles = {
  viewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 30,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  },
  textStyle: {
    fontSize: 20
  }
}

export { Header };

