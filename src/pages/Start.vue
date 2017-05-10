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
