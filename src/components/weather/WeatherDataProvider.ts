import Vue from 'vue'
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options'
import { CombinedVueInstance } from 'vue/types/vue'

import WeatherService, {
  LocationName,
  WeatherData,
} from '@/services/WeatherService'
import { getSingleNode } from '@/utils/vnode-utils.ts'
import { VNode } from 'vue/types/umd'

export type ComponentOption = ThisTypedComponentOptionsWithRecordProps<
  Instance,
  Data,
  Methods,
  Computed,
  Props
>
export type ComponentInstance = CombinedVueInstance<
  Instance,
  Data,
  Methods,
  Computed,
  Props
>
export interface Instance extends Vue {
  weatherService: WeatherService
}
export interface Data {
  weatherData: WeatherData
  isPending: boolean
  isError: string
}
export interface Methods {
  getWeather: (locationName: LocationName) => void
}
export interface Computed {
  transformedData: WeatherSummary[]
  locationName: string
}
export interface Props {
  location: LocationName
}
export interface WeatherSummary {
  id: number
  date: number
  maxTemp: number
  minTemp: number
  humidity: number
}

const options: ComponentOption = {
  name: 'WeatherDataProvider',
  props: {
    location: {
      type: String as () => LocationName,
      required: true,
    },
  },
  data() {
    return {
      isPending: false,
      isError: '',
      weatherData: null,
    }
  },
  beforeCreate() {
    this.weatherService = new WeatherService()
  },
  watch: {
    location: {
      immediate: true,
      handler(val) {
        this.getWeather(val)
      },
    },
  },
  methods: {
    async getWeather(locationName: LocationName) {
      try {
        this.isPending = true
        const locationResponse = await this.weatherService.getWoeidByLocationName(
          locationName
        )
        if (!locationResponse.data[0]) {
          this.isError = `Location ${locationName} not found.`
          return
        }

        const woeid = locationResponse.data[0].woeid
        const weatherResponse = await this.weatherService.getWeatherByWoeid(
          woeid
        )

        this.weatherData = weatherResponse.data
        this.isError = ''
      } catch (e) {
        this.isError = 'Oops! Something went wrong.'
        throw e
      } finally {
        this.isPending = false
      }
    },
  },
  computed: {
    locationName() {
      if (!this.weatherData) return null
      return this.weatherData.title
    },
    transformedData() {
      if (!this.weatherData) return null

      return this.weatherData.consolidated_weather.slice(1).map((obj) => ({
        id: obj.id,
        date: obj.applicable_date,
        maxTemp: obj.max_temp,
        minTemp: obj.min_temp,
        humidity: obj.humidity,
      }))
    },
  },
  render(h) {
    if (this.isPending) {
      return h('div', 'Loading...') // or another slot
    }

    if (this.isError) {
      return h('div', this.isError) // or another slot
    }

    if (!this.$scopedSlots.default || !this.transformedData) {
      return h()
    }
    const comp = this.$scopedSlots.default({
      locationName: this.locationName,
      data: this.transformedData,
    }) as VNode | VNode[]

    return getSingleNode(h, comp)
  },
}

export default options
