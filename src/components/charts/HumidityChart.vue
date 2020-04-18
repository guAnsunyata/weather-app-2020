<script>
import { Doughnut } from 'vue-chartjs'

const mainColor = '#37a2eb'
const secColor = '#eee'

const options = {
  mixins: [Doughnut],
  props: {
    humidity: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    this.renderChart({
      datasets: [
        {
          data: [this.humidity, 100 - this.humidity],
          backgroundColor: [mainColor, secColor],
        },
      ],
      labels: ['humidity', ''],
    })
  },
}

export default options
</script>
