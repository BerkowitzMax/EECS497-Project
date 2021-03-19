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
	watch: {
		formData(data) {
			this.formData = data;
		},
	},
	methods: {
		removeItem() {
			this.$emit("remove-item", this.itemId);
		},
	},
};
