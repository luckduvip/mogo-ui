<template>
	<div>
		<template v-for="item in list">
			<mogo-checkbox :key="item.id" :info="item" :selected="item.id == cId" @clickHandle="clickHandle" label="单选"></mogo-checkbox>
		</template>
	</div>
</template>

<script>
import MogoCheckbox from '_supports/MogoCheckbox';
export default{
	props: {
		list: {
			type: Array,
		},
		cId: { type: [String,Number], }
	},
	model: {
		prop: 'cId',
		event: 'cIdChange'
	},
	methods: {
		clickHandle(id){
			this.$emit('cIdChange',id);
		}
	},
	components: {MogoCheckbox},
}
</script>
<style scoped>

</style>
