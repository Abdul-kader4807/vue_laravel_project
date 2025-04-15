
<script setup>
import api from '@/Api';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';


const { id } = useRoute().params;
const previewUrl = ref(null); // Add this line

const customerData = reactive({
  id: '',
  name: '',
  email: '',
  phone: '',
  address: '',
  photo: '',
});

const UpdateCustomers = () => {


  const formData = new FormData();
    formData.append("_method", "PUT")
    formData.append("id", customerData.id)
    formData.append("name", customerData.name)
    formData.append("email", customerData.email)
    formData.append("phone", customerData.phone)
    formData.append("address", customerData.address)
    formData.append("photo", customerData.photo)

  api.post("/customers/" + customerData.id, formData)
    .then(res => {
      console.log(res);

      router.push({ path: '/customers' })
    })
    .catch(err => {
      console.log(err);
    })
}



const fetchCustomer = () => {
  api.get(`/customers/${id}`)
    .then((res) => {
      console.log(res.data.customer);
      customerData.id = res.data.customer.id;
      customerData.name = res.data.customer.name;
      customerData.email = res.data.customer.email;
      customerData.phone = res.data.customer.phone;
      customerData.address = res.data.customer.address;
      customerData.photo = res.data.customer.photo;
    }).catch((err) => {
      console.log(err);
    });
};
const onFileChange = (event) => {
  const file = event.target.files[0];
 
  customerData.photo = file;
    previewUrl.value = URL.createObjectURL(file); // Show preview
 
};


onMounted(() => {
  fetchCustomer();
});

</script>



<template>
  <div class="row">
    <div class="col-lg-8 mx-auto">
      <div class="card">
        <div class="card-body p-4">
          <h5 class="mb-4">Customer Form</h5>
          {{ customerData }}
          <form @submit.prevent="UpdateCustomers">
            <div class="row mb-3">
              <label for="name" class="col-sm-3 col-form-label">Name</label>
              <div class="col-sm-9">
                <input v-model="customerData.name" type="text" class="form-control" id="name"
                  placeholder="Enter Your Name">
              </div>
            </div>

            <div class="row mb-3">
              <label for="email" class="col-sm-3 col-form-label">Email</label>
              <div class="col-sm-9">
                <input v-model="customerData.email" type="email" class="form-control" id="email"
                  placeholder="Email Address">
              </div>
            </div>

            <div class="row mb-3">
              <label for="phone" class="col-sm-3 col-form-label">Phone</label>
              <div class="col-sm-9">
                <input v-model="customerData.phone" type="text" class="form-control" id="phone"
                  placeholder="Phone Number">
              </div>
            </div>

            <div class="row mb-3">
              <label for="address" class="col-sm-3 col-form-label">Address</label>
              <div class="col-sm-9">
                <input v-model="customerData.address" type="text" class="form-control" id="address"
                  placeholder="Address">
              </div>
            </div> 

             <!-- <div v-if="customerData.photo && !(customerData.photo instanceof File)" class="row mb-3">
              <label for="photo" class="col-sm-3 col-form-label">Photo</label>
              <img :src="`/uploads/customers/${customerData.photo}`" alt="Customer Image" width="100" />

      
            </div> -->

            <!-- photo preview -->
            <div v-if="previewUrl" class="row mb-3">
              <label for="photo" class="col-sm-3 col-form-label">Preview:</label>
              <img :src="previewUrl" alt="Photo Preview" width="100" />
              style="max-width: 150px; max-height: 150px; border: 1px solid #ddd; padding: 5px;" />
              <!-- <div class="col-sm-9">
                <input @change="photoup" type="file" class="form-control" id="photo">
              </div> -->
            </div>

            <div class="row mb-3">
              <label  class="col-sm-3 col-form-label"> Upload New Photo</label>
      
              <div class="col-sm-9">
                <input @change="onFileChange" type="file" class="form-control" id="photo">
              </div>
            </div>



            <div class="row">
              <div class="col-sm-9 offset-sm-3 ">
                <button type="submit" class="btn btn-primary px-4">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<style>

</style>