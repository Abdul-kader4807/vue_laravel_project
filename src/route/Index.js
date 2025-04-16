import MainLayout from "@/layout/MainLayout.vue";
import Categories from "@/pages/category/Categories.vue";
import CreateCategory from "@/pages/category/CreateCategory.vue";
import UpdateCategory from "@/pages/category/UpdateCategory.vue";
import CreateCustomer from "@/pages/customers/CreateCustomer.vue";
import Customers from "@/pages/customers/Customers.vue";
import UpdateCustomer from "@/pages/customers/UpdateCustomer.vue";
import Dashboard from"@/pages/Dashboard.vue";
import Signin from "@/pages/loginRegister/Signin.vue";
import Signup from "@/pages/loginRegister/Signup.vue";
import CreateProduct from "@/pages/products/CreateProduct.vue";
import Products from "@/pages/products/Products.vue";
import Stocks from "@/pages/stock/Stocks.vue";
import CreateSupplier from "@/pages/suppliers/CreateSupplier.vue";
import Suppliers from "@/pages/suppliers/Suppliers.vue";
import UpdateSupplier from "@/pages/suppliers/UpdateSupplier.vue";
import Test from "@/pages/Test.vue";
import CreateUom from "@/pages/uom/CreateUom.vue";
import Uoms from "@/pages/uom/Uoms.vue";
import UpdateUom from "@/pages/uom/UpdateUom.vue";
import CreateUser from "@/pages/users/CreateUser.vue";
import UpdateUser from "@/pages/users/UpdateUser.vue";

import Users from "@/pages/users/Users.vue";
import CreateWarehouse from "@/pages/warehouse/CreateWarehouse.vue";
import UpdateWarehouse from "@/pages/warehouse/UpdateWarehouse.vue";
import Warehouses from "@/pages/warehouse/Warehouses.vue";
import { createRouter, createWebHistory } from "vue-router";



const routes=[
    
  { path: '/Login', name: 'Login', component: Signin, meta: { public: true }, },
{ path: '/signup', name: 'Signup', component: Signup, meta: { public: true } }, 

    {
    path: '/',
    component: MainLayout,
    children: [
     {path:'Dashboard', component:Dashboard},
    { path: 'test', component: Test },
    { path: 'customers', component: Customers },
    { path: 'customers/create', component: CreateCustomer },
    { path: 'customers/edit/:id', component: UpdateCustomer },
    
    { path: 'suppliers', component: Suppliers },
    { path: 'suppliers/create', component: CreateSupplier },
    { path: 'suppliers/edit/:id', component: UpdateSupplier },

    { path: 'category', component: Categories },
    { path: 'category/create', component: CreateCategory },
    { path: 'category/edit/:id', component: UpdateCategory },

    { path: 'uom', component: Uoms },
    { path: 'uom/create', component: CreateUom },
    { path: 'uom/edit/:id', component: UpdateUom },

    { path: 'stock', component: Stocks },

    { path: 'warehouses', component: Warehouses },
    { path: 'warehouses/create', component: CreateWarehouse },
      { path: 'warehouses/edit/:id', component: UpdateWarehouse },
    
    { path: 'products', component: Products },
    { path: 'products/create', component: CreateProduct },



    { path: 'users', component: Users },
    { path: 'users/create', component: CreateUser },
    { path: 'users/edit/:id', component: UpdateUser },
    ],
  },
    
    
]


const router = createRouter({
    history:createWebHistory(),
    routes,
})
export default router;