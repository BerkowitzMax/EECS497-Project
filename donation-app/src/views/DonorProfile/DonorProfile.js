import { db } from '@/main';
import DonorStatsWidget from "@/components/DonorStatsWidget/index.vue";

export default {
	name: "DonorProfile",
	components: {
		DonorStatsWidget
	},
	props: {},
	data() {
		return {
			user_id: this.$route.params.id,
			username: null,
			email: null,
			bio: null,
			phone: null,
			address: null
		}
	},
	computed: {},
	// load profile information
	mounted() {
		const user_type = this.$route.path.split('/')[1];

		// parse user profile
		db.collection(user_type).doc(this.user_id).get().then((doc)=>{
			this.username = doc.data().username;
			this.email = doc.data().email;
			if (doc.data().bio) {this.bio = doc.data().bio;}
			if (doc.data().phone) {this.phone = doc.data().phone;}
			if (doc.data().address) {this.address = doc.data().address;}
		}).catch((error) => {
			console.log("Error getting document:", error);
		});		
	},
	methods: {
		clear: function() {
			this.bio = null;
			this.phone = null;
			this.address = null;
		},
		save: function() {
			db.collection("Donors").doc(this.user_id).update({
				bio: this.bio,
				phone: this.phone,
				address: this.address
			}).then(()=>{alert("Saved!")}).catch(function(error){alert(error + " : This data could not be saved successfully.")});
		}
	}
};
