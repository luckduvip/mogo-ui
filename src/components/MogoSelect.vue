<template>
	<label class="mogo-select mogo-label">
		<slot name="label" v-if="label !== false"><span class="mogo-label-text">{{label}}</span></slot>
		<div class="mogo-label-main">
			<select v-model="myVal" class="mogo-label-select">
				<template v-for="item in list">
					<option :key="item.id" :value="item.id">{{item.label}}</option>
				</template>
			</select>
			<slot name="append" v-if="append !== false"><mogo-icon class="apppend-icon" :className="append" /></slot>
		</div>
	</label>
</template>

<script>
import MogoIcon from '_supports/MogoIcon';
export default{
	props: {
		list: Array,
		val: {
			type: [Number,String],
		},
		append: { type: [String,Boolean], default: false, },
		label: { type: [String,Boolean], default: false, },
	},
	computed: {
		myVal: {
			get(){
				return this.val;
			},
			set(val){
				this.$emit('input',val);
			}
		}
	},
	model: {
		prop: 'val',
	},
	components: {MogoIcon,}
}
</script>
<style lang="scss">
@import '../scss/mogoinput.scss';
</style>
