<template>
<label class="mogo-label mogo-checkbox" :class="{'mogo-checkbox-select':selected}" @click="clickHandle">
	<mogo-icon class="mogo-checkbox-icon" className="mogo-danxuanfuxuan-normal"></mogo-icon>
	<slot name="label"></slot>
	<div class="mogo-label-main mogo-flex">
		<slot>
		<div class="mogo-label-input">
			{{info.label}}
		</div>
		</slot>
		<slot name="append" ></slot>
	</div>
</label>
</template>

<script>
import MogoIcon from '_supports/MogoIcon';
export default{
	methods: {
		clickHandle(){
			this.$emit('clickHandle',this.info.id);
		}
	},
	mounted(){
	},
	props: {
		info: { type: Object },
		selected: {
			type: Boolean,
			default: false,
		},
		label: { type: [String,Boolean], default: false },
		append: { type: [String,Boolean], default: false },
	},
	components: {MogoIcon},
}
</script>
<style scoped>

</style>
