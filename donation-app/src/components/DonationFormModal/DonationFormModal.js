import { db } from "@/main";
import DonationFormItem from "@/components/DonationFormItem/index.vue";
import EventBus from "@/components/EventBus.vue";

export default {
  name: "DonationFormModal",
  components: {
    DonationFormItem,
  },
  props: {
    siteData: Object,
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
          allergens : {
            containsPeanuts: false,
            containsTreeNuts: false,
            containsDairy: false,
            containsEggs: false,
            containsMeat: false,
            containsSoy: false,
          },
          itemPhoto: "",
          itemDescription: "",
        },
      ],
    };
  },
  computed: {},
  mounted() {
    this.charity_id += "-" + this.siteData.siteId;
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
        allergens : {
          containsPeanuts: false,
          containsTreeNuts: false,
          containsDairy: false,
          containsEggs: false,
          containsMeat: false,
          containsSoy: false,
        },
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
          allergens : {
            containsPeanuts: false,
            containsTreeNuts: false,
            containsDairy: false,
            containsEggs: false,
            containsMeat: false,
            containsSoy: false,
          },
          itemPhoto: "",
          itemDescription: "",
        },
      ];
    },
    saveForm() {
      var doc = this.$route.params.id;
      doc += "-" + this.siteData.siteId;
      db.collection("Requests").doc(doc).set({
          status: "Pending",
          items: this.items,
          timestamp: new Date().toString(),
        })
        .then(() => {
          EventBus.$emit("donation_success")
        })
        .catch(() => {
          EventBus.$emit("donation_fail")
        });

      this.clearForm();
    },
  },
};
