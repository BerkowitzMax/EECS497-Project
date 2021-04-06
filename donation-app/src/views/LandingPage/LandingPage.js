import firebase from 'firebase';
import { db } from '@/main';

export default {
	name: "LandingPage",
	components: {},
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

					// if user exists in firebase already
					var user_exists = db.collection(user_type).doc(path);
					user_exists.get().then((doc)=> {
						if (!doc.exists) {
							db.collection(user_type).doc(path).set({
								username: user.displayName,
								email: user.email
							});
						}
					});

					this.email = user.email;
					this.name = user.displayName;

					// page redirect
					if (user_type === "Donors")
						this.$router.push({name: 'Donor App', params: {id: path} });
					else
						this.$router.push({name: 'charity-home'});
				})
				.catch(console.log)
		}
	},
};
