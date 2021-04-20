export default {
  name: "DonorRequest",
  components: {},
  props: {
    requestData: Object,
  },
  data() {
    return {
      collapsed: true,
    };
  },
  computed: {},
  mounted() {},
  methods: {
    selectRequest() {
      this.$emit("select-request", this.requestData.id, this.requestData.status);
    },
  },
};
