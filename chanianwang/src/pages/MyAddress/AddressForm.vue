<template>
  <div>
    <div v-if="formType === 'addAddress'">
      <div class="form-title">添加地址</div>
      <van-address-edit
        :area-list="areaList"
        show-set-default
        @save="onSave"
      />
    </div>
    <div v-else-if="formType === 'modifyForm'">
      <div class="form-title">修改地址</div>
      <van-address-edit
        :area-list="areaList"
        :address-info="addressInfo"
        show-delete
        show-set-default
        @save="onUpdate"
        @delete="onDelete"
      />
    </div>
    <div v-else>???????</div>
  </div>
</template>

<script>
import { areaList } from '@vant/area-data'
export default {
  name: 'AddressForm',
  data() {
    return {
      areaList,
      formType: '',
      addressInfo: '',
    }
  },
  components: {},
  computed: {},
  methods: {
    onSave(content) {
      this.$myAxios(this, {
        url: '/api/addAddress',
        method: 'POST',
        data: {
          ...content,
        },
        headers: {
          token: true,
        },
      }).then((res) => {
        this.$toast(res.msg)
        setTimeout(() => {
            this.$router.replace('/myaddress')
        }, 500)
      })
    },
    onUpdate(newContent) {
        console.log(newContent)
        this.$myAxios(this, {
        url: '/api/updateAddress',
        method: 'POST',
        data: {
          ...newContent,
        },
        headers: {
          token: true,
        },
      }).then((res) => {
        this.$toast(res.msg)
        setTimeout(() => {
            this.$router.replace('/myaddress')
        }, 500)
      })
    },
    onDelete(content) {
        let addressId = content.id
        this.$myAxios(this, {
        url: '/api/deleteAddress',
        method: 'POST',
        data: {
          addressId
        },
      }).then((res) => {
        this.$toast(res.msg)
        setTimeout(() => {
            this.$router.replace('/myaddress')
        }, 500)
      })
    },
  },
  created() {
    const params = this.$route.params
    this.formType = params.formType
    if (params.addressInfo) {
      this.addressInfo = JSON.parse(params.addressInfo)
      this.addressInfo.isDefault = this.addressInfo.isDefault == 1 ? true : false  
    }
  },
}
</script>


<style lang="scss" scoped>
.form-title {
  padding: 0.5263rem 12px 0;
  color: rgba(69, 90, 100, 0.6);
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
}
::v-deep .van-button--danger {
  border: 1px solid #41b883;
  background-color: #41b883;
}
::v-deep .van-button--default {
  border: 1px solid #B0352F;
  background-color: #B0352F;
  color: #fff;
}
::v-deep .van-switch--on {
  background-color: #41b883;
}
</style>