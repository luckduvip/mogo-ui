<template>
<label class="mogo-label" @click="clickHandle">
	<slot name="label" v-if="label !== false"><span class="mogo-label-text">{{label}}</span></slot>
	<div class="mogo-label-main mogo-flex">
		<div class="mogo-label-input">
			<template v-if="type == 'date'">
				<input :readonly="readonly" v-if="type == 'number'" class="mogo-input absolute" v-model.number="myVal" type="number" />
				<input :readonly="readonly" v-else class="mogo-input absolute" v-model="myVal" :type="type"/>
				<div v-if="propVal !=''" class="mogo-label-input-value">{{propVal}}</div>
				<div v-else class="mogo-label-input-value placeholder">{{placeholder}}</div>
			</template>
			<template v-else>
				<input :readonly="readonly" :placeholder="placeholder" v-if="type == 'number'" class="mogo-input" v-model.number="myVal" type="number" />
				<input :readonly="readonly" :placeholder="placeholder" v-else class="mogo-input" v-model="myVal" :type="type"/>
			</template>
		</div>
		<mogo-icon className="mogo-biaodan-baocuo" class="mogo-label-error" v-if="error" />
		<slot name="append" ></slot>
	</div>
</label>
</template>

<script>
import MogoIcon from '_supports/MogoIcon';
export default{
	data(){
		return {
		}
	},
	model: {
		prop: 'propVal',
		event: 'inputHandle',
	},
	props: {
		type: { type: String, default: 'text', },
		placeholder: { type: String, default: '请输入内容', },
		propVal: { type: [Number,String], default: '', },
		label: { type: [String,Boolean], default: false },
		append: { type: [String,Boolean], default: false },
		error: { type: [Boolean], default: false },
		readonly: Boolean, //如果为true则点击时发送事件
	},
	methods: {
		clickHandle(e){
			if(this.readonly){
				this.$emit('input-click');
			}
		}
	},
	computed: {
		myVal: {
			get(){
				return this.propVal;
			},
			set(val){
				this.$emit('inputHandle',val);
			}
		}
	},
	components: {MogoIcon,},
}
</script>
<style lang="scss">
@import '../scss/mogoinput.scss';
</style>
