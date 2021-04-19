import { db } from "@/main";
import CharityRequest from "@/components/CharityRequest/index.vue";
import CharityRequestModal from "@/components/CharityRequestModal/index.vue";

export default {
  name: "CharityRequestWidget",
  components: {
    CharityRequest,
    CharityRequestModal,
  },
  props: {},
  data() {
    return {
      charity_id: this.$route.params.id,
      id: 0,
      selectedRequest: {},
      pendingRequests: [],
      resolvedRequests: [],
    };
  },
  inject: ["mySpinner"],
  computed: {},
  mounted() {
    // Retrieve request data from firebase
    db.collection("Requests").get().then((query) => {
        query.forEach((doc) => {
          var d_title = doc.id.split(/-(.+)/);

          // only logged in charity
          if (d_title[1] == this.charity_id) {
            var d = doc.data();
            this.parseRequest(d.items, d_title[0], d.status, d.timestamp);
          }
        });
      });
  },
  methods: {
    // TODO once requests are resolved, users should have the ability to make donations to the charity again
    parseRequest(form_data, user, pstatus, time) {
      db.collection("Donors").doc(user).get().then((doc) => {
          var donor = doc.data();

          let request = {
            fbid: user + "-" + this.charity_id,
            id: this.id,
            status: pstatus,
            timestamp: time,
            donorName: donor.username,
            donorPhone: donor.phone,
            donationLabel: "donation label",
            donorAddress: donor.address,
            formData: form_data,
            picture: donor.picture,
          };
          this.id += 1;

          console.log(request);
          if (pstatus == "Pending") this.pendingRequests.push(request);
        });
    },
    selectRequest(id) {
      // Set when Review Request modal is opened
      this.selectedRequest = this.pendingRequests[id];
    },
    acceptSelectedRequest() {
      let index = this.pendingRequests
        .map((request) => request.id)
        .indexOf(this.selectedRequest.id);
      this.pendingRequests[index].status = "Accepted";
      this.resolvedRequests.push(this.pendingRequests[index]);

      // update firebase
      db.collection("Requests").doc(this.pendingRequests[index].fbid).update({
          status: "Accepted",
        });
      this.pendingRequests.splice(index, 1);
    },
    rejectSelectedRequest() {
      let index = this.pendingRequests
        .map((request) => request.id)
        .indexOf(this.selectedRequest.id);
      this.pendingRequests[index].status = "Rejected";
      this.resolvedRequests.push(this.pendingRequests[index]);

      // update firebase
      db.collection("Requests").doc(this.pendingRequests[index].fbid).update({
          status: "Rejected",
        });
      this.pendingRequests.splice(index, 1);
    },
  },
};
