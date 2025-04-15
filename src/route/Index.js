import MainLayout from "@/layout/MainLayout.vue";
import CreateCustomer from "@/pages/customers/CreateCustomer.vue";
import Customers from "@/pages/customers/Customers.vue";
import UpdateCustomer from "@/pages/customers/UpdateCustomer.vue";
import Dashboard from"@/pages/Dashboard.vue";
import Signin from "@/pages/loginRegister/Signin.vue";
import Signup from "@/pages/loginRegister/Signup.vue";
import Test from "@/pages/Test.vue";
import CreateUser from "@/pages/users/CreateUser.vue";
import UpdateUser from "@/pages/users/UpdateUser.vue";

import Users from "@/pages/users/Users.vue";
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