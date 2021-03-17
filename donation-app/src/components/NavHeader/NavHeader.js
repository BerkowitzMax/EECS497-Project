export default {
	name: "NavHeader",
	components: {},
	props: {
		userType: String,
	},
	data() {
		return {
			activeTab: "home",
		};
	},
	computed: {},
	mounted() {},
	methods: {
		setActiveTab(tab) {
			this.activeTab = tab;
		},
	},
};
