import DonationSite from "@/components/DonationSite/index.vue";
import { render } from "@testing-library/vue";
import "@testing-library/jest-dom";

describe("DonationSite", () => {
  const data = {
    charityName: "Test Charity Name",
    charityContact: "000-000-0000",
    charityLocation: "Test Location",
  };

  it("renders site data", () => {
    const { getByText } = render(DonationSite, {
      props: { siteData: data },
    });
    expect(getByText(data.charityName)).toBeVisible();
    expect(getByText(data.charityContact)).toBeVisible();
    expect(getByText(data.charityLocation)).toBeVisible();
    expect(getByText("Donate")).toBeVisible();
  });
});
