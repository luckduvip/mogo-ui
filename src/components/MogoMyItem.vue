<template>
	<div class="my-item" @click="clickHandle">
		<img :src="icon" v-if="icon" class="my-item-icon"/>
		<span class="my-item-label">{{label}}</span>
		<span class="my-item-append-label" v-if="appendLabel">{{appendLabel}}</span>
		<img :src="rightIcon" v-if="rightIcon" class="my-item-right-icon"/>
	</div>
</template>

<script>
export default{
	props: {
		label: { type: String, default: 'label的内容' },
		appendLabel: { type: String, default: '' },
		icon: { type: String,},
		id: { type: String,},
		rightIcon: { type: String, default: require('../../images/my-arrow.png')},
	},
	methods: {
		clickHandle(){
			this.$emit('myClick',this.id || this.label);
		}
	}
}
</script>
<style scoped lang="scss">
.my-item{
	display: flex; display: -webkit-flex; align-items: center; width: 100%; padding: 0 40px; height: 120px;
	position: relative;
	&+.my-item{
		&:before{
			position: absolute; width: 100%; height: 2px; content: ''; border-top: 1px solid #ddd; transform-origin: center top; transform: scale(1,.5); left: 0; top: 0;
		}
	}
	&-label{
		display: block; font-size: 28px; color: #666; margin-right: auto;
	}
	&-append-label{
		display: block; font-size: 28px; color: #b6b6b6; margin-right: 20px;
	}
	&-right-icon{
		display: block; width: 18px; height: 32px;
	}
	&-icon{
		display: block; width: 40px; height: 40px; margin-right: 24px;
	}
}
</style>
