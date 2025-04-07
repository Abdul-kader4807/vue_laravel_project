import Customers from "@/pages/customers/Customers.vue";
import Dashboard from"@/pages/Dashboard.vue";
import Test from "@/pages/Test.vue";
import { createRouter, createWebHistory } from "vue-router";



const routes=[
    {path:'/', component:Dashboard},
    { path: '/test', component: Test },
    { path: '/customers', component: Customers },
    
]


const router = createRouter({
    history:createWebHistory(),
    routes,
})
export default router;