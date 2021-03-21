import DonationSite from "@/components/DonationSite/index.vue";

export default {
  name: "DonationSitesWidget",
  components: {
    DonationSite,
  },
  props: {},
  data() {
    return {
      donationSites: [
        {
          // Should be stored in the database eventually
          charityName: "Charity Name 0",
          charityContact: "000-000-0000",
          charityLocation: "Ann Arbor, MI",
        },
        {
          // Should be stored in the database eventually
          charityName: "Charity Name 1",
          charityContact: "111-111-1111",
          charityLocation: "Ann Arbor, MI",
        },
        {
          // Should be stored in the database eventually
          charityName: "Charity Name 2",
          charityContact: "222-222-2222",
          charityLocation: "Ann Arbor, MI",
        },
      ],
    };
  },
  computed: {},
  mounted() {},
  methods: {
    addSite() {
      // TODO: retrieve request data from database
      let site = {};

      this.pendingRequests.push(site);
    },
  },
};
