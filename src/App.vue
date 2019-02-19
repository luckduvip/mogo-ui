<template>
<div>
	<mogo-header theme="light">lasdkfkasdfkasd</mogo-header>
	<mogo-tab v-model="tabId" :list="tabs" id="test-mogo-tab"></mogo-tab>
	<template v-for="item in myItems">
		<mogo-my-item @myClick="myItemClickHandle" :id="item.id" :icon="item.icon" :label="item.label" :appendLabel="item.appendLabel" :rightIcon="item.rightIcon" :key="item.id"></mogo-my-item>
	</template>
	<mogo-point>1</mogo-point>
	<mogo-point w="80" h="80" fz="40" color="#fff">1</mogo-point>
	<mogo-footer borderTop="#ddd" background=''  v-model="footerId" :list="footerItems" :iconActiveColor="iconActiveColor" :iconColor="iconColor" :footerColor="footerColor" :footerActiveColor="footerActiveColor"></mogo-footer>
</div>
</template>

<script>
import MogoPoint from '_components/MogoPoint';
import MogoHeader from '_components/MogoHeader';
import MogoTab from '_components/MogoTab';
import MogoMyItem from '_components/MogoMyItem';
import MogoFooter from '_components/MogoFooter';
export default{
	data(){
		return {
			tabId: '1',
			tabs: [
				{ id: '1', label: '我的' },
				{ id: '2', label: '你的' },
				{ id: '3', label: '他的' },
				{ id: '4', label: '中的' },
			],
			myItems: [
				{ id: 'income', label: '我的订单', appendLabel: '共0单', icon: require('_images/my-income.png'), },
				{ id: 'test', label: '我的收藏', appendLabel: '', icon: require('_images/my-notice.png'), } 
			],
			/**当前footer active id**/
			footerId: 'home',
			/**label不同状态下的颜色**/
			footerColor: 'gray',
			footerActiveColor: 'red',
			/**footer 按钮数据**/
			footerItems: [
				{ id: 'home', label: '首页', icon: require('_images/footer-my.png'), activeIcon: require('_images/footer-my-hover.png'),  },
				{ id: 'page', label: '页面', fontName: 'baojie baojie-yidingwei-fadongtai', },
				{ id: 'hwhw', label: '教程', icon: require('_images/footer-my.png'), activeIcon: require('_images/footer-my-hover.png'),  },
				{ id: 'my', label: '个人中心', icon: require('_images/footer-my.png'), activeIcon: require('_images/footer-my-hover.png'), account: 1, },
			]
		}
	},
	watch: {
		tabId: function(to,from){
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
	components: {MogoTab,MogoMyItem,MogoFooter,MogoHeader,MogoPoint,},
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
