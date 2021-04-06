import { db } from '@/main';
import CharityRequestWidget from "@/components/CharityRequestWidget/index.vue";

export default {
  name: "CharityHome",
  components: {
    CharityRequestWidget,
  },
  props: {},
  data() {
    return {			
      user_id: this.$route.params.id,
			email: null,
      name: "Set charity name",
      name_edit_bool: false,
      contact: "<Phone number, Address, etc>",
      contact_bool: false,
      link: "<Link your website>",
      link_bool: false,
      desc: "<Description of your charitable work>",
      desc_bool: false,
      accept_dono: false,
      radius: "None"
    };
  },
  computed: {},
  mounted() {
		// parse user profile
		db.collection("Charities").doc(this.user_id).get().then((doc)=>{
			this.email = doc.data().email;
      if (doc.data().name) this.name = doc.data().name;
      if (doc.data().contact) this.contact = doc.data().contact;
      if (doc.data().link) this.link = doc.data().link;
      if (doc.data().desc) this.desc = doc.data().desc;
		}).catch((error) => {
			console.log("Error getting document:", error);
		});
  },
  methods: {
		edit: function(input) {
      // flips current state
      if (input == "name")
        this.name_edit_bool = !this.name_edit_bool;
      else if (input == "contact")
        this.contact_bool = !this.contact_bool;
      else if (input == "link")
        this.link_bool = !this.link_bool;
      else if (input == "desc")
        this.desc_bool = !this.desc_bool;

			db.collection("Charities").doc(this.user_id).update({
        name: this.name,
        contact: this.contact,
        link: this.link,
        desc: this.desc
			})
      .catch(function(error){alert(error + " : This data could not be saved successfully.")});
		},
    dono_toggle: function() {
      this.dono_toggle = document.getElementById("donoSwitch").checked
      db.collection("Charities").doc(this.user_id).update({
        dono_toggle: this.dono_toggle
      });
    },
    radius_check: function() {
      db.collection("Charities").doc(this.user_id).update({
        radius: this.radius
      });
    }
  },
};
