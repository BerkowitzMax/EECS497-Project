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
    toggle() {
      this.collapsed = !this.collapsed;
    },
  },
};
