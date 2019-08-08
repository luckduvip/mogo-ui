import VueRouter from 'vue-router';
import Vue from 'vue';
import home from '_views/home';
Vue.use(VueRouter);
let routes = [
	{ name: 'home', path: '', component: ()=> import('_views/home'), },
	{ name: 'form', path: '/form', component: ()=> import('_views/form'), },
]
export const router = new VueRouter({
	routes,
})
