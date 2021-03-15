import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {useState, useEffect} from 'react'
import { Feather } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import MainCard from './components/MainCard'
import InfoCard from './components/InfoCard'
import *as Location from 'expo-location'
import getCurrentWeather from './API/ConsultApi'



export default function App() {
  

  const [darkTheme, setDarkTheme] = useState(true)
  const [currentTemperature, setCurrentTemperature] = useState('15')
  const [location, setLocation] = useState('Juiz de Fora')
  const [currentHour, setCurrentHour] = useState('22:00')

  const [wind, setWind] = useState('65')
  const [umidity, setUmidity] = useState('80')
  const [minima, setMinima] = useState('15')
  const [maxima, setMaxima] = useState('22')
  const [locationCoords, setLocationCoords] = useState([])


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkTheme ? '#232634':'#f2f2f2',
      alignItems: 'center',
    },
    temperature: {
      alignItems: 'center',
      flexDirection:'row',
      marginTop: 10,
    },
    temperatureText: {
      fontSize: 50,
      color: darkTheme ? 'white' : 'black',
    },
    refreshButton: {
    position: 'absolute',
    margin: 30,
    alignSelf:'flex-start',
  },
    cardView:{
      color : darkTheme ? 'white':'black',
      margin: 10,
      flexDirection:'row',
      alignItems:'center',
    },
    info:{
      alignItems:'center',
      backgroundColor: darkTheme? '#393e54': '#8F8F8F',
      borderRadius: 20,
      width:350,
      height: 200,
    },
    infoText:{
      color: darkTheme ? '#e0e0e0':'white',
      fontSize:20,
      fontWeight: 'bold',
      margin: 15,
    },
    infoCard:{
      flexDirection:'row',
      flexWrap:'wrap',
    },
    themeButton:{
      margin: 10,
      marginLeft:300,
    
      justifyContent:'center',
      width: 50,
      height: 50,
      borderRadius:25,
    },
    squareButton:{
      backgroundColor: darkTheme? '#f2f2f2': '#8F8F8F',
      justifyContent:'center',
      borderRadius: 20,
      marginRight: 20,
      width:50,
      height:25
    },
    circleButton:{
      alignSelf:darkTheme ? 'flex-end' : 'flex-start',
      backgroundColor: darkTheme? '#232634': '#f2f2f2',
      margin: 5,
      width: 20,
      height:20,
      borderRadius: 50,
    },
    
  });
  async function setCurrentWeather () {
    
    let date = new Date ()
    setCurrentHour(date.getHours() + ':' + date.getMinutes())
    
    await getLocation()
    
    
    const data = await getCurrentWeather(locationCoords)
    setCurrentTemperature(convertKelvinInC(data[0]))
    setMinima(convertKelvinInC (data[1]))
    setMaxima(convertKelvinInC (data[2]))
    setLocation(data [3])
    setWind(data [4])
    setUmidity(data [5])
    

  }
  function convertKelvinInC(kelvin){
    return parseInt(kelvin-273)
  }
  
  async function getLocation() {
    let{status} = await Location.requestPermissionsAsync()
    if(status !== 'granted'){
      setErrorMsg('Sem Permissão')
    }else{
      let location = await Location.getCurrentPositionAsync({}) 
      await setLocationCoords(location.coords)
      
    }
  }
  useEffect(()=>{
   setCurrentWeather
  },[])


  return (
    <View style={styles.container}>
      <TouchableOpacity  style={styles.refreshButton}>
      <EvilIcons name="refresh" size={30} color={darkTheme ? 'white':'black'} />
      </TouchableOpacity>

      <Feather name="sun" style={{marginTop:55}} size={40} color="orange" />
      <View style={styles.temperature}>
        <Text style={styles.temperatureText}>{currentTemperature}</Text>
        <Text style={[styles.temperatureText, {fontSize:14}]}>°C</Text>
      </View>
      
      <Text style={[styles.temperatureText,{fontSize:14}]}>{location}, {currentHour} </Text>

      <View style={styles.cardView}>
        <MainCard title={'Manhã'} backgroundColor={darkTheme ? '#ff873d': '#cc6e30'} temperature='22°' icon={'morning'}> </MainCard>
        <MainCard title={'Tarde'} backgroundColor={darkTheme ? '#D29600': '#FCC63F'}temperature='19°' icon={'after'}> </MainCard>
        <MainCard title={'Noite'} backgroundColor={darkTheme ? '#008081': '#38B7B8'}temperature='15°' icon={'night'}> </MainCard>
      </View>

      <View style={styles.info}>
        <Text style={styles.infoText}>Informações adicionais</Text>
        <View style={styles.infoCard}> 
          <InfoCard title='Vento' value={wind + ' m/h'}></InfoCard>
          <InfoCard title='Umidade' value={ umidity + '%'}></InfoCard>
          <InfoCard title='Temp. min' value={ minima + '°C'}></InfoCard>
          <InfoCard title='Temp. max' value={ maxima + '°C'}></InfoCard>
        </View>
      </View>

      <View style={styles.themeButton}>
        <View style={styles.squareButton}>
          <TouchableOpacity style={styles.circleButton} onPress={()=> darkTheme? setDarkTheme(false) : setDarkTheme(true)}>

          </TouchableOpacity>
        </View>

      </View>  
    </View>
  );

}
          
  


          
          



