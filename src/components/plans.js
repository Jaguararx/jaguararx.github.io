module.exports = {
    template: require('./plans.html'),
	beforeRouteEnter(to, from, next) {
		next(vm => {
            vm.$root.title = 'Plans'
	    })
    }
}