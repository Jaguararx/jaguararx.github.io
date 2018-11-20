import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VeeValidate from 'vee-validate'
import VueSelect from 'vue-cool-select'

import JQuery from '../node_modules/jquery/dist/jquery.js'

import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker3.css'
import '../node_modules/jquery-confirm/dist/jquery-confirm.min.css'
import './css/main.scss'
import '../node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.js'
import AuthenticationService from './services/authentication-service.js'
import forbidden from './components/forbidden.js'

window.$ = window.jQuery = JQuery

require('../node_modules/bootstrap/dist/js/bootstrap.js')
require('../node_modules/jquery-confirm/dist/jquery-confirm.min.js')

_ = require('lodash');

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(VeeValidate)
Vue.use(VueSelect, {
  theme: 'bootstrap' // or 'material-design'
})
require('./directives.js')

var requireWithAuthentication = function(componentPath) {
	var component = require(componentPath)

	return function (resolve) {
		if (AuthenticationService.isAuthenticated()) {
			resolve(component)
		}
		else {
			resolve(forbidden)
		}
	}
}

var router = new VueRouter({routes: [
	{ path:'', component: require('./components/home.js')},
	{ path:'/signin', component: require('./components/sign-in.js') },
    { path:'/signup', component: require('./components/sign-up.js') },
	{ path:'/plans', component: require('./components/plans.js') },
	{ path:'/products', component: require('./components/products.js') },
	{ path:'/calculations', component: require('./components/calculations.js') },
	{ path:'/javadoc', component: require('./components/javadoc.js') },
	{ path:'/settings', component: requireWithAuthentication('./components/settings.js') },
	{ path:'/users', component: requireWithAuthentication('./components/user-list.js') },
	{ path:'/users/:userId', component: requireWithAuthentication('./components/user-details.js') },
	{ path:'*', component: require('./components/not-found.js') }
	]
})
router.afterEach((to, from) => {
	if (typeof router.app!='undefined' && typeof router.app.clearErrors!='undefined') {
		router.app.clearErrors()
	}
})

new Vue({
	el: '#app',
	router: router,
	data : { 
			title: null,
            isAuthenticated: AuthenticationService.isAuthenticated(),
            apperrors: {
                notFound: false
            }
	},
	methods: {
        signIn(email, password) {
            var isSucces = AuthenticationService.authenticate(email, password)
            if (isSucces) {
                this.isAuthenticated = true
            }
            return isSucces
        },
        signOut(e) {
            if (e) {
                e.preventDefault()
            }
            AuthenticationService.signOut()
            this.isAuthenticated = false
            this.$router.push('/signin')
        },
        showNotFound() {
            this.apperrors.notFound = true
            this.title = 'Page Not Found'
        },
        clearErrors() {
            this.apperrors.notFound = false
        }
    },
    components: {
       notFound: {
            template: require('./components/not-found.html')
        }
    }
});
//router.start(App, 'html')
