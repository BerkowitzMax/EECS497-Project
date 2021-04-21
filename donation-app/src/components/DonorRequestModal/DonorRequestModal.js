import RequestSingular from "@/components/RequestSingular/index.vue";

export default {
  name: "DonorRequest",
  components: {
    RequestSingular,
  },
  props: {
    requestData: Object,
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {
  },
  methods: {
    processFormdata() {
      let a = this.requestData.formData;
      return a;
    },
    formatDate() {
      let timestamp = this.requestData.timestamp.split(" ");
      let month = timestamp[1] += " ";
      let day = timestamp[2] += ", ";
      let time = timestamp[3] += " ";

      return month += day += time;
    }
  },
};

