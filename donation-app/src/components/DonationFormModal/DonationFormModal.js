import { db } from "@/main";
import DonationFormItem from "@/components/DonationFormItem/index.vue";

export default {
  name: "DonationFormModal",
  components: {
    DonationFormItem,
  },
  props: {
    charityName: Object,
  },
  data() {
    return {
      charity_id: "formModal",
      numItems: 1,
      items: [
        {
          itemId: 0,
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
  mounted() {
    let hyphen = this.charityName.charityName
      .split(" ")
      .join("-")
      .replace("'", "_");
    this.charity_id += "-" + hyphen;
  },
  methods: {
    addItem() {
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
      this.numItems += 1;
    },
    removeItem(itemId) {
      this.items.splice(
        this.items.map((item) => item.itemId).indexOf(itemId),
        1
      );
      this.numItems -= 1;
    },
    clearForm() {
      this.numItems = 1;
      this.items = [
        {
          itemId: 0,
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
      ];
    },
    saveForm() {
      var document = this.$route.params.id;
      document += "-" + this.charityName.charityName;
      db.collection("Requests")
        .doc(document)
        .set({
          status: "Pending",
          items: this.items,
        })
        .then(alert("Donation successful, thank you!"))
        .catch(console.log);

      this.clearForm();
    },
  },
};
