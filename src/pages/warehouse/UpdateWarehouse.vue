
<script setup>
import api from '@/Api';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';


const { id } = useRoute().params;
const previewUrl = ref(null); // Add this line

const warehouseData = reactive({
  id: '',
  name: '',
  phone: '',
  location: '',
  address: '',
 
});

const UpdateWarehouses = () => {


  const formData = new FormData();
    formData.append("_method", "PUT")
    formData.append("id", warehouseData.id)
    formData.append("name", warehouseData.name)
    formData.append("phone", warehouseData.phone)
    formData.append("location", warehouseData.location)
    formData.append("address", warehouseData.address)
    
  api.post("/warehouse/" + warehouseData.id, formData)
    .then(res => {
      console.log(res);

      router.push({ path: '/warehouses' })
    })
    .catch(err => {
      console.log(err);
    })
}



const fetchWarehouse = () => {
  api.get(`/warehouse/${id}`)
    .then((res) => {
      console.log(res.data.warehouse);
      warehouseData.id = res.data.warehouse.id;
      warehouseData.name = res.data.warehouse.name;
      warehouseData.phone = res.data.warehouse.phone;
      warehouseData.location = res.data.warehouse.location;
      warehouseData.address = res.data.warehouse.address;
      
    }).catch((err) => {
      console.log(err);
    });
};



onMounted(() => {
  fetchWarehouse();
});

</script>



<template>
  <div class="row">
    <div class="col-lg-8 mx-auto">
      <div class="card">
        <div class="card-body p-4">
          <h5 class="mb-4">Warehouse Form</h5>
          {{ warehouseData }}
          <form @submit.prevent="UpdateWarehouses">
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
                <input v-model="warehouseData.location" type="text" class="form-control" id="email"
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