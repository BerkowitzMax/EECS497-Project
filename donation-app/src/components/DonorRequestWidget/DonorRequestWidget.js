import { db } from "@/main";
import DonorRequest from "@/components/DonorRequest/index.vue";
import DonorRequestModal from "@/components/DonorRequestModal/index.vue";
import EventBus from "@/components/EventBus.vue";

export default {
  name: "DonorRequestWidget",
  components: {
    DonorRequest,
    DonorRequestModal
  },
  props: {},
  data() {
    return {
      user_id: this.$route.params.id,
      id: 0,
      selectedRequest: {},
      pendingRequests: [],
      resolvedRequests: [],
    };
  },
  inject: ["mySpinner"],
  computed: {},
  mounted() {
    this.mySpinner.val = true;
    this.getRequests();

    this.parseHistory();

    EventBus.$on("donation_success", () => {
      this.pendingRequests = [];
      this.getRequests();
    });
  },
  methods: {
    getRequests() {
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
              let request = this.parseRequest(
                d.items,
                charity_info,
                d.status,
                d.timestamp
              );
  
              if (request) this.pendingRequests.push(request);
            });
          }
        });
      })
      .then(() => {
        this.mySpinner.val = false;
      });
    },
    parseRequest(form_data, charity, pstatus, time) {
      let items = [];
      for (var item in form_data) {
        items.push(form_data[item].itemName);
      }

      let request = {
        id: this.id,
        status: pstatus,
        timestamp: time,
        charity: charity,
        formItems: items.toString().replace(",", ", "),
        formData: form_data
      };
      this.id += 1;

      if (pstatus == "Pending") {
        return request;
      }
      else {
        return null
      }
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
              let items = [];
              for (var item in d.Request) {
                items.push(d.Request[item].itemName);
              }

              let request = {
                id: this.id,
                status: d.status,
                timestamp: d.time,
                charity: charity_info,
                formItems: items.toString().replace(",", ", "),
                formData: d.Request
              }
              this.id += 1;
              this.resolvedRequests.push(request)
            });

          }
        });
      })
    },
    selectRequest(id, status) {
      // Set when View Request modal is opened

      if (status == "Pending") {
        for (var pkey in this.pendingRequests) {
          if (this.pendingRequests[pkey].id == id) {
            this.selectedRequest = this.pendingRequests[pkey];
            return;
          }
        }
      }
      else {
        for (var rkey in this.resolvedRequests) {
          if (this.resolvedRequests[rkey].id == id) {
            this.selectedRequest = this.resolvedRequests[rkey];
            return;
          }
        }
      }
      console.error("unable to find request");
    },
  },
};