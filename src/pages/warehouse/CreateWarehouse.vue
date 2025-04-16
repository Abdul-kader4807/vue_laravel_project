
<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/Api';

const router = useRouter();

const warehouseData = reactive({
  name: '',
  phone: '',
  location: '',
  address: '',
});



const formSubmit = () => {
  const formData = new FormData();
  formData.append('name', warehouseData.name);
  formData.append('phone', warehouseData.phone);
  formData.append('location', warehouseData.location);
  formData.append('address', warehouseData.address);
  

  api.post('/warehouse', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((result) => {
      console.log(result);
      router.push('/warehouses');
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
          <h5 class="mb-4">Warehouse Form</h5>
          <form @submit.prevent="formSubmit">
            <div class="row mb-3">
              <label for="name" class="col-sm-3 col-form-label">Name</label>
              <div class="col-sm-9">
                <input v-model="warehouseData.name" type="text" class="form-control" id="name"
                  placeholder="Enter Your Name">
              </div>
            </div>

        
            <div class="row mb-3">
              <label for="phone" class="col-sm-3 col-form-label">Phone</label>
              <div class="col-sm-9">
                <input v-model="warehouseData.phone" type="text" class="form-control" id="phone"
                  placeholder="Phone Number">
              </div>
            </div>

            <div class="row mb-3">
              <label for="location" class="col-sm-3 col-form-label">Location</label>
              <div class="col-sm-9">
                <input v-model="warehouseData.location" type="text" class="form-control" id="location"
                  placeholder="location">
              </div>
            </div>

            <div class="row mb-3">
              <label for="address" class="col-sm-3 col-form-label">Address</label>
              <div class="col-sm-9">
                <input v-model="warehouseData.address" type="text" class="form-control" id="address"
                  placeholder="Address">
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