import firebase from 'firebase';

export default {
	name: "LandingPage",
	components: {},
	props: {},
	data() {
		return {};
	},
	computed: {},
	mounted() {},
	methods: {
		GoogleLogin: function() {
			const provider = new firebase.auth.GoogleAuthProvider();
			firebase.auth().signInWithPopup(provider)
					.then(result => {
						const user = result.user;
						document.write(`Hello ${user.displayName}`);
						console.log(user)
					})
					.catch(console.log)

		}
	},
};
