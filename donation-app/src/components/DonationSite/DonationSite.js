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
    this.id += "-" + this.siteData.siteId;
  },
  methods: {},
};
