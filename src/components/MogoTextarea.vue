<template>
	<label class="mogo-textarea mogo-cell">
		<textarea :placeholder="placeholder" class="mogo-textarea-main" v-if="maxLength" :maxLength="maxLength" v-model="myVal" />
		<textarea :placeholder="placeholder" class="mogo-textarea-main" v-else v-model="myVal" />
		<span class="mogo-textarea-tips">{{myVal.length}} / {{maxLength}}</span>
	</label>
</template>

<script>
export default{
	props: {
		maxLength: {
			type: [Number,String], default: 300
		},
		placeholder: {
			type: String, default: '请输入内容'
		},
		textareaVal : String,
	},
	model: {
		prop: 'textareaVal',
	},
	data(){
		return {

		}
	},
	computed: {
		myVal: {
			get(){
				return this.textareaVal;
			},
			set(val){
				this.$emit('input',val);
			}
		}
	}
}
</script>
<style scoped>

</style>
