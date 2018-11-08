import Vue from 'vue'
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
    template: require('./user-list.html'),
    data() {
        return {
            items: UserService.getAll(),
            editItem: {
                title: null,
                isNew: true,
                data: null
            }
        }
    },
    computed: {
        isEditing() {
            return this.editItem.data != null
        }
    },
	beforeRouteEnter(to, from, next) {
		next(vm => {
            vm.$root.title = 'Users';
	    })
    },
    methods: {
        newuser() {
            this.editItem.title = 'New User'
            this.editItem.isNew = true
            this.editItem.data = UserService.newuser()
        },
        edit(item) {
            this.editItem.title = item.firstName + ' ' + item.lastName;
            this.editItem.isNew = false
            this.editItem.data = jQuery.extend({}, item);
        },
        remove(item) {
            if (confirm('Are you sure you want to delete \"' + item.firstName + ' ' + item.lastName + '\" user?')) {
                var index = this.items.indexOf(item);
                if (index > -1) {
                    this.items.splice(index, 1);
                    UserService.saveAll(this.items);
                    if (item.id == AuthenticationService.getAuthenticatedUserId()) {
                        this.$root.signOut();
                    }
                }
            }
        },
        create() {
			this.$validator.validate().then(result => {
				if (!result) {
				} else {
					this.editItem.data.password = 'abc123';
					this.items.push(this.editItem.data)
					UserService.saveAll(this.items);
					this.editItem.data = null;				
				}
			  });
        },
        update() {
			this.$validator.validate().then(result => {
				if (!result) {
				} else {
					var itemIndex = _.findIndex(this.items, { 'id': this.editItem.data.id })
					Vue.set(this.items, itemIndex, this.editItem.data)
					UserService.saveAll(this.items);
					this.editItem.data = null;
				}
			  });
        },
        cancelEditing() {
            this.editItem.data = null;
        }
    }
}