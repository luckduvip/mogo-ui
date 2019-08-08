<template>
	<div class="mogo-tab" ref="me">
		<div class="mogo-tab-bottom" :style="bottomStyle"></div>
		<div class="mogo-tab-item" :ref="'tab' + item[idKey]" v-for="(item,key) in list" @click="clickHandle(item[idKey])" :key="item[idKey]" :class="{active: item[idKey] == currentId}">
			{{item[labelKey]}}
		</div>
	</div>
</template>

<script>
export default{
	props: {
		/**当前tabId**/
		currentId: { type: String, default: '', },
		/**id字段**/
		idKey: { type: String, default: 'id' },
		/**label字段**/
		labelKey: { type: String, default: 'label' },
		/**tabs数据**/
		list: { type: Array},
	},
	data(){
		return {
			bottomStyles: {},
			bottomStyle: {},
		}
	},
	methods: {
		/**根据key获取位置信息**/
		setBottomInfo(){
			if(!this.bottomStyles[this.currentId]){
				var dom = this.$refs[`tab${this.currentId}`];
				if(dom.length){
					console.log('doms ==',dom,dom[0].offsetWidth);
					this.$set(this.bottomStyles,this.currentId,{
						width: dom[0].offsetWidth + 'px',
						left: dom[0].offsetLeft+ 'px',
					});
				}
			}
			this.bottomStyle = this.bottomStyles[this.currentId];
		},
		/**tab点击处理**/
		clickHandle(val){
			this.$emit('change',val);
		}
	},
	watch: {
		currentId: function(to,from){
			if(to != from){
				this.setBottomInfo();
			}
		}
	},
	mounted(){
		this.setBottomInfo();
	},
	model: {
		prop: 'currentId',
		event: 'change',
	},
}
</script>
<style scoped lang="scss">
.mogo-tab{ 
	background: #fff;
	display: flex; display: -webkit-flex; align-items: center; position: relative;
	&-item{
		flex: 1; -webkit-flex: 1; font-size: 24px; color: #000; text-align: center;
		&.active{
			color: red;
		}
	}
	&-bottom{
		position: absolute; height: 1px; background: red; bottom: 0; width: 100%;
		transform-origin: left bottom; transform: scale(1,.5);
		transition: left .2s ease-in;
		-webkit-transition: left .2s ease-in;
	}
}

</style>
