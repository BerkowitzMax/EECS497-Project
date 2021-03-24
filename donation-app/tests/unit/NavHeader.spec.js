import { mount } from "@vue/test-utils";
import NavHeader from "@/components/NavHeader/index.vue";
import sinon from "sinon";

describe("Navheader", () => {
  it("should show correct navheader options when userType is donor", () => {
    const wrapper = mount(NavHeader, {
      propsData: { userType: "donor" },
      stubs: ["router-link"],
    });
    expect(wrapper.find("#home-button").exists()).toBe(true);
    expect(wrapper.find("#profile-button").exists()).toBe(true);
    expect(wrapper.find("#info-button").exists()).toBe(true);
  });

  it("should show correct navheader options when userType is charity", () => {
    const wrapper = mount(NavHeader, {
      propsData: { userType: "charity" },
      stubs: ["router-link"],
    });
    expect(wrapper.find("#home-button").exists()).toBe(true);
    expect(wrapper.find("#profile-button").exists()).toBe(false);
    expect(wrapper.find("#info-button").exists()).toBe(true);
  });

  it("should call setActiveTab with correct parameter", async () => {
    const setActiveTabspy = sinon.spy();

    const wrapper = mount(NavHeader, {
      propsData: {
        userType: "donor",
      },
      stubs: ["router-link"],
    });

    await wrapper.find("#profile-button").trigger("click");
    setActiveTabspy.calledWith("profile");

    wrapper.vm.setActiveTab("profile");
    expect(wrapper.vm.activeTab).toBe("profile");
  });

  it("should set active tab correctly when setActiveTab called", async () => {
    const wrapper = mount(NavHeader, {
      propsData: {
        userType: "donor",
      },
      stubs: ["router-link"],
    });

    wrapper.vm.setActiveTab("profile");
    expect(wrapper.vm.activeTab).toBe("profile");

    wrapper.vm.setActiveTab("info");
    expect(wrapper.vm.activeTab).toBe("info");

    wrapper.vm.setActiveTab("home");
    expect(wrapper.vm.activeTab).toBe("home");
  });
});
