import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import CharityApp from './components/App/CharityApp.vue'
import DonorApp from './components/App/DonorApp.vue'

import CharityHome from './views/CharityHome/index.vue'
import DonorHome from './views/DonorHome/index.vue'
import DonorProfile from './views/DonorProfile/index.vue'
import AppInfo from './views/AppInfo/index.vue'
import LandingPage from './views/LandingPage/index.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
        // Common Routes
        {
            path: '/',
            name: 'App',
            redirect: 'welcome',
            component: App
        },
        {
            path: '/welcome',
            name: 'Landing Page',
            component: LandingPage
        },

        // Donor Routes
        {
            path: '/donor',
            name: 'Donor App',
            redirect: { 'name': 'donor-home' },
            component: DonorApp,
            children: [
                {
                    path: 'home',
                    name: 'donor-home',
                    component: DonorHome
                },
                {
                    path: 'profile',
                    name: 'donor-profile',
                    component: DonorProfile
                },
                {
                    path: 'info',
                    name: 'app-info',
                    component: AppInfo
                },
                
            ]
        },
        

        // Charity Routes
        {
            path: '/charity',
            name: 'Charity App',
            redirect: { 'name': 'charity-home' },
            component: CharityApp,
            children: [
                {
                    path: 'home',
                    name: 'charity-home',
                    component: CharityHome
                },
                {
                    path: 'info',
                    name: 'app-info',
                    component: AppInfo
                },
            ]
        }
    ],
    mode: 'history'
})

