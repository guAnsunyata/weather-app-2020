<script lang="ts">
import Vue from 'vue'
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options'
import { CombinedVueInstance } from 'vue/types/vue'
import { Bar } from 'vue-chartjs'

const fixTwo = (num: number) => num.toFixed(2)

const options: ComponentOption = {
  mixins: [Bar],
  props: {
    maxTempArr: {
      type: Array,
      required: true,
    },
    minTempArr: {
      type: Array,
      required: true,
    },
    dateArr: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    this.renderChart(
      {
        labels: this.dateArr,
        datasets: [
          {
            label: 'Max Temp',
            backgroundColor: '#f87979',
            data: this.maxTempArr.map(fixTwo),
          },
          {
            label: 'Min Temp',
            backgroundColor: '#ffc0c0',
            data: this.minTempArr.map(fixTwo),
          },
        ],
      },
      {
        scales: {
          yAxes: [
            {
              id: 'left-y-axis',
              ticks: {
                suggestedMin: 0,
                suggestedMax: 25,
              },
            },
          ],
        },
      }
    )
  },
}

export default options

export type Temp = number
export type Date = string

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
export interface Instance extends Bar {}
export interface Data {}
export interface Methods {}
export interface Computed {}
export interface Props {
  minTempArr: Temp[]
  maxTempArr: Temp[]
  dateArr: Date[]
}
</script>
