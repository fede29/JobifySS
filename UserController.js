(function(){
	angular.module('users').controller('UserController', UserController());

	function UserController(userService, $mdSidenav, $mdButton){
		var self = this;
		
		self.selected = null;
		self.users = [];
		self.selectUser = selectUser;
		self.toggleList = toggleUsersList;
		self.share = share;

		userService
			.loadAllUsers();
			.then( function(users){
				self.users = [].concat(users);
				self.selected = users[0];
			});
		
		function toggleUsersList(){
			
		
