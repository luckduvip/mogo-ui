<template>
	<div>
		<template v-for="item in list">
			<mogo-checkbox :key="item.id" :info="item" :selected="isSelect(item.id)" @clickHandle="clickHandle" label="请选择"></mogo-checkbox>
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
		ids: {
			type: Array,
		},
		label: { type: [String,Boolean], default: false },
	},
	model: {
		prop: 'ids',
		event: 'idsChange',
	},
	methods: {
		isSelect(id){
			return this.ids.includes(id);
		},
		clickHandle(id){
			let i = this.ids.indexOf(id),
				ids = Array.from(this.ids);
			if(i == -1){
				ids.push(id);
			}else{
				ids.splice(i,1);
			}
			this.$emit('idsChange',ids);
		}
	},
	components: {MogoCheckbox},
}
</script>
<style scoped>

</style>
