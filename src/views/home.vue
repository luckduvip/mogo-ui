<template>
	<div class="outer">
		<mogo-header theme="light" fixed right="显示什么" borderBottom="#eee">
			lasdkfkasdfkasd
			<mogo-tab slot="append" v-model="tabId" :list="tabs" id="test-mogo-tab"></mogo-tab>
		</mogo-header>
		<template v-for="item in myItems">
			<mogo-my-item @myClick="myItemClickHandle" :id="item.id" :icon="item.icon" :label="item.label" :appendLabel="item.appendLabel" rightIcon :key="item.id"></mogo-my-item>
		</template>
		<mogo-header theme="light" borderBottom="#eee">
			lasdkfkasdfkasd
		</mogo-header>
		<mogo-point>1</mogo-point>
		<mogo-point w="80" h="80" fz="40" color="#fff">1</mogo-point>
		<mogo-title>按钮</mogo-title>
		<mogo-btn class="test-btn" type="submit" className="bg-radius">圆角背景</mogo-btn>
		<mogo-btn class="test-btn" type="button" className="bd-radius">圆角边框</mogo-btn>
		<mogo-btn class="test-btn" type="button" className="bg-circle">半圆背景</mogo-btn>
		<mogo-btn class="test-btn" type="button" className="bd-circle">半圆边框</mogo-btn>
		<mogo-btn class="test-btn" type="button" className="bg-rect">矩形背景</mogo-btn>
		<mogo-title>按钮-disabled</mogo-title>
		<mogo-btn class="test-btn" disabled type="submit" className="bg-radius">圆角背景</mogo-btn>
		<mogo-btn class="test-btn" disabled type="button" className="bd-radius">圆角边框</mogo-btn>
		<mogo-btn class="test-btn" disabled type="button" className="bg-circle">半圆背景</mogo-btn>
		<mogo-btn class="test-btn" disabled type="button" className="bd-circle">半圆边框</mogo-btn>
		<mogo-btn class="test-btn" disabled type="button" className="bg-rect">矩形背景</mogo-btn>
	</div>
</template>

<script>

import MogoPoint from '_components/MogoPoint';
import MogoHeader from '_components/MogoHeader';
import MogoTab from '_components/MogoTab';
import MogoMyItem from '_components/MogoMyItem';
import MogoTitle from '_supports/MogoTitle';
import MogoBtn from '_components/MogoBtn';
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
		components: {MogoTab,MogoMyItem,MogoHeader,MogoPoint,
MogoTitle, MogoBtn,
		},

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
.test-btn{
	width: 720px; margin: 20px auto;
}
.outer{
	padding-bottom: 100px
}
</style>
