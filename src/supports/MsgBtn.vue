<template>
	<div class="mogo-msg-btn" @click="clickHandle" :class="{disable:myCount != 60}">
		<template v-if="myCount != 60">{{myCount}}S</template>
		<template v-else>{{label}}</template>
	</div>
</template>

<script>
export default{
	data(){
		return {
			count: 0,
			inter: 0,
		}
	},
	beforeDestory(){
		console.log('before destory');
	},
	deactivated(){
		console.log('before deact');
	},
	actived(){
		console.log('ssss');
	},
	methods: {
		clickHandle(){
			if(this.count == 0){
				this.$emit('before-send-msg');
			}
		},
		sendedHandle(){
			this.count ++;
			let inter = setInterval(()=>{
				this.count ++;
				if(this.count == this.time){
					clearInterval(inter);
					this.count = 0;
				}
			},1000)
		},
	},
	computed: {
		myCount(){
			return this.time - this.count;
		}
	},
	props: {
		label: {
			type: String, default: '发送验证码'
		},
		time: {
			type: Number, default: 60,
		},
	}
}
</script>
<style lang="scss">
@charset 'utf-8';
@import '../scss/mixin.scss';

.mogo-msg-btn{
	@include mogo-radius(8px);
	width: 160px; height: 58px; color: $color_red; font-size: 26px; border: .5px solid $color_red; justify-content: center; margin-left: 20px; display: block; line-height: 56px;;
	text-align: center;
	&.disable{
		border-color: #d8d8d8; color: #d8d8d8;
	}
}
</style>
