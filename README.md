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

+ icon: 左边图标

+ rightIcon: Boolean 右边图标，为true则有 '>' 图标在右侧

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

+ type:String input的type

+ placeholder:String placeholder

+ propVal:String 文本框绑定值(v-model)

+ label:String 组件label的描述(左侧),如果为false时左侧不显示

+ append:String/Boolean 左侧显示的文案，如果有传入slot="append"时无视此参数，(如果===false时右侧不显示 )

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

+ type:String='button' button元素的type属性

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

### to be continue...
