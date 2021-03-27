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
			const provider = new firebase.auth.GoogleAuthProvider();
			firebase.auth().signInWithPopup(provider)
					.then(result => {
						const user = result.user;
						document.write(`Hello ${user.email}`);
						console.log(user);

						var path = user.email.split('@')[0];
						db.collection("Donors").doc(path).set({
							username: user.displayName,
							email: user.email
						});

					})
					.catch(console.log)
		}
	},
};
