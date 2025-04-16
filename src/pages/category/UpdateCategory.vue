
<script setup>
import api from '@/Api';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';


const { id } = useRoute().params;
const previewUrl = ref(null); // Add this line

const categoryData = reactive({
  id: '',
  name: '',
  description: '',
  
});

const UpdateCategories = () => {


  const formData = new FormData();
    formData.append("_method", "PUT")
    formData.append("id", categoryData.id)
    formData.append("name", categoryData.name)
    formData.append("description", categoryData.description)

  api.post("/categories/" + categoryData.id, formData)
    .then(res => {
      console.log(res);

      router.push({ path: '/categories' })
    })
    .catch(err => {
      console.log(err);
    })
}



const fetchCategory = () => {
  api.get(`/categories/${id}`)
    .then((res) => {
      console.log(res.data.category);
      categoryData.id = res.data.category.id;
      categoryData.name = res.data.category.name;
      categoryData.description = res.data.category.description;
      
    }).catch((err) => {
      console.log(err);
    });
};
onMounted(() => {
  fetchCategory();
});

</script>



<template>
  <div class="row">
    <div class="col-lg-8 mx-auto">
      <div class="card">
        <div class="card-body p-4">
          <h5 class="mb-4">category Form</h5>
          {{ categoryData }}
          <form @submit.prevent="UpdateCategories">
            <div class="row mb-3">
              <label for="name" class="col-sm-3 col-form-label">Name</label>
              <div class="col-sm-9">
                <input v-model="categoryData.name" type="text" class="form-control" id="name"
                  placeholder="Enter Your Name">
              </div>
            </div>

            <div class="row mb-3">
              <label for="description" class="col-sm-3 col-form-label">Description</label>
              <div class="col-sm-9">
                <input v-model="categoryData.email" type="text" class="form-control" id="description"
                  placeholder="Description">
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