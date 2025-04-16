
<script setup>
import api from '@/Api';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';


const { id } = useRoute().params;
const previewUrl = ref(null); // Add this line

const uomData = reactive({
  id: '',
  name: '',
  
  
});

const UpdateUoms = () => {


  const formData = new FormData();
    formData.append("_method", "PUT")
    formData.append("id", uomData.id)
    formData.append("name", uomData.name)
    

  api.post("/uoms/" + uomData.id, formData)
    .then(res => {
      console.log(res);

      router.push({ path: '/uom' })
    })
    .catch(err => {
      console.log(err);
    })
}



const fetchUom = () => {
  api.get(`/uoms/${id}`)
    .then((res) => {
      console.log(res.data.uom);
      uomData.id = res.data.uom.id;
      uomData.name = res.data.uom.name;
     
    }).catch((err) => {
      console.log(err);
    });
};
onMounted(() => {
  fetchUom();
});

</script>



<template>
  <div class="row">
    <div class="col-lg-8 mx-auto">
      <div class="card">
        <div class="card-body p-4">
          <h5 class="mb-4">uom Form</h5>
          {{ uomData }}
          <form @submit.prevent="UpdateUoms">
            <div class="row mb-3">
              <label for="name" class="col-sm-3 col-form-label">Name</label>
              <div class="col-sm-9">
                <input v-model="uomData.name" type="text" class="form-control" id="name"
                  placeholder="Enter Your Name">
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