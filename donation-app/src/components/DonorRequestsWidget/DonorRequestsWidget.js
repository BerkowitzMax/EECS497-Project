import DonorRequest from "@/components/DonorRequest/index.vue";

export default {
  name: "DonorRequestsWidget",
  components: {
    DonorRequest,
  },
  props: {},
  data() {
    return {
      pendingRequests: [
        {
          // Should come from database eventually
          id: 0,
          status: "Pending",
          dateCreated: new Date(),
          charityName: "Charity Name",
          charityContact: "Charity Contact",
          charityLocation: "Charity Location",
          donationLabel: "Donation Label",
          charityImage: "profile-image-placeholder.png",
          formData: {},
        },
        {
          id: 1,
          status: "Pending",
          dateCreated: new Date(),
          charityName: "Charity Name",
          charityContact: "Charity Contact",
          charityLocation: "Charity Location",
          donationLabel: "Donation Label",
          charityImage: "profile-image-placeholder.png",
          formData: {},
        },
        {
          id: 2,
          status: "Pending",
          dateCreated: new Date(),
          charityName: "Charity Name",
          charityContact: "Charity Contact",
          charityLocation: "Charity Location",
          donationLabel: "Donation Label",
          charityImage: "profile-image-placeholder.png",
          formData: {},
        },
      ],
      resolvedRequests: [
        {
          id: 3,
          status: "Accepted",
          dateCreated: new Date(),
          charityName: "Charity Name",
          charityContact: "Charity Contact",
          charityLocation: "Charity Location",
          donationLabel: "Donation Label",
          charityImage: "profile-image-placeholder.png",
          formData: {},
        },
        {
          id: 4,
          status: "Accepted",
          dateCreated: new Date(),
          charityName: "Charity Name",
          charityContact: "Charity Contact",
          charityLocation: "Charity Location",
          donationLabel: "Donation Label",
          charityImage: "profile-image-placeholder.png",
          formData: {},
        },
        {
          id: 5,
          status: "Rejected",
          dateCreated: new Date(),
          charityName: "Charity Name",
          charityContact: "Charity Contact",
          charityLocation: "Charity Location",
          donationLabel: "Donation Label",
          charityImage: "profile-image-placeholder.png",
          formData: {},
        },
        {
          id: 6,
          status: "Rejected",
          dateCreated: new Date(),
          charityName: "Charity Name",
          charityContact: "Charity Contact",
          charityLocation: "Charity Location",
          donationLabel: "Donation Label",
          charityImage: "profile-image-placeholder.png",
          formData: {},
        },
      ],
    };
  },
  computed: {},
  mounted() {},
  methods: {
    addRequest() {
      // TODO: retrieve request data from database
      let request = {};

      this.requests.push(request);
    },
  },
};
