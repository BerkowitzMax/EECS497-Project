import { db } from "@/main";
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
    // TODO filter by preferences
    // Retrieve request data from database
    db.collection("Charities")
      .get()
      .then((query) => {
        query.forEach((doc) => {
          var d = doc.data();
          if (d.name && d.phone && d.location && d.acceptingDonations) {
            // parse
            let site = {
              siteId: d.email.split("@")[0],
              charityName: d.name,
              charityContact: d.phone,
              charityLocation: d.location,
              picture: d.picture,
            };

            this.donationSites.push(site);
          }
        });
      });
  },
  methods: {},
};
