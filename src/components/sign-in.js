module.exports = {
    template: require('./sign-in.html'),
    data() {
        return {
            email: null,
            password: null,
        }
    },
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.$root.title = 'Sign In';
	    })
    },
    methods: {
        signIn() {
			this.$validator.validate().then(result => {
				if (!result) {
                    this.password = null
                    // this.$setValidationErrors([
                        // { field: 'password', message: 'or Email is invalid' }
                    // ])
				} else {
					if (this.$root.signIn(this.email, this.password)) {
						this.$router.push('/users')
					}
				}
			  });
        }
    }
}