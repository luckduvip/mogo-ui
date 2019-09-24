<template>
	<form ref="myform" @submit="submitHandle">
		<slot />
		<slot name="button">
			<mogo-btn class="test-btn" type="submit" className="bg-radius">提交</mogo-btn>
		</slot>
	</form>
</template>

<script>
import MogoBtn from '_components/MogoBtn';
import {ValidateForm} from '_lib/Validate';
export default{
	props: {
		formValues: { type: Object, },
		formRules: Map,
		/**是否在blur后验证 */
		validateAfterBlur: Boolean,
	},
	methods: {
		/**
		 * 提交处理方法
		 *
		 * @param {} e
		 */
		submitHandle(e){
			e.preventDefault();
			ValidateForm(this.formValues,this.formRules)
				.then((result)=>{
					console.log('result ',result);
					if(result.length){
						this.$emit('submitError',result);
					}else{
						this.$emit('submitHandle');
					}
				})
		},
	},
	mounted(){
		if(this.validateAfterBlur){
			let _self = this;
			this.$refs.myform.querySelectorAll('input').forEach((node)=>{
				node.addEventListener('blur',function(e){
					console.log(this.name);
					ValidateForm(_self.formValues,_self.formRules,this.name)
						.then((result)=>{
							if(result.length){
								_self.$emit('validateInput',result[0]);
							}else{
								_self.$emit('validateInput',this.name);
							}
						})
				})
			})
		}
	},
	components: {MogoBtn,}
}
</script>
<style lang="scss">
.test-btn{
	width: 720px; margin: 20px auto;
}
</style>
