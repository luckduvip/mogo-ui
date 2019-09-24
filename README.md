# test

> 这个一个mogo app使用的ui库尝试

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

```

### mogo-footer

> 参数说明

+ background: 组件的背景颜色

+ borderTop: 组件border-top颜色，如果不为空则显示border-top

+ currentId: 当前选中的tab的id

+ fontColor: label普通状态color

+ fontActiveColor: label active状态color

+ iconColor: 如果使用iconfont作为图标的情况下普通状态的color,如果没有赋值则使用fontColor

+ iconActiveColor: 如果使用iconfont作为图标的情况下active状态的color,如果没有赋值则使用fontActiveColor

+ list: tab 按钮数据 Object { label,id,icon,activeIcon,fontName,account }
```
{ id: 'home', label: '首页', icon: require('_images/footer-my.png'), activeIcon: require('_images/footer-my-hover.png'),  },
{ id: 'page', label: '页面', fontName: 'baojie-yidingwei-fadongtai', },
```

   + id: tab 的id，与currentId 比对

   + label: tab 的文案

   + fontName: iconfont 为图标时的className eg. class="iconfont-name"

   + icon: 普通状态的base64/图片url

   + activeIcon: active状态的base64/图片url

### mogo-tab

> 参数说明

+ currentId: 当前active的tab的id

+ list: tabs数据 [Object,]
   + id: tab的id
   + label: tab的文案
   ```
		{ id: '1', label: '我的' },
		{ id: '2', label: '你的' },
	```
+ idKey: list里面的数据的id数据的字段名,默认'id'

+ labelKey: list里面的数据的label数据的字段名,默认'label'


### mogo-my-item 

> 个人中心页面中的Item

>> 参数解释

+ label: 文案

+ appendLabel: 右边文案

+ icon:String/false 左边图标,如果===false，不显示，或者显示<slot name="left"/> 最后则可能显示className

+ rightIicon:String/false 右边图标,如果===false，不显示，或者显示<slot name="right"/> 最后则可能显示className

+ id: 组件id，组件被点击的时候会向外发出myClick事件，会带上这个id的

### mogo-header

> 头部组件 

>> 参数解释

+ theme:String 配色文案,当前有两种，
   + light 白底黑字， 
   + dark 黑底白字

+ fixed:Boolean 如果为false则表示当前组件 为relative, true则为fixed

+ borderBottom:String 组件border-bottom颜色,==''则没有border-bottom

+ right:String/Boolean 默认为false,如果为false则没有右侧区域

+ canClose:Boolean = false, 如果为true则显示x按钮在左侧，应对打开外页的情况

>> 事件发送

+ left 左边点击发送事件，如果监听了left
+ right 右边点击发送事件，如果监听了left

### mogo-input

> 普通文本输入框

>> props解释

+ name: String input标签的name属性

+ type:String input的type

+ placeholder:String placeholder

+ propVal:String 文本框绑定值(v-model)

+ label:String 组件label的描述(左侧),如果为false时左侧不显示

+ append:String/Boolean 左侧显示的文案，如果有传入slot="append"时无视此参数，(如果===false时右侧不显示 )

+ readonly:Boolean 是否为只读的，如果为true的话label 点击会处向发送一个input-click事件

+ error:Boolean 是否输入有错，配合mogo-form使用


### mogo-checkbox-group

> 多选框

>> props解释

+ list:Array [{id,label}]结构，多选的选项

+ ids:Array [id,]选中的项的id列表

+ label:String/Boolean 左侧文字，===false时不显示

#### 使用例子

```
<mogo-checkbox-group :list="list" v-model="formValues.checkboxGroupIds" />
```

### mogo-radio-group

> 单选项

>> props说明

+ list:Array [{id,label}]结构，多选的选项

+ cId:String/Number (v-model) 当前选中项

#### 使用例子

```
			<mogo-radio-group :list="list" v-model="formValues.radioCId" />
```

### mogo-select

> 下拉选择

>> props解释

+ list:Array [{id,label}]结构，下拉的选项

+ val:String/Number 选中的项的id

+ append:String/Boolean
	++ if ===false 右侧不显示
    ++ else if slot="right" 时显示slot内容
    ++ else 显示右侧文案

+ label:String/Boolean
	++ if ===false 左侧不显示
    ++ else if slot="label" 时显示slot内容
    ++ else 显示左侧文案

#### 使用例子

	```
			<mogo-select :list="list" v-model="formValues.sex" label="性别"/>
	```
### mogo-form

> 表单组件 主要功能为验证表单

>> props解释

+ formValues:Object 表单里面的值列表

+ formRules: Map 表单验证规则

+ validateAfterBlur : Boolean 表单里面的元素是否在blur时验证属性，如果为true时mogo-input里面的name属性必须===formRulers里面的key
  
>> 发送事件

+ validateInput 表单验证单个元素时发送的事件，返回类型  inputName: String 表单当前表单通过验证 / [inputName,error] 不通过

+ submitError 表单触发submit事件但表单验证不通过时返回错误信息. eg. [['表单name','错误信息1'],['表单name2','错误信息2']]

+ submitHandle 表单触发submit 事件且验证通过

>> 使用例子 
```
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
		<mogo-input tag="div" :error="formErrors.includes('code')" v-model="formValues.code" label="验证码" type="phone" append="1">
			<template slot="append">
				<msg-btn ref="msgBtn" @before-send-msg="beforeSendMsg" />
			</template>
		</mogo-input>
		<mogo-btn slot="button" class="test-btn" type="submit" className="bg-radius">123提交</mogo-btn>
	</mogo-form>
</div>
</template>

<script>
import MogoTitle from '_supports/MogoTitle';
import MogoFooter from '_components/MogoFooter';

import MogoInput from '_components/MogoInput';
import MogoForm from '_components/MogoForm';

import MogoBtn from '_components/MogoBtn';

import MsgBtn from '_supports/MsgBtn';

export default{
	data(){
		return {
			formValues: {
				name: 'luckduvip',
				nickname: '我是杜小蛙',
				email: 'luckduvip@163.com',
				phone: '13928949394',
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
		}
	},
	methods: {
		/**表单验证成功**/
		submitHandle(){
			this.formErrors = [];
			this.submitResult = '成功'
		},
		/**表单验证失败**/
		submitError(e){
			console.log('error',e);
			this.formErrors = e.map(item=>item[0]);
			this.submitResult = e[0][1];
		},
		beforeSendMsg(){
			console.log(this.$refs.msgBtn);
			this.$refs.msgBtn.sendedHandle();
		},

	},
	mounted(){
	},
	components: {MogoFooter,
		MogoTitle,
		MogoForm,
		MogoInput,
		MsgBtn,
		MogoBtn,
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

```

### mogo-slider

> 滑块

>> props解释

+ currVal:Number(v-model数值)

+ min:Number 默认0最小值(滑块最左侧时候的值)

+ max:Number 默认100最大值(滑块最右侧时候的值)

+ unit:Number default 0,滑块移动的最小单位

#### 使用例子

```
<mogo-slider v-model="formValues.sliderVal" :min="sliderMin" :max="sliderMax" class="my-slider" />
<mogo-slider v-model="formValues.sliderVal" :min="sliderMin" :max="sliderMax" class="my-slider" :unit="sliderUnit" />
```

### mogo-switch

> 开关

>> props解释

+ switched:Boolean (v-model)

### 使用例子

```
	<mogo-switch v-model="switchVal" />
```

### mogo-textarea

> textarea

>> props解释

+ maxLength:String/Number 最多可以输入字数

+ placeholder:String placeholder

+ textareaVal:String(v-model)

#### 使用例子

```
		<mogo-textarea v-model="textareaVal" />
```


### mogo-btn

> btn

>> props解释

+ type:String='' button元素的type属性,如果不为'submit'且非disable的情况下点击会emit('callClick')事件

+ className:String 样式
	++ bg-radius  圆角背景
	++ bd-radius  圆角边框空心
	++ bg-circle  半圆背景
	++ bd-circle  半圆边框空心
	++ bg-rect  背景方形

+ disabled:Boolean 是否禁用

#### 使用例子

```
		<mogo-title>按钮</mogo-title>
		<mogo-btn class="test-btn" type="submit" className="bg-radius">圆角背景</mogo-btn>
		<mogo-btn class="test-btn" type="button" className="bd-radius">圆角边框</mogo-btn>
		<mogo-btn class="test-btn" type="button" className="bg-circle">半圆背景</mogo-btn>
		<mogo-btn class="test-btn" type="button" className="bd-circle">半圆边框</mogo-btn>
		<mogo-btn class="test-btn" type="button" className="bg-rect">矩形背景</mogo-btn>
		<mogo-title>按钮-disabled</mogo-title>
		<mogo-btn class="test-btn" disabled type="submit" className="bg-radius">圆角背景</mogo-btn>
		<mogo-btn class="test-btn" disabled type="button" className="bd-radius">圆角边框</mogo-btn>
		<mogo-btn class="test-btn" disabled type="button" className="bg-circle">半圆背景</mogo-btn>
		<mogo-btn class="test-btn" disabled type="button" className="bd-circle">半圆边框</mogo-btn>
		<mogo-btn class="test-btn" disabled type="button" className="bg-rect">矩形背景</mogo-btn>
```

### mogo-layer

> 弹窗

#### 使用例子

```
		/**
		 * 打开toast弹窗
		 *
		 * @param {String} label 文案
		 * @param {String} iconClass iconfont className
		 * @param {String/false} showMask=false 遮罩背景颜色,!== false则为颜色
		 * @param {Number/true} delay=true 是否定时关闭
		 */
		openToast(label,iconClass,showMask=false,delay=5000)
this.$refs.mogoLayer.openToast('这这是一个浮窗toast这是一个浮窗toast这是一个浮窗toast是一个浮窗toast','mogo-dingbudaohang-shanchu mogofont','rgba(0,0,0,.1)');

		/**
		 * 显示带按钮的确认弹窗
		 *
		 * @param {Object} confirm 弹窗的信息
		 * 	{
		 * 		label: String 内容文案
		 * 		title: String 弹窗标题,如果''则不显示 
		 * 		confirmLabel: String default '确定',确定按钮文案
		 * 		cancelLabel:String 取消按钮文案
		 * 		handle:Function 点击确认/取消时的回调
		 * 			handle(true) 确定
		 * 			handle(false) 取消
		 * 	}
		 * @param {String/false} showMask=false 弹窗遮罩
		 */
this.$refs.mogoLayer.openConfirm({
	label: '我我我是内容我是内容是内容我我是内容我是内容是内容我是内容我是内容是内容',
	title: '我是标题',
	handle: (flag)=>{
		console.log(`the result ==${flag}`,this.myItems);
	}
},'rgba(0,0,0,.1)');

```

### mogo-loading

> 菊花

>> props解释

+ type[String='default'] 菊花类型，目前有三种
	'default' 圆点转成的圈圈
	'lines'   几个圆弧组成的组合
	'rect'    矩形组成的圆弧状组合

+ label[String/Boolean=true] 图标下面的文案,如果===true则不显示 

+ mask[String=''] 菊花遮罩背景

+ closeByClickMask[Boolean] 如果=== true时点击遮罩会emit('close')事件

+ fill[String='red'] type = 'default'/'rect'时的stroke颜色

### to be continue...
