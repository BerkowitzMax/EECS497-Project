import DonorRequestWidget from "@/components/DonorRequestWidget/index.vue";
import DonationSiteWidget from "@/components/DonationSiteWidget/index.vue";

export default {
  name: "DonorHome",
  components: {
    DonorRequestWidget,
    DonationSiteWidget,
  },
  props: {},
  data() {
    return {
      donationSucceeded: false,
      donationFailed: false
    };
  },
  computed: {},
  mounted() {},
  methods: {},
};
