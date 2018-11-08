module.exports = {
    template: require('./forbidden.html'),
	beforeRouteEnter(to, from, next) {
		next(vm => {
            vm.$root.title = 'Forbidden';
	    })
    }
}