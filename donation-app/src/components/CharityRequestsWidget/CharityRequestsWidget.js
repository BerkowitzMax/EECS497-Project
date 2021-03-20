import CharityRequest from "@/components/CharityRequest/index.vue"

export default {
	name: "CharityRequestsWidget",
	components: {
		CharityRequest,
	},
	props: {},
	data() {
		return {
			requests: [
				{
					// Will come from database eventually
					status: "pending",
					dateCreated: new Date(),
					donorName: "Donor Name 1",
					donorContact: "555-555-5555",
					donationLabel: "Test1",
					donorLocation: "Ann Arbor, MI",
					formData: {}
				},
				{
					status: "pending",
					dateCreated: new Date(),
					donorName: "Donor Name 2",
					donorContact: "555-555-5555",
					donationLabel: "Test2",
					donorLocation: "Ann Arbor, MI",
					formData: {}
				},
				{
					status: "pending",
					dateCreated: new Date(),
					donorName: "Donor Name 3",
					donorContact: "555-555-5555",
					donationLabel: "Test3",
					donorLocation: "Ann Arbor, MI",
					formData: {}
				}
			]
		};
	},
	computed: {},
	mounted() {},
	methods: {
		addRequest() {
			// TODO: retrieve request data from database
			let request = {}

			this.requests.push(request)
		}
	},
};
