module.exports = {
    template: require('./javadoc.html'),
	beforeRouteEnter(to, from, next) {
		next(vm => {
            vm.$root.title = 'COE Test Automation Framework (Java) Documentation';
			jQuery('html').addClass('allwidth');
	    })
    }
}