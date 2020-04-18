<template>
  <div class="Weather">
    <!-- input -->
    <div class="form">
      <div class="input">
        <BaseInput
          :value="locationName"
          placeholder="Location Name"
          @keyup.enter.native="submit"
          @updateValue="(val) => (locationName = val)"
        />
      </div>
      <div class="submit">
        <BaseButton @click="submit">Submit</BaseButton>
      </div>
    </div>

    <!-- chart -->
    <div class="dashboard">
      <WeatherDataProvider
        v-if="currentLocationName"
        :location="currentLocationName"
      >
        <template v-slot="{ locationName, data }">
          <h1 class="title">Location: {{ locationName }}</h1>
          <!-- temperature -->
          <div class="chart">
            <TempChart
              title="Max/Min temperature"
              :dateArr="data.map((data) => data.date)"
              :maxTempArr="data.map((data) => data.maxTemp)"
              :minTempArr="data.map((data) => data.minTemp)"
            />
          </div>

          <!-- humidity -->
          <div class="humidity">
            <div class="humidity-wrap" v-for="obj in data" :key="obj.id">
              <div class="humidity-date">
                {{ obj.date }}
                <br />
                <b>{{ obj.humidity }}%</b>
              </div>
              <div :key="obj.id">
                <HumidityChart :humidity="obj.humidity" />
              </div>
            </div>
          </div>
        </template>
      </WeatherDataProvider>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options'
import { CombinedVueInstance } from 'vue/types/vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import TempChart from '@/components/charts/TempChart.vue'
import HumidityChart from '@/components/charts/HumidityChart.vue'
import WeatherDataProvider from './WeatherDataProvider'

const options: ComponentOption = {
  components: {
    BaseInput,
    BaseButton,
    WeatherDataProvider,
    TempChart,
    HumidityChart,
  },
  data() {
    return {
      currentLocationName: null,
      locationName: '',
    }
  },
  methods: {
    submit() {
      if (!this.locationName) {
        alert('Please provide a valid location')
        return
      }
      this.currentLocationName = this.locationName
      this.locationName = ''
    },
  },
}

export default options

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
export interface Instance extends Vue {}
export interface Data {
  currentLocationName: string | null
  locationName: string
}
export interface Methods {}
export interface Computed {}
export interface Props {}
</script>

<style lang="scss" scoped>
.Weather {
  text-align: center;
}

.chart {
  padding: 25px;
  max-width: 500px;
  margin: 0 auto;
}

.form {
  display: flex;
  max-width: 500px;
  margin: 0 auto;
  padding-bottom: 20px;

  .input {
    flex: 1;
    padding-right: 30px;
  }

  .submit {
    flex: 0 1 auto;
  }
}

.dashboard {
  margin: 0 auto;
}

.humidity {
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  .humidity-wrap {
    width: calc(100% / 3 - 20px);
    padding: 10px;

    @media (max-width: 900px) {
      width: calc(100% / 2 - 20px);
    }
  }
}
</style>
