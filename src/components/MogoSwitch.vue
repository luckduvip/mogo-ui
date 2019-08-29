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
		}
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
	}
}
</script>
<style lang="scss">
@charset 'utf-8';
@import '../scss/mixin.scss';
.mogo-switch{
	$color: rgba(0,0,0,.1);
	@include mogo-radius(21px); overflow: hidden;
	position: relative; width: 62px; height: 42px; border: 1px solid $color; background: $color;
	&-bg{
		position: absolute; width: 60px; height: 40px; left: 0; top: 0; background: #fdfdfd;
		transform-origin: center right;
		transition: transform .4s cubic-bezier(.45,1,.4,1);
		-webkit-transition: -webkit-transform .4s cubic-bezier(.45,1,.4,1);

	}
	&-ball{
		@extend %mogo-circle;
		position: absolute; width: 40px; height: 40px; left: 0; top: 0; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,.4);
		transition: transform .4s cubic-bezier(.45,1,.4,1);
		-webkit-transition: -webkit-transform .4s cubic-bezier(.45,1,.4,1);
	}
	&.selected{
		$color: #07C160;
		border-color: $color; background: $color;
		.mogo-switch-bg{
			transform: scaleX(0);
		}
		.mogo-switch-ball{
			transform: translateX(20px);
		}
	}
}
</style>
