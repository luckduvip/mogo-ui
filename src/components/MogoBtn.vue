<template>
	<button class="mogo-btn" :type="type" v-if="type ==='submit'" :class="className"><slot/></button>
	<div v-else-if="disabled" class="mogo-btn disable" :class="className"><slot/></div>
	<div v-else @click="callClick" class="mogo-btn" :class="className"><slot/></div>
</template>

<script>
export default{
	props: {

		/**
		 * 类型submit/button,默认button
		 * @param {} {
		 */
		type: { type: String, default: '' },
		/**按钮类型
		 * bg-radius  圆角背景
		 * bd-radius  圆角边框空心
		 * bg-circle  半圆背景
		 * bd-circle  半圆边框空心
		 * bg-rect  背景方形
		 **/
		className: String,
		disabled: Boolean
	},
	methods: {
		callClick(){
			this.$emit('callClick');
		},
	},
	computed: {
	}
}
</script>
<style lang="scss">
@import '../scss/mogo-btn.scss';
</style>
