import * as weatherApi from '@/api/weather'

class WeatherService {
  public async getWeatherByWoeid(
    woeid: Woeid
  ): Promise<weatherApi.WeatherData> {
    return weatherApi.getWeatherByWoeid(woeid)
  }

  public async getWoeidByLocationName(
    locationName: LocationName
  ): Promise<weatherApi.LocationData> {
    return weatherApi.getWoeidByLocationName(locationName)
  }
}

export type LocationName = string
export type Woeid = number
export type LocationData = weatherApi.LocationData
export type WeatherData = weatherApi.WeatherData

export default WeatherService
