import DonorRequest from "@/components/DonorRequest/index.vue";
import { fireEvent, render } from "@testing-library/vue";
import "@testing-library/jest-dom";

describe("DonorRequest", () => {
  const data = {
    id: 0,
    status: "Pending",
    timestamp: new Date(),
    charityName: "Test Charity",
    charityContact: "000-000-0000",
    charityLocation: "Test Location",
    donationLabel: "Test1",
    charityImage: "profile-image-placeholder.png",
    formData: {},
  };

  it("renders collapsed request data", () => {
    const { getByRole, getByText } = render(DonorRequest, {
      props: { requestData: data },
      stubs: { timeago: true },
    });
    expect(getByText(data.donationLabel)).toBeVisible();
    expect(getByText(data.status)).toBeVisible();
    expect(getByRole("button", { expanded: false })).toBeVisible;
    expect(getByText("Charity Information")).not.toBeVisible;
  });

  it("toggles accordion collapse", async () => {
    const { getByLabelText, getByRole, getByText } = render(DonorRequest, {
      props: { requestData: data },
      stubs: { timeago: true },
    });
    expect(getByLabelText("expand")).toBeVisible();
    expect(getByText("Charity Information")).not.toBeVisible;

    await fireEvent.click(getByRole("button", { expanded: false }));

    expect(getByLabelText("collapse")).toBeVisible();
    expect(getByText("Charity Information")).toBeVisible;
    expect(getByText(data.charityContact)).toBeVisible();
    expect(getByText(data.charityLocation)).toBeVisible();
  });
});
