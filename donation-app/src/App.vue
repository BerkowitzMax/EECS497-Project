<template>
  <div id="app">
    <Spinner :start="spin.val" />
    <!-- Render pages routed to from the landing page -->
    <router-view></router-view>
  </div>
</template>

<script>
import Spinner from "./components/Spinner.vue";

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
    };
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

.page {
  margin: 0px;
  padding: 0px !important;
}

.charity_picture {
  margin-right: 10px;
  width: 75px;
  height: 75px;
  object-fit: contain;
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
}

.btn-primary,
.btn-primary:hover,
.btn-primary:active,
.btn-primary:visited {
  background-color: #7cdbd5 !important;
}

.btn-success,
.btn-success:active,
.btn-success:visited {
  background-color: rgb(83, 192, 152) !important;
  border-color: rgb(83, 192, 152) !important;
}

.btn-success:hover {
  background-color: rgb(43, 152, 112) !important;
  border-color: rgb(43, 152, 112) !important;
}

.btn-outline-success,
.btn-outline-success:hover,
.btn-outline-success:active,
.btn-outline-success:visited {
  background-color: rgb(221, 247, 243) !important;
  border-color: rgb(83, 192, 152) !important;
  color: rgb(83, 192, 152) !important;
}

.btn-danger,
.btn-danger:hover,
.btn-danger:active,
.btn-danger:visited {
  background-color: #f53240 !important;
}

.btn-warning,
.btn-warning:hover,
.btn-warning:active,
.btn-warning:visited {
  background-color: #f9be02 !important;
}

.btn-secondary,
.btn-secondary:active,
.btn-secondary:visited {
  color: #212529 !important;
  background-color: rgb(219, 224, 228) !important;
  border-color: rgb(219, 224, 228) !important;
}

.btn-secondary:hover {
  background-color: rgb(221, 247, 243) !important;
  border-color: rgb(221, 247, 243) !important;
}

.btn-link,
.btn-link:hover,
.btn-link:active,
.btn-link:visited {
  color: rgb(83, 192, 152) !important;
}
</style>
