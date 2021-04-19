import { db } from '@/main';
import CharityRequestWidget from "@/components/CharityRequestWidget/index.vue";
import Compressor from 'compressorjs';

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
      phone: "<Phone number>",
      phone_bool: false,
      address: "<Address>",
      address_bool: false,
      link: "<Link your website>",
      link_bool: false,
      desc: "<Description of your charitable work>",
      desc_bool: false,
      accept_dono: false,
      radius: "None",
      imageURL: null,
      showDefault: true
    };
  },
  inject: ["mySpinner"],
  computed: {},
  mounted() {
    this.mySpinner.val = true;

		// parse user profile
		db.collection("Charities").doc(this.user_id).get().then((doc)=>{
      var d = doc.data();
			this.email = d.email;

      if (d.name) this.name = d.name;
      if (d.phone) this.phone = d.phone;
      if (d.address) this.address = d.address;
      if (d.link) this.link = d.link;
      if (d.desc) this.desc = d.desc;
      if (d.picture) {this.imageURL = d.picture; this.showDefault = false;}
		}).catch((error) => {
			console.log("Error getting document:", error);
		}).then(()=>{
      this.mySpinner.val = false;
    });
  },
  methods: {
		edit: function(input) {
      // flips current state
      if (input == "name")
        this.name_edit_bool = !this.name_edit_bool;
      else if (input == "phone")
        this.phone_bool = !this.phone_bool;
      else if (input == "address")
        this.address_bool = !this.address_bool;
      else if (input == "link")
        this.link_bool = !this.link_bool;
      else if (input == "desc")
        this.desc_bool = !this.desc_bool;

			db.collection("Charities").doc(this.user_id).update({
        name: this.name,
        phone: this.phone,
        address: this.address,
        link: this.link,
        desc: this.desc,
        picture: this.imageURL
			})
      .catch(function(error){alert(error + " : This data could not be saved successfully.")});
		},
    dono_toggle: function() {
      this.dono_toggle = document.getElementById("donoSwitch").checked
      db.collection("Charities").doc(this.user_id).update({
        acceptingDonations: this.acceptingDonations
      });
    },
    remove_image: function(){
			this.imageURL = null;
			this.showDefault = true;
			document.getElementById("pfp").value=null;
      this.edit("remove picture");
		},
		preview: function(event) {
			if (!event.target.files[0]) {
				this.showDefault = true;
				this.imageURL = null;
				return;
			}
			else {
				this.showDefault = false;
			}

			let picture = event.target.files[0];
			const reader = new FileReader();
			reader.addEventListener('load', () => {
				this.imageURL = reader.result
        this.edit("save picture");
			});

			new Compressor(picture, {
				quality: 0.2,
				maxHeight: 150,
				maxWidth: 150,
				success(compressed) {
					reader.readAsDataURL(compressed);
				},
				error(err){
					console.log(err.message);
				}
			});
		}
  },
};
