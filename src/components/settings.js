module.exports = {
    template: require('./settings.html'),
	beforeRouteEnter(to, from, next) {
		next(vm => {
            vm.$root.title = 'Settings'
	    })
    }
}