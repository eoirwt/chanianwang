export default {
    namespaced: true,
    state: {
        addressList: [],
        selectAddress: null
    },
    getters: {
        defaultAddress( state ){
            return state.addressList.filter(v=>{
                return v.isDefault == 1;
            })
        }
    },
    actions: {
    },
    mutations: {
        // 初始化 state 数据
        INIT_ADDRESSlIST(state, data) {
            state.addressList = []
            state.selectAddress = null
            state.addressList = data
            state.addressList.forEach(element => {
                if (element.isDefault) {
                    state.selectAddress = element.id
                }
            });
        }
    }
}