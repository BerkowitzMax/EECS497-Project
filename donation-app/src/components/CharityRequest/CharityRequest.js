export default {
	name: "CharityRequest",
	components: {},
	props: {},
	data() {
		return {
			// Should be stored in the database eventually
			status: "Pending",
			dateCreated: new Date(),
			donorName: "Donor Name",
			donorContact: "Donor Contact",
			donorLocation: "Donor Location",
			donationLabel: "Donation Label",
		};
	},
	computed: {},
	mounted() {},
	methods: {},
};
