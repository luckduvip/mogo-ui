<template>
	<div class="icon-outer mogo-flex" @click="clickHandle">
		<i class="mogofont" :class="className" ></i>
	</div>
</template>

<script>
export default{
	computed: {
	},
	methods: {
		clickHandle(){
			this.$emit('iconClick');
		},
	},
	props: {
		className: {
			type: String, default: 'mogoicon_add'
		}
	}
}
</script>
<style scoped lang="scss">
.icon-outer{
	align-items: center; justify-content: center;
	.mogofont{
		font-size: inherit;
	}
}
</style>
