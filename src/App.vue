<template>
<div>
	<router-view class="main-router"></router-view>
	<mogo-footer borderTop="#ddd" background=''  v-model="footerId" :list="footerItems" :iconActiveColor="iconActiveColor" :iconColor="iconColor" :footerColor="footerColor" :footerActiveColor="footerActiveColor"></mogo-footer>
</div>
</template>

<script>
import MogoFooter from '_components/MogoFooter';
export default{
	data(){
		return {
			iconActiveColor: 'red',
			iconColor: '#222',
			footerColor: '#222',
			footerActiveColor: 'red',
			/**当前footer active id**/
			footerId: 'home',
			/**label不同状态下的颜色**/
			footerColor: 'gray',
			footerActiveColor: 'red',
			/**footer 按钮数据**/
			footerItems: [
				{ id: 'home', label: '基础', icon: require('_images/footer-my.png'), activeIcon: require('_images/footer-my-hover.png'),  },
				{ id: 'form', label: '表单', fontName: 'mogo-danxuanfuxuan-normal', },
				{ id: 'hwhw', label: '教程', icon: require('_images/footer-my.png'), activeIcon: require('_images/footer-my-hover.png'),  },
				{ id: 'my', label: '个人中心', icon: require('_images/footer-my.png'), activeIcon: require('_images/footer-my-hover.png'), account: 1, },
			]
		}
	},
	watch: {
		footerId: function(to,from){
			this.$router.push({name:to});
			console.log(`cid change ${to}--${from}`);
		},
	},
	computed: {
	},
	props: {
	},
	methods: {
		myItemClickHandle(id){
			alert(`item clicked ${id}`);
		}
	},
	mounted(){
	},
	components: {MogoFooter},
}
</script>

<style lang="scss">
#test-mogo-tab{ 
	.mogo-tab-item{
		margin: 0 20px; color: #333;
		&.active{
			color: red;
		}
	}
	.mogo-tab-bottom{
		background: red;
	}
}
</style>
<style scoped lang="scss">
.mogo-tab{ height: 80px; }
</style>
