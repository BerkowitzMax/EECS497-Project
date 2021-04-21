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
    db.collection("Charities").get().then((query) => {
        query.forEach((doc) => {
          var d = doc.data();
          if (d.name && d.phone && d.address && d.acceptingDonations) {
            // parse
            let site = {
              siteId: d.email.split("@")[0],
              charityName: d.name,
              charityPhone: d.phone,
              charityAddress: d.address,
              picture: d.imageURL,
            };

            this.donationSites.push(site);
          }
        });
      });
  },
  methods: {},
};
