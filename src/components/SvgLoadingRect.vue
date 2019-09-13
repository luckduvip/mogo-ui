<template>
<div class="loading-rect">
	<svg class="sfg-loading" viewBox="-100 -100 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <line v-for="(item,idx) in lines" :key="idx" :x1="item.x1" :y1="item.y1" :y2="item.y2" :x2="item.x2" :stroke="fill"/>
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
        fill: {
            type: String, default: '#409EFF'
        }
    },
    computed: {
        lines(){
            let angles = [
                // 0,20,40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340
                // 100 
                0,30,60,90,120,150,180,210,240,270,300,330
            ];
            let list = angles.reduce((preList,currVal)=>{
                if(currVal == 0){
                    preList.push({
                        x1: 0, y1: -30,
                        x2: 0, y2: -80
                    })
                    return preList;
                }else if(currVal == 90){
                    preList.push({
                        x1: 30, y1: 0,
                        x2: 80, y2: 0
                    })
                    return preList;
                }else if(currVal == 180){
                    preList.push({
                        x1: 0, y1: 30,
                        x2: 0, y2: 80
                    })
                    return preList;
                }else if(currVal == 270){

                    preList.push({
                        x1: -30, y1: 0,
                        x2: -80, y2: 0
                    })
                    return preList;
                }
                let _angle = currVal % 90;
                let radian = Math.PI / 180 * _angle,
                    x1 = Math.sin(radian) * 30,
                    y1 = Math.cos(radian) * 30,
                    x2 = Math.sin(radian) * 80,
                    y2 = Math.cos(radian) * 80,
                    _item = {};
                    console.log('----',currVal,x1,y1,radian,_angle)
                    console.log('=====',Math.hypot(x1,y1));
                if(currVal < 90){
                    _item = {
                        x1,y1:y1*-1,
                        x2,y2:y2*-1
                    };
                }else if(currVal < 180){
                    _item = {
                        x1,y1:y1,
                        x2,y2:y2
                    };
                }else if(currVal < 270){
                    _item = {
                        x2: x2*-1,y2:y2*1,
                        x1: x1*-1,y1:y1*1
                    };
                }else if(currVal < 360){
                    _item = {
                        x1: x1*-1,y1:y1*-1,
                        x2: x2*-1,y2:y2*-1
                    };
                }
                preList.push(_item);
                return preList;
            },[]);
            return list;
        }
    }
}
</script>

<style lang="scss" scoped>
.loading-rect{
    position: relative;
}
.sfg-loading{
    will-change: transform;
	animation: circle 2s linear infinite;
    line{
        stroke-width: 10px;
        @for $i from 1 through 12 { 
            &:nth-child(#{$i}) { 
                opacity: #{(1 / 12 * $i)};
            }
        }
    }
}
@keyframes circle {
	from {transform: rotate(0deg)};
	to { transform: rotate(360deg)};
}
</style>