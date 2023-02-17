var app = new Vue({
	el: '#myapp',
	data:{
		employees: [],
		search: {
			keyword: ''
		},
		noEmployee: false
	},

	mounted(){
		this.fetchEmployees();
	},

	methods:{
		searchMonitor() {
			var keyword = app.toFormData(app.search);

	   		axios.post('action.php?action=search', keyword)
				.then(function(response){
					app.employees = response.data.employees;

					if(response.data.employees == ''){
						app.noEmployee = true;
					}
					else{
						app.noEmployee = false;
					}
				});
       	},

       	fetchEmployees(){
			axios.get('action.php')
				.then(function(response){
					app.employees = response.data.employees;
				});
       	},

		toFormData(obj){
			var form_data = new FormData();
			for(var key in obj){
				form_data.append(key, obj[key]);
			}
			return form_data;
		},

	}
});
