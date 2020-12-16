// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Loading from './Loading';
import Weather from './Weather';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import axios from 'axios';

const API_KEY = "2c1742f7f319ae13720039a0a04200ef"

export default class extends React.Component {
  state = {
    isLoading: true
  }
  getWeather = async (lat, lon) => {
    try {

      const {
        data:{
          main:{temp},
          weather
        }
      } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
      this.setState({isLoading: false, temp, condition: weather[0].main})
    } catch (e) {
      console.log(e);
    }
  }
  getLocation = async () => {
    try {
      const {status} = await Permissions.askAsync(Permissions.LOCATION)

      if(status === 'granted'){
        const location = Location.getCurrentPositionAsync({enableHighAccuracy: true})
        location.then(({coords: {latitude, longitude}}) => {
          console.log(latitude, longitude)
          this.getWeather(latitude, longitude)
        })
      }
    } catch (e) {
      console.error(e);  
    }
  }
  
  componentDidMount() {
    this.getLocation()
  }
  render (){
    const {isLoading, temp, condition} = this.state
    return  isLoading? <Loading /> : <Weather temp={Math.round(temp)} condition={condition} />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  yellowView: {
    flex: 1,
    backgroundColor: 'yellow'
  },
  blueView: {
    flex: 2,
    backgroundColor: 'blue'
  }
});
