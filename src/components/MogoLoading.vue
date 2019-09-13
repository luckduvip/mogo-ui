<template>
	<article class="mogo-loading mogo-flex" :style="'background-color:'+mask" @click.self="clickHandle">
		<svg-loading :fill="fill" v-if="type === 'default'" class="loading-circle" />
		<svg-loading-lines v-else-if="type === 'lines'" clas="loading-lines" />
		<svg-loading-rect :fill="fill" v-else-if="type === 'rect'" clas="loading-rect" />
		<span v-if="label !== true"  class="mogo-loading-label">{{label}}</span>
	</article>
</template>

<script>
import SvgLoading from '_components/SvgLoading';
import SvgLoadingLines from '_components/SvgLoadingLines';
import SvgLoadingRect from '_components/SvgLoadingRect';
export default{
	components: {SvgLoading,SvgLoadingLines,SvgLoadingRect,},
	props: {
		type: { type: String, default: 'default' },
		label: { type: [String,Boolean], default: true},
		mask: {
			type: String, default: ''
		},
		closeByClickMask: Boolean,
		fill: {
			type: String, default: 'red',
		},

	},
	methods: {
		clickHandle(){
			if(this.closeByClickMask){
				this.$emit('close');
			}
		},
	},
}
</script>

<style lang="scss">
@charset 'utf-8';
@import '../scss/mixin.scss';
.mogo-loading{
	position: fixed; width: 100%; height: 100%; left: 0; top: 0; z-index: 1000;
	flex-direction: column; justify-content: center; align-items: center; 

	.loading-lines,
	.loading-rect,
	.loading-circle{
		width: 160px; height: 160px;
	}
	&-label{
		display: block; font-size: 32px; color: #fff; margin-top: 20px;
	}
}
</style>

