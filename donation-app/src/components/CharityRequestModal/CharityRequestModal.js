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
    acceptRequest() {
      this.$emit("accept-request");
    },
    rejectRequest() {
      this.$emit("reject-request");
    },
  },
};
