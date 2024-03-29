import firebase from "firebase";
import { db } from "@/main";
import EventBus from "@/components/EventBus.vue"

export default {
  name: "LandingPage",
  components: {},
  data() {
    return {
      email: null,
      name: null,
      phone: "",
      address: "",
      charityName: "",
      link: "",
      activeTab: "donor",
      showSignUp: false,
      accountAlreadyExists: false,
    };
  },
  computed: {},
  mounted() {
    EventBus.$on("show_sign_up", () => {
      this.getStarted();
    })
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },
    getStarted() {
      this.showSignUp = true;
    },
    autoComp: function() {
      let autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("autoComplete")
      );
      autocomplete.addListener("place_changed", () => {
        var place = autocomplete.getPlace();

        if (!place.geometry) {
          document.getElementById("autoComplete").placeholder = "Enter a Place";
        } else {
          var addr = document.getElementById("autoComplete").value;
          this.address = addr;
        }
      });
    },

    GoogleLogin: function() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          const user = result.user;
          this.email = user.email;
          this.name = user.displayName;

          var path = user.email.split("@")[0];

          // check if donor exists in firebase already
          let donor_exists = db.collection("Donors").doc(path);
          donor_exists.get().then((doc) => {
            // page redirect
            if (doc.exists) {
              this.$router.push({ name: "donor-home", params: { id: path } });
            } else {
              // check if charitiy exists in firebase already
              let chairty_exists = db.collection("Charities").doc(path);
              chairty_exists.get().then((doc) => {
                  // page redirect
                  if (doc.exists) {
                    this.$router.push({
                      name: "charity-home",
                      params: { id: path },
                    });
                  } else {
                    // account doesn't exist
                    throw new Error("account doesn't exist");
                  }
                })
                .catch((error) => {
                  console.error(error);
                  EventBus.$emit("account_not_found");
                });
            }
          });
        })
        .catch(console.error);
    },

    GoogleSignUp: function() {
      this.accountAlreadyExists = false;
      let collection = "";

      if (this.activeTab == "donor") {
        collection = "Donors";
      } else {
        collection = "Charities";
      }

      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
          const user = result.user;
          this.email = user.email;
          this.name = user.displayName;

          var path = user.email.split("@")[0];

          // if user exists in firebase already
          var user_exists = db.collection(collection).doc(path);
          user_exists
            .get()
            .then((doc) => {
              if (!doc.exists && collection == "Charities") {
                db.collection(collection).doc(path).set({
                    username: user.displayName,
                    email: user.email,
                    name: this.charityName,
                    phone: this.phone,
                    address: this.address,
                    link: this.link,
                    acceptingDonations: true,
                  });
              } else if (!doc.exists && collection == "Donors") {
                db.collection(collection).doc(path).set({
                    username: user.displayName,
                    email: user.email,
                    phone: this.phone,
                    address: this.address,
                  });
              } else {
                throw new Error("account already exists");
              }
            })
            .then(() => {
              // page redirect
              if (collection === "Donors")
                this.$router.push({ name: "donor-home", params: { id: path } });
              else
                this.$router.push({
                  name: "charity-home",
                  params: { id: path },
                });
            })
            .catch((error) => {
              console.error(error);
              this.accountAlreadyExists = true;
            });
        })
        .catch(console.error);
    },
  },
};
