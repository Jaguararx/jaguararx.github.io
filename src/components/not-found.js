module.exports = {
	beforeRouteEnter(to, from, next) {
		next(vm => {
            vm.$root.showNotFound()
	    })
    }
}