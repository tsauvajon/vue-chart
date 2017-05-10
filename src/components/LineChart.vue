<template>
  <div class="content">
    <div class="container">
      <div class="search_container">
        <input
          class="search_input"
          @keyup.enter="requestData"
          placeholder="Nom du package npm"
          type="search"
          name="search"
          v-model="package"
        >
        <button class="search_button" @click="requestData">
          Trouve
        </button>
      </div>
      <div class="error-message" v-if="showError">
        {{ errorMessage }}
      </div>
      <hr>
      <h1 class="title" v-if="loaded">
        {{ packageName }}
      </h1>
      <div class="chart_container" v-if="loaded">
        <div class="chart_title">
          Téléchargements par jour
          <span>
            {{ period }}
          </span>
          <hr>
        </div>
        <div class="chart_content">
          <line-chart
            v-if="loaded"
            :chart-data="downloads"
            :chart-labels="labels"
          ></line-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Line } from 'vue-chartjs';

  export default Line.extend({
    props: {
      chartData: {
        type: Array || Object,
        required: false,
      },
      chartLabels: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
                gridLines: {
                  display: true,
                },
              },
            ],
          },
          legend: {
            display: false,
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      };
    },
    mounted() {
      this.renderChart({
        labels: this.chartLabels,
        datasets: [
          {
            label: 'Téléchargements',
            borderColor: '#249EBF',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            backgroundColor: 'transparent',
            data: this.chartData,
          },
        ],
      }, this.options);
    },
  });
</script>
