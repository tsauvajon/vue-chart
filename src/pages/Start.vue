<script>
  import axios from 'axios';
  import LineChart from '@/components/LineChart';

  export default {
    components: {
      LineChart,
    },
    props: {},
    data() {
      return {
        package: null,
        packageName: '',
        period: 'last-month',
        loaded: false,
        downloads: [],
        labels: [],
        showError: false,
        errorMessage: 'Please enter a package name',
      };
    },
    mounted() {
      if (this.$route.params.package) {
        this.package = this.$route.params.package;
        this.requestData();
      }
    },
    methods: {
      resetState() {
        this.loaded = false;
        this.showError = false;
      },
      requestData() {
        if (this.package === null
          || this.package === ''
          || this.package === 'undefined') {
          this.showError = true;
          return;
        }
        this.resetState();
        axios
          .get(`https://api.npmjs.org/downloads/range/${this.period}/${this.package}`)
          .then((response) => {
            console.log(response.data);
            this.downloads = response.data.downloads.map(({ downloads }) => downloads);
            this.labels = response.data.downloads.map(({ day }) => day);
            this.packageName = response.data.package;
            this.setURL();
            this.loaded = true;
          })
          .catch((err) => {
            this.errorMessage = err.response.data.error;
            this.showError = true;
          });
      },
      setURL() {
        history.pushState({ info: `npm-stats ${this.package}` },
          this.package,
          `/#/${this.package}`,
        );
      },
    },
  };
</script>

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
