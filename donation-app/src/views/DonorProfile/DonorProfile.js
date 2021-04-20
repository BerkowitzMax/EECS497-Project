import { db } from "@/main";
import DonorStatsWidget from "@/components/DonorStatsWidget/index.vue";
import Compressor from "compressorjs";

export default {
  name: "DonorProfile",
  components: {
    DonorStatsWidget,
  },
  props: {},
  data() {
    return {
      user_id: this.$route.params.id,
      username: null,
      email: null,
      bio: "Add a bio",
      phone: null,
      address: null,
      imageURL: null,
      editDescription: false,
      showSaveMsg: false,
      editFields: {
        username: "",
        address: "",
        phone: "",
      },
    };
  },
  inject: ["mySpinner"],
  computed: {},
  // load profile information
  mounted() {
    this.mySpinner.val = true;
    // parse user profile
    db.collection("Donors")
      .doc(this.user_id)
      .get()
      .then((doc) => {
        var d = doc.data();
        this.username = d.username;
        this.email = d.email;
        if (d.bio) {
          this.bio = d.bio;
        }
        if (d.phone) {
          this.phone = d.phone;
        }
        if (d.address) {
          this.address = d.address;
        }
        if (d.picture) {
          this.imageURL = d.picture;
        }
      })
      .catch((error) => {
        console.error("Error getting document:", error);
      })
      .then(() => {
        this.mySpinner.val = false;
      });
  },
  methods: {
    saveDetails() {
      this.acceptingDonations = this.editFields.acceptingDonations;

      if (this.editFields.name) {
        this.username = this.editFields.username;
        this.editFields.username = "";
      }
      if (this.editFields.address) {
        this.address = this.editFields.address;
        this.editFields.address = "";
      }
      if (this.editFields.phone) {
        this.phone = this.editFields.phone;
        this.editFields.phone = "";
      }

      db.collection("Donors")
        .doc(this.user_id)
        .update({
          username: this.username,
          phone: this.phone,
          address: this.address,
        })
        .then(() => {
          this.showSaveMsg = true;
          setTimeout(() => {
            document.getElementById("save-msg").style.display = "none";
            this.showSaveMsg = false;
          }, 5000);
        })
        .catch(function(error) {
          alert(error + " : This data could not be saved successfully.");
        });
    },
    removeImage() {
      this.imageURL = null;

      db.collection("Donors")
        .doc(this.user_id)
        .update({
          imageURL: this.imageURL,
        })
        .catch(function(error) {
          alert(error + " : This data could not be saved successfully.");
        });
    },
    saveImage(event) {
      if (!event.target.files[0]) {
        this.imageURL = null;
        return;
      }

      let picture = event.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        this.imageURL = reader.result;
      });

      new Compressor(picture, {
        quality: 1,
        maxHeight: 160,
        maxWidth: 160,
        success(compressed) {
          reader.readAsDataURL(compressed);
        },
        error(err) {
          console.error(err.message);
        },
      });
    },
    saveDescription() {
      this.editDescription = false;
      db.collection("Donors")
        .doc(this.user_id)
        .update({
          bio: this.bio,
        });
    },
  },
};
