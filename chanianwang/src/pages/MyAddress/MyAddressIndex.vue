<template>
  <div class="ad-main">
    <ul v-if="addressList.length" class="ad-list">
      <li v-for="item in addressList" :key="item.id" @click="goAddressForm({'formType': 'modifyForm', 'addressInfo': item})">
        <van-checkbox
          :value="item.id == selectAddress"
          checked-color="#41b883"
        ></van-checkbox>
        <div class="ad-info">
          <div>
            <span>{{ item.name }}</span>
            <span>{{ item.tel }}</span>
          </div>
          <div>
            <span class="active" v-show="item.isDefault">默认</span>
            <span
              >{{
                item.province +
                ' ' +
                item.city +
                ' ' +
                item.county +
                ' ' +
                item.addressDetail
              }}
            </span>
          </div>
        </div>
        <van-icon name="arrow" />
      </li>
    </ul>
    <div v-else class="no-address">
      <van-icon name="logistics" size="3rem" color="#DDDDDD" />
      <p>您还没有收货地址, 您可以</p>
    </div>
    <div class="add-address" @click="goAddressForm({'formType': 'addAddress'})">添加地址</div>
  </div>
</template>

<script>
import { mapState ,mapMutations } from 'vuex'
export default {
  name: 'MyAddressIndex',
  data() {
    return {
      checked: true,
    }
  },
  computed: {
    ...mapState('address', ['addressList', 'selectAddress']),
  },
  methods: {
    ...mapMutations('address', { initAddressList: 'INIT_ADDRESSlIST' }),
    async getData() {
      await this.$myAxios(this, {
        url: '/api/selectAddress',
        method: 'POST',
        headers: {
          token: true,
        },
      }).then((res) => {
        this.initAddressList(res.data)
      })
    },
    goAddressForm( options ) {
      if(options.formType == 'addAddress') {
        this.$router.push({
          name: 'AddressForm',
          params: {
            formType: options.formType
          }
        })
      }else {
        this.$router.push({
          name: 'AddressForm',
          params: {
            formType: options.formType,
            addressInfo: JSON.stringify(options.addressInfo)
          }
        })
      }
    },
  },
  created() {
    this.getData()
  },
}
</script>


<style lang="scss" scoped>
.ad-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  .ad-list {
    width: 100%;
    li {
      margin: 0.2632rem;
      padding: 0.2632rem 0.1316rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      border-radius: 0.2632rem;
      .ad-info {
        flex: 1;
        font-size: 0.4211rem;
        padding: 0 0.2105rem;
        div {
          max-width: 7.3684rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          .active {
            position: relative;
            padding: 0 0.1053rem;
            margin-right: 0.1316rem;
            background-color: #41b883;
            color: #fff;
            font-size: 0.2632rem;
            border-radius: 0.1579rem;
          }
          span {
            padding-right: 0.1316rem;
          }
        }
        :nth-child(1) {
          margin-bottom: 0.3947rem;
        }
      }
      .van-icon {
        width: 0.6316rem;
        height: 0.6316rem;
        line-height: 0.6316rem;
        text-align: center;
        color: #9697a5;
        font-size: 0.4737rem;
      }
    }
  }
  .no-address {
    display: flex;
    padding-top: 0.3947rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      padding-top: 0.2632rem;
      font-size: 0.3684rem;
      color: #9e9e9e;
    }
  }
  .add-address {
    margin-top: 0.5263rem;
    width: 3.1579rem;
    line-height: 1.0526rem;
    font-size: 0.4737rem;
    text-align: center;
    color: #fff;
    background-color: #41b883;
    border-radius: 0.1579rem;
  }
}
</style>