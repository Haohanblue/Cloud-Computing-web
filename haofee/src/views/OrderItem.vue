<template>
    <div>
      <!-- 顶部导航栏 -->
      <van-nav-bar
        :title="order.OrderStatus"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
  
      <!-- 订单状态步骤条 -->
      <van-steps :active="activeStep" direction="horizontal" class="order-steps">
        <van-step>待支付</van-step>
        <van-step>待取餐</van-step>
        <van-step>已完成</van-step>
      </van-steps>
  
      <!-- 叫号屏 -->
      <div class="pickup-section">
        <div v-if="order.OrderStatus === '待支付'" class="pickup-placeholder">
          <p>请去支付哦</p>
        </div>
        <div v-else class="pickup-code">
          <span>取餐码：</span><h1>{{ order.OrderNumber }}</h1>
          <p>请留意叫号屏哦</p>
        </div>
      </div>
  
      <!-- 订单详细信息 -->
      <el-card>
        <template #header>
          <div class="order-header">
            <div>
              <van-tag type="success" size="large">{{ order.OrderStatus }}</van-tag>
            </div>
            <div class="order-number">订单编号：{{ order.OrderID }}</div>
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
  
        <template #footer>
          <div class="order-footer">
            <div>创建时间：{{ formatDate(order.OrderCreateDate) }}</div>
            <div>支付时间：{{ formatDate(order.OrderPayDate) }}</div>
            <div>完成时间：{{ formatDate(order.OrderCompleteDate) }}</div>
          </div>
        </template>
      </el-card>
  
      <!-- 待支付状态下的支付选项 -->
      <div v-if="order.OrderStatus === '待支付'" class="payment-section">
        <div class="payment-details">
          <div class="amount">¥{{ order.TotalAmount }}</div>
          <div class="payment-method" @click="showPaymentPicker">
            <img :src="paymentIcon" alt="支付方式" class="payment-icon" />
            <span>{{ paymentMethodName }}</span>
            <van-icon name="arrow" />
            </div>
          <van-button type="danger" @click="goToPay" round style="margin-right: 8vw;"  >去支付</van-button>
        </div>
      </div>
  
      <!-- 支付方式选择器 -->
      <van-popup v-model:show="showPicker" position="bottom">
        <van-picker
        :columns="paymentMethods"
        @confirm="onPaymentMethodConfirm"
        @cancel="showPicker = false"
        >
        <template #option="option">
            <div class="picker-option" style="display: flex;justify-content: center;flex-direction: row;">
            
            <div style="display: flex;justify-self: end;"><van-icon :name="option.icon" class="picker-icon" /></div>
            <div>{{ option.text }}</div>
            </div>
        </template>
    
    </van-picker>
    </van-popup>
    
    </div>
        
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import {
    NavBar,
    Steps,
    Step,
    Tag,
    Card as VantCard,
    Icon,
    Button,
    Popup,
    Picker,
  } from 'vant';
  import { ElCard } from 'element-plus';
  import { getOrderDetail } from '/src/api/order.ts';
  import dayjs from 'dayjs';
  import { getPayUrl } from '/src/api/pay.ts';
  import { showLoadingToast, showConfirmDialog} from 'vant';
  const route = useRoute();
  const router = useRouter();
  const order = ref({});
  const activeStep = ref(0);

  const paymentMethods = [
  {
    text: '微信支付',
    value: 'wechat',
    icon: 'https://img.haohan.space/img/202411031857764.png',
  },
  {
    text: '支付宝支付',
    value: 'alipay',
    icon: 'https://img.haohan.space/img/202411031857709.png',
  },
];
const paymentMethod = ref(paymentMethods[1]); // 默认选择第一个支付方式

  const showPicker = ref(false);
  
  const onClickLeft = () => {
    router.back();
  };
  
  const showPaymentPicker = () => {
    showPicker.value = true;
  };
  
  const onPaymentMethodConfirm = (option) => {
    console.log(option); // 检查是否拿到正确的选择项
    paymentMethod.value = option.selectedOptions[0]; // 直接赋值为选中的选项对象
    showPicker.value = false;
};
  


  const goToPay = () => {
    let method = paymentMethod.value.value;
    let orderId = order.value.OrderID;
    if (method === 'wechat') {
      method = 'wxpay';
    } else {
      method = 'alipay';
    }
    showConfirmDialog({
            title: '确认支付？',
            theme: 'round-button',
            message:'确认支付该订单？',
          })
            .then(() => {
                //on confirm
                showLoadingToast({
                    message: '加载中...',
                    forbidClick: true,
                    });
                getPayUrl(orderId, method).then((response) => {
                    console.log("response",response);
                    let url = response.payurl;
                    console.log(url);
                    window.location.href = url;
                    console.log(url);
            })
            .catch(() => {
              // on cancel
            });

    });}
  
  const fetchOrderDetails = () => {
    const orderId = route.params.orderId;
    getOrderDetail(orderId).then((response) => {
      order.value = response.data;
      setActiveStep();
    });
  };
  
  const setActiveStep = () => {
    switch (order.value.OrderStatus) {
      case '待支付':
        activeStep.value = 0;
        break;
      case '待取餐':
        activeStep.value = 1;
        break;
      case '已完成':
        activeStep.value = 2;
        break;
      default:
        activeStep.value = 0;
    }
  };
  
  const formatDate = (date) => {
    return date ? dayjs(date).format('YYYY年MM月DD日 HH:mm:ss') : '—';
  };
  
  const paymentMethodName = computed(() => {
    
  return paymentMethod.value.text;
});

const paymentIcon = computed(() => {
  return paymentMethod.value.icon;
});

  onMounted(() => {
    fetchOrderDetails();
  });
  </script>
  
  <style scoped>
  .picker-option {
  display: flex;
  align-items: center;
}

.picker-icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}
  .order-steps {
    margin: 10px 0;
  }
  
  .order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .order-number {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
  }
  
  .order-footer {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    color: #666;
    line-height: 1.6;
  }
  
  .pickup-section {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .pickup-placeholder {
    font-size: 18px;
    color: #999;
  }
  
  .pickup-code h1 {
    font-size: 48px;
    margin: 0;
  }
  
  .pickup-code p {
    margin: 5px 0 0 0;
    color: #666;
  }
  
  .payment-section {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #fff;
    border-top: 1px solid #eee;
    padding: 10px;
  }
  
  .payment-details {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .amount {
    font-size: 20px;
    font-weight: bold;
    color: #333;
  }
  
  .payment-method {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #333;
  }
  
  .payment-icon {
    width: 24px;
    height: 24px;
    margin-right: 5px;
  }
  
  .van-button {
    flex-shrink: 0;
  }
  </style>
  