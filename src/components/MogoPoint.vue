<template>
	<div :style="getStyle" class="mogo-point"><slot></slot></div>
</template>

<script>
export default{
	props: {
		w: { type: [String,Number], },
		h: { type: [String,Number], },
		color: { type: String, },
		fz: { type: String, },
	},
	computed: {
		getStyle(){
			let _style = {};
			if(this.w){ _style.width = (this.w /7.5).toFixed(4) + 'vw'; }
			if(this.h){ _style.height = (this.h /7.5).toFixed(4) + 'vw'; }
			if(this.fz){ _style.fontSize = (this.fz /7.5).toFixed(4) + 'vw'; }
			if(this.color){ _style.color = this.color; }
			console.log(_style);
			return _style;
		}
	}
}
</script>
<style scoped lang="scss">
.mogo-point{
	display: flex; display: -webkit-flex;
	border-radius: 50%; -webkit-border-radius: 50%; 
	background: red;  width: 80px; height: 80px; justify-content: center; align-items: center; font-size: 40px; color: #fff;
	transform-origin: top left;
	transform: scale(.5,.5);
	-webkit-transform: scale(.5,.5);
}
</style>
