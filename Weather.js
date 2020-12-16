import React from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';
import PropTypes from 'prop-types';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';

const weatherOptions = {
  Clear: {
    iconName: 'weather-partly-cloudy',
    gradient: ['#d39d38','#4da0b0']
  }
}

export default function Weather({temp, condition}) {
  return  <LinearGradient
  // Background Linear Gradient
  colors={weatherOptions[condition].gradient}
  style={styles.container}
>
<StatusBar barStyle="light-content" />
<View style={styles.halfContainer}>
<MaterialCommunityIcons size={96} name={weatherOptions[condition].iconName || 'weather-sunset'} style={styles.text} />
<Text style={styles.temp}>{temp}°</Text>  
</View>
<View style={styles.halfContainer}>
  <Text style={styles.text}>lorem</Text>
</View>
</LinearGradient>   
}

Weather.propTypes = {
  temp: PropTypes.number.isRequired,
  condition: PropTypes.oneOf(['Thunderstorm','Drizzle','Rain','Snow','Clear','Clouds','Atmosphere']).isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  temp: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white'
  },  
  text: {
    color: 'white'
  },
  halfContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    
  }
})

