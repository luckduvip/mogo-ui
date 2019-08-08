<template>
	<div v-if="disabled" class="mogo-btn disable" :class="className"><slot/></div>
	<button class="mogo-btn" :type="type" v-else :class="className"><slot/></button>
</template>

<script>
export default{
	props: {

		/**
		 * 类型submit/button,默认button
		 * @param {} {
		 */
		type: {
			type: String, 
			default: 'button'
		},
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
	computed: {
	}
}
</script>
<style scoped lang="scss">
@import '../scss/mogo-btn.scss';
</style>
