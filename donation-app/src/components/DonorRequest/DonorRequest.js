export default {
	name: "DonorRequest",
	components: {},
	props: {},
	data() {
		return {
			// Should be stored in the database eventually
			status: "Pending",
			dateCreated: new Date(),
			badgeType: "badge-secondary",
			charityName: "Charity Name",
			charityContact: "Charity Contact",
			donationLabel: "Donation Label",
		};
	},
	computed: {},
	mounted() {},
	methods: {},
};
