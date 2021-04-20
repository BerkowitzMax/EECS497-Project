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
  },
};

