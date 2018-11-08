import AuthenticationService from '../services/authentication-service.js'
import UserService from '../services/user-service.js'
import { Validator } from 'vee-validate';


Validator.extend('uniqueEmail', {
  getMessage: value => value + ' is already used by another user.',
  validate: value => function (value) {
                return UserService.isEmailUnique(value)
            }
});

module.exports = {
    template: require('./sign-up.html'),
    data() {
        return {
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            agreement: false
        }
    },
	beforeRouteEnter(to, from, next) {
		next(vm => {
            vm.$root.title = 'Sign Up';
	    })
    },
    methods: {
        signUp() {
			this.$validator.validate().then(result => {
				if (!result) {
				} else {
					var newUser = UserService.newuser();
					newUser.firstName = this.firstName;
					newUser.lastName = this.lastName;
					newUser.email = this.email;
					newUser.password = this.password;

					var users = UserService.getAll();
					users.push(newUser);
					UserService.saveAll(users);

					if (this.$root.signIn(this.email, this.password)) {
						this.$router.push('/users/' + newUser.id)
					} else {
						alert("Failed to create account.");
					}
				}
			  });
        }
    }
}