export default [/*{
	path: '/user',
	component: '../layout/UserLayout/index',
	routes: [
		{
			name: 'login',
			path: '/user/login',
			component: '../pages/user/login/index',
		},
		{
			component: '../pages/exception/404/index',
		},
	],
},*/{
	path: '/',
	component:"../layout/BasicLayout/index",
	routes:[{
		path: '/home',
		name: 'Home',
		component:'../pages/home'
	},{
		path: '/about',
		name: 'About',
		component:'../pages/about'
	},{
		path: '/form',
		name: 'Form',
		component:'../pages/form/index'
	}]
}];