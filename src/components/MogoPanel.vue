<template>
	<article class="mogo-panel">
		<slot name="header" v-if="header !== false">
			<header v-if="headerUrl" class="mogo-flex mogo-panel-header" @click="headerClickHandle">
				{{header}}
				<mogo-icon className="mogoicon_next_arrow" class="mogo-panel-arrow" />
			</header>
			<header class="mogo-flex mogo-panel-header" v-else>{{header}}</header>
		</slot>
		<slot />
		<slot name="footer" v-if="footer !== false">
			<footer v-if="footerUrl != ''" class="mogo-flex mogo-panel-footer" @click="footerClickHandle">
				{{footer}}
				<mogo-icon className="mogoicon_next_arrow" class="mogo-panel-arrow" />
			</footer>
			<footer v-else class="mogo-flex mogo-panel-footer">
				{{footer}}
			</footer>
		</slot>
	</article>
</template>

<script>
import MogoIcon from '_supports/MogoIcon';
export default{
	props: {
		headerUrl: { type: String, default: '' },
		footerUrl: { type: String, default: '' },
		header: [String,Boolean],
		footer: [String,Boolean],
	},
	methods: {
		headerClickHandle(e){
			console.log('header click');
		},
		footerClickHandle(e){
			console.log('footer click');
		},
	},
	components: {MogoIcon,}
}
</script>
<style scoped>

</style>
