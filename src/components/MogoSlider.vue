<template>
	<div class="mogo-slider" @touchstart="clickHandle" @touchend="clickHandle">
		<div class="mogo-slider-bar"></div>
		<div class="mogo-slider-main" ref="bar">
			<div :style="getStyle" class="mogo-slider-ball" @touchstart="moveHandle" @touchmove.stop="moveHandle" ></div>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return {
			left: 0,
			/**最小位移量**/
			minDisplacement: 0,
			outerTouchTime: 0,
		}
	},
	methods: {
		/**
		 * 计算新的left和新的currVal值
		 *
		 * @param {Number} pageX 点击或者新的拖动点
		 */
		leftHandle(pageX){
			let {left,right,width} = this.rect;
			let {min,max,unit} = this;

			/**新的left值**/
			let _left;
			/**新的currVal值**/
			let i;
			if(pageX <= left){
				_left = 0;
				i = Math.floor((_left / width) * (max-min) + min);
			}else if(pageX >= left + width){
				_left = width;
				i = Math.floor((_left / width) * (max-min) + min);
			}else{
				_left = pageX - left;
				if(this.unit == 0){
					i = Math.floor((_left / width) * (max-min) + min);
				}else{
					let _multiple = Math.floor(Math.abs((_left-this.left)/this.minDisplacement));
					console.log('---------',_multiple);
					if(_multiple >= 1){
						_multiple = Math.floor((_left-this.left)/this.minDisplacement);
						_left =  _multiple * this.minDisplacement +  this.left;
						i = _multiple * this.unit + this.currVal;
					} else{
						return;
					}
				}
			} 
			
			console.log('the left===',_left);
			this.left = _left; 
			this.$emit('input',i);
		},

		beforeClickHandle(){
			let oldTime,time,event;
			return (e)=>{
				console.log('e',e);
				switch(e.type){
					case 'touchstart':
						time = Date.now();
						oldTime = time;
						event = e;
						break;
					case 'touchend':
						time = Date.now();
						if(time - oldTime < 300){
							this.moveHandle(event);
						}
						break;
				}
			}
		},
		clickHandle(e){},
		moveHandle(e){
			e.preventDefault();
			e.stopPropagation();
			let {pageX} = e.touches[0];
			this.leftHandle(pageX);
		},
		getLeftByCurrVal(currVal){
			let {rect,max,min} = this;
			return currVal * rect.width / (max - min);
		}
	},
	props: {
		/**当前滑块的值**/
		currVal: { type: Number, },
		min: { type: Number, default:0 },
		max: { type: Number, default:100 },
		unit: { type: Number, default:0 },
	},
	computed:{
		getStyle(){
			return {
				left: this.left+'px'
			}
		}
	},
	mounted(){
		this.clickHandle = this.beforeClickHandle();
		let rect = this.$refs.bar.getBoundingClientRect();
		this.rect = rect;
		this.left = this.getLeftByCurrVal(this.currVal);
		if(this.unit > 0){
			let {unit,max,min} = this;
			this.minDisplacement = this.unit / (max-min) * rect.width;
		}
	},
	model: {
		prop: 'currVal',
	},
}
</script>
<style scoped>

</style>
