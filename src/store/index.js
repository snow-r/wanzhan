import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		shareUserId:null,
        isMask:false,
        myId:null, //分享优惠券人的ID
        composId:null, //分享优惠券id
        couponId:null
	},
    mutations: {
	},
    actions: {}
})
export default store