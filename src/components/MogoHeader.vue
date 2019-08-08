<template>
<header class="mogo-header">
	<div class="mogo-header-main" ref="header" :class="getHeaderClass">
		<div class="mogo-header-h mogo-flex">
			<slot name="left"> 
				<div class="mogo-header-left">
					<mogo-icon @click="leftClick" class="mogo-header-icon" className="mogo-dingbudaohang-fanhui"></mogo-icon>
					<mogo-icon @click="callClose" v-if="canClose" class="mogo-header-icon" className="mogo-dingbudaohang-shanchu" ></mogo-icon>
				</div>
			</slot>
			<slot>标题</slot>
			<slot name="right" v-if="right !== false">
				<div @click="rightClick" class="mogo-header-right">{{right}}</div>
			</slot>
			<div class="mogo-header-h-border" v-if="borderBottom!=''" :style="{'border-bottom-color':borderBottom}"></div> 
		</div>
		<slot name="append"></slot>
	</div>
	<div class="block" v-if="fixed" :style="{height:headerHeight+'px'}"></div>
</header>
</template>

<script>
import Mogo from 'mogo-lib';
import MogoIcon from '_supports/MogoIcon';
export default{
	data(){
		return {
			headerHeight: 0,
		}
	},
	computed: {
		getHeaderClass(){
			let className = [];
			if(this.fixed){
				className.push('mogo-header-main-fixed')
			}
			if(this.theme == 'dark' || this.theme == 'light'){
				className.push(`mogo-header-main-${this.theme}`);
			}
			return className;
		}
	},
	props: {
		/**
		 * 如果为false则不显示
		 * 如果没有则slot=right则显示默认
		 * **/
		right: {
			type: [String,Boolean],
			default: false,
		},
		/**是否允许关闭**/
		canClose: Boolean,
		/**主题名称，黑色，白色**/
		theme: {type: String, default: 'dark'},
		/**是否position:fixed
			false: position: relative
			true: position: fixed
			**/
		fixed: { type: Boolean, default: false, },
		/**border-bottom颜色**/
		borderBottom: { type: String, default: '' },
	},
	methods: {
		initHeader(){
			var header = this.$refs.header;
			console.log(Mogo,Mogo.ApiTool);
			Mogo.ApiTool.fixStatusBar(header);
			this.headerHeight = this.getHeaderHeight();
			if(window.api){
				api.setStatusBarStyle({
					style: 'dark'
				});
			}
			
		},
		getHeaderHeight(){
			return this.$refs.header.offsetHeight;
		},
        // 左侧按钮事件
        // 可通过设置 back 函数阻止默认后退行为
		leftClick () {
			// 通过判断 $liteners 是否有定义 back 事件
			// 参考：https://cn.vuejs.org/v2/api/#vm-listeners
			if (typeof this.$listeners.left !== 'undefined') {
				this.$emit('left')
			} else {
				window.api && api.closeWin();
			}
		},
		/**
		 * canClose时点击关闭时的处理方法
		 **/
		callClose(){
			if (typeof this.$listeners.close !== 'undefined') {
				this.$emit('close')
			} else {
				api.closeWin();
			}
		},
        // 右侧按钮事件
        rightClick () {
            // 如果是 a 标签，且有 href, 不进行回调
			if (this.$slots.right && this.$slots.right[0].tag === 'a' && this.$slots.right[0].data.attrs.href.indexOf('javascript:') === -1) return
            if (typeof this.$listeners.right !== 'undefined') {
				this.$emit('right')
            } else {
            }
        }
	},
	mounted(){
		this.initHeader();
	},
	components: {MogoIcon,},
}
</script>

<style scoped lang="scss">
$height: 88px;
.mogo-header{
	&-main{
		background: #fff;
		&-fixed{
			position: fixed; width: 100%; left: 0; top: 0; z-index: 10;
		}
		&-dark{
			$color: #fff;
			background: #666;
			.mogo-header{
				&-right,
				&-h,
				&-icon{
					color: $color;
				}
			}
		}
	}
	&-h{
		position: relative; height: $height; padding-left: 150px; padding-right: 150px;
		align-items: center; justify-content: center;
		&-border{
			width: 100%; height: 2px;/*no*/ left: 0; bottom: 0; position: absolute;
			border-bottom-width: 1px;
			border-bottom-style: solid;
			box-sizing: border-box;
			pointer-event: none;
			-webkit-box-sizing: border-box;
			transform-origin: 0 bottom;
			transform: scaleY(.5);
			-webkit-transform-origin: 0 bottom;
			-webkit-transform: scaleY(.5);
		}
	}
	&-left{
		position: absolute; left: 20px; top: 0;
	}
	&-right{
		position: absolute; right: 20px; top: 0; line-height: $height; font-size: 26px; color: #666;
	}
	&-icon{
		height: $height; width: 40px; float: left;
	}
}
</style>
