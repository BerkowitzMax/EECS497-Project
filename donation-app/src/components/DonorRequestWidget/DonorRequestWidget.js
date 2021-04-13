import { db } from '@/main';
import DonorRequest from "@/components/DonorRequest/index.vue";

export default {
  name: "DonorRequestWidget",
  components: {
    DonorRequest,
  },
  props: {},
  data() {
    return {
      user_id: this.$route.params.id,
      // iterate through all charities to find the specified one and pull info from firebase
      findCharityInfo: function(charity_name) {
        db.collection("Charities").get().then((query) => {
          query.forEach((doc) => {
            if (doc.data().name == charity_name) {
              return {
                "name": doc.data().name,
                "contact": doc.data().contact,
                "location": doc.data().location
              }
            }
          });
        });
      },
      id: 0,
      pendingRequests: [],
      resolvedRequests: [],
    };
  },
  computed: {},
  mounted() {
    // Retrieve request data from firebase
    db.collection("Requests").get().then((query) => {
      query.forEach((doc) => {
        var d_title = doc.id.split(/-(.+)/)

        // only logged in user's requests
        if (d_title[0] == this.user_id) {
          
          // iterate through all charities to find the specified one and pull info from firebase
          var charity_info = {};
          db.collection("Charities").get().then((query) => {
            query.forEach((doc) => {
              if (doc.data().name == d_title[1]) {
                charity_info = {
                  "name": doc.data().name,
                  "contact": doc.data().contact,
                  "location": doc.data().location,
                  "link": doc.data().link
                }
              }
            });
          })
          .then(()=> {
            var d = doc.data();
            this.parseRequest(d.items, d_title[0], charity_info, d.status);
          });
        }
      });
    });
  },
  methods: {
    // TODO once requests are resolved, users should have the ability to make donations to the charity again
    parseRequest(form_data, user, charity, pstatus) {
      // skip requests from other users
      if (this.user_id == user){
        var request = {
          id: this.id,
          status: pstatus,
          dateCreated: new Date(),
          charity: charity,
          donationLabel: "Donation to " + charity.name,
          formData: form_data, // TODO consider removing this
        }  
        this.id += 1;

        if (pstatus == "Pending")
          this.pendingRequests.push(request);
        else
          this.resolvedRequests.push(request);
      }
    },
  },
};
