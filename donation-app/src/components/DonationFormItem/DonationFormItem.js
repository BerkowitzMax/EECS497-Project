export default {
	name: "DonationFormItem",
	components: {},
	props: {
		formData: Object,
	},
	data() {
		return {};
	},
	computed: {},
	mounted() {},
	watch: {},
	methods: {
		removeItem() {
			this.$emit("remove-item", this.formData.itemId);
		},
	},
};
