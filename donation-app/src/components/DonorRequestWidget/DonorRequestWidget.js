import DonorRequest from "@/components/DonorRequest/index.vue";

export default {
  name: "DonorRequestWidget",
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
          charityName: "Test Charity 0",
          charityContact: "000-000-0000",
          charityLocation: "Charity Location",
          donationLabel: "Donation Label",
          charityImage: "profile-image-placeholder.png",
          formData: {},
        },
        {
          id: 1,
          status: "Pending",
          dateCreated: new Date(),
          charityName: "Test Charity 1",
          charityContact: "111-111-111",
          charityLocation: "Charity Location",
          donationLabel: "Donation Label",
          charityImage: "profile-image-placeholder.png",
          formData: {},
        },
        {
          id: 2,
          status: "Pending",
          dateCreated: new Date(),
          charityName: "Test Charity 2",
          charityContact: "222-222-2222",
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
          charityName: "Test Charity 3",
          charityContact: "333-333-3333",
          charityLocation: "Charity Location",
          donationLabel: "Donation Label",
          charityImage: "profile-image-placeholder.png",
          formData: {},
        },
        {
          id: 4,
          status: "Accepted",
          dateCreated: new Date(),
          charityName: "Test Charity 4",
          charityContact: "444-444-4444",
          charityLocation: "Charity Location",
          donationLabel: "Donation Label",
          charityImage: "profile-image-placeholder.png",
          formData: {},
        },
        {
          id: 5,
          status: "Rejected",
          dateCreated: new Date(),
          charityName: "Test Charity 5",
          charityContact: "555-555-5555",
          charityLocation: "Charity Location",
          donationLabel: "Donation Label",
          charityImage: "profile-image-placeholder.png",
          formData: {},
        },
        {
          id: 6,
          status: "Rejected",
          dateCreated: new Date(),
          charityName: "Test Charity",
          charityContact: "666-666-6666",
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
