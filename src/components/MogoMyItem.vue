<template>
	<div class="my-item" @click="clickHandle">
		<slot name="icon" v-if="icon != false">
			<mogo-icon :className="icon" class="my-item-icon" />
		</slot>
		<span class="my-item-label">{{label}}</span>
		<span class="my-item-append-label" v-if="appendLabel">{{appendLabel}}</span>
		<slot name="right" v-if="rightIcon !== false">
			<mogo-icon :className="rightIcon" class="my-item-arrow" />
		</slot>
	</div>
</template>

<script>
import MogoIcon from '_supports/MogoIcon';
export default{
	props: {
		label: { type: String, default: 'label的内容' },
		appendLabel: { type: [String,Boolean], default: false },
		icon: { type: String,},
		id: { type: String,},
		rightIcon: { type: [String,Boolean], default: false},
	},
	methods: {
		clickHandle(){
			this.$emit('myClick',this.id || this.label);
		}
	},
	components: {MogoIcon,},
}
</script>
<style scoped lang="scss">
.my-item{
	display: flex; display: -webkit-flex; align-items: center; width: 100%; padding: 0 40px; height: 120px; background: #fff;
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
	&-arrow{
		display: block; font-size: 32px; color: #ddd;
	}
	&-icon{
		display: block; 
		font-size: 40px; margin-right: 24px; color: #222;
	}
}
</style>
