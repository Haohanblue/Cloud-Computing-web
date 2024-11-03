<template>
    <div>
      <van-tabs v-model="activeName" sticky swipeable animated>
        <van-tab title="全部" name="all" >
            <el-row >
                <el-col :span="22" :offset="1">
                    <div v-for="order in sortedOrders(orderlist)" class="order-container" :key="order.OrderID" style="margin-top: 1rem;margin-bottom: 1rem;">
                        <el-card
                        >
                        <template #header >
                            <div style="display: flex;justify-content: space-between;flex-direction: row;" class="order-header">
                                <div>
                                <van-tag type="success" size="large">{{ order.OrderStatus }}</van-tag>   
                            </div>
                            <div>
                                <van-tag type="danger" size="large">¥{{ order.TotalAmount }}</van-tag>
                            </div>
                            </div>
                        </template>
                        <div v-for="item in order.order_items" :key="item.OrderItemID">
                            <van-card
                            :title="item.product.ProductName"
                            :desc="`${item.Size}/${item.Ice}/${item.Sugar}`"
                            :thumb="item.product.ImageURL"
                            :price="item.product.Price"
                            :num="item.Quantity"
                            />
                        </div>
                        <template #footer >
                            <div class="order-footer" style="display: flex;justify-content: space-between;flex-direction: row;">
                                <span>创建时间：{{ order.OrderCreateDate }}</span>
                                <van-button size="small" type="primary" @click="viewOrderDetail(order.OrderID)">查看详情</van-button>
                            </div>
                        </template>
                        </el-card>
                    </div>
                </el-col>
            </el-row>
        </van-tab>
  
        <van-tab title="待支付" name="waitPaying">
          <el-row >
                <el-col :span="22" :offset="1">
                    <div v-for="order in sortedOrders(waitPaying_list)" class="order-container" :key="order.OrderID" style="margin-top: 1rem;margin-bottom: 1rem;">
                        <el-card
                        >
                        <template #header >
                            <div style="display: flex;justify-content: space-between;flex-direction: row;" class="order-header">
                                <div>
                                <van-tag type="success" size="large">{{ order.OrderStatus }}</van-tag>   
                            </div>
                            <div>
                                <van-tag type="danger" size="large">¥{{ order.TotalAmount }}</van-tag>
                            </div>
                            </div>
                        </template>
                        <div v-for="item in order.order_items" :key="item.OrderItemID">
                            <van-card
                            :title="item.product.ProductName"
                            :desc="`${item.Size}/${item.Ice}/${item.Sugar}`"
                            :thumb="item.product.ImageURL"
                            :price="item.product.Price"
                            :num="item.Quantity"
                            />
                        </div>
                        <template #footer >
                            <div class="order-footer" style="display: flex;justify-content: space-between;flex-direction: row;">
                                <span>创建时间：{{ order.OrderCreateDate }}</span>
                                <van-button size="small" type="primary" @click="viewOrderDetail(order.OrderID)">查看详情</van-button>
                            </div>
                        </template>
                        </el-card>
                    </div>
                </el-col>
            </el-row>
        </van-tab>
  
        <van-tab title="待取餐" name="waitTaking">
          <el-row >
                <el-col :span="22" :offset="1">
                    <div v-for="order in sortedOrders(waitTaking_list)" class="order-container" :key="order.OrderID" style="margin-top: 1rem;margin-bottom: 1rem;">
                        <el-card
                        >
                        <template #header >
                            <div style="display: flex;justify-content: space-between;flex-direction: row;" class="order-header">
                                <div>
                                <van-tag type="success" size="large">{{ order.OrderStatus }}</van-tag>   
                            </div>
                            <div>
                                <van-tag type="danger" size="large">¥{{ order.TotalAmount }}</van-tag>
                            </div>
                            </div>
                        </template>
                        <div v-for="item in order.order_items" :key="item.OrderItemID">
                            <van-card
                            :title="item.product.ProductName"
                            :desc="`${item.Size}/${item.Ice}/${item.Sugar}`"
                            :thumb="item.product.ImageURL"
                            :price="item.product.Price"
                            :num="item.Quantity"
                            />
                        </div>
                        <template #footer >
                            <div class="order-footer" style="display: flex;justify-content: space-between;flex-direction: row;">
                                <span>创建时间：{{ order.OrderCreateDate }}</span>
                                <van-button size="small" type="primary" @click="viewOrderDetail(order.OrderID)">查看详情</van-button>
                            </div>
                        </template>
                        </el-card>
                    </div>
                </el-col>
            </el-row>
        </van-tab>
  
        <van-tab title="已完成" name="finished">
          <el-row >
                <el-col :span="22" :offset="1">
                    <div v-for="order in sortedOrders(finished_list)" class="order-container" :key="order.OrderID" style="margin-top: 1rem;margin-bottom: 1rem;">
                        <el-card
                        >
                        <template #header >
                            <div style="display: flex;justify-content: space-between;flex-direction: row;" class="order-header">
                                <div>
                                <van-tag type="success" size="large">{{ order.OrderStatus }}</van-tag>   
                            </div>
                            <div>
                                <van-tag type="danger" size="large">¥{{ order.TotalAmount }}</van-tag>
                            </div>
                            </div>
                        </template>
                        <div v-for="item in order.order_items" :key="item.OrderItemID">
                            <van-card
                            :title="item.product.ProductName"
                            :desc="`${item.Size}/${item.Ice}/${item.Sugar}`"
                            :thumb="item.product.ImageURL"
                            :price="item.product.Price"
                            :num="item.Quantity"
                            />
                        </div>
                        <template #footer >
                            <div class="order-footer" style="display: flex;justify-content: space-between;flex-direction: row;">
                                <span>创建时间：{{ order.OrderCreateDate }}</span>
                                <van-button size="small" type="primary" @click="viewOrderDetail(order.OrderID)">查看详情</van-button>
                            </div>
                        </template>
                        </el-card>
                    </div>
                </el-col>
            </el-row>
        </van-tab>
      </van-tabs>
      <div>
        <div style="display: flex;justify-content: center;">&nbsp</div> 
        <div style="display: flex;justify-content: center;">&nbsp</div> 
        <div style="display: flex;justify-content: center;">我是有底线的~~~</div> 
        <div style="display: flex;justify-content: center;" v-for="(content,index) in 15 " >&nbsp</div> 

        <van-floating-bubble  @click="onClick" axis="xy" icon="chat" magnetic="x" @offset-change="onOffsetChange" v-model:offset="offset" />
        </div>
      <bottomNav />
      <LoginCard v-model:visible="showLoginDialog" />

    </div>
  </template>
  
  <script>
  import LoginCard from '/src/views/LoginCard.vue';
  import { getOrders } from '/src/api/order.ts';
  import bottomNav from '/src/components/bottomNav.vue';
  import { showConfirmDialog } from 'vant';
  
  export default {
    name: 'Order',
    components: { LoginCard, bottomNav },
    data() {
      return {
        activeName: 'all',
        showLoginDialog: false,
        orderlist: [],
        waitPaying_list: [],
        waitTaking_list: [],
        finished_list: [],
      };
    },
    mounted() {
      this.getMyOrders();
    },
    methods: {
      getMyOrders() {
        getOrders()
          .then((res) => {
            if (res.status === 401) {
              showConfirmDialog({
                theme: 'round-button',
                title: '警告',
                confirmButtonText: '去登录',
                cancelButtonText: '下次再说',
                message: '你要先登录才能查看订单',
              }).then(() => {
                this.showLoginDialog = true;
              });
            } else if (res.status === 200) {
              const orders = res.data;
              
              // 按创建时间降序排序，假设订单有 OrderCreateDate 属性，并且将时间转化为字符串北京时间
                orders.forEach((order) => {
                    order.OrderCreateDate = new Date(order.OrderCreateDate).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
                });
  
              this.orderlist = orders;
  
              // 重置数组，防止重复添加
              this.waitPaying_list = [];
              this.waitTaking_list = [];
              this.finished_list = [];
  
              // 分类订单
              orders.forEach((order) => {
                if (order.OrderStatus === '待支付') {
                  this.waitPaying_list.push(order);
                } else if (order.OrderStatus === '待取餐') {
                  this.waitTaking_list.push(order);
                } else if (order.OrderStatus === '已完成') {
                  this.finished_list.push(order);
                }
              })
                console.log(this.waitPaying_list);
                console.log(this.waitTaking_list);
                console.log(this.finished_list);
                console.log(this.orderlist);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },
      sortedOrders(orderArray) {
        // 按创建时间降序排序
        return orderArray.sort((a, b) => new Date(b.OrderCreateDate) - new Date(a.OrderCreateDate));
           },
      viewOrderDetail(orderId) {
        console.log(orderId);
        // 跳转到订单详情页面，需要根据实际路由配置修改,params 传递订单ID
        this.$router.push({ name: 'OrderItem', params: { orderId } });

      },
    },
  };
  </script>
  
  <style scoped>
/* 添加到 <style scoped> 部分 */
.order-container {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.order-header,
.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status-tag {
  margin-right: 0.5rem;
}

.order-footer span {
  color: #888;
}

.van-button {
  margin-left: 0.5rem;
}
  </style>
  