<script setup>
import api from '@/Api';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';



const userData = reactive({
    id: "",
    name: "",
    email: "",
    photo: "",
    password:""
})

// const photoup = (e) => {
//     userData.photo= e.target.files[0]
// }

const formSubmit = () => {

    api.post("/users", userData)
        .then((result) => {
            console.log(result)
            // router.push("/users")
        }).catch((err) => {
            console.log(err)
        });
}



</script>




<template>
    <div class="row">
        <div class="col-lg-8 mx-auto">
            <div class="card">
                <div class="card-body p-4">
                    <h5 class="mb-4">Horizontal Form</h5>
                    {{ userData }}
                    <form @submit.prevent="formSubmit">
                        <div class="row mb-3">
                            <label for="input35" class="col-sm-3 col-form-label">Enter Your Name</label>
                            <div class="col-sm-9">
                                <input v-model="userData.name" type="text" class="form-control" id="input35"
                                    placeholder="Enter Your Name">
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="input37" class="col-sm-3 col-form-label">Email Address</label>
                            <div class="col-sm-9">
                                <input v-model="userData.email" type="email" class="form-control" id="input37"
                                    placeholder="Email Address">
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="input38" class="col-sm-3 col-form-label">Password</label>
                            <div class="col-sm-9">
                                <input v-model="userData.password" type="password" class="form-control" id="input38"
                                    placeholder="Choose Password">
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="input38" class="col-sm-3 col-form-label">Choose file</label>
                            <div class="col-sm-9">
                                <input @change="photoup" type="file" class="form-control" id="input38"
                                    placeholder="Choose Password">
                            </div>
                        </div>


                        <div class="row">
                            <label class="col-sm-3 col-form-label"></label>
                            <div class="col-sm-9">
                                <div class="d-md-flex d-grid align-items-center gap-3">
                                    <button type="submit" class="btn btn-primary px-4">Submit</button>
                                   
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>



<style></style>