import DonationFormModal from "../DonationFormModal/index.vue";

export default {
	name: "DonationSite",
	components: {
		DonationFormModal,
	},
	props: {},
	data() {
		return {
			// Should be stored in the database eventually
			charityName: "Charity Name",
			charityContact: "Charity Contact",
		};
	},
	computed: {},
	mounted() {},
	methods: {},
};
