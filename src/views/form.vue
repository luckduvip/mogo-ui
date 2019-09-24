<template>
	<div class="outer">
		<mogo-title title="">带验证的表单</mogo-title>
		<mogo-form validateAfterBlur :formRules="rules" :formValues="formValues" @validateInput="validateInputHandle" @submitHandle="submitHandle" @submitError="submitError" >
			<mogo-input name="name" :error="formErrors.includes('name')" v-model="formValues.name" label="用户名" />
			<mogo-input name="nickname" :error="formErrors.includes('nickname')" v-model="formValues.nickname" label="呢称" />
			<mogo-input name="email" :error="formErrors.includes('email')" v-model="formValues.email" label="邮箱" />
			<mogo-input name="phone" type="number" :error="formErrors.includes('phone')" v-model="formValues.phone" label="手机" />
			<mogo-input name="date" type="date" v-model="formValues.date" label="时间" />

			<mogo-title>readonly input</mogo-title>
			<mogo-input name="clickTime" readonly type="number" v-model.number="formValues.clickTime" label="点击次数" @input-click="formValues.clickTime ++" />


			<mogo-title>密码</mogo-title>
			<mogo-input name="password"  :error="formErrors.includes('password')" ref="input_password" v-model="formValues.password" label="密码" type="password" />
			<mogo-input name="rePassword" :error="formErrors.includes('rePassword')" v-model="formValues.rePassword" label="确认密码" type="password" />

			<mogo-title>验证码</mogo-title>
			<mogo-input name="code" tag="div" :error="formErrors.includes('code')" v-model="formValues.code" label="验证码" type="phone" append="1">
				<template slot="append">
					<msg-btn ref="msgBtn" @before-send-msg="beforeSendMsg" />
				</template>
			</mogo-input>
			<mogo-btn slot="button" class="test-btn" type="submit" className="bg-radius">123提交</mogo-btn>
		</mogo-form>
			<h3>{{formValues.sliderVal}}</h3>
		<mogo-title title="">开关</mogo-title>
		<mogo-switch v-model="switchVal" />
		<mogo-title title="">textarea</mogo-title>
		<mogo-textarea v-model="textareaVal" />
	</div>
</template>

<script>
import MogoRadioGroup from '_components/MogoRadioGroup';
import MogoCheckboxGroup from '_components/MogoCheckboxGroup';
import MogoInput from '_components/MogoInput';
import MogoSwitch from '_components/MogoSwitch';
import MogoTextarea from '_components/MogoTextarea';
import MogoSelect from '_components/MogoSelect';
import MogoProtocol from '_components/MogoProtocol';
import MogoForm from '_components/MogoForm';
import MogoSlider from '_components/MogoSlider';
import MsgBtn from '_supports/MsgBtn';
import MogoBtn from '_components/MogoBtn';

import MogoTitle from '_supports/MogoTitle';
import MogoPanel from '_components/MogoPanel';
export default{
	data(){
		return {
			/**表单验证结果**/
			formValues: {
				name: 'luckduvip',
				nickname: '我是杜小蛙',
				email: 'luckluckluck@139.com',
				phone: '13988888888',
				code: '12345',

				date: '',
				clickTime: 0,
				password: 'luck123',
				rePassword: 'luck123',
			},
			submitResult: '',
			formErrors: [],
			rules: new Map([
				['name', { symbol_id: Symbol(), label: '用户名', type: 'name', isRequire: 1}], 
				['nickname', { symbol_id: Symbol(), label: '昵称', type: 'nickname', isRequire: 1}], 
				['email', { symbol_id: Symbol(), label: '邮箱', type: 'email', isRequire: 1}], 
				['phone', {symbol_id: Symbol(), label: '手机', type: 'mobile', isRequire: 1 }], 
				['code', { symbol_id: Symbol(), label: '验证码', type: 'code', isRequire: 1}], 
				['data', { symbol_id: Symbol(), label: '日期', isRequire: 1}], 

				['password', {symbol_id: Symbol(),label: '密码', type:'password', isRequire: 1 }],
				['rePassword', {symbol_id: Symbol(),label: '确定密码', isRequire: 1, validateFun: (val) => { 
					return new Promise((resolve,reject)=>{
						if(this.formValues.password == val){
							resolve(true);
						}else{
							resolve('两次输入的密码不一致');
						}
					})
				} }],
			]),
			list: [
				{id: 1,label:'男'},
				{id: 0,label:'女'},
			],
			linkInfo: {
				label: '相关条款',
				url: 'http://baidu.com'
			},
			/**滑块当前值**/
			sliderMin: 10,
			sliderMax: 210,
			sliderUnit: 0,
			/**开关值**/
			switchVal: true,
			textareaVal: '',
		}
	},
	watch: {
	},
	methods: {
		/**表单验证成功**/
		submitHandle(){
			this.formErrors = [];
			this.submitResult = '成功'
			alert('all right');
		},
		/**表单验证失败**/
		submitError(e){
			console.log('error',e);
			this.formErrors = e.map(item=>item[0]);
			this.submitResult = e[0][1];
		},

		/**验证单个表单的结果 */
		validateInputHandle(e){
			if(typeof e === 'string'){
				let idx = this.formErrors.indexOf(e);
				if(idx !== -1){
					this.formErrors.splice(idx,1);
				}
			}else{
				console.log(e);
				let idx = this.formErrors.indexOf(e[0]);
				if(idx === -1){
					this.formErrors.push(e[0]);
				}
			}
		},
		beforeSendMsg(){
			console.log(this.$refs.msgBtn);
			this.$refs.msgBtn.sendedHandle();
		},
	},
	components: {MogoRadioGroup,MogoCheckboxGroup,MogoInput,MogoSwitch,MogoTextarea,MogoSelect,MogoProtocol,MogoForm,MogoPanel,MogoSlider,MsgBtn,
		MogoBtn,
		MogoTitle,
	},
}
</script>
<style scoped lang="scss">
.my-slider{
	display: block; width: 80vw; margin: 0 auto;
}
.outer{
	padding-bottom: 100px
}
</style>
