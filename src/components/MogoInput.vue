<template>
<label class="mogo-label">
	<slot name="label" v-if="label !== false"><span class="mogo-label-text">{{label}}</span></slot>
	<div class="mogo-label-main mogo-flex">
		<div class="mogo-label-input">
			<input :placeholder="placeholder" v-if="type == 'number'" class="mogo-input" v-model.number="myVal" type="number" />
			<input :placeholder="placeholder" v-else class="mogo-input" v-model="myVal" :type="type"/>
		</div>
		<mogo-icon className="mogo-biaodan-baocuo" class="mogo-label-error" v-if="error" />
		<slot name="append" ></slot>
	</div>
</label>
</template>

<script>
import MogoIcon from '_supports/MogoIcon';
export default{
	data(){
		return {
			val: '',
		}
	},
	model: {
		prop: 'propVal',
		event: 'inputHandle',
	},
	props: {
		type: { type: String, default: 'text', },
		placeholder: { type: String, default: '请输入内容', },
		propVal: { type: [Number,String], default: '', },
		label: { type: [String,Boolean], default: false },
		append: { type: [String,Boolean], default: false },
		error: { type: [Boolean], default: false },
	},
	computed: {
		myVal: {
			get(){
				return this.val || this.propVal;
			},
			set(val){
				this.$emit('inputHandle',val);
			}
		}
	},
	components: {MogoIcon,},
}
</script>
<style scoped>

</style>
