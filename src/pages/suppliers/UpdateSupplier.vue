
<script setup>
import api from '@/Api';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';


const { id } = useRoute().params;
const previewUrl = ref(null); // Add this line

const supplierData = reactive({
  id: '',
  name: '',
  email: '',
  contact_person: '',
  phone: '',
  address: '',
  photo: '',
});

const UpdateSuppliers = () => {


  const formData = new FormData();
    formData.append("_method", "PUT")
    formData.append("id", supplierData.id)
    formData.append("name", supplierData.name)
    formData.append("contact_person", supplierData.contact_person)
    formData.append("email", supplierData.email)
    formData.append("phone", supplierData.phone)
    formData.append("address", supplierData.address)
    formData.append("photo", supplierData.photo)

  api.post("/suppliers/" + supplierData.id, formData)
    .then(res => {
      console.log(res);

      router.push({ path: '/suppliers' })
    })
    .catch(err => {
      console.log(err);
    })
}



const fetchSupplier = () => {
  api.get(`/suppliers/${id}`)
    .then((res) => {
      console.log(res.data.supplier);
      supplierData.id = res.data.supplier.id;
      supplierData.name = res.data.supplier.name;
      supplierData.contact_person = res.data.supplier.contact_person;
      supplierData.email = res.data.supplier.email;
      supplierData.phone = res.data.supplier.phone;
      supplierData.address = res.data.supplier.address;
      supplierData.photo = res.data.supplier.photo;
    }).catch((err) => {
      console.log(err);
    });
};
const onFileChange = (event) => {
  const file = event.target.files[0];
 
  supplierData.photo = file;
    previewUrl.value = URL.createObjectURL(file); // Show preview
 
};


onMounted(() => {
  fetchSupplier();
});

</script>



<template>
  <div class="row">
    <div class="col-lg-8 mx-auto">
      <div class="card">
        <div class="card-body p-4">
          <h5 class="mb-4">supplier Form</h5>
          {{ supplierData }}
          <form @submit.prevent="UpdateSuppliers">
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

             <!-- <div v-if="supplierData.photo && !(supplierData.photo instanceof File)" class="row mb-3">
              <label for="photo" class="col-sm-3 col-form-label">Photo</label>
              <img :src="`/uploads/suppliers/${supplierData.photo}`" alt="supplier Image" width="100" />

      
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