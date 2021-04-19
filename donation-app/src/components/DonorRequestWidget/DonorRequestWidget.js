import { db } from "@/main";
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
      id: 0,
      pendingRequests: [],
      resolvedRequests: [],
    };
  },
  inject: ["mySpinner"],
  computed: {},
  mounted() {
    this.mySpinner.val = true;
    // Retrieve request data from firebase
    db.collection("Requests").get().then((query) => {
        query.forEach((doc) => {
          var d_title = doc.id.split(/-(.+)/);

          // only logged in user's requests
          if (d_title[0] == this.user_id) {
            // iterate through all charities to find the specified one and pull info from firebase
            var charity_info = {};
            db.collection("Charities").get().then((query) => {
                query.forEach((doc) => {
                  if (doc.data().email.split("@")[0] == d_title[1]) {
                    charity_info = {
                      name: doc.data().name,
                      phone: doc.data().phone,
                      address: doc.data().address,
                      link: doc.data().link,
                    };
                  }
                });
              })
              .then(() => {
                let d = doc.data();
                this.parseRequest(
                  d.items,
                  d_title[0],
                  charity_info,
                  d.status,
                  d.timestamp
                );
              });
          }
        });
      })
      .then(() => {
        this.mySpinner.val = false;
      });
  },
  methods: {
    parseRequest(form_data, user, charity, pstatus, time) {
      // skip requests from other users
      if (this.user_id == user) {
        let request = {
          id: this.id,
          status: pstatus,
          timestamp: time,
          charity: charity,
          donationLabel: "Donation to " + charity.name,
          formData: form_data, // TODO consider removing this
        };
        this.id += 1;

        if (pstatus == "Pending") this.pendingRequests.push(request);
        else this.parseHistory();
      }
    },
    parseHistory(){
      this.user_id
      db.collection("History").get().then((query) => {
        query.forEach((doc) => {
          let d = doc.data();
        
          // logged in user requests
          if (d.Donor == this.user_id) {
            // fetch charity name
            let charity_info = {};

            db.collection("Charities").doc(d.Charity).get().then((doc) => {
              charity_info = {
                name: doc.data().name,
                phone: doc.data().phone,
                address: doc.data().address,
                link: doc.data().link,
              };
            }).then(() => {
              let request = {
                id: this.id,
                status: d.status,
                timestamp: d.time,
                charity: charity_info,
                donationLabel: "Donation to " + charity_info.name,
                formData: d.Request
              }
              this.id += 1;
              this.resolvedRequests.push(request)
            });

          }
        });
      })
    }
  },
};