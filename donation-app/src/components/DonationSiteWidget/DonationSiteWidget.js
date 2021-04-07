import { db } from '@/main';
import DonationSite from "@/components/DonationSite/index.vue";

export default {
  name: "DonationSiteWidget",
  components: {
    DonationSite,
  },
  props: {},
  data() {
    return {
      donationSites: [],
    };
  },
  computed: {},
  mounted() {
    // Retrieve request data from database
    db.collection("Charities").get().then((query) => {
      query.forEach((doc) => {
        var d = doc.data();
        if (d.name && d.contact && d.location) {
          // parse
          let site = {
            charityName: d.name,
            charityContact: d.contact,
            charityLocation: d.location
          };

          this.donationSites.push(site);
        } 
      });
    });
  },
  methods: {
  },
};
