import { CoolSelect } from 'vue-cool-select'

module.exports = {
    template: require('./home.html'),
	beforeRouteEnter(to, from, next) {
		next(vm => {
            vm.$root.title = null;
			setTimeout(function(){
				jQuery(".waiting").show();
				setTimeout(function(){
					jQuery(".waiting").text("Ready");
					setTimeout(function(){
						jQuery(".waiting").hide();
					},3000);
				},2000);
			},2000);
	    })
    },
	data () {
		return {
		  selected: null,
		  items: [
			  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
			  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
			  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
			  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina',
			  'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
			  'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
			  'Wisconsin', 'Wyoming'		
		  ]
		}
	},
    components: {
		 CoolSelect 
    }	
}