<template>
    <div class="wrapper">
        <div class="section-authentication-cover">
            <div class="row g-0 min-vh-100">
                <!-- Left Image -->
                <!-- <div class="col-xl-7 col-xxl-8 d-none d-xl-flex align-items-center justify-content-center">
          <img src="assets/images/login-images/register-cover.svg" class="img-fluid" width="550" alt="" />
        </div> -->

                <!-- Signup Form -->
                <div class="col-12 col-xl-5 col-xxl-4 d-flex align-items-center justify-content-center">
                    <div class="card shadow-none bg-transparent rounded-0 w-100 m-3">
                        <div class="card-body p-4 p-sm-5">
                            <!-- <div class="text-center mb-4">
                <img src="assets/images/logo-icon.png" width="60" alt="" />
                <h5 class="mt-3">Pharmacy Admin</h5>
                <p>Please fill in the details to create your account</p>
              </div> -->

                            <form @submit.prevent="handleSignup" class="row g-3">
                                <div class="col-12">
                                    <label class="form-label">Username</label>
                                    <input type="text" v-model="signupObj.name" class="form-control"
                                        placeholder=" User Name" />
                                </div>

                                <div class="col-12">
                                    <label class="form-label">Email Address</label>
                                    <input type="email" v-model="signupObj.email" class="form-control"
                                        placeholder="example@user.com" />
                                </div>

                                <div class="col-12">
                                    <label class="form-label">Password</label>
                                    <input type="password" v-model="signupObj.password" class="form-control"
                                        placeholder="Enter Password" />
                                </div>





                                <div class="col-12">
                                    <div class="d-grid">
                                        <button type="submit" class="btn btn-primary">Sign Up</button>
                                    </div>
                                </div>

                                <div class="col-12 text-center">
                                    <p>Already have an account? <a href="/login">Sign in here</a></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/Api';

const router = useRouter();

const signupObj = reactive({
    name: '',
    email: '',
    password: '',

});

const handleSignup = async () => {


    try {
        const response = await api.post('/register', signupObj);
        console.log(response.data);
        alert("Signup successful!");
        router.push('/login');
    } catch (error) {
        console.error(error);
        alert("Signup failed!");
    }
};
</script>

<style scoped>
.wrapper {
    background-color: #f8f9fa;
    display: block;
    background-color: #ffffff;
    min-height: 100vh;
    width: 500px;
    margin: 50px auto;

}
</style>
