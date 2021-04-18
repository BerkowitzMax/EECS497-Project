import DonationFormModal from "@/components/DonationFormModal/index.vue";

export default {
  name: "DonationSite",
  components: {
    DonationFormModal,
  },
  props: {
    siteData: Object,
  },
  data() {
    return {
      id: "#formModal",
    };
  },
  computed: {},
  mounted() {
    let hyphen = this.siteData.charityName
      .split(" ")
      .join("-")
      .replace("'", "_");
    this.id += "-" + hyphen;
  },
  methods: {},
};
