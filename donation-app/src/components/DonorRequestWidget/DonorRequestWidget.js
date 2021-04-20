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

    db.collection("Requests").get().then((query) => {
      query.forEach((doc) => {
        let d_user = doc.id.split(/-(.+)/)[0];
        let d_charity = doc.id.split(/-(.+)/)[1];

        // only logged in user's requests
        if (d_user == this.user_id) {
          let charity_info = {};
          db.collection("Charities").doc(d_charity).get().then((doc) => {
            charity_info = {
              name: doc.data().name,
              phone: doc.data().phone,
              address: doc.data().address,
              link: doc.data().link,
            };
          })
          .then(() => {
            let d = doc.data();
            this.parseRequest(
              d.items,
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

    this.parseHistory();
  },
  methods: {
    parseRequest(form_data, charity, pstatus, time) {
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
    },
    parseHistory(){
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