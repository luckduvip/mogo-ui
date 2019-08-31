<template>
	<div class="mogo-switch" @click="clickHandle" :class="{'selected':switched}">
		<div class="mogo-switch-bg"></div>
		<div class="mogo-switch-ball"></div>
	</div>
</template>

<script>
export default{
	props: {
		switched: {
			type: Boolean,
		},
	},
	model: {
		prop: 'switched',
		event: 'switchHandle'
	},
	methods: {
		clickHandle(e){
			console.log(this.switched);
			this.$emit('switchHandle',!this.switched);
		}
	},
}
</script>
<style lang="scss">
@charset 'utf-8';
@import '../scss/mixin.scss';
$color: rgba(0,0,0,.1);
$w: 82px; $h: 50px;
$p: 2px;
.mogo-switch{
	@include mogo-radius($h/2); position: relative;
	width: $w; height: $h; background: #ccc; overflow: hidden;
	will-change: transform;
	&-bg{
		will-change: transform;
		width: $w; height: $h; 
		background: $color_green;
		transition: transform .2s linear;
		transform-origin: 0% 100%;
		transform: scaleX(0);
	}
	&-ball{
		@include mogo-radius(50%);
		width: ($h - $p * 2); height: ($h - $p * 2);
		position: absolute; 
		left: $p; top: $p; 
		background: #fff;
		transition: transform .2s linear;
	}
	&.selected{
		.mogo-switch{
			&-bg{
				transform: scaleX(1);
			}
			&-ball{
				transform: translateX($w - $h);
			}
		}

	}
}
</style>
