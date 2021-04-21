<template>
  <div id="app">
    <div id="popup-alert-area">
      <transition name="bounce">
        <div
          class="alert alert-light alert-dismissible popup-alert fade show"
          role="alert"
          v-if="accountNotFoundAlert"
        >
          <strong>Oops!</strong> We can't find an account with that email.
          <span type="button" class="alert-link" @click="showSignUp"
            >Click here to Sign Up.</span
          >
          <button
            type="button"
            class="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div
          class="alert alert-success alert-dismissible popup-alert fade show"
          role="alert"
          v-if="donationSuccessAlert"
        >
          Donation Successful! Thank you!
          <button
            type="button"
            class="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div
          class="alert alert-danger alert-dismissible popup-alert fade show"
          role="alert"
          v-if="donationFailAlert"
        >
          Donation Failed! Please try again.
          <button
            type="button"
            class="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </transition>
    </div>
    <Spinner :start="spin.val" />
    <!-- Render pages routed to from the landing page -->
    <router-view></router-view>
  </div>
</template>

<script>
import Spinner from "./components/Spinner.vue";
import EventBus from "./components/EventBus.vue";

export default {
  name: "App",
  components: {
    Spinner,
  },
  data() {
    return {
      spin: {
        val: false,
      },
      donationSuccessAlert: false,
      donationFailAlert: false,
      accountNotFoundAlert: false,
    };
  },
  mounted() {
    EventBus.$on("donation_success", () => {
      this.showDonationSuccess();
    }),
      EventBus.$on("donation_fail", () => {
        this.showDonationFail();
      }),
      EventBus.$on("account_not_found", () => {
        this.showAccountNotFound();
      });
  },
  methods: {
    showDonationSuccess() {
      this.donationSuccessAlert = true;
      setTimeout(() => {
        this.donationSuccessAlert = false;
      }, 5000);
    },
    showDonationFail() {
      this.donationFailAlert = true;
      setTimeout(() => {
        this.donationFailAlert = false;
      }, 5000);
    },
    showAccountNotFound() {
      this.accountNotFoundAlert = true;
      setTimeout(() => {
        this.accountNotFoundAlert = false;
      }, 10000);
    },
    showSignUp() {
      EventBus.$emit("show_sign_up");
    },
  },
  provide() {
    return {
      mySpinner: this.spin,
    };
  },
};
</script>

<style>
/* Set height of the grid so .sidenav can be 100% (adjust if needed) */
.row.content {
  height: auto;
}

.clist > * {
  float: left;
}

body {
  background-color: rgb(221, 247, 243) !important;
}

.page {
  margin: 0px;
  padding: 0px 40px !important;
}

.charity_picture {
  margin-right: 10px;
  width: 75px;
  height: 75px;
  object-fit: contain;
}

#popup-alert-area {
  position: fixed !important;
  z-index: 100;
}

/* sidenav */
.donor_sidenav {
  background-color: white;
  height: 100%;
  width: 100%;
  box-shadow: 0 0 0.5rem 0 rgb(136 152 170 / 15%);
  padding: 50px 50px;
}

.sidebar-profile {
  padding: 50px 0px;
}

.sidebar-section {
  padding-bottom: 30px;
}

.sidebar-subsection {
  padding: 1px 0px;
}

.sidebar-preference {
  padding: 10px 0px;
}

/* request list */
.request_user {
  margin-bottom: 0px;
}

.user_contact {
  margin-bottom: 0px;
}

.btn {
  margin: 0px 5px !important;
  font-size: small !important;
}

.btn-primary,
.btn-primary:active,
.btn-primary:visited {
  background-color: rgb(83, 192, 152) !important;
  color: white !important;
  border-color: rgb(83, 192, 152) !important;
  border-radius: 45px !important;
  font-size: medium !important;
  padding-left: 30px !important;
  padding-right: 30px !important;
}

.btn-primary:hover {
  background-color: rgb(43, 152, 112) !important;
}

.btn-success,
.btn-success:active,
.btn-success:visited {
  color: rgb(83, 192, 152) !important;
  background-color: rgb(221, 247, 243) !important;
  border-color: rgb(221, 247, 243) !important;
  border-radius: 45px !important;
  font-size: medium !important;
  padding-left: 30px !important;
  padding-right: 30px !important;
}

.btn-success:hover {
  background-color: rgb(83, 192, 152) !important;
  border-color: rgb(83, 192, 152) !important;
  color: white !important;
  border-radius: 45px !important;
  font-size: medium !important;
  padding-left: 30px !important;
  padding-right: 30px !important;
}

.badge-success {
  background-color: rgb(221, 247, 243) !important;
  border-color: rgb(221, 247, 243) !important;
  color: rgb(83, 192, 152) !important;
  border-radius: 45px !important;
  padding: 8px 16px;
}

.btn-danger,
.btn-danger:active,
.btn-danger:visited {
  background-color: rgb(244, 222, 227) !important;
  color: rgb(245, 50, 64) !important;
  border-color: rgb(244, 222, 227) !important;
  border-radius: 45px !important;
  font-size: medium !important;
  padding-left: 30px !important;
  padding-right: 30px !important;
}

.btn-danger:hover {
  background-color: rgb(245, 50, 64) !important;
  border-color: rgb(245, 50, 64) !important;
  color: white !important;
}

.badge-danger {
  background-color: rgb(244, 222, 227) !important;
  color: rgb(245, 50, 64) !important;
  border-radius: 45px !important;
  padding: 8px 16px;
}

.btn-warning,
.btn-warning:hover,
.btn-warning:active,
.btn-warning:visited {
  background-color: #f9be02 !important;
  border-radius: 45px !important;
  font-size: medium !important;
  padding: 8px 16px;
}

.badge-warning {
  background-color: rgb(251, 230, 195) !important;
  border-color: rgb(226, 141, 53) !important;
  color: rgb(226, 141, 53) !important;
  border-radius: 45px !important;
  padding: 8px 16px;
}

.btn-secondary,
.btn-secondary:active,
.btn-secondary:visited {
  color: #343a40 !important;
  background-color: #e9ecef !important;
  border-color: #e9ecef !important;
  border-radius: 45px !important;
  font-size: medium !important;
  padding-left: 30px !important;
  padding-right: 30px !important;
}

.btn-secondary:hover {
  background-color: #6c757d !important;
  border-color: #6c757d !important;
  color: white !important;
  border-radius: 45px !important;
  font-size: medium !important;
  padding-left: 30px !important;
  padding-right: 30px !important;
}

.badge-secondary {
  background-color: #e9ecef !important;
  border-color: #343a40 !important;
  color: #343a40 !important;
  border-radius: 45px !important;
  padding: 8px 16px;
}

.btn-info,
.btn-info:active,
.btn-info:visited {
  color: rgb(83, 34, 182) !important;
  background-color: rgb(238, 229, 251) !important;
  border-color: rgb(238, 229, 251) !important;
  border-radius: 45px !important;
  font-size: medium !important;
  padding-left: 30px !important;
  padding-right: 30px !important;
}

.btn-info:hover {
  background-color: rgb(83, 34, 182) !important;
  border-color: rgb(83, 34, 182) !important;
  color: white !important;
  border-radius: 45px !important;
  font-size: medium !important;
  padding-left: 30px !important;
  padding-right: 30px !important;
}

.btn-light,
.btn-light:active,
.btn-light:visited {
  color: rgb(83, 192, 152) !important;
  background-color: white !important;
  border-color: white !important;
  border-radius: 45px !important;
  font-size: medium !important;
  padding-left: 30px !important;
  padding-right: 30px !important;
}

.btn-light:hover {
  background-color: rgb(83, 192, 152) !important;
  border-color: rgb(83, 192, 152) !important;
  color: white !important;
  border-radius: 45px !important;
  font-size: medium !important;
  padding-left: 30px !important;
  padding-right: 30px !important;
}

.btn-link,
.btn-link:hover,
.btn-link:active,
.btn-link:visited {
  color: rgb(83, 192, 152) !important;
  border-radius: 45px !important;
}

.badge-dark {
  background-color: #6c757d !important;
}

.alert-secondary,
.alert-secondary:hover,
.alert-secondary:active,
.alert-secondary:visited {
  background-color: rgb(246, 247, 249) !important;
  border-color: rgb(226, 227, 229) !important;
}

.request-pfp {
  width: 40px;
  height: 40px;
  object-fit: cover;
  clip-path: circle(40px at center);
  margin-right: 15px;
}
.popup-alert {
  position: absolute !important;
  width: 605px;
  z-index: 100;
  top: 20px;
  left: 400px;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.timeago {
  color: rgba(0, 0, 0, 0.5) !important;
}

h6 {
  color: #3d3d4e !important;
}

p {
  color: #3d3d4e;
}

.badge {
  padding: 6px 10px !important;
  text-transform: uppercase;
  font-size: 11px !important;
}

.list-group-item {
  padding-left: 5px !important;
}

.modal-content {
  border-radius: 25px !important;
  border-color: white !important;
}
.modal-header {
  padding: 30px !important;
}
</style>
