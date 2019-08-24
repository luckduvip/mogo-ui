<template>
	<div class="outer">
		<mogo-header theme="light" fixed right="显示什么" borderBottom="#eee" @left="leftHandle">
			lasdkfkasdfkasd
			<mogo-tab slot="append" v-model="tabId" :list="tabs" id="test-mogo-tab"></mogo-tab>
		</mogo-header>
		<template v-for="item in myItems">
			<mogo-my-item @myClick="myItemClickHandle" :id="item.id" :icon="item.icon" :label="item.label" :appendLabel="item.appendLabel" rightIcon="mogo-liebiao-jiantou" :key="item.id"></mogo-my-item>
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
		<mogo-layer ref="mogoLayer"/>
	</div>
</template>

<script>

import MogoPoint from '_components/MogoPoint';
import MogoHeader from '_components/MogoHeader';
import MogoTab from '_components/MogoTab';
import MogoMyItem from '_components/MogoMyItem';
import MogoTitle from '_supports/MogoTitle';
import MogoBtn from '_components/MogoBtn';
import MogoLayer from '_components/MogoLayer';
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
					{ id: 'income', label: '我的订单', appendLabel: '共0单', icon: 'mogo-dingbudaohang-fanhui', },
					{ id: 'test', label: '我的收藏', appendLabel: '', icon: 'mogo-dingbudaohang-fanhui', } 
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
			leftHandle(){
				console.log('lllllll');
			},
			myItemClickHandle(id){
				alert(`item clicked ${id}`);
			}
		},
		mounted(){
			this.$refs.mogoLayer.openToast('这这是一个浮窗toast这是一个浮窗toast这是一个浮窗toast是一个浮窗toast','mogo-dingbudaohang-shanchu mogofont','rgba(0,0,0,.1)');
			setTimeout(()=>{
				this.$refs.mogoLayer.openConfirm({
					label: '我我我是内容我是内容是内容我我是内容我是内容是内容我是内容我是内容是内容',
					title: '我是标题',
					handle: (flag)=>{
						console.log(`the result ==${flag}`,this.myItems);
						
					}
				},'rgba(0,0,0,.1)');
			},2000);
			setTimeout(()=>{
				this.$refs.mogoLayer.openConfirm({
					label: '我我我是内容我是内容是<br/>内容我我是内容我是内容是内容我是内容<br/>我是内容是内容',
					handle: (flag)=>{
						console.log(`the result ==${flag}`,this.myItems);
						
					}
				},'rgba(0,0,0,.1)');
			},4000);
		},
		components: {MogoTab,MogoMyItem,MogoHeader,MogoPoint,
MogoTitle, MogoBtn,
			MogoLayer,
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
