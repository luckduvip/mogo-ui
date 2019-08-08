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
<style scoped>

</style>
