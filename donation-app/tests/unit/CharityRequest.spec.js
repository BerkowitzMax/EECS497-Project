import CharityRequest from "@/components/CharityRequest/index.vue";
import { fireEvent, render } from "@testing-library/vue";
import "@testing-library/jest-dom";

describe("CharityRequest", () => {
  const data = {
    id: 1,
    status: "Pending",
    dateCreated: new Date(),
    donorName: "Test Donor",
    donorContact: "000-000-0000",
    donationLabel: "Test1",
    donorLocation: "Test Location",
    formData: {},
  };

  it("renders request data", () => {
    const { getByText } = render(CharityRequest, {
      props: { requestData: data },
      stubs: { timeago: true },
    });
    expect(getByText("Test1")).toBeVisible();
    expect(getByText("Test Donor")).toBeVisible();
    expect(getByText("000-000-0000")).toBeVisible();
    expect(getByText("Test Location")).toBeVisible();
  });

  it("emits select-request with request id on click", async () => {
    const { getByText, emitted } = render(CharityRequest, {
      props: { requestData: data },
      stubs: { timeago: true },
    });

    await fireEvent.click(getByText("Review Request"));
    expect(emitted()["select-request"]).toBeTruthy;
    expect(emitted()["select-request"][0][0]).toEqual(data.id);
  });
});
