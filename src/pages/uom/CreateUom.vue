
<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/Api';

const router = useRouter();

const uomData = reactive({
  name: '',
  

});



const formSubmit = () => {
  const formData = new FormData();
  formData.append('name', uomData.name);
  

  api.post('/uoms', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((result) => {
      console.log(result);
      router.push('/uom');
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<template>
  <div class="row">
    <div class="col-lg-8 mx-auto">
      <div class="card">
        <div class="card-body p-4">
          <h5 class="mb-4">Uom Form</h5>
          <form @submit.prevent="formSubmit">
            <div class="row mb-3">
              <label for="name" class="col-sm-3 col-form-label">Name</label>
              <div class="col-sm-9">
                <input v-model="uomData.name" type="text" class="form-control" id="name"
                  placeholder="Enter Your Name">
              </div>
            </div>

            

            <div class="row">
              <div class="col-sm-9 offset-sm-3">
                <button type="submit" class="btn btn-primary px-4">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>