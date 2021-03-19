import DonationFormItem from "../DonationFormItem/index.vue";

export default {
	name: "DonationFormModal",
	components: {
		DonationFormItem,
	},
	props: {},
	data() {
		return {
			numItems: 1,
			items: [
				{
					itemId: 1,
					itemName: "",
					itemQuantity: 0,
					itemUnits: 0,
					itemCategory: 0,
					bestBeforeMonth: 0,
					bestBeforeDay: 0,
					bestBeforeYear: 0,
					containsPeanuts: false,
					containsTreeNuts: false,
					containsDairy: false,
					containsEggs: false,
					containsMeat: false,
					containsSoy: false,
					itemPhoto: "",
					itemDescription: "",
				},
			],
		};
	},
	computed: {},
	mounted() {},
	methods: {
		addItem() {
			this.numItems += 1;
			this.items.push({
				itemId: this.numItems,
				itemName: "",
				itemQuantity: 0,
				itemUnits: 0,
				itemCategory: 0,
				bestBeforeMonth: 0,
				bestBeforeDay: 0,
				bestBeforeYear: 0,
				containsPeanuts: false,
				containsTreeNuts: false,
				containsDairy: false,
				containsEggs: false,
				containsMeat: false,
				containsSoy: false,
				itemPhoto: "",
				itemDescription: "",
			});
		},
		removeItem(itemId) {
			this.numItems -= 1;
			this.items.splice(this.items.map(item => item.itemId).indexOf(itemId), 1);
		},
		clearForm() {
			this.numItems = 1;
			this.items = [{
				itemId: this.numItems,
				itemName: "",
				itemQuantity: 0,
				itemUnits: 0,
				itemCategory: 0,
				bestBeforeMonth: 0,
				bestBeforeDay: 0,
				bestBeforeYear: 0,
				containsPeanuts: false,
				containsTreeNuts: false,
				containsDairy: false,
				containsEggs: false,
				containsMeat: false,
				containsSoy: false,
				itemPhoto: "",
				itemDescription: "",
			}];
		},
		saveForm() {
			// TODO
		},
	},
};
