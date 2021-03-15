export default async function getCurrentWeather(locationCoords) {
    
    const axios= require ('axios')
    
    const lat = locationCoords.latitude
    const log = locationCoords.longitude 
    
    var result = []


    
    await axios.get('http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={log}&appid=a5f7d749ecf244275b5d92796a944a55')
    .then((response) => {
        const data = response.data
        const locationName = (data.sys.country + ', ' + data.name)
        const temperatureMax = data.main.temp_min
        const temperatureMin = data.main.temp_max
        const wind = data.wind.speed
        const humidity = data.main.humidity
        const currentTemperature = data.main.temp
        
        result=[currentTemperature, temperatureMin, temperatureMax, locationName, wind, humidity]
    })
    .catch((error) => {
        console.log(error)
    })
    return result
}
    




