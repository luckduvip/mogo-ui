<template>
<div>
	<mogo-title>表单元素</mogo-title>

	<mogo-form :formRules="rules" :formValues="formValues" @submitHandle="submitHandle" @submitError="submitError" >
		<mogo-input :error="formErrors.includes('name')" v-model="formValues.name" label="用户名" />
		<mogo-input :error="formErrors.includes('nickname')" v-model="formValues.nickname" label="呢称" />
		<mogo-input :error="formErrors.includes('email')" v-model="formValues.email" label="邮箱" />
		<mogo-input type="number" :error="formErrors.includes('phone')" v-model="formValues.phone" label="手机" />
		<mogo-input type="date" v-model="formValues.date" label="时间" />

		<mogo-title>readonly input</mogo-title>
		<mogo-input readonly type="number" v-model.number="formValues.clickTime" label="点击次数" @input-click="formValues.clickTime ++" />


		<mogo-title>密码</mogo-title>
		<mogo-input :error="formErrors.includes('password')" ref="input_password" v-model="formValues.password" label="密码" type="password" />
		<mogo-input :error="formErrors.includes('rePassword')" v-model="formValues.rePassword" label="确认密码" type="password" />

		<mogo-title>验证码</mogo-title>
		<mogo-input :error="formErrors.includes('code')" v-model="formValues.code" label="验证码" type="phone" append="1">
			<template slot="append">
				<msg-btn ref="msgBtn" @before-send-msg="beforeSendMsg" />
			</template>
		</mogo-input>
	</mogo-form>

		<mogo-title>验证码</mogo-title>
		<mogo-title>验证码</mogo-title>
	<mogo-footer borderTop="#ddd" background=''  v-model="footerId" :list="footerItems" :iconActiveColor="iconActiveColor" :iconColor="iconColor" :footerColor="footerColor" :footerActiveColor="footerActiveColor"></mogo-footer>
</div>
</template>

<script>
import MogoTitle from '_supports/MogoTitle';
import MogoFooter from '_components/MogoFooter';

import MogoInput from '_components/MogoInput';
import MogoForm from '_components/MogoForm';

import MsgBtn from '_supports/MsgBtn';

export default{
	data(){
		return {
			formValues: {
				name: 'luckduvip',
				nickname: '我是杜小蛙',
				email: 'luckduvip@163.com',
				phone: '1392894939',
				code: '',

				date: '',
				clickTime: 0,
				password: 'luck123',
				rePassword: 'luck123',
			},
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

			iconActiveColor: 'red',
			iconColor: '#222',
			footerColor: '#222',
			footerActiveColor: 'red',
			/**当前footer active id**/
			footerId: 'home',
			/**label不同状态下的颜色**/
			footerColor: 'gray',
			footerActiveColor: 'red',
			/**footer 按钮数据**/
			footerItems: [
				{ id: 'home', label: '基础', icon: require('_images/footer-my.png'), activeIcon: require('_images/footer-my-hover.png'),  },
				{ id: 'form', label: '表单', fontName: 'mogo-danxuanfuxuan-normal', },
				{ id: 'hwhw', label: '教程', icon: require('_images/footer-my.png'), activeIcon: require('_images/footer-my-hover.png'),  },
				{ id: 'my', label: '个人中心', icon: require('_images/footer-my.png'), activeIcon: require('_images/footer-my-hover.png'), account: 1, },
			]
		}
	},
	watch: {
		footerId: function(to,from){
			console.log(`cid change ${to}--${from}`);
		},
	},
	computed: {
	},
	props: {
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

		myItemClickHandle(id){
			alert(`item clicked ${id}`);
		}
	},
	mounted(){
	},
	components: {MogoFooter,
		MogoTitle,
		MogoForm,
		MogoInput,
		MsgBtn,
	},
}
</script>

<style lang="scss">
#test-mogo-tab{ 
	.mogo-tab-item{
		margin: 0 20px; color: #333;
		&.active{
			color: red;
		}
	}
	.mogo-tab-bottom{
		background: red;
	}
}
</style>
<style scoped lang="scss">
.mogo-tab{ height: 80px; }
</style>
