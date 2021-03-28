import NavHeader from "@/components/NavHeader/index.vue";
import { fireEvent, render, screen } from "@testing-library/vue";
import "@testing-library/jest-dom";

describe("Navheader", () => {
  it("displays correct navheader options for donors", () => {
    const { getByText } = render(NavHeader, {
      props: { userType: "donor" },
      stubs: ["router-link"],
    });
    expect(getByText("Home")).toBeVisible();
    expect(getByText("Profile")).toBeVisible();
    expect(getByText("Info")).toBeVisible();
  });

  it("displays correct navheader options for charities", () => {
    const { getByText, queryByText } = render(NavHeader, {
      props: { userType: "charity" },
      stubs: ["router-link"],
    });
    expect(getByText("Home")).toBeVisible();
    expect(queryByText("Profile")).toBeNull(); // getByText() throws an error when element not found
    expect(getByText("Info")).toBeVisible();
  });

  it("activates home tab on click", async () => {
    const { getByText } = render(NavHeader, {
      props: { userType: "donor" },
      stubs: ["router-link"],
    });

    await fireEvent.click(getByText("Home"));
    expect(getByText("Home")).toHaveClass("active");
    expect(getByText("Profile")).not.toHaveClass("active");
    expect(getByText("Info")).not.toHaveClass("active");
  });

  it("activates profile tab on click", async () => {
    const { getByText } = render(NavHeader, {
      props: { userType: "donor" },
      stubs: ["router-link"],
    });

    await fireEvent.click(getByText("Profile"));
    expect(getByText("Home")).not.toHaveClass("active");
    expect(getByText("Profile")).toHaveClass("active");
    expect(getByText("Info")).not.toHaveClass("active");
  });

  it("activates info tab on click", async () => {
    const { getByText } = render(NavHeader, {
      props: { userType: "donor" },
      stubs: ["router-link"],
    });

    await fireEvent.click(getByText("Info"));
    expect(getByText("Home")).not.toHaveClass("active");
    expect(getByText("Profile")).not.toHaveClass("active");
    expect(getByText("Info")).toHaveClass("active");
  });
});
