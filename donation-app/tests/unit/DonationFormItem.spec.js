import DonationFormItem from "@/components/DonationFormItem/index.vue";
import { fireEvent, render, screen } from "@testing-library/vue";
import "@testing-library/jest-dom";

describe("DonationFormItem", () => {
  const firstItemData = {
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
  };
  const secondItemData = {
    itemId: 1,
    itemName: "Test",
    itemQuantity: 10,
    itemUnits: 0,
    itemCategory: 0,
    bestBeforeMonth: 1,
    bestBeforeDay: 0,
    bestBeforeYear: 0,
    containsPeanuts: true,
    containsTreeNuts: false,
    containsDairy: false,
    containsEggs: false,
    containsMeat: false,
    containsSoy: false,
    itemPhoto: "",
    itemDescription: "123",
  };

  it("renders form data", () => {
    const { getByRole, getByText, getByPlaceholderText, queryByText } = render(
      DonationFormItem,
      {
        props: { formData: secondItemData },
      }
    );
    expect(getByText("Item Details")).toBeVisible();
    expect(getByText("Item Contains")).toBeVisible();
    expect(getByText("Additional Information")).toBeVisible();

    expect(getByPlaceholderText("Name e.g. Soup, Beans")).toHaveValue("Test");
    expect(getByPlaceholderText("Description")).toHaveValue("123");

    expect(getByRole("option", { name: "Jan" })).not.toBeSelected;
    expect(getByRole("option", { name: "Feb" })).toBeSelected;

    expect(getByRole("checkbox", { name: "Peanuts" })).toBeChecked;
    expect(getByRole("checkbox", { name: "Tree Nuts" })).not.toBeChecked;

    // TODO: add test for picture when implemented
  });

  it("updates form data", async () => {
    const { getByPlaceholderText } = render(DonationFormItem, {
      props: { formData: secondItemData },
    });
    expect(getByPlaceholderText("Description")).toHaveValue("123");

    await fireEvent.update(getByPlaceholderText("Description"), "456");
    expect(getByPlaceholderText("Description")).toHaveValue("456");
  });

  it("hides remove item button for first item", () => {
    const { queryByText } = render(DonationFormItem, {
      props: { formData: firstItemData },
    });
    expect(queryByText("Remove Item")).toBeNull();
  });

  it("shows remove item button for additional items", () => {
    const { getByText } = render(DonationFormItem, {
      props: { formData: secondItemData },
    });
    expect(getByText("Remove Item")).toBeVisible();
  });

  it("emits remove-item with item id on click", async () => {
    const { getByText, emitted } = render(DonationFormItem, {
      props: { formData: secondItemData },
      stubs: { timeago: true },
    });

    await fireEvent.click(getByText("Remove Item"));
    expect(emitted()["remove-item"]).toBeTruthy;
    expect(emitted()["remove-item"][0][0]).toEqual(secondItemData.itemId);
  });
});
