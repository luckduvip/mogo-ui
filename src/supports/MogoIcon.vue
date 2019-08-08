<template>
	<div class="icon-outer mogo-flex">
		<i class="mogofont" :class="className" ></i>
	</div>
</template>

<script>
export default{
	computed: {
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
