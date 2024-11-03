<template>
    <div class="admin-container">
      <!-- 大标题 -->
      <header class="admin-header">
        <h1>咖啡店后台管理系统</h1>
      </header>
  
      <!-- 标签页 -->
      <el-tabs v-model="activeTab" class="admin-tabs" v-if="isAdmin">
        <!-- 产品管理 -->
        <el-tab-pane label="产品管理" name="product">
          <div class="tab-content">
            <el-button type="primary" icon="el-icon-plus" @click="openProductDialog">添加产品</el-button>
            <el-table :data="products" style="width: 100%; margin-top: 20px;" border>
              <!-- 表格列定义 -->
              <el-table-column prop="CategoryID" label="类型ID" width="80"></el-table-column>
              <el-table-column prop="CategoryName" label="类型名称" width="80"></el-table-column>
              <el-table-column prop="ProductID" label="产品ID" width="80"></el-table-column>
              <el-table-column prop="ProductName" label="产品名称"></el-table-column>
              <el-table-column prop="Price" label="价格"></el-table-column>
              <el-table-column prop="Description" label="描述"></el-table-column>
              <el-table-column prop="ImageURL" label="图片URL"></el-table-column>
              <el-table-column prop="CreatedDate" label="创立日期"></el-table-column>
              <el-table-column label="操作" width="180">
                <template #default="scope">
                  <el-button size="small" @click="editProduct(scope.row)">编辑</el-button>
                  <el-button size="small" type="danger" @click="deleteProductById(scope.row.ProductID)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
  
            <!-- 添加/编辑产品的对话框 -->
            <el-dialog :title="productDialogTitle" v-model="productDialogVisible">
              <el-form :model="productForm" label-width="100px">
                <!-- 表单项 -->
                <el-form-item label="类型ID">
                  <el-input v-model="productForm.CategoryID"></el-input>
                </el-form-item>
                <el-form-item label="类型名称">
                  <el-input v-model="productForm.CategoryName"></el-input>
                </el-form-item>
                <el-form-item label="产品名称">
                  <el-input v-model="productForm.ProductName"></el-input>
                </el-form-item>
                <el-form-item label="价格">
                  <el-input v-model="productForm.Price" type="number"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                  <el-input v-model="productForm.Description"></el-input>
                </el-form-item>
                <el-form-item label="图片地址">
                  <el-input v-model="productForm.ImageURL"></el-input>
                </el-form-item>
              </el-form>
              <template #footer>
                <el-button @click="productDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="saveProduct">保存</el-button>
              </template>
            </el-dialog>
          </div>
        </el-tab-pane>
  
        <!-- 库存管理 -->
        <el-tab-pane label="库存管理" name="stock">
          <div class="tab-content">
            <el-table :data="stocks" style="width: 100%; margin-top: 20px;" border>
              <el-table-column prop="ProductID" label="产品ID" width="80"></el-table-column>
              <el-table-column prop="ProductName" label="产品名称"></el-table-column>
              <el-table-column prop="Stock" label="库存"></el-table-column>
              <el-table-column label="操作" width="120">
                <template #default="scope">
                  <el-button size="small" @click="editStock(scope.row)">修改库存</el-button>
                </template>
              </el-table-column>
            </el-table>
  
            <!-- 编辑库存的对话框 -->
            <el-dialog :title="'修改库存'" v-model="stockDialogVisible">
              <el-form :model="stockForm" label-width="100px">
                <el-form-item label="产品名称">
                  <el-input v-model="stockForm.ProductName" disabled></el-input>
                </el-form-item>
                <el-form-item label="库存">
                  <el-input v-model="stockForm.Stock" type="number"></el-input>
                </el-form-item>
              </el-form>
              <template #footer>
                <el-button @click="stockDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="saveStock">保存</el-button>
              </template>
            </el-dialog>
          </div>
        </el-tab-pane>
  
        <!-- 订单管理 -->
        <el-tab-pane label="订单管理" name="order">
          <div class="tab-content">
            <div class="filter-container">
              <el-select
                v-model="orderStatusFilter"
                placeholder="选择订单状态"
                @change="filterOrders"
                style="width: 200px;"
              >
                <el-option label="全部" value=""></el-option>
                <el-option label="待取餐" value="待取餐"></el-option>
                <el-option label="已完成" value="已完成"></el-option>
              </el-select>
            </div>
            <el-table :data="filteredOrders" style="width: 100%;" border>
              <el-table-column prop="OrderID" label="订单号" width="120"></el-table-column>
              <el-table-column prop="UserID" label="用户ID"></el-table-column>
              <el-table-column prop="TotalAmount" label="订单金额"></el-table-column>
              <el-table-column prop="OrderCreateDate" label="订单建立时间"></el-table-column>
              <el-table-column prop="OrderPayDate" label="订单支付时间"></el-table-column>
              <el-table-column prop="OrderCompleteDate" label="订单完成时间"></el-table-column>
              <el-table-column prop="OrderStatus" label="订单状态"></el-table-column>
              <el-table-column label="操作" width="120">
                <template #default="scope">
                  <el-button
                    v-if="scope.row.OrderStatus === '待取餐'"
                    size="small"
                    type="success"
                    @click="completeOrderById(scope.row.OrderID)"
                  >
                    完成订单
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
  
        <!-- 用户管理 -->
        <el-tab-pane label="用户管理" name="user">
          <div class="tab-content">
            <el-table :data="users" style="width: 100%; margin-top: 20px;" border>
              <el-table-column prop="UserID" label="用户ID" width="120"></el-table-column>
              <el-table-column prop="PhoneNumber" label="用户手机号"></el-table-column>
              <el-table-column prop="IsAdmin" label="是否为管理员"></el-table-column>
              <el-table-column prop="RegisteredDate" label="注册时间"></el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>

      <LoginCard v-model:visible="showLoginDialog"></LoginCard>
      <h2 v-if="!isLogin">您还没登录，请登录管理员账号进入管理后台</h2>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { ElMessage, ElMessageBox } from 'element-plus';
  
  // 导入API函数
  import {
    getOrdersAll,
    completeOrder,
    changeProductInfo,
    addProduct,
    deleteProduct,
    changeProductStock,
    getUsersAll,
  } from '/src/api/admin.ts'; // 请根据实际路径修改
  import { getProducts, getStocks } from '/src/api/product.ts'; // 请根据实际路径修改
  import { getMe} from '/src/api/login.ts'; // 请根据实际路径修改
  import LoginCard from './LoginCard.vue';
  const activeTab = ref('product');
  // 产品管理数据和方法
  const products = ref([]);
  const isLogin = ref(false);
  const fetchProducts = async () => {
    try {
      const productData = await getProducts();
      products.value = productData;
    } catch (error) {
      ElMessage.error('获取产品信息失败');
    }
  };
  const showLoginDialog = ref(false);
  const productDialogVisible = ref(false);
  const productDialogTitle = ref('添加产品');
  const productForm = ref({
    CategoryID: null,
    CategoryName: null,
    ProductID: null,
    ProductName: null,
    Price: null,
    Description: null,
    ImageURL: null,
    CreatedDate: null,
  });
  
  const openProductDialog = () => {
    productDialogTitle.value = '添加产品';
    productForm.value = {
      CategoryID: null,
      CategoryName: null,
      ProductID: null,
      ProductName: null,
      Price: null,
      Description: null,
      ImageURL: null,
      CreatedDate: null,
    };
    productDialogVisible.value = true;
  };
  
  const editProduct = (product) => {
    productDialogTitle.value = '编辑产品';
    productForm.value = { ...product };
    productDialogVisible.value = true;
  };
  
  const saveProduct = async () => {
    try {
      if (productForm.value.ProductID) {
        // 编辑产品
        await changeProductInfo(productForm.value.ProductID, productForm.value);
  
        ElMessage.success('产品更新成功');
        fetchProducts();
        fetchStocks();
      } else {
        // 添加新产品
        await addProduct(productForm.value);
        ElMessage.success('产品添加成功');
        fetchProducts();
        fetchStocks();
      }
      productDialogVisible.value = false;
    } catch (error) {
      ElMessage.error('保存产品失败');
    }
  };
  
  const deleteProductById = async (ProductID) => {
    try {
      ElMessageBox.confirm(
        '确定删除产品吗，该操作不可逆',
        '提醒',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(async () => {
          await deleteProduct(ProductID);
          ElMessage.success('产品删除成功');
          fetchProducts();
          fetchStocks();
        })
        .catch(() => {});
    } catch (error) {
      ElMessage.error('删除产品失败');
    }
  };
  const isAdmin = ref(false);
  // 库存管理数据和方法
  const stocks = ref([]);
  
  const fetchStocks = async () => {
    try {
      const stockData = await getStocks();
      const productData = await getProducts();
      stocks.value = productData.map((product) => {
        const stockItem = stockData.find((stock) => stock.ProductID === product.ProductID);
        return {
          ProductID: product.ProductID,
          ProductName: product.ProductName,
          Stock: stockItem ? stockItem.Stock : 0,
        };
      });
    } catch (error) {
      ElMessage.error('获取库存信息失败');
    }
  };
  
  const stockDialogVisible = ref(false);
  const stockForm = ref({
    ProductID: null,
    ProductName: '',
    Stock: 0,
  });
  
  const editStock = (stockItem) => {
    stockForm.value = { ...stockItem };
    stockDialogVisible.value = true;
  };
  
  const saveStock = async () => {
    try {
      await changeProductStock({
        ProductID: stockForm.value.ProductID,
        Stock: stockForm.value.Stock,
      });
      ElMessage.success('库存更新成功');
      stockDialogVisible.value = false;
      fetchStocks();
      fetchProducts();
    } catch (error) {
      ElMessage.error('保存库存失败');
    }
  };
  
  // 订单管理数据和方法
  const orders = ref([]);
  const fetchOrders = async () => {
    try {
      const data = await getOrdersAll();
      orders.value = data;
    } catch (error) {
      ElMessage.error('获取订单信息失败');
    }
  };
  
  const orderStatusFilter = ref('');
  const filteredOrders = computed(() => {
    if (orderStatusFilter.value) {
      return orders.value.filter((order) => order.OrderStatus === orderStatusFilter.value);
    }
    return orders.value;
  });
  
  const completeOrderById = async (id) => {
    ElMessageBox.confirm('确认完成订单吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(async () => {
        try {
          await completeOrder(id);
          ElMessage.success('订单已完成');
          fetchOrders();
        } catch (error) {
          ElMessage.error('完成订单失败');
        }
      })
      .catch(() => {});
  };
  
  const checkLoginAndAdmin = async () => {
    try {
      const me = await getMe();
      console.log(me);
      getMe().then(res => {
        if (res.status === 401){
          console.log("未登录");
          isLogin.value = false;
          showLoginDialog.value = true;
        }else if (res.UserID){
          console.log("已登录");
          isLogin.value = true;
          if (res.IsAdmin != 1){ 
            ElMessage.error('您不是管理员，无法访问此页面');
            window.location.href = '/';
          }else{
            console.log("您是管理员");
            ElMessage.success('欢迎管理员登录');
            isAdmin.value = true;
          }
        }
        console.log(res);
      });
    }catch (error) {
      ElMessage.error('获取用户信息失败');
    }
  };
  // 用户管理数据
  const users = ref([]);
  const fetchUsers = async () => {
    try {
      const data = await getUsersAll();
      users.value = data;
    } catch (error) {
      ElMessage.error('获取用户信息失败');
    }
  };
  
  // 页面加载时获取数据
  onMounted(() => {
    checkLoginAndAdmin();
    fetchProducts();
    fetchStocks();
    fetchOrders();
    fetchUsers();
  });
  </script>
  
  <style scoped>
  /* 页面容器 */
  .admin-container {
    background-color: #f5f7fa;
    min-height: 100vh;
    padding: 20px;
  }
  
  /* 头部样式 */
  .admin-header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .admin-header h1 {
    font-size: 32px;
    color: #333;
  }
  
  /* 标签页样式 */
  .admin-tabs {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
  }
  
  /* 标签内容样式 */
  .tab-content {
    margin-top: 20px;
  }
  
  /* 表格样式 */
  .el-table {
    background-color: #fff;
  }
  
  /* 操作按钮间距 */
  .el-table .el-button {
    margin-right: 10px;
  }
  
  /* 过滤容器 */
  .filter-container {
    margin-bottom: 20px;
  }
  
  /* 对话框样式 */
  .el-dialog .el-dialog__header {
    background-color: #f5f7fa;
  }
  
  /* 按钮组样式 */
  .el-dialog__footer {
    text-align: right;
  }
  </style>
  