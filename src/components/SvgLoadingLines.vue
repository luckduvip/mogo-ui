<template>
<div class="loading-lines">
	<svg class="sfg-loading" viewBox="-100 -100 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path class="type" d="M92 0A92 92 0 0 1 0,92"></path>
        <path d="M0 -96A96 96 0 0 1 0,96"></path>

        <path class="type1" d="M-76 0A76 76 0 0,1 0,-76"></path>
        <path class="type2" d="M0 80A80 80 0 0,1 0,-80"></path>
    
        <path class="type" d="M0 60A60 60 0 0 1 -60,0"></path>
        <path d="M64 0A64 64 0 0 1 -64,0"></path>
	</svg>
</div>
</template>

<script>
export default {
    data(){
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
.loading-lines{
    position: relative;
}
.sfg-loading{
    path{
        fill: none; stroke-width: 1px; stroke: #E6A23C;
        &.type{
            stroke: #f56c6c; stroke-width: 3px;
        }
        &.type1{
            stroke: #67c23a; stroke-width: 3px;
        }
        &.type2{
            stroke: #409EFF;
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