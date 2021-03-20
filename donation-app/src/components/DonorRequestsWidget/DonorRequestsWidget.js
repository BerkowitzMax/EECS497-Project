import DonorRequest from "@/components/DonorRequest/index.vue"

export default {
	name: "DonorRequestsWidget",
	components: {
		DonorRequest,
	},
	props: {},
	data() {
		return {
			pendingRequests: [
				{
					// Should come from database eventually
					status: "Pending",
					dateCreated: new Date(),
					charityName: "Charity Name",
					charityContact: "Charity Contact",
					donationLabel: "Donation Label",
					charityImage: "profile-image-placeholder.png",
					formData: {}
				},
				{
					status: "Pending",
					dateCreated: new Date(),
					charityName: "Charity Name",
					charityContact: "Charity Contact",
					donationLabel: "Donation Label",
					charityImage: "profile-image-placeholder.png",
					formData: {}
				},
				{
					status: "Pending",
					dateCreated: new Date(),
					charityName: "Charity Name",
					charityContact: "Charity Contact",
					donationLabel: "Donation Label",
					charityImage: "profile-image-placeholder.png",
					formData: {}
				}
			],
			resolvedRequests: [
				{
					status: "Accepted",
					dateCreated: new Date(),
					charityName: "Charity Name",
					charityContact: "Charity Contact",
					donationLabel: "Donation Label",
					charityImage: "profile-image-placeholder.png",
					formData: {}
				},
				{
					status: "Accepted",
					dateCreated: new Date(),
					charityName: "Charity Name",
					charityContact: "Charity Contact",
					donationLabel: "Donation Label",
					charityImage: "profile-image-placeholder.png",
					formData: {}
				},
				{
					status: "Rejected",
					dateCreated: new Date(),
					charityName: "Charity Name",
					charityContact: "Charity Contact",
					donationLabel: "Donation Label",
					charityImage: "profile-image-placeholder.png",
					formData: {}
				},
				{
					status: "Rejected",
					dateCreated: new Date(),
					charityName: "Charity Name",
					charityContact: "Charity Contact",
					donationLabel: "Donation Label",
					charityImage: "profile-image-placeholder.png",
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
