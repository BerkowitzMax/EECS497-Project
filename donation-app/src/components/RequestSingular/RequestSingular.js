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
      parseAllergens() {
        let allergens = [];
        for (var key in this.singleRequest.allergens) {
          if (this.singleRequest.allergens[key]) {
            allergens.push(key);
          }
        }
        return allergens;
      }
    },
  };