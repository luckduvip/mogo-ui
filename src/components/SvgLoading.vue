<template>
    <div class="loading">
	<svg class="sfg-loading" :viewBox="viewBox" version="1.1" xmlns="http://www.w3.org/2000/svg">
		<circle v-for="(item,key) in points" :key="key" :cx="item.cx" :cy="item.cy" :r="r" :fill="fill"/>
	</svg>
    </div>
</template>

<script>
export default {
    data(){
        return {
        }
    },
    props: {
        r: {
            type: Number, default: 16,
        },
        boxWidth: {
            type: Number,default: 200,
        },
        l: {
            type: Number, default: 80,
        }, 
        fill: {
            type: String, default:'red',
        }
    },
    computed: {
        viewBox(){
            return `${-0.5*this.boxWidth} ${-0.5*this.boxWidth} ${this.boxWidth} ${this.boxWidth}`;
        },
        points(){
            let list = [],
                angles = [0,30,60,90,120,150,180,210,240,270,300,330],
                getPoint = (preList,currVal)=>{
                    let _item = {};
                    switch (currVal) {
                        case 0:
                            _item = {cx:0, cy: this.l * -1};
                            break;
                        case 180:
                            _item = {cx:0, cy: this.l};
                            break;
                        case 90: 
                            _item = {cx:this.l, cy: 0};
                            break;
                        case 270: 
                            _item = {cx:this.l * -1, cy: 0};
                            break;
                        default:
                            let _angle = currVal % 90;
                            let radian = Math.PI / 180 * _angle,
                                cx = Math.sin(radian) * this.l,
                                cy = Math.cos(radian) * this.l;
                            console.log(currVal,cx,cy);
                            if(currVal < 90){
                                _item = {cx,cy:cy*-1};
                            }else if(currVal < 180){
                                _item = {cx,cy:cy};
                            }else if(currVal < 270){
                                _item = {cx: cx*-1,cy:cy*1};
                            }else if(currVal < 360){
                                _item = {cx: cx*-1,cy:cy*-1};
                            }
                            break;
                    }
                    preList.push(_item);
                    return preList;
                };
            let result = angles.reduce(getPoint,[]);
            return result;
        }
    }
}
</script>

<style scoped lang="scss">
*{
	padding: 0; margin: 0;
}
.loading{
	position: relative;
}
svg{
    position: absolute; width: 100%; height: 100%; left: 0; top: 0;
	transform: rotate(0deg);
	circle{
			@for $i from 1 through 12 { 
				&:nth-child(#{$i}) { 
                    opacity: #{(1 / 12 * $i)};
				}
			}
	}
    will-change: transform;
	animation: circle 2s linear infinite;
}
@keyframes circle {
	from {transform: rotate(0deg)};
	to { transform: rotate(360deg)};
}

</style>
