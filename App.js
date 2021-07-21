
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Image } from 'react-native';
import { useState } from 'react';



export default function App() {


  const [city, setCity] = useState('');
  const [ location, setLocation] = useState('');
  const [date, setDate] = useState("Mercredi 30 juin 2021");

  function handleCity(text) {
    setCity(text)
  }

  function research() { 

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8e602b9ea28ed4f9f8fc97a5f6d1105c&lang=fr&units=metric&9daa141010f72a8ff13846eaf7287142,`)

    .then(res => res.json())
    .then(jsonRes =>{
      setLocation({
        cityName:jsonRes.name,

        cityTime:jsonRes.timezone,
        cityCountry:jsonRes.sys.country,

        cityDescription:jsonRes.weather[0].description,
        cityWeatherIcon:jsonRes.weather[0].icon,
        cityCurrentTemperature:jsonRes.main.temp,
        cityMiniTemperature:jsonRes.main.temp_min,
        cityMaxiTemperature:jsonRes.main.temp_max,
        citySpeedWind:jsonRes.wind.speed
      })
    });

    Alert.alert(
      "City Found : "
      + city);
  }

  return (
    <View style={styles.container}>

      <View>
        <Text style={{ fontSize: 40, marginTop: 10 }}>Weather In Your City </Text>
      </View>

      <View>
        <Text>{date}</Text>
      </View>

      <View style={{ marginBottom: 10, marginTop: 100, }}>
        <Text style={{ fontSize: 40,}} > {location.cityName} </Text>
      </View>

      <View>
        <Text>  {location.cityDescription} </Text>
        <Image
        style={{ width:100, height:100}}
        source={{ uri: `http://openweathermap.org/img/wn/${location.cityWeatherIcon}@2x.png`}}
        />
      </View>

      <View><Text> Time:  {location.cityTime} </Text></View>
      <View><Text> Country:  {location.cityCountry} </Text></View>

      <View><Text> Temperature:  {location.cityCurrentTemperature}° </Text></View>
      <View><Text> Temperature minimum:  {location.cityMiniTemperature}° </Text></View>
      <View><Text> Temperature maximum:  {location.cityMaxiTemperature}° </Text></View>
      <View><Text> Wind:  {location.citySpeedWind} Km/h</Text></View>
      <View style={{ marginBottom: 10 }}><Text style={{ fontSize: 20 }}> Research Your City:</Text></View>

      <View>
        <TextInput
          style={{ textAlign: "center", borderWidth: 1, height: 25, marginBottom: 10, marginLeft: 10, fontSize: 15 }}
          onChangeText={handleCity}
          placeholder="Your City"
          placeholderTextColor="#000000"/>
      </View>

      <Button title="Enter" onPress={research}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1995CC',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});


