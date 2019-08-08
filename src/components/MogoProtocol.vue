<template>
	<div class="mogo-protocol mogo-cell" @click="clickHandle">
		<mogo-icon class="mogo-protocol-main mogoicon_task_done" :class="{'selected':selected}"></mogo-icon> 
		<div class="mogo-protocol-label">{{label}}</div>
		<a :href="linkInfo.url" class="mogo-protocol-link">{{linkInfo.label}}</a>
	</div>
</template>

<script>
import MogoIcon from '_supports/MogoIcon';
export default{
	props: {
		label: String,
		linkInfo: {
			type: Object,
			default: ()=>{
				return {
					link: '相关条款',
					url: 'http://baidu.com'
				}
			}
		},
		selected: Boolean,
	},
	model: {
		prop: 'selected'
	},
	methods: {
		clickHandle(){
			this.$emit('input',!this.selected);
		}
	},
	components: {MogoIcon},
}
</script>
<style scoped>

</style>
