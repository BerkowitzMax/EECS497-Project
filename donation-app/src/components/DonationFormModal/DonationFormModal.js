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
			this.items.splice(itemId - 1, 1);
		},
		clearForm() {
			// Remove all added items
			for (let i = this.numItems - 1; i > 0; i--) {
				this.items.pop();
			}
			// Clear form input for first item
			this.items[0].itemId = 0;
			this.items[0].itemName = "";
			this.items[0].itemQuantity = 0;
			this.items[0].itemUnits = 0;
			this.items[0].itemCategory = 0;
			this.items[0].bestBeforeMonth = 0;
			this.items[0].bestBeforeDay = 0;
			this.items[0].bestBeforeYear = 0;
			this.items[0].containsPeanuts = false;
			this.items[0].containsTreeNuts = false;
			this.items[0].containsDairy = false;
			this.items[0].containsEggs = false;
			this.items[0].containsMeat = false;
			this.items[0].containsSoy = false;
			this.items[0].itemPhoto = "";
			this.items[0].itemDescription = "";
		},
		saveForm() {
			// TODO
		},
	},
};
