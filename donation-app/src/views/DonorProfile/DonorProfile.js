import { db } from '@/main';
import DonorStatsWidget from "@/components/DonorStatsWidget/index.vue";
import Compressor from 'compressorjs';

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
			address: null,
			imageURL: null,
			showDefault: true
		}
	},
	computed: {},
	// load profile information
	mounted() {
		// parse user profile
		db.collection("Donors").doc(this.user_id).get().then((doc)=>{
			var d = doc.data()
			this.username = d.username;
			this.email = d.email;
			if (d.bio) {this.bio = d.bio;}
			if (d.phone) {this.phone = d.phone;}
			if (d.address) {this.address = d.address;}
			if (d.picture) {this.imageURL = d.picture; this.showDefault = false;}
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
				address: this.address,
				picture: this.imageURL
			})
			.then(()=>{alert("Saved!")})
			.catch(function(error){alert(error + " : This data could not be saved successfully.")});
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
	}
};
