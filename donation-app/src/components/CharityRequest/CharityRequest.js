import CharityRequestModal from "@/components/CharityRequestModal/index.vue"

export default {
	name: "CharityRequest",
	components: {
		CharityRequestModal
	},
	props: {
		requestData: Object,
	},
	data() {
		return {
			status: this.requestData.status,
			dateCreated: this.requestData.dateCreated,
			donorName: this.requestData.donorName,
			donorContact: this.requestData.donorContact,
			donorLocation: this.requestData.donorLocation,
			donationLabel: this.requestData.donationLabel,
			formData: this.requestData.formData
		};
	},
	computed: {},
	mounted() {},
	methods: {
	},
};
