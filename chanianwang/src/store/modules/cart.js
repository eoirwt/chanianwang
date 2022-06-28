export default {
    namespaced: true,
    state: {
        cartList: [], // 购物车数据
        selectList: [] // 选中的数据
    },
    getters: {
        isAllChecked(state) {
            return state.cartList.length == state.selectList.length
        },
        total(state) {
            let total = {
                sum: 0,
                price: 0,
                selNum: 0
            }
            state.cartList.forEach(element => {
                total.sum += parseInt(element.goods_num)
                if( state.selectList.indexOf(element.id) > -1){
                    total.price += (parseFloat(element.goods_price) * parseInt(element.goods_num))
                    total.selNum += parseInt(element.goods_num)

                }
            })
            return total
        }
    },
    actions: {
        changeAllChecked({ commit, getters }) {
            getters.isAllChecked ? commit('UN_ALL_CHECKED') : commit('All_CHECKED')
        },
        delGoodsFn({ commit, state }, id) {
            this._vm.$dialog.confirm({
                title: '确定删除吗?',
            })
                .then(() => {
                    if (typeof id === 'number') {
                        // 删除单个商品
                        commit('DELETE_CARTLIST_ITEM', id)
                        commit('DELETE_SELECTLIST_ITEM', id)
                        this._vm.$myAxios(this._vm, {
                            url: '/api/deleteCart',
                            method: 'POST',
                            data: {
                                idArr: [id]
                            }
                        }).then(res => {
                            this._vm.$toast(res.msg)
                        })
                    } else {
                        console.log(state.selectList.length)
                        // 删除多个商品
                        if (state.selectList.length == 0) {
                            this._vm.$toast('请先选择商品!')
                            return
                        }
                        let arrCart = state.selectList
                        commit('DELETE_CARTLIST_ITEMS')
                        // 全不选，清空 state.selectList
                        commit('UN_ALL_CHECKED')

                        this._vm.$myAxios(this._vm, {
                            url: '/api/deleteCart',
                            method: 'POST',
                            data: {
                                idArr: arrCart
                            }
                        }).then(res => {
                            this._vm.$toast(res.msg)
                        })
                    }
                })
                .catch(() => { })
        },
    },
    mutations: {
        // 初始化
        INIT_CARTLIST(state, data) {
            // 先清空遗留数据
            state.cartList = []
            state.selectList = []
            // 再赋值
            state.cartList = data
            if (data.length) {
                data.forEach(element => {
                    state.selectList.push(element.id)
                });
            }
        },

        // 全选
        All_CHECKED(state) {
            state.selectList = state.cartList.map(element => {
                element.checked = true
                return element.id
            })
        },
        // 全不选
        UN_ALL_CHECKED(state) {
            state.cartList.forEach(element => {
                element.checked = false
            })
            state.selectList = []
        },
        // 单选
        SINGKE_CHECK(state, index) {
            state.cartList[index].checked = !state.cartList[index].checked
            let id = state.cartList[index].id
            let i = state.selectList.indexOf(id)
            //能在selectList找到对应的id，就删除
            if (i > -1) {
                state.selectList.splice(i, 1)
            } else {
                //如果之前没有选中，就给selectList添加一个id进去
                state.selectList.push(id)
            }
        },
        // 删除 cartList 中单个数据
        DELETE_CARTLIST_ITEM(state, data) {
            let itemId = data
            let index = state.cartList.findIndex(element => {
                return element.id == itemId
            })
            state.cartList.splice(index, 1)
        },
        // 删除 selectList 中单个数据
        DELETE_SELECTLIST_ITEM(state, data) {
            let item = data
            let index = state.selectList.findIndex(element => {
                return element == item
            })
            if (index > -1) {
                state.selectList.splice(index, 1)
            }
        },
        // 删除 cartList 中多个数据
        DELETE_CARTLIST_ITEMS(state) {
            state.cartList = state.cartList.filter(element => {
                return state.selectList.indexOf(element.id) == -1
            })
        },
        // 更新 cartList 中单个商品数量
        UPDATE_CARTLIST_ITEN_NUM(state, data) {
            state.cartList.forEach(element => {
                if(element.id == data.id) {
                    element.goods_num = data.value
                }
            })
        }
    }
}