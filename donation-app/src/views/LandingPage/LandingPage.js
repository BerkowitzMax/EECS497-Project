import firebase from 'firebase';
import { db } from '@/main';

export default {
	name: "LandingPage",
	components: {},
	props: {},
	data() {
		return {
			email: null,
			name: null,
		};
	},
	computed: {},
	mounted() {},
	methods: {
		GoogleLogin: function() {
			const user_type = document.getElementById("org").checked ? "Charities" : "Donors";

			const provider = new firebase.auth.GoogleAuthProvider();
			firebase.auth().signInWithPopup(provider)
				.then(result => {
					const user = result.user;
					console.log(user);

					var path = user.email.split('@')[0];
					db.collection(user_type).doc(path).set({
						username: user.displayName,
						email: user.email
					});

					// page redirect
					if (user_type === "Donors")
						this.$router.push({ name: 'donor-home'});
					else
						this.$router.push({ name: 'charity-home'});
				})
				.catch(console.log)
		}
	},
};
