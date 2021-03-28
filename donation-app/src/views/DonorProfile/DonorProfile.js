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
			username: null
		}
	},
	computed: {},
	// load profile information
	mounted() {
		const user_type = this.$route.path.split('/')[1];
		const user_id = this.$route.params.id;

		// parse user profile
		db.collection(user_type).doc(user_id).get().then((doc)=>{
			this.username = doc.data().username;
		}).catch((error) => {
			console.log("Error getting document:", error);
		});		
	},
	methods: {
	}
};
