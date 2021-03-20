export default {
  name: "CharityRequest",
  components: {},
  props: {
    requestData: Object,
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {
    selectRequest() {
      this.$emit("select-request", this.requestData.id);
    },
  },
};
