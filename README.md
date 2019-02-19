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
{ id: 'page', label: '页面', fontName: 'baojie baojie-yidingwei-fadongtai', },
{ id: 'hwhw', label: '教程', icon: require('_images/footer-my.png'), activeIcon: require('_images/footer-my-hover.png'),  },
{ id: 'my', label: '个人中心', icon: require('_images/footer-my.png'), activeIcon: require('_images/footer-my-hover.png'), account: 1, },
```

   + id: tab 的id，与currentId 比对

   + label: tab 的文案

   + fontName: iconfont 为图标时的className eg. class="iconfont iconfont-name"

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

+ rightIcon: 右边图标，通常为  '>' 符号

+ id: 组件id，组件被点击的时候会向外发出myClick事件，会带上这个id的

### mogo-header

> 头部组件 

>> 参数解释

+ theme: 配色文案,当前有两种，
   + light 白底黑字， 
   + dark 黑底白字

+ keep: 如果为1则表示当前组件 为relative, 0则为fixed

+ autoWidth: 如果为1则组件left/right两部分的宽度为固定，以便中间部分能居中

+ borderBottom: 组件border-bottom颜色

>> 事件发送

+ left 左边点击发送事件，如果监听了left
+ right 右边点击发送事件，如果监听了left

