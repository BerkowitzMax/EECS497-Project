import { db } from "@/main";
import CharityRequestWidget from "@/components/CharityRequestWidget/index.vue";
import Compressor from "compressorjs";

export default {
  name: "CharityHome",
  components: {
    CharityRequestWidget,
  },
  props: {},
  data() {
    return {
      user_id: this.$route.params.id,
      username: "",
      email: "",
      name: "Set charity name",
      phone: "",
      address: "",
      link: "Add a link to your website",
      description: "Add a charity description",
      editDescription: false,
      acceptingDonations: false,
      imageURL: null,
      showSaveMsg: false,
      editFields: {
        acceptingDonations: false,
        name: "",
        address: "",
        phone: "",
        link: "",
      },
    };
  },
  inject: ["mySpinner"],
  computed: {},
  mounted() {
    this.mySpinner.val = true;

    // parse user profile
    db.collection("Charities").doc(this.user_id).get().then((doc) => {
        let d = doc.data();
        this.email = d.email;
        this.username = d.username;
        this.acceptingDonations = d.acceptingDonations;
        this.editFields.acceptingDonations = d.acceptingDonations;

        if (d.name) this.name = d.name;
        if (d.phone) this.phone = d.phone;
        if (d.address) this.address = d.address;
        if (d.link) this.link = d.link;
        if (d.description) this.description = d.description;
        if (d.imageURL) {
          this.imageURL = d.imageURL;
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
        this.name = this.editFields.name;
        this.editFields.name = "";
      }
      if (this.editFields.address) {
        this.address = this.editFields.address;
        this.editFields.address = "";
      }
      if (this.editFields.phone) {
        this.phone = this.editFields.phone;
        this.editFields.phone = "";
      }
      if (this.editFields.link) {
        this.link = this.editFields.link;
        this.editFields.link = "";
      }

      db.collection("Charities")
        .doc(this.user_id)
        .update({
          acceptingDonations: this.acceptingDonations,
          name: this.name,
          phone: this.phone,
          address: this.address,
          link: this.link,
          imageURL: this.imageURL
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
    updateToggle() {
      db.collection("Charities")
        .doc(this.user_id)
        .update({
          acceptingDonations: this.acceptingDonations,
        });
    },
    removeImage() {
      this.imageURL = null;

      db.collection("Charities")
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
      db.collection("Charities")
        .doc(this.user_id)
        .update({
          description: this.description,
        });
    },
  },
};
