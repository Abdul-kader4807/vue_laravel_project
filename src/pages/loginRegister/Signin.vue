<template>
    <!--wrapper-->
    <div class="wrapper">
        <div class="section-authentication-cover ">
            <div class="">
                <div class="row g-0">

                    <!-- <div
                        class="col-12 col-xl-7 col-xxl-8 auth-cover-left align-items-center justify-content-center d-none d-xl-flex">
                        <div class="card shadow-none bg-transparent shadow-none rounded-0 mb-0">
                            <div class="card-body">
                                <img src="/assets/images/login-images/login-cover.svg"
                                    class="img-fluid auth-img-cover-login" width="650" alt="" />
                            </div>
                        </div>
                    </div> -->

                    <div class="col-12 col-xl-5  col-xxl-4 auth-cover-right align-items-center justify-content-center ">
                        <div class="card rounded-0 m-3 shadow-none bg-transparent mb-0">
                            <div class="card-body p-sm-5 ">
                                <div class="">
                                    <!-- {{ loginObj }} -->
                                    <div class="mb-3 text-center">
                                        <img src="/assets/images/logo-icon.png" width="60" alt="">
                                    </div>
                                    <form @submit.prevent="handleLogin">
                                        <div class="text-center mb-4">
                                            <h5 class="">Rocker Admin</h5>
                                            <p class="mb-0">Please log in to your account</p>
                                        </div>
                                        <div class="form-body">
                                            <div class="row g-3">
                                                <div class="col-12">
                                                    <label for="inputEmailAddress" class="form-label">Email</label>
                                                    <input type="email" class="form-control" id="inputEmailAddress"
                                                        v-model="loginObj.email" placeholder="ak@example.com">
                                                </div>
                                                <div class="col-12">
                                                    <label for="inputChoosePassword" class="form-label">Password</label>
                                                    <div class="input-group" id="show_hide_password">
                                                        <input type="password" class="form-control border-end-0"
                                                            id="inputChoosePassword" v-model="loginObj.password"
                                                            placeholder="Enter Password">
                                                        <a href="javascript:;" class="input-group-text bg-transparent">
                                                            <i class="bx bx-hide"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-check form-switch">
                                                        <input class="form-check-input" type="checkbox"
                                                            id="flexSwitchCheckChecked">
                                                        <label class="form-check-label"
                                                            for="flexSwitchCheckChecked">Remember Me</label>
                                                    </div>
                                                </div>
                                                <div class="col-md-6 text-end">
                                                    <a href="authentication-forgot-password.html">Forgot Password?</a>
                                                </div>
                                                <div class="col-12">
                                                    <div class="d-grid">
                                                        <button type="submit" class="btn btn-primary">Sign in</button>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <div class="text-center">
                                                        <p class="mb-0">Don't have an account yet?
                                                            <a href="/signup">Sign up here</a>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="login-separater text-center mb-5">
                                            <span>OR SIGN IN WITH</span>
                                            <hr>
                                        </div>

                                        <div class="list-inline contacts-social text-center">
                                            <a href="javascript:;"
                                                class="list-inline-item bg-facebook text-white border-0 rounded-3"><i
                                                    class="bx bxl-facebook"></i></a>
                                            <a href="javascript:;"
                                                class="list-inline-item bg-twitter text-white border-0 rounded-3"><i
                                                    class="bx bxl-twitter"></i></a>
                                            <a href="javascript:;"
                                                class="list-inline-item bg-google text-white border-0 rounded-3"><i
                                                    class="bx bxl-google"></i></a>
                                            <a href="javascript:;"
                                                class="list-inline-item bg-linkedin text-white border-0 rounded-3"><i
                                                    class="bx bxl-linkedin"></i></a>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <!--end row-->
            </div>
        </div>
    </div>
    <!--end wrapper-->
</template>

<script setup>
import api from '@/Api';
import { useAuthStore } from '@/store/AuthStore';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();

const loginObj = reactive({
    email: "",
    password: ""
});

const handleLogin = async () => {
    try {
        await auth.login(loginObj);
        router.push("/dashboard");
    } catch (error) {
        console.log(error);
    }
};

// Optional: original API example for reference
// const handleLogin = () => {
//   api.post("login", loginObj)
//     .then((result) => {
//       console.log(result.data);
//     }).catch((err) => {
//       console.log(err);
//     });
// }
</script>

<style>
/* You can add your styles here if needed */
.auth-cover-right {
    display: block;
    background-color: #ffffff;
    min-height: 100vh;
    width: 500px;
    margin: 50px auto;
}
</style>
