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
      selectedRequest: {},
      pendingRequests: [
        {
          // Will come from database eventually
          id: 0,
          status: "Pending",
          dateCreated: new Date(),
          donorName: "Donor Name 1",
          donorContact: "555-555-5555",
          donationLabel: "Test1",
          donorLocation: "Ann Arbor, MI",
          formData: {},
        },
        {
          id: 1,
          status: "Pending",
          dateCreated: new Date(),
          donorName: "Donor Name 2",
          donorContact: "555-555-5555",
          donationLabel: "Test2",
          donorLocation: "Ann Arbor, MI",
          formData: {},
        },
        {
          id: 2,
          status: "Pending",
          dateCreated: new Date(),
          donorName: "Donor Name 3",
          donorContact: "555-555-5555",
          donationLabel: "Test3",
          donorLocation: "Ann Arbor, MI",
          formData: {},
        },
      ],
      resolvedRequests: [],
    };
  },
  computed: {},
  mounted() {},
  methods: {
    addPendingRequest() {
      // TODO: retrieve request data from database
      let request = {};

      this.pendingRequests.push(request);
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
      this.pendingRequests.splice(index, 1);
    },
    rejectSelectedRequest() {
      let index = this.pendingRequests
        .map((request) => request.id)
        .indexOf(this.selectedRequest.id);
      this.pendingRequests[index].status = "Rejected";
      this.resolvedRequests.push(this.pendingRequests[index]);
      this.pendingRequests.splice(index, 1);
    },
  },
};
