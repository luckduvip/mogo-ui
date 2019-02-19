<template>
	<footer class="mogo-footer" :style="{'background-color': background}">
		<div class="mogo-footer-item" v-for="item in list" :key="item.id" :class="{active: currentId == item.id}" @click="clickHandle(item.id)">
			<i v-if="item.fontName" :class="item.fontName" :style="getIconColor(item.id)"></i>
			<template v-else>
				<img :src="item.icon" v-show="currentId != item.id" />
				<img :src="item.activeIcon" v-show="currentId == item.id" />
			</template>
			<span :style="getLabelColor(item.id)">{{item.label}}</span>
			<mogo-point v-if="item.account != '' && item.account != undefined">{{item.account}}</mogo-point>
		</div>
		<div class="border-top" :style="{'border-top-color':borderTop}" v-if="borderTop">
			
		</div>
	</footer>
</template>

<script>
import MogoPoint from '_components/MogoPoint';
export default{
	props: {
		/**footer background color**/
		background: {type: String},
		/**footer border-top color**/
		borderTop: {type: String},
		/**当前footer active id**/
		currentId: { type: [String,Number], },
		/**footer 按钮数据**/
		list: { type: Array, },
		/**使用iconfont时不同状态下的颜色**/
		iconColor: String,
		iconActiveColor: String,
		/**label不同状态下的颜色**/
		footerColor: String,
		footerActiveColor: String,
	},
	computed: {
	},
	model: {
		prop: 'currentId',
		event: 'change',
	},
	methods: {
		/**如果 使用iconfont时，获取不同状态下的颜色**/
		getIconColor(id){
			if(this.currentId == id){
				return {
					color: this.iconActiveColor || this.footerActiveColor
				}
			}else{
				return {
					color: this.iconColor || this.footerColor
				}
			}
		},
		getLabelColor(id){
			if(this.currentId == id){
				return { color: this.footerActiveColor }
			}else{
				return { color: this.footerColor }
			}
		},
		/**点击时处理**/
		clickHandle(id){
			if(this.currentId != id){
				this.$emit('change',id);
			}
		}
	},
	components: {MogoPoint,},
}
</script>
<style scoped lang="scss">
.mogo-footer{
	display: flex; display: -webkit-flex;
	position: fixed; width: 100%; height: 98px; left: 0; bottom: 0; align-items: center;
	.border-top{
		position: absolute; left: 0; top: 0; width: 100%; height: 2px; border-top: 1px solid #ddd; transform-origin: center top; transform: scale(1,.5); -webkit-transform: scale(1,.5);
	}
	&-item{
		width: 44px; position: relative; padding-bottom: 28px; height: 72px; margin: 0 auto; color: #222;
		img{
			display: block; width: 44px; height: 44px;
		}
		i{
			display: block; width: 40px; height: 40px; line-height: 40px; text-align: center; font-size: 40px;
		}
		span{
			position: absolute; width: 300%; left: -100%; bottom: 0; font-size: 20px; text-align: center; line-height: 20px; color: #222;
		}
		.mogo-point{
			position: absolute; width: 52px; height: 52px; font-size: 32px; color: #fff; background: red; right: -32px; top: -8px;
		}
		&.active{
			i{
				color: red;
			}
			span{
				color: red;
			}
		}
	}
}
</style>
