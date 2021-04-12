import { db } from '@/main';
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
      charity_id: null,
      id: 0,
      selectedRequest: {},
      pendingRequests: [],
      resolvedRequests: [],
    };
  },
  computed: {},
  mounted() {
    // fetch logged in charity name
    db.collection("Charities").doc(this.$route.params.id).get().then((doc) => {
      this.charity_id = doc.data().name;
    });

    // Retrieve request data from firebase
    db.collection("Requests").get().then((query) => {
      query.forEach((doc) => {
        var d_title = doc.id.split(/-(.+)/)
        var d = doc.data();
        this.parseRequest(d.items, d_title[0], d.charity_info, d.status);
      });
    });
  },
  methods: {
    // TODO once requests are resolved, users should have the ability to make donations to the charity again
    parseRequest(form_data, user, charity, pstatus) {
      // skip requests to other charities
      if (this.charity_id == charity.charityName) {
        db.collection("Donors").doc(user).get().then((doc) => {
          var donor = doc.data();

          let request = {
            fbid: (user + "-" + this.charity_id),
            id: this.id,
            status: pstatus,
            dateCreated: new Date(),
            donorName: donor.username,
            donorContact: donor.phone,
            donationLabel: "donation label",
            donorLocation: donor.address,
            formData: form_data,
            picture: donor.picture
          }
          this.id += 1;

          if (pstatus == "Pending")
            this.pendingRequests.push(request)
        });
      }
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
        status: "Accepted"
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
        status: "Rejected"
      });
      this.pendingRequests.splice(index, 1);
    },
  },
};
