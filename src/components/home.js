import Autocomplete from 'vuejs-auto-complete'

module.exports = {
    template: require('./home.html'),
    route: {
        activate() {
            this.$root.title = null;
			setTimeout(function(){
				jQuery(".waiting").show();
				setTimeout(function(){
					jQuery(".waiting").text("Ready");
					setTimeout(function(){
						jQuery(".waiting").hide();
					},3000);
				},2000);
			},2000);
			/**
			 * Build `states` list of key/value pairs
			 */
			function loadAll() {
			  var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
					  Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
					  Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
					  Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
					  North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
					  South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
					  Wisconsin, Wyoming';

			  return allStates.split(/, +/g).map( function (state) {
				return {
				  id: state.toLowerCase(),
				  name: state
				};
			  });
			}
			this.$root.statessource = loadAll();
        }
    },
    components: {
		Autocomplete,
    }	
}