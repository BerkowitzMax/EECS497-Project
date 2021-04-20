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
    processFormdata() {
      let a = this.requestData.formData;
      return a;
    },
    acceptRequest() {
      this.$emit("accept-request");
    },
    rejectRequest() {
      this.$emit("reject-request");
    },
  },
};
