<template>
	<form @submit="submitHandle">
		<slot />
		<mogo-btn class="test-btn" type="submit" className="bg-radius">提交</mogo-btn>
	</form>
</template>

<script>
import MogoBtn from '_components/MogoBtn';
import {ValidateForm} from '_lib/Validate';
export default{
	props: {
		formValues: {
			type: Object,
		},
		formRules: Map,
	},
	methods: {
		/**
		 * 验证单独的表单
		 *
		 * @param {Object} ruler 表单需要验证的描述
		 * @returns {Boolean/Object} 如果返回false则表单表单验证通过，否则就会返回失败提示
		 */
		validateItem(input,ruler){
			if(this.formValues.hasOwnProperty(input)){
				let _cVal = this.formValues[input];
				if(ruler.oldVal == _cVal){
					return ruler.validateResult;
				}
				let _result = false;
				ruler.oldVal = _cVal;
				if(ruler.isRequired && _cVal == ''){
					_result = ruler.requireError || `${ruler.label}不能为空`;
				}
				if(_cVal != '' && ruler.reg && !ruler.reg.test(_cVal)){
					_result = ruler.regError || `请输入正确的${ruler.label}`;
				}
				if(ruler.validate){
					_result = ruler.validate.apply(this.formValues,[_cVal]);
				}
				if(ruler.min && _cVal < ruler.min){
					_result = `${ruler.label}不能小于${ruler.min}`;
				}
				if(ruler.max && _cVal > ruler.max){
					_result = `${ruler.label}不能大于${ruler.max}`;
				}
				if(_result === false){
					ruler.validateResult = _result;
					return _result;
				}
				_result = {
					message: _result,
					input
				}
				ruler.validateResult = _result;
				return _result;
			}
			return false;
		},
		/**
		 * 提交处理方法
		 *
		 * @param {} e
		 */
		submitHandle(e){
			e.preventDefault();
			ValidateForm(this.formValues,this.formRules)
				.then((result)=>{
					console.log(result,'validate');
					alert(result[0][1]);
				})
			// this.validateForm()
			// 	.then((result)=>{
			// 		this.$emit('submitHandle',result);
			// 		return false;
			// 	}).catch((e)=>{
			// 		console.log('表单验证失败',e);
			// 		this.$emit('submitError',e);
			// 		return false;
			// 	})
		},
	},
	components: {MogoBtn,}
}
</script>
<style scoped lang="scss">
.test-btn{
	width: 720px; margin: 20px auto;
}
</style>
