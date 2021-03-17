<template>
  <div id="app">
    <!-- Render pages routed to from the landing page -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
  #app {

  }

  /* Set height of the grid so .sidenav can be 100% (adjust if needed) */
  .row.content {
    height: 1500px;
    margin: 0px;
  }

  /* Set gray background color and 100% height */
  .sidenav {
      background-color: white;
      height: 100%;
      box-shadow: 0 0 0.5rem 0 rgb(136 152 170 / 15%);
      padding: 30px;
  }

  /* On small screens, set height to 'auto' for sidenav and grid */
  @media screen and (max-width: 767px) {
      .sidenav {
      height: auto;
      padding: 15px;
      }
      .row.content {height: auto;} 
  }

  .clist > * {
      float: left;
  }

  .page {
      margin: 0px;
      padding: 0px !important;
  }

  .home-feed {
      padding: 30px 40px !important;
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
</style>
