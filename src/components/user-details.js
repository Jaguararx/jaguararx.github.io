import UserService from '../services/user-service.js'

module.exports = {
    template: require('./user-details.html'),
    data() {
        return {
            summary: null
        }
    },
	beforeRouteEnter(to, from, next) {
		next(vm => {
            try
            {
                var id = Number(vm.$route.params.userId)
                vm.summary = UserService.get(id)
                vm.$root.title = vm.summary.firstName + ' ' + vm.summary.lastName
            }
            catch (e)
            {
                vm.$root.showNotFound()
            }
	    })
    }
}