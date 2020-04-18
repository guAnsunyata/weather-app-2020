import request from './request'

export const getWoeidByLocationName = (
  locationName: string
): Promise<LocationData> => {
  return request.get<LocationData>(
    `https://www.metaweather.com/api/location/search`,
    {
      params: {
        query: locationName,
      },
    }
  )
}

export const getWeatherByWoeid = (woeid: number): Promise<WeatherData> => {
  return request.get<WeatherData>(
    `https://www.metaweather.com/api/location/${woeid.toString()}`
  )
}

export type LocationData = any
export type WeatherData = any
