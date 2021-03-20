export default {
	name: "DonorRequest",
	components: {},
	props: {
		requestData: Object,
	},
	data() {
		return {
			status: this.requestData.status,
			dateCreated: this.requestData.dateCreated,
			badgeType: this.requestData.badgeType,
			charityName: this.requestData.charityName,
			charityContact: this.requestData.charityContact,
			charityImage: this.requestData.charityImage,
			donationLabel: this.requestData.donationLabel,
			formData: this.requestData.formData
		};
	},
	computed: {},
	mounted() {},
	methods: {
		showDetails() {
			// TODO
		}
	},
};
