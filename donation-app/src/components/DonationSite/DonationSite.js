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
      id: "#formModal"
    };
  },
  computed: {},
  mounted() {
    var hyphen = this.siteData.charityName.split(' ').join('-');
    this.id += '-' + hyphen;
  },
  methods: {},
};
