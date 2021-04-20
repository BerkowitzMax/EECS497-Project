export default {
    name: "RequestSingular",
    components: {},
    props: {
      singleRequest: Object,
      requestIter: Number,
      numRequests: Number,
    },
    data() {
      return {};
    },
    computed: {},
    mounted() {},
    methods: {
      getAllergens() {
        let allergens = this.singleRequest.allergens;
        return Object.keys(allergens);
      },
    },
  };