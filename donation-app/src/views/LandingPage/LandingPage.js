import firebase from "firebase";
import { db } from "@/main";

export default {
  name: "LandingPage",
  components: {},
  data() {
    return {
      email: null,
      name: null,
      phone: "",
      zip: "",
      charityName: "",
      activeTab: "donor",
      getStartedClicked: false,
      accountExists: false,
    };
  },
  computed: {},
  mounted() {},
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },
    getStarted() {
      this.getStartedClicked = true;
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

          // if donor exists in firebase already
          let donor_exists = db.collection("Donors").doc(path);
          console.log(donor_exists);
          donor_exists.get().then((doc) => {
            // page redirect
            if (doc.exists) {
              this.$router.push({ name: "donor-home", params: { id: path } });
              return;
            }
          });

          // if charity exists in firebase already
          let chairty_exists = db.collection("Charities").doc(path);
          console.log(chairty_exists);
          chairty_exists.get().then((doc) => {
            // page redirect
            if (doc.exists) {
              this.$router.push({ name: "charity-home", params: { id: path } });
              return;
            }
          });
        })
        .catch(console.log);
    },

    GoogleSignUp: function() {
      this.accountExists = false;
      let collection = "";

      if (this.activeTab == "donor") {
        collection = "Donors";
      } else {
        collection = "Charities";
      }

      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
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
                db.collection(collection)
                  .doc(path)
                  .set({
                    username: user.displayName,
                    email: user.email,
                    name: this.charityName,
                    phone: this.phone,
                    zip: this.zip,
                  });
              } else if (!doc.exists && collection == "Donors") {
                db.collection(collection)
                  .doc(path)
                  .set({
                    username: user.displayName,
                    email: user.email,
                    phone: this.phone,
                    zip: this.zip,
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
              console.log(error);
              this.accountExists = true;
            });
        })
        .catch(console.log);
    },
  },
};
