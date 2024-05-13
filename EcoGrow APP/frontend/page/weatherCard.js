import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    ScrollView,
  } from "react-native";
  import * as Location from 'expo-location';
  import OpenCage from 'opencage-api-client';
  import Icon2 from "react-native-vector-icons/MaterialIcons";
  import MapView, { Marker } from 'react-native-maps';

const WeatherCard = ({selectedTerm}) => {

    const details = {
        farmar_name: "Farmer’s Name",
        date_name: "Today",
        date: "Saturday, 11 Sept",
        cloudy: "33",
        cloudy2: "29°/27°",
        feels: "39",
        wsw: "9 KM",
        Precipitation: "21%",
        Wind: "10 km/h",
        Humidity: "59%",
        Sunset: "29%",
        location: "Location here",
        datenext: "For next 03 weeks",
      };
    
      const [location, setLocation] = useState(null);
      const [errorMsg, setErrorMsg] = useState(null);
      const [weather, setWeather] = useState(null); 

      const [markerCoords, setMarkerCoords] = useState(null);

      const handleMapPress = async (event) => {
        const { coordinate } = event.nativeEvent;
        setMarkerCoords(coordinate);
        try {
    
          const apiKey = "e35637c32ac41b65a503ba03df95ab4f";
          const { latitude, longitude } = coordinate;
          const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
          setWeather(weatherResponse.data);
          const reverseGeocodeResponse = await OpenCage.geocode({
            key: 'a9d2b664123442c2ac1d91e6ef9cfee3',
            q: `${latitude},${longitude}`,
          });
  
          const placeName = reverseGeocodeResponse.results[0].formatted.split(',')[1].trim();
  
          setLocation({
            latitude,
            longitude,
            placeName
          });
    
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      useEffect(() => {
        const fetchData = async () => {
          try{
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
              console.log(errorMsg)
              return;
            }
    
            let location = await Location.getCurrentPositionAsync({});
            
            const apiKey = "e35637c32ac41b65a503ba03df95ab4f";
            const { latitude, longitude } = location.coords;
            const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
            setWeather(weatherResponse.data);
            
            const reverseGeocodeResponse = await OpenCage.geocode({
              key: 'a9d2b664123442c2ac1d91e6ef9cfee3',
              q: `${latitude},${longitude}`,
            });
    
            const placeName = reverseGeocodeResponse.results[0].formatted.split(',')[1].trim();
    
            setLocation({
              latitude,
              longitude,
              placeName
            });
            const WeatherData = {
              location: location.coords,
              weather: weatherResponse.data,
              term: selectedTerm
            };
            await axios.post('http://192.168.43.87:5000/weather', WeatherData);
          }catch(error){
            console.error("Error fetching data:", error);
          }
        }
        fetchData();
      }, []);

  return (
    <View style={styles.content}>
    <MapView
          style={styles.map}
          initialRegion={{
            latitude: 7.8731, // Adjust these coordinates to focus on Sri Lanka
            longitude: 80.7718,
            latitudeDelta: 2.5,
            longitudeDelta: 2.5,
          }}
          onPress={handleMapPress}
        >
          {markerCoords && (
            <Marker
              coordinate={markerCoords}
              title="Marker Title"
              description="Marker Description"
            />
          )}
        </MapView>
    
    <View style={styles.bgbox}>
      {weather && (
        <>
          <View style={styles.bgrow}>
            <View style={styles.bgrow01}>
              {location && (
                <Text style={styles.bgtx01}>
                  <Icon2 name="location-on" size={20} color="#0EAB73" />
                  {location.placeName}
                </Text>
              )}
              <Text style={styles.bgtx02}>{details.datenext}</Text>
              <Text style={styles.bgtx03}>
                {weather.main.temp}°<Text style={styles.bgtx03sm}>AVG</Text>
              </Text>
              <Text style={styles.bgtx04}>
                {details.cloudy2} | Feels like{' '}
                <Text style={styles.bgtx04b}> {weather.main.temp}°C</Text>
              </Text>
              <Text style={styles.bgtx04}>
                Wind <Text style={styles.bgtx04b}> {weather.wind.speed}</Text>/H WSW
              </Text>
            </View>
            <View style={styles.bgrow02}>
              <Image
                source={require('../assets/sun.png')} // Replace with the path to your image
                style={styles.sunimg}
              />
              <Text style={styles.bgtx04b}>Partly cloudy</Text>
            </View>
          </View>
          <View style={styles.rowdots}></View>
          <View style={styles.bgrow}>
            <View style={styles.bgrow01}>
              <View style={styles.lirow}>
                <Image source={require('../assets/imgico01.png')} style={styles.imgico} />
                <Text style={styles.bgtx04li}>
                  Precipitation: <Text style={styles.bgtx04b}> {details.Precipitation}</Text>
                </Text>
              </View>
              <View style={styles.lirow}>
                <Image source={require('../assets/imgico02.png')} style={styles.imgico} />
                <Text style={styles.bgtx04li}>
                  Wind: <Text style={styles.bgtx04b}> {weather.wind.speed}%</Text>
                </Text>
              </View>
            </View>
            <View style={styles.bgrow01}>
              <View style={styles.lirow}>
                <Image source={require('../assets/imgico03.png')} style={styles.imgico} />
                <Text style={styles.bgtx04li}>
                  Humidity: <Text style={styles.bgtx04b}> {weather.main.humidity}%</Text>
                </Text>
              </View>
              <View style={styles.lirow}>
                <Image source={require('../assets/imgico04.png')} style={styles.imgico} />
                <Text style={styles.bgtx04li}>
                  Sunset: <Text style={styles.bgtx04b}>{new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</Text>
                </Text>
              </View>
            </View>
          </View>
        </>
      )}
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    top: "1%",
    left: "10%",
    width: "80%",
    height: "37%",
    backgroundColor: "green",
    position: "absolute",
  },
  coordsContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
    elevation: 4,
  },
    safeArea: {
      flex: 1,
      // backgroundColor: "#F2F2F2",
    },
    safebox: {
      width: "100%",
      height: 30,
      backgroundColor: "#0EAB73",
    },
    TBgreen: {
      width: "100%",
      borderBottomLeftRadius: 48,
      borderBottomRightRadius: 48,
      overflow: 'hidden',
      paddingBottom: 20,
      paddingHorizontal: 20,
    },
    uprow: {
      width: "100%",
      flexDirection: "row",
    },
    uprow01: {
      width: "100%",
      paddingLeft: 20,
      height: 240,
    },
    upimg: {
      position: 'absolute',
      bottom: 0,
      right: 0,
    },
    upicon: {
      marginTop: 30,
      zIndex: 30,
    },
    uptx01: {
      color: "#FFF",
      fontSize: 64,
      fontWeight: "700",
      marginTop: -10,
      marginBottom: -5,
      zIndex: 30,
    },
    uptx02: {
      color: "#FFF",
      fontSize: 16,
      fontWeight: "400",
      zIndex: 30,
    },
    rowcen: {
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    },
    signUpText: {
      color: "#FFF",
      fontSize: 20,
      fontWeight: "700",
      marginLeft: 8,
    },
    label: {
      color: "#000",
      fontSize: 14,
      fontWeight: "400",
      marginBottom: 5,
    },
    toollabel: {
      color: "#9B9EAD",
      fontSize: 12,
      fontWeight: "400",
    },
    input: {
      width: "100%",
      height: 40,
      borderColor: "#FFF",
      borderBottomWidth: 1,
      color: "#FFF"
    },
    searchlist: {
      borderColor: "#FFF",
      borderBottomWidth: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 10,
    },
    blueRow: {
      backgroundColor: "#00A0E3",
      alignItems: "center",
      justifyContent: "flex-end",
      height: 95,
      marginBottom: 30,
    },
    profileicon: {
      width: 65,
      height: 65,
      borderRadius: 15,
    },
    toolbox: {
      width: 60,
      height: 60,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F1EEEE",
      borderRadius: 30,
      margin: 10,
    },
    marrow4: {
      marginTop: 20,
      width: "100%",
      flex: 1,
      resizeMode: "cover",
      borderRadius: 30,
      flexDirection: "row",
    },
    labelInputContainer: {
      flexDirection: "column",
      alignItems: "flex-start",
      marginBottom: 20,
    },
    mapBox: {
      flexDirection: "row",
      width: 251,
      height: 100,
      padding: 10,
      borderRadius: 20,
      marginRight: 10,
      marginTop: 10,
      marginBottom: 10,
    },
    mapBoxrow01: {
      flexDirection: "row",
      width: "85%",
    },
    mapBoxrow01row1: {
      width: "40%",
      justifyContent: "center",
      alignItems: "flex-end",
    },
    mapBoxrow01row2: {
      width: "60%",
      justifyContent: "center",
      alignItems: "flex-start",
      paddingLeft: 10,
    },
    daytx: {
      width: 55,
      minHeight: 70,
      borderRadius: 10,
      padding: 5,
      justifyContent: "center",
      alignItems: "center",
    },
    daytxtext: {
      fontSize: 13,
      color: "#FFF",
      fontWeight: "900",
    },
    daytxtext1: {
      fontSize: 12,
      color: "#FFF",
      fontWeight: "400",
      marginTop: 3,
    },
    daytxtext2: {
      fontSize: 14,
      color: "#FFF",
      fontWeight: "700",
      marginTop: 3,
    },
    daytxtext3: {
      fontSize: 12,
      color: "#FFF",
      fontWeight: "400",
      marginTop: 3,
    },
    mapBoxrow02: {
      width: "15%",
      alignItems: "center",
    },
    marrow4row1: {
      width: "70%",
      padding: 10,
    },
    manimg: {
      width: "100%",
    },
    marrow4row2: {
      width: "30%",
      justifyContent: "center",
      alignContent: "center",
    },
    marbox: {
      margin: 10,
      marginHorizontal: 20,
      paddingBottom: 70,
    },
    boxtx01: {
      fontSize: 24,
      color: "#282C3F",
      fontWeight: "900",
      marginTop: 4,
    },
    boxtx02: {
      fontSize: 13,
      color: "#000",
      fontWeight: "400",
      marginTop: 4,
    },
    marrow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    scroltool: {
      width: "100%",
      flexDirection: "row",
    },
    marrow2: {
      flexDirection: "row",
      width: "100%",
      padding: 10,
      backgroundColor: "#F1EEEE",
      borderRadius: 30,
      marginTop: 20,
    },
    marrow3: {
      marginTop: 20,
    },
    marrow2row1: {
      width: "15%",
      alignItems: "center",
      justifyContent: "center",
    },
    marrow2row2: {
      width: "70%",
    },
    marrow2row3: {
      width: "15%",
      alignItems: "center",
      justifyContent: "center",
    },
    whiteBox2: {
      borderRadius: 12,
      padding: 10,
      paddingTop: 15,
      paddingBottom: 15,
      marginVertical: 10,
      marginBottom: 5,
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      borderColor: "#E0DDDD",
      borderStyle: "solid",
      borderWidth: 1,
    },
    toolbar: {
      flexDirection: "row",
      backgroundColor: "#fff",
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      justifyContent: "space-around",
      alignItems: "center",
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 60,
      borderLeftWidth: 2,
      borderRightWidth: 2,
      borderTopWidth: 3,
      borderColor: "rgba(0, 0, 0, 0.020)",
    },
    tab: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  
    toollabelActive: {
      fontSize: 12,
      color: "#0EAB73",
      fontWeight: "600",
    },
    titletx: {
      fontSize: 32,
      color: "#282C3F",
      fontWeight: "700",
    },
    titletx2: {
      fontSize: 32,
      color: "#282C3F",
      fontWeight: "700",
      marginLeft: 25,
    },
    titletx3: {
      fontSize: 24,
      color: "#282C3F",
      fontWeight: "600",
    },
    titlebox: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 5,
      marginBottom: 20,
    },
    titlebox2: {
      flexDirection: "row",
      alignItems: "center",
    },
    titleboxtx: {
      fontSize: 20,
      color: "#000",
      fontWeight: "700",
    }, titleboxlogout: {
      fontSize: 14,
      color: "#6E6E6E",
      fontWeight: "400",
      marginLeft: 10,
    },
    fogottx: {
      color: "#000",
      fontSize: 14,
      fontWeight: "400",
      marginBottom: 5,
      marginTop: 10,
    },
    profimgbox: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
      marginBottom: 20,
    },
    profileimg: {
      width: 116,
      height: 116,
      borderRadius: 116,
    },
    proficonadd: {
      backgroundColor: "#F98B4E",
      width: 40,
      height: 40,
      borderColor: "#FFF",
      borderRadius: 115,
      borderStyle: "solid",
      borderWidth: 2,
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      bottom: 0,
      right: 15,
    },
    profimgminibox: {
      position: "relative",
    },
    logobot: {
      marginBottom: 60,
    },
    logoutbox: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "8%",
    },
    logoutbox2: {
      flexDirection: "row",
    },
    logout: {
      color: "#414452",
      fontSize: 14,
      fontWeight: "400",
      marginLeft: 10,
    },
    rotaticon: {
      transform: [{ rotate: '180deg' }],
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      overflow: "scroll",
    },
    popupBox: {
      position: 'absolute',
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      padding: 20,
      top: '35%',
      left: '50%',
      transform: [{ translateX: -Dimensions.get('window').width / 2.6 }],
      width: Dimensions.get('window').width / 1.3,
      elevation: 5,
    },
    closeIcon: {
      position: 'absolute',
      top: 10,
      right: 10,
    },
    rowpop: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    poptx01: {
      color: "#383233",
      fontSize: 14,
      fontWeight: "300",
      marginTop: 5,
    },
    poptx02: {
      color: "#383233",
      fontSize: 20,
      fontWeight: "700",
      textAlign: "center",
      marginTop: 5,
    },
    poptx03: {
      color: "#6E6E6E",
      fontSize: 16,
      fontWeight: "500",
    },
    popbtn: {
      backgroundColor: "#19825C",
      height: 50,
      borderRadius: 12,
      marginHorizontal: 5,
      marginVertical: 15,
      justifyContent: "center",
      alignItems: "center",
    },
    popbtntx: {
      color: "#FFF",
      fontSize: 16,
      fontWeight: "500",
    },
    bgbox: {
      backgroundColor: "#FAFAFA",
      borderRadius: 16,
      padding: 15,
      marginTop: 200,
    },
    bgrow: {
      width: "100%",
      flexDirection: "row",
    },
    bgrow01: {
      width: "50%",
    },
    bgrow02: {
      width: "50%",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    bgrow03: {
      width: "50%",
      alignItems: "flex-end",
    },
    bgtx01: {
      color: "#0EAB73",
      fontSize: 15,
      fontWeight: "700",
      alignItems: "center",
    },
    bgtx02: {
      color: "#414452",
      fontSize: 10,
      fontWeight: "500",
      marginTop: 2,
      marginLeft: 3,
    },
    bgtx03: {
      color: "#0EAB73",
      fontSize: 50,
      fontWeight: "700",
      marginTop: -7,
      marginBottom: -12,
    },
    bgtx03sm: {
      color: "#0EAB73",
      fontSize: 12,
      fontWeight: "700",
      marginTop: -7,
      marginBottom: -12,
    },
    bgtx04: {
      color: "#9B9EAD",
      fontSize: 12,
      fontWeight: "400",
      marginTop: 5,
    },
    bgtx04b: {
      color: "#4C8973",
      fontSize: 12,
      fontWeight: "400",
    },
    sunimg: {
      marginBottom: 15,
    },
    bgtx04li: {
      color: "#9B9EAD",
      fontSize: 12,
      fontWeight: "400",
      marginTop: 5,
    },
    imgico: {
      marginRight: 5,
      marginTop: 3,
    },
    lirow: {
      flexDirection: "row",
      // justifyContent: "center",
      alignItems: "center",
      marginTop: 5,
    },
    rowdots: {
      width: "100%",
      height: 1,
      borderWidth: 1,
      borderStyle: "dashed",
      borderColor: "rgba(0, 60, 10, 0.51)",
      marginTop: 20,
      marginBottom: 15,
    },
    trackbtn: {
      height: 60,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#19825C",
      flexDirection: "row",
      borderRadius: 16,
      marginVertical: 30,
    },
    tracktx: {
      color: "#FFF",
      fontSize: 16,
      fontWeight: "600",
      marginLeft: 5,
    },
  
    spacerow: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginVertical: 10,
    },
    Active_space: {
      width: 102,
      height: 40,
      borderRadius: 12,
      backgroundColor: "#19825C",
      justifyContent: "center",
      alignItems: "center",
    },
    spacebox: {
      width: 102,
      height: 40,
      borderRadius: 12,
      backgroundColor: "#ECF6EF",
      justifyContent: "center",
      alignItems: "center",
    },
    Active_sptx01: {
      color: "#FFF",
      fontSize: 14,
      fontWeight: "500",
    },
    sptx02: {
      color: "#5A5959",
      fontSize: 14,
      fontWeight: "400",
    },
    croptx: {
      color: "#0EAB73",
      fontSize: 16,
      fontWeight: "600",
      marginTop: 30,
    },
    cropbox: {
      width: "100%",
      padding: 15,
      backgroundColor: "#FAFAFA",
      borderRadius: 16,
      marginTop: 10,
      alignItems: "center",
      flexDirection: "row",
    },
    cropimg: {
      width: 62,
      height: 62,
      borderRadius: 100,
      borderWidth: 1,
      borderColor: "#0EAB73",
    },
    croptx2: {
      color: "#414452",
      fontSize: 16,
      fontWeight: "400",
      marginLeft: 20,
    },
    hedrow: {
      flexDirection: "row",
      width: "100%",
      marginBottom: 10,
    },
    hedrow01: {
      width: "10%",
      justifyContent: "flex-end",
    },
    hedrow02: {
      width: "80%",
    },
    searchlisttx: {
      color: "#FFF",
      fontSize: 16,
      fontWeight: "400",
    },
});

export default WeatherCard;
