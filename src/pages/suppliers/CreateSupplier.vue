
<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/Api';

const router = useRouter();

const supplierData = reactive({
  name: '',
  email: '',
  contact_person: '',
  phone: '',
  address: '',
  photo: "",
});

const handleFileChange = (e) => {
  supplierData.photo = e.target.files[0];
};

const formSubmit = () => {
  const formData = new FormData();
  formData.append('name', supplierData.name);
  formData.append('email', supplierData.email);
  formData.append('contact_person', supplierData.contact_person);
  formData.append('phone', supplierData.phone);
  formData.append('address', supplierData.address);
  if (supplierData.photo) {
    formData.append('photo', supplierData.photo);
  }

  api.post('/suppliers', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((result) => {
      console.log(result);
      router.push('/suppliers');
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
          <h5 class="mb-4">Supplier Form</h5>
          <form @submit.prevent="formSubmit">
            <div class="row mb-3">
              <label for="name" class="col-sm-3 col-form-label">Name</label>
              <div class="col-sm-9">
                <input v-model="supplierData.name" type="text" class="form-control" id="name"
                  placeholder="Enter Your Name">
              </div>
            </div>

            <div class="row mb-3">
              <label for="name" class="col-sm-3 col-form-label">Contact_person</label>
              <div class="col-sm-9">
                <input v-model="supplierData.contact_person" type="text" class="form-control" id="contact_person"
                  placeholder="Contact_person">
              </div>
            </div>


            <div class="row mb-3">
              <label for="email" class="col-sm-3 col-form-label">Email</label>
              <div class="col-sm-9">
                <input v-model="supplierData.email" type="email" class="form-control" id="email"
                  placeholder="Email Address">
              </div>
            </div>

            <div class="row mb-3">
              <label for="phone" class="col-sm-3 col-form-label">Phone</label>
              <div class="col-sm-9">
                <input v-model="supplierData.phone" type="text" class="form-control" id="phone"
                  placeholder="Phone Number">
              </div>
            </div>

            <div class="row mb-3">
              <label for="address" class="col-sm-3 col-form-label">Address</label>
              <div class="col-sm-9">
                <input v-model="supplierData.address" type="text" class="form-control" id="address"
                  placeholder="Address">
              </div>
            </div>

            <div class="row mb-3">
              <label for="photo" class="col-sm-3 col-form-label">Photo</label>
              <div class="col-sm-9">
                <input @change="handleFileChange" type="file" class="form-control" id="photo">
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