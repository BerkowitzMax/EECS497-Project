import RequestSingular from "@/components/RequestSingular/index.vue";

export default {
  name: "CharityRequest",
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
    //console.log(this.requestData.formData);
  },
  methods: {
    getNumRequests() {
      return this.requestData.formData.length;
    },
    acceptRequest() {
      this.$emit("accept-request");
    },
    rejectRequest() {
      this.$emit("reject-request");
    },
  },
};
