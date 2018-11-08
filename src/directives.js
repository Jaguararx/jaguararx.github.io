import Vue from 'vue'

Vue.directive('show-modal', function (el, binding) {
	$(el).modal(binding.value ? 'show' : 'hide')
}
);

Vue.directive('date-picker', function (el, binding) {
    if (binding.value) {
        $(el).datepicker({
            autoclose: true
        })
    }
});
