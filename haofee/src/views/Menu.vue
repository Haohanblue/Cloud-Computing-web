<template>
    <div>
    <van-sticky >

        <van-notice-bar left-icon="volume-o" :scrollable="false" style="height: 3vh;">
            <van-swipe
                vertical
                class="notice-swipe"
                :autoplay="3000"
                :touchable="false"
                :show-indicators="false"
            >
                <van-swipe-item>节日限定，万圣节美式咖啡登场!</van-swipe-item>
                <van-swipe-item>浩瀚咖啡店全线饮品符合4[0]标准，请放心饮用！</van-swipe-item>
                <van-swipe-item>经典回归，冬天第一杯焦糖玛奇朵！</van-swipe-item>
            </van-swipe>
        </van-notice-bar>

    </van-sticky>
    <LoginCard v-model:visible="showLoginDialog"></LoginCard>
    <div>
        <van-tabs v-model:active="active" scrollspy sticky offset-top="3vh">
            <van-tab v-for="(content,index) in categorizedProducts" :title="content.CategoryName">
                <el-card >
                    <template #header>
                    <div class="card-header">
                        <span>{{content.CategoryName }}</span>
                    </div>
                    </template>
                    <div class="productItem" v-for="(productitem,index) in content.products"> 
                        <van-card
                        >
                        <template #price>
                            <strong>￥:{{productitem.Price}}
                            </strong>
                        </template>
                        <template #title>
                            <strong>{{productitem.ProductName}}
                            </strong>
                        </template>
                        <template #thumb>
                            <img :src="productitem.ImageURL" style="width: 100%; height: 100%;" />
                        </template>
                        <template #desc>
                            <div>{{productitem.Description}}
                            </div>
                        </template>
                        <template #tags>
                            <van-tag plain type="primary">库存 {{productitem.Stock}}</van-tag>
                        </template>
                        <template #num>
                            <van-icon name="add" color="red" size="2rem" @click="openOptions(productitem)"/>
                        </template>
                        </van-card>
                    </div>
                </el-card>
            </van-tab>
        </van-tabs>
        
    </div>
        <div style="display: flex;justify-content: center;">&nbsp</div> 
        <div style="display: flex;justify-content: center;">&nbsp</div> 
        <div style="display: flex;justify-content: center;">我是有底线的~~~</div> 
        <div style="display: flex;justify-content: center;" v-for="(content,index) in 15 " >&nbsp</div> 

        <van-floating-bubble  @click="onClick" axis="xy" icon="chat" magnetic="x" @offset-change="onOffsetChange" v-model:offset="offset" />
    </div>
    <van-sticky :offset-bottom="100" position="bottom">
            <van-action-bar
            style="
                position: fixed;
                bottom: 6%;
                left: 50%;
                transform: translateX(-50%);
                width: calc(100% - 40px);
                border-radius: 50px;
                background-color: #fff;
                box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
            "
            >
            <!-- 左侧，购物袋图标，点击展开购物车 -->
           
            <van-action-bar-icon style="margin-left: 1rem;"
                icon="bag"
                @click="openCart"
                size="3rem"
                :badge=cartLength 
                color="#07c160"
                />
           
            <!-- 中间，购物车内商品总价 -->
            <div style="flex: 1; text-align: center;">
                总价 ￥{{ cartTotalPrice }}
            </div>

            <!-- 右侧，结算按钮 -->
            <van-action-bar-button type="danger" text="结算" @click="createAnOrder"/>
            </van-action-bar>
    </van-sticky>
                <!-- 圆角弹窗（底部） -->
        <van-popup
            v-model:show="showBottom"
            round
            closeable
            position="bottom"
            :style="{ height: '60%' }"
        >
            <!-- 大标题 -->
            <div style="text-align: center; font-size: 20px; font-weight: bold; margin-bottom: 16px;">
            添加到购物车
            </div>

            <!-- 商品信息 -->
            <div style="display: flex; align-items: center; margin-bottom: 16px;">
            <van-image :src="boottomOBJ.bottomProductImage" width="80" height="80" />
            <div style="margin-left: 16px;">
                <div style="font-size: 16px; font-weight: bold;">{{ boottomOBJ.bottomProductName }}</div>
                <div style="color: #f44; font-size: 16px;">￥{{ boottomOBJ.bottomProductPrice }}</div>
                <div>库存：{{ boottomOBJ.bottomProductStock }}</div>
                <div style="color: #999;">{{ boottomOBJ.bottomProductDescription }}</div>
            </div>
            </div>

            <!-- 商品配置选项 -->
            <van-cell-group>
            <!-- 杯型选择 -->
            <van-cell title="杯型">
                <template #right-icon>
                <van-button-group>
                    <van-button
                    v-for="(option, index) in boottomOBJ.cupSizes"
                    :key="index"
                    size="small"
                    :type="boottomOBJ.selectedCupSize === option ? 'primary' : 'default'"
                    @click="boottomOBJ.selectedCupSize = option"
                    >
                    {{ option }}
                    </van-button>
                </van-button-group>
                </template>
            </van-cell>

            <!-- 冰度选择 -->
            <van-cell title="冰度">
                <template #right-icon>
                <van-button-group>
                    <van-button
                    v-for="(option, index) in boottomOBJ.iceLevels"
                    :key="index"
                    size="small"
                    :type="boottomOBJ.selectedIceLevel === option ? 'primary' : 'default'"
                    @click="boottomOBJ.selectedIceLevel = option"
                    >
                    {{ option }}
                    </van-button>
                </van-button-group>
                </template>
            </van-cell>

            <!-- 糖度选择 -->
            <van-cell title="糖度">
                <template #right-icon>
                <van-button-group>
                    <van-button
                    v-for="(option, index) in boottomOBJ.sugarLevels"
                    :key="index"
                    size="small"
                    :type="boottomOBJ.selectedSugarLevel === option ? 'primary' : 'default'"
                    @click="boottomOBJ.selectedSugarLevel = option"
                    >
                    {{ option }}
                    </van-button>
                </van-button-group>
                </template>
            </van-cell>
            </van-cell-group>

            <!-- 购买数量 -->
            <div style="display: flex; align-items: center; justify-content: space-between; margin: 16px;">
            <div>购买数量</div>
            <van-stepper v-model="boottomOBJ.quantity" min="1" />
            </div>

            <!-- 最终价格 -->
            <div style="text-align: right; font-size: 18px; font-weight: bold; margin: 16px;">
            总价：￥{{ (boottomOBJ.bottomProductPrice * boottomOBJ.quantity).toFixed(2) }}
            </div>

            <!-- 加入购物车按钮 -->
            <van-button
            type="danger"
            block
            round
            @click="addToCart"

            >
            加入购物车
            </van-button>
        </van-popup>
        
            <!-- 显示购物车内容的弹窗 -->
    <van-popup v-model:show="showCart" round  position="bottom" :style="{ height: '80%' }"
     >
      <!-- 标题和清空购物车按钮 -->
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px;">
            <div style="font-size: 20px; font-weight: bold;">购物车</div>
            <div @click="clearCart">
                <van-icon name="delete-o" /><span >清空购物车</span>
            </div>
           
        </div>

      <!-- 商品列表 -->
            <div v-for="(productitem, index) in cartList" :key="index" style="margin-bottom: 16px;">
                <van-card
                :num="productitem.Quantity"
                :price="productitem.product.Price"
                :thumb="productitem.product.ImageURL"
                style="margin-bottom: 8px;"
                >
                <template #title>
                    <strong>{{productitem.product.ProductName}}</strong>
                </template>

                <template #num>
                    <van-stepper v-model="productitem.Quantity" min="0" step="1" disable-input @plus="updateQuantity(productitem.CartItemID, 'add',productitem.Quantity)"
                    @minus="updateQuantity(productitem.CartItemID, 'reduce',productitem.Quantity)"/>
                </template>
                <template #desc>
                    <p>{{ productitem.Size }}/{{ productitem.Ice }}/{{ productitem.Sugar }}</p>
                </template>

                </van-card>
            </div>
                            <!-- 总价显示 -->
                <div style="text-align: right; font-size: 18px; font-weight: bold; margin: 16px;">
                    总价：￥{{ cartTotalPrice}}
                </div>

                <!-- 结算按钮 -->
                <van-button type="danger" block round @click="createAnOrder">结算</van-button>
    </van-popup>
    
    <bottomNav/>
  


</template>
<script>
import bottomNav from "/src/components/bottomNav.vue";
import { getProducts, getStocks} from "/src/api/product.ts";
import { th } from "element-plus/es/locales.mjs";
import { toRaw } from "vue";
import { addItemToCart, getCart, updateCartItem, clearCart} from "/src/api/cart.ts";
import { showNotify ,showConfirmDialog  } from 'vant';
import { getMe } from "/src/api/login.ts";
import LoginCard from "/src/views/LoginCard.vue";
import { createOrder } from "/src/api/order.ts";
export default {
    name: "Menu",
    components: { LoginCard,bottomNav },
    mounted() {
        // 在页面挂载后调用数据获取方法
        this.getAllProducts();
        this.getAllStocks();
        this.getMyCart();
    },
    data() {
        return {
            productList: [],
            stockList: [],
            ALLProdutList: [], // 存放合并后的数据
            categorizedProducts: [], // 分类后的数据
            offset: { x: -1, y: 150 },
            showBottom: false,
            boottomOBJ : {
                bottomProductName: "",
                bottomProductPrice: "",
                bottomProductStock: "",
                bottomProductDescription: "",
                bottomProductImage: "",
                bottomProductID: "",
                bottomProductCategoryID: "",
                bottomProductCategoryName: "",
                cupSizes: ['中杯', '大杯'],
                iceLevels: ['热', '正常冰', '少冰', '去冰'],
                sugarLevels: ['正常糖', '半糖', '无糖'],
                selectedCupSize: '中杯',
                selectedIceLevel: '正常冰',
                selectedSugarLevel: '正常糖',
                quantity: 1,
            },
            cartList : [],
            showCart: false,
            cartLength: null,
            cartTotalPrice: null,
            isLogin: null,
            showLoginDialog: false,
            

        };
    },
    methods: {
        async getAllProducts() {
            try {
                const res = await getProducts();
                this.productList = res; // Vue 3 中直接赋值
                this.checkAndMergeLists();
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        },
        async getAllStocks() {
            try {
                const res = await getStocks();
                this.stockList = res; // Vue 3 中直接赋值
                this.checkAndMergeLists();
            } catch (error) {
                console.error("Error fetching stocks:", error);
            }
        },
        checkAndMergeLists() {
            // 确保两个列表都已获取
            if (this.productList.length > 0 && this.stockList.length > 0) {
                // 合并相同 ProductID 的对象
                const mergedList = this.productList.map(product => {
                    const stock = this.stockList.find(s => s.ProductID === product.ProductID);
                    return stock ? { ...product, ...stock } : product;
                });
                this.ALLProdutList = mergedList; // 更新合并后的数据
                console.log("Merged List:", this.ALLProdutList);
                this.categorizeProducts();
            }
        },
        categorizeProducts() {
            // 使用Map对象来进行按类别分组
            const categoryMap = new Map();

            this.ALLProdutList.forEach(product => {
                const categoryid = product.CategoryID; // 假设每个产品都有Category字段
                const categoryname = product.CategoryName; // 假设每个产品都有Category字段
                if (!categoryMap.has(categoryid)) {
                    categoryMap.set(categoryid, {
                        CategoryID: categoryid,
                        CategoryName: categoryname,
                        products: []
                    });
                }
                categoryMap.get(categoryid).products.push(product);
            });

            // 将Map转换为数组
            this.categorizedProducts = Array.from(categoryMap.values());
            console.log("Categorized Products:", this.categorizedProducts);
        },
        openOptions(item) {
            this.boottomOBJ.bottomProductName = item.ProductName;
            this.boottomOBJ.bottomProductPrice = item.Price;
            this.boottomOBJ.bottomProductStock = item.Stock;
            this.boottomOBJ.bottomProductDescription = item.Description;
            this.boottomOBJ.bottomProductImage = item.ImageURL;
            this.boottomOBJ.bottomProductID = item.ProductID;
            this.boottomOBJ.bottomProductCategoryID = item.CategoryID;
            this.boottomOBJ.bottomProductCategoryName = item.CategoryName;
            this.showBottom = true;
        },
        getMyCart(){
            getCart().then(
                res => {
                    this.cartList = res;
                    this.cartLength = res.length;
                    //保留两位小数
                    this.cartTotalPrice = res.reduce((acc, item) => acc + item.product.Price * item.Quantity, 0).toFixed(2);
                    console.log("Cart List:", this.cartList);
                    console.log("Cart Length:", this.cartLength);
                    console.log("Cart Total Price:", this.cartTotalPrice);
                    this.isLogin = true;
                }
            ).catch(
                err => {
                    console.error(err);
                }
            );

        },
        addToCart() {
            if (this.ensureLogin()==true) {
                // 添加到购物车逻辑
            this.showBottom = false;
            let submitData = {
                ProductID: this.boottomOBJ.bottomProductID,
                Quantity: this.boottomOBJ.quantity,
                Size: this.boottomOBJ.selectedCupSize,
                Ice: this.boottomOBJ.selectedIceLevel,
                Sugar: this.boottomOBJ.selectedSugarLevel
            }
            console.log("Submit Data:", submitData);
            addItemToCart(submitData).then(
                res => {
                    console.log(res);
                    this.getMyCart();
                    showNotify({ type: 'success', message: '成功添加到购物车',duration: 500, });
                }
            ).catch(
                err => {
                    console.error(err);
                }
            );
            }else{
                this.showBottom = false;
            }
            
        },
        ensureLogin(){
            if (this.isLogin == true) {
                return true;
            }
            else{
                getMe().then(
                res => {
                    console.log(res);
                    if(res.status === 401){
                        showConfirmDialog({
                        theme: 'round-button',
                        title: '警告',
                        confirmButtonText: '去登录',
                        cancelButtonText: '下次再说',
                        message:
                            '你要先登录才能使用该功能',
                        }).then(() => {
                            this.showLoginDialog = true;
                            return false;
                        }).catch(() => {
                            this.isLogin = false;
                            return false;
                        });
                    }
                    else{

                    this.isLogin = true;
                    return true;
                    }
                }
            ).catch(
                err => {
                    console.error(err);
                    this.isLogin = false;
                    return false;
                }
            );
            }
 
        },
        openCart() {
            if (this.ensureLogin()) {
                this.showCart = true;
            }else{
                this.showCart = false;
            }
        },

        updateQuantity(cartItemId, actionType,quantity) {
            console.log("Update Quantity:", cartItemId, actionType,quantity);
            if(actionType == 'reduce' && quantity == 1){
                showConfirmDialog({
                theme: 'round-button',
                title: '警告',
                message:
                    '是否从购物车里删除该物品？',
                })
                .then(() => {
                    updateCartItem(cartItemId,actionType).then(
                res => {
                    console.log(res);
                    this.getMyCart();
                    showNotify({ type: 'success', message: '删除成功',duration: 200, });
                }
                        ).catch(
                            err => {
                                console.error(err);
                            }
                        );
                        ;
                    // on confirm
                })
                .catch(() => {

                    // 把本地productitem.Quantity的数量加回去
                    this.cartList.forEach(item => {
                        if(item.CartItemID === cartItemId){
                            item.Quantity += 1;
                        }
                    });

                });
            }
            else{
                updateCartItem(cartItemId,actionType).then(
                res => {
                    console.log(res);
                    this.getMyCart();
                    showNotify({ type: 'success', message: '修改成功',duration: 200, });
                }
            ).catch(
                err => {
                    console.error(err);
                }
            );
            }
        
        },
        clearCart() {
            showConfirmDialog({
                theme: 'round-button',
                title: '警告',
                message:
                    '是否确认清空购物车？',
                })
                .then(() => {
                    clearCart().then(
                        res => {
                            console.log(res);
                            this.getMyCart();
                            showNotify({ type: 'success', message: '购物车已清空',duration: 500, });
                            this.showCart = false;
                        }
                    ).catch(
                        err => {
                            console.error(err);
                        }
                    );
                   
                    // on confirm
                })
                .catch(() => {
                    // on cancel
                });
            // 清空购物车逻辑
            console.log("Clear Cart");
        },
        createAnOrder() {
            // 创建订单逻辑
            if (this.ensureLogin()) {
                showConfirmDialog({
                theme: 'round-button',
                title: '警告',
                message:
                    '确认提交订单？',
                }).then(() => {
                    console.log('提交订单');
                    createOrder().then(
                        res => {
                            console.log(res);
                            showNotify({ type: 'success', message: '订单提交成功',duration: 500, });
                            this.getMyCart();
                            this.showCart = false;
                            let orderId = res.data.OrderID;
                            console.log(orderId);
                            // 跳转到订单详情页面，需要根据实际路由配置修改,params 传递订单ID
                            this.$router.push({ name: 'OrderItem', params: { orderId } });
                        }
                    ).catch(
                        err => {
                            console.error(err);
                        }
                    );
                    
                }).catch(() => {
                });
            


            }else{
                this.showCart = false;
            }
            
        },



        

}
};
</script>
  
  
    <style scoped>
      .notice-swipe {
    height: 40px;
    line-height: 40px;
  }
     
    </style>
    