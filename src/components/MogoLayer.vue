<template>
	<div class="layer-outer">
		<transition name="mogofade">
			<div class="layer-mask" :style="getMaskStyle" v-show="show != ''" @touchmove="moveHandle">
				<article class="layer-toast" v-if="show == 'toast'">
					<i class="layer-toast-icon" :class="toast.iconClass" v-if="toast.iconClass"></i>
					<span class="layer-toast-label">{{toast.label}}</span>
				</article>
				<article class="layer-confirm" v-if="show == 'confirm'" :class="{'layer-confirm_title':confirm.title}">
					<header v-if="confirm.title" class="layer-confirm-header">{{confirm.title}}</header>
					<p class="layer-confirm-main" v-html="confirm.label"></p>
					<footer class="layer-confirm-footer">
						<div @click="callConfirmHandle(false)" class="layer-confirm-footer-btn cancel-btn" v-if="!!confirm.cancelLabel">{{confirm.cancelLabel}}</div>
						<slot name="confirm">
							<div @click="callConfirmHandle(true)" class="layer-confirm-footer-btn confirm-btn">{{confirm.confirmLabel || '确定'}}</div>
						</slot>
					</footer>
				</article>
			</div>
		</transition>
	</div>
</template>

<script lang="ts">
export default{
	data(){
		return {
			/**显示什么东西**/
			show: '',
			/**显示遮罩**/
			showMask: '',
			toast: {
				iconClass: '',
				label: '',
			},
			confirm: {
				label: '',
				title: '',
				confirmLabel: '',
				cancelLabel: '',
				handle: null,
			},
			/**settimeout返回,用在clean时的处理**/
			timeoutReturn: '',
		}
	},
	computed: {
		getMaskStyle(){
			if(this.showMask === false){
				return '';
			}
			return `background:${this.showMask}`;
		}
	},
	methods: {
		moveHandle(e){
			e.preventDefault();
		},
		clear(){
			this.timeoutReturn && clearTimeout(this.timeoutReturn);
			this.showMask = '';
			this.show = '';
		},

		callConfirmHandle(flag){
			this.confirm.handle && this.confirm.handle(flag);
			this.clear();
			this.confirm = {};
		},
		/**
		 * 显示带按钮的确认弹窗
		 *
		 * @param {Object} confirm 弹窗的信息
		 * 	{
		 * 		label: String 内容文案
		 * 		title: String 弹窗标题,如果''则不显示 
		 * 		confirmLabel: String default '确定',确定按钮文案
		 * 		cancelLabel:String 取消按钮文案
		 * 		handle:Function 点击确认/取消时的回调
		 * 			handle(true) 确定
		 * 			handle(false) 取消
		 * 	}
		 * @param {String/false} showMask=false 弹窗遮罩
		 */
		openConfirm(confirm,showMask=false){
			this.clear();
			this.show = 'confirm';
			this.showMask = showMask;
			this.confirm = confirm;
		},
		/**
		 * 打开toast弹窗
		 *
		 * @param {String} label 文案
		 * @param {String} iconClass iconfont className
		 * @param {String/false} showMask=false 遮罩背景颜色,!== false则为颜色
		 * @param {Number/true} delay=true 是否定时关闭
		 */
		openToast(label,iconClass,showMask=false,delay=5000){
			this.clear();
			this.show = 'toast';
			this.showMask = showMask;
			this.toast = { iconClass, label};
			this.timeoutReturn = setTimeout(()=>{
				this.clear();
				this.toast = {};
			},delay);
		}
	}
}
</script>

<style scoped lang="scss">
@charset 'utf-8';

@mixin mogo-bdt($bdColor: #ddd){
	position: relative;
	&:after{
		content: ''; width: 100%; height: 2px;/*no*/ left: 0; top: 0; position: absolute;
		border-top: 1px solid $bdColor;/*no*/
		box-sizing: border-box;
		pointer-event: none;
		-webkit-box-sizing: border-box;
		transform-origin: 0 top;
		transform: scaleY(.5);
		-webkit-transform-origin: 0 top;
		-webkit-transform: scaleY(.5);
	}
}
@mixin mogo-bdb($bdColor: #ddd){
	position: relative;
	&:after{
		content: ''; width: 100%; height: 2px;/*no*/ left: 0; bottom: 0; position: absolute;
		border-bottom: 1px solid $bdColor;/*no*/
		box-sizing: border-box;
		pointer-event: none;
		-webkit-box-sizing: border-box;
		transform-origin: 0 bottom;
		transform: scaleY(.5);
		-webkit-transform-origin: 0 bottom;
		-webkit-transform: scaleY(.5);
	}
}
@mixin mogo-bdl($bdColor: #ddd){
	position: relative;
	&:before{
		content: ''; width: 2px; height: 100%;/*no*/ left: 0; top: 0; position: absolute;
		border-left: 1px solid $bdColor;/*no*/
		box-sizing: border-box;
		pointer-event: none;
		-webkit-box-sizing: border-box;
		transform-origin: 0 0;
		transform: scaleX(.5);
		-webkit-transform-origin: 0 0;
		-webkit-transform: scaleX(.5);
	}
}
.layer-outer{
	width: 1px; height: 1px; position: relative; 
}
.layer-mask{
	display: flex; display: -webkit-flex;
	position: fixed; width: 100%; height: 100%; left: 0; top: 0; justify-content: center; align-items: center; z-index: 1000;
}
.layer-toast{
	display: block; border-radius: 20px; border: .5px solid #e5e5e5; padding: 40px; background: #fff;
	max-width: 680px;
	&-icon{
		display: block; font-size: 68px; color: #222; margin-bottom: 24px; text-align: center;
	}
	&-label{
		display: block; font-size: 30px; color: #222; line-height: 44px;
	}
}
.layer-confirm{
	display: block; border-radius: 20px; width: 602px; background: #fff; padding-top: 44px;
	&-header{
		display: block; text-align: center; font-size: 34px; color: #222; padding: 0 48px; font-weight: 600; line-height: 54px;
	}
	&-main{
		display: block; padding: 0 48px; text-align: center; font-size: 32px; color: #222; line-height: 46px;
	}
	&-footer{
		@include mogo-bdt(#e6e6e6);
		display: flex; display: -webkit-flex; height: 98px; align-items: center; margin-top: 44px;
		&-btn{
			flex: 1; -webkit-flex: 1;
			display: flex; display: -webkit-flex; height: 100%; align-items: center; justify-content: center;
			font-size: 32px; font-weight: 600; color: #222;
			&+.confirm-btn{
				@include mogo-bdl(#e5e5e5);
			}

			&.confirm-btn{
				color: #DF4D44;
			}
		}
	}
	&_title{
		.layer-confirm-footer{
			margin-top: 36px;
		}
	}
}
</style>

