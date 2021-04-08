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
        var d = doc.data();
        this.parseRequest(d.items, d_title[0], d.charity_info, d.status);
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
          charityName: charity.charityName,
          charityContact: charity.charityContact,
          charityLocation: charity.charityLocation,
          donationLabel: "Donation Label",
          charityImage: "profile-image-placeholder.png",
          formData: form_data,
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
