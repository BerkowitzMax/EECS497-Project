export default {
	name: "DonationFormItem",
	components: {},
	props: {
		numItems: Number,
		formData: Object,
	},
	data() {
		return {};
	},
	computed: {},
	mounted() {
		this.itemId = this.numItems;
	},
	methods: {
		removeItem() {
			this.$emit("remove-item", this.itemId);
		},
	},
};
