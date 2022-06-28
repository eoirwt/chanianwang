export default {
    namespaced: true,
    state: {
        // 这里直接存储了整个订单数组, 里面包括订单对象，内部有订单号（order_id）
        orderList: [],
        order_id : localStorage.getItem('5240273977_chanianwang_orderId') || ''
    },
    getters: {
        
    },
    actions: {
    },
    mutations: {
        INIT_ORDERLIST(state, data) {
            state.orderList = []
            state.order_id = ''
            state.orderList = data
            //存储订单号
            state.order_id = data[0].order_id;
            //设置一个id号
            localStorage.setItem('5240273977_chanianwang_orderId',data[0].order_id);
        }
    }
}