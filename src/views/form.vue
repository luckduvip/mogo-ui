<template>
	<div class="outer">
		<mogo-title title="">带验证的表单</mogo-title>
		<mogo-form :formRules="formRules" :formValues="formValues" @submitHandle="submitHandle" @submitError="submitError" >
			<mogo-input :error="formErrors.includes('name')" v-model="formValues.name" label="用户名" />
			<mogo-input :error="formErrors.includes('nickname')" v-model="formValues.nickname" label="呢称" />
			<mogo-input :error="formErrors.includes('email')" v-model="formValues.email" label="邮箱" />
			<mogo-input :error="formErrors.includes('phone')" v-model="formValues.phone" label="手机" />
			<mogo-input :error="formErrors.includes('password')" ref="input_password" v-model="formValues.password" label="密码" type="password" />
			<mogo-input :error="formErrors.includes('rePassword')" v-model="formValues.rePassword" label="确认密码" type="password" />
			<mogo-input :error="formErrors.includes('age')" v-model="formValues.age" label="验证码" type="number" append="1">
				<template slot="append">
					<msg-btn ref="msgBtn" @before-send-msg="beforeSendMsg" />
				</template>
			</mogo-input>
			<mogo-checkbox-group :list="list" v-model="formValues.checkboxGroupIds" />
			<mogo-radio-group :list="list" v-model="formValues.radioCId" />
			<mogo-select :list="list" v-model="formValues.sex" label="性别"/>
			<mogo-slider v-model="formValues.sliderVal" :min="sliderMin" :max="sliderMax" class="my-slider" :unit="sliderUnit" />
			<mogo-protocol v-model="formValues.switchVal" label="阅读并同意" :linkInfo="linkInfo"></mogo-protocol>
		</mogo-form>
		</mogo-panel>
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

import MogoTitle from '_supports/MogoTitle';
import MogoPanel from '_components/MogoPanel';
export default{
	data(){
		return {
			/**表单验证结果**/
			submitResult: '',
			formValues: {
				name: 'luckduvip',
				nickname: '我是杜小蛙',
				email: 'luckduvip@163.com',
				phone: '13123123123',
				password: 'lu',
				rePassword: 'lulululul1ulu',
				age: 0,
				sex: 1,
				checkboxGroupIds: [],
				radioCId: 1,
				avatar: '',
				switchVal: true,
				sliderVal: 50,
			},
			formErrors: [],
			formRules: {
				'name': { label: '用户名', isRequired: 1, reg: /^\S{6,20}$/, regError: '用户名必须为6-20位数字/字母/符号' },
				'nickname': { label: '呢称', isRequired: 1, reg: /^.{3,16}$/, regError: '呢称必须为3-16位字符' },
				'email': { label: '邮箱', reg:  /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/},
				'age': { label: '年龄', min: 18, max: 60, },
				'phone': { label: '手机', reg:/^1[3456789]\d{9}$/ }, 
				'password': { label: '密码', reg: /^\S{10,20}$/, regError: '密码必须由10-20位英文/数字/符号组成' },
				'rePassword': { label: '确认密码', validate: function(val){ console.log('this',this,val); if(val == this.password){ return false; } return '密码和确认密码不一致' }, },
			},
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
	methods: {
		/**表单验证成功**/
		submitHandle(){
			this.submitResult = '成功'
		},
		/**表单验证失败**/
		submitError(e){
			console.log('error',e);
			this.formErrors = e.map(item=>item.input);
			this.submitResult = e.message;
		},
		beforeSendMsg(){
			console.log(this.$refs.msgBtn);
			this.$refs.msgBtn.sendedHandle();
		},
	},
	components: {MogoRadioGroup,MogoCheckboxGroup,MogoInput,MogoSwitch,MogoTextarea,MogoSelect,MogoProtocol,MogoForm,MogoPanel,MogoSlider,MsgBtn,
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
