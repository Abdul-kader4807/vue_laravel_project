<script setup>
import api from '@/Api';
import {onMounted , reactive,  ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const category = ref([]);
const manufacturers = ref([]);
const uoms = ref([]);
const brands = ref([]);
const previewUrl = ref(null); // Add this line



const productData = reactive({

    name: '',
    category_id: '',
    brand_id: '',
    generic_name: '',
    dosage: '',
    strength: '',
    unit: '',
    price: '',
    offer_price: '',
    max_quantity: '',
    reorder_level: '',
    expiry_date: '',
    uom_id: '',
    manufacturer_id: '',
    description: '',
    discount: '',
    barcode: '',
    sku: '',
    star: '',
    weight: '',
    size: '',
    is_featured: 0,
    is_brand: 0,
    photo: '',
});

const createProducts = () => {
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('category_id', productData.category_id);
    formData.append('brand_id', productData.brand_id);
    formData.append('generic_name', productData.generic_name);
    formData.append('dosage', productData.dosage);
    formData.append('strength', productData.strength);
    formData.append('unit', productData.unit);
    formData.append('price', productData.price);
    formData.append('offer_price', productData.offer_price);
    formData.append('max_quantity', productData.max_quantity);
    formData.append('reorder_level', productData.reorder_level);
    formData.append('expiry_date', productData.expiry_date);
    formData.append('uom_id', productData.uom_id);
    formData.append('manufacturer_id', productData.manufacturer_id);
    formData.append('description', productData.description);
    formData.append('discount', productData.discount);
    formData.append('barcode', productData.barcode);
    formData.append('sku', productData.sku);
    formData.append('star', productData.star);
    formData.append('weight', productData.weight);
    formData.append('size', productData.size);
    formData.append('is_featured', productData.is_featured);
    formData.append('is_brand', productData.is_brand);
    formData.append('photo', productData.photo);


    api
        .post('/product', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((res) => {
            console.log(res);
            router.push({ path: '/products' });
        })
        .catch((err) => {
            console.error(err);
        });
};


const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        productData.photo = file;
        previewUrl.value = URL.createObjectURL(file); // Show preview
    }
};


const fetchCategories = () => {
    api
        .get('/categories/data')
        .then((result) => {
            console.log(result.data.brands);
            
            category.value = result.data.category;
            uoms.value = result.data.uoms;
            manufacturers.value = result.data.manufacturers;
            brands.value = result.data.brands;

        })
        .catch((err) => {
            console.error(err);
        });
};

// const fetchManufacturers = () => {
//     api
//         .get('/manufacturer')
//         .then((result) => {
//             manufacturers.value = result.data;
//         })
//         .catch((err) => {
//             console.error(err);
//         });
// };


// const fetchUoms = () => {
//     api
//         .get('/uoms')
//         .then((result) => {
//             uoms.value = result.data;
//         })
//         .catch((err) => {
//             console.error(err);
//         });
// };

// const fetchBrands = () => {
//     api
//         .get('/brands')
//         .then((result) => {
//             brands.value = result.data;
//         })
//         .catch((err) => {
//             console.error(err);
//         });
// };


onMounted(() => {
    fetchCategories()
   
});


</script>

<template>
    <div class="row">
        <div class="col-lg-8 mx-auto">
            <div class="card">
                <div class="card-body p-4">
                    <h5 class="mb-4"> Add Product Form</h5>
                    <form @submit.prevent="createProducts">

                        <div class="mb-3">
                            <label class="form-label">Product Name</label>
                            <input v-model="productData.name" type="text" class="form-control" />
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Generic Name</label>
                            <input v-model="productData.generic_name" type="text" class="form-control" id="generic_name"
                                placeholder="Enter Your generic_name" />
                        </div>



                        <div class="mb-3">
                            <label class="form-label">Category</label>
                            <select v-model="productData.category_id" class="form-select" name="category">
                                <option value="">Select Category</option>
                                <option v-for="c in category"  :value="c.id">
                                    {{ c.name }}
                                </option>
                            </select>
                        </div>


                        <div class="mb-3">
                            <label class="form-label">Brand</label>
                            <select v-model="productData.brand_id" class="form-select" name="brand">
                                <option value="">Select Brand</option>
                                <option v-for="b in brands" :key="b.id" :value="b.id">
                                    {{ b.brand_name }}
                                </option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">UOM</label>
                            <select v-model="productData.uom_id" class="form-select" name="uom">
                                <option value="">Select UOM</option>
                                <option v-for="u in uoms" :key="u.id" :value="u.id">
                                    {{ u.name }}
                                </option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Manufacturer</label>
                            <select v-model="productData.manufacturer_id" class="form-select" name="manufacturer">
                                <option value="">Select Manufacturer</option>
                                <option v-for="m in manufacturers" :key="m.id"
                                    :value="m.id">
                                    {{ m.name }}
                                </option>
                            </select>
                        </div>

                        <div class="row">
                            <div class="col-md-4 mb-3">
                                <label class="form-label">Dosage</label>
                                <input v-model="productData.dosage" type="text" class="form-control" />
                            </div>
                            <div class="col-md-4 mb-3">
                                <label class="form-label">Strength</label>
                                <input v-model="productData.strength" type="text" class="form-control" />
                            </div>
                            <div class="col-md-4 mb-3">
                                <label class="form-label">Unit</label>
                                <input v-model="productData.unit" type="text" class="form-control" />
                            </div>
                        </div>



                        <div class="row">
                            <div class="col-md-4 mb-3">
                                <label class="form-label">Price</label>
                                <input v-model="productData.price" type="number" class="form-control" />
                            </div>
                            <div class="col-md-4 mb-3">
                                <label class="form-label">Offer Price</label>
                                <input v-model="productData.offer_price" type="number" class="form-control" />
                            </div>
                            <div class="col-md-4 mb-3">
                                <label class="form-label">Max Quantity</label>
                                <input v-model="productData.max_quantity" type="number" class="form-control" />
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Reorder Level</label>
                                <input v-model="productData.reorder_level" type="number" class="form-control" />
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Expiry Date</label>
                                <input v-model="productData.expiry_date" type="date" class="form-control" />
                            </div>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Description</label>
                            <textarea v-model="productData.description" class="form-control" rows="3"></textarea>
                        </div>

                        <div class="row">
                            <div class="col-md-3 mb-3">
                                <label class="form-label">Discount</label>
                                <input v-model="productData.discount" type="number" class="form-control" />
                            </div>
                            <div class="col-md-3 mb-3">
                                <label class="form-label">Barcode</label>
                                <input v-model="productData.barcode" type="text" class="form-control" />
                            </div>
                            <div class="col-md-3 mb-3">
                                <label class="form-label">SKU</label>
                                <input v-model="productData.sku" type="text" class="form-control" />
                            </div>
                            <div class="col-md-3 mb-3">
                                <label class="form-label">Star</label>
                                <input v-model="productData.star" type="number" class="form-control" />
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Weight</label>
                                <input v-model="productData.weight" type="text" class="form-control" />
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Size</label>
                                <input v-model="productData.size" type="text" class="form-control" />
                            </div>
                        </div>

                        <div class="mb-3 form-check">
                            <input v-model="productData.is_featured" class="form-check-input" type="checkbox"
                                :true-value="1" :false-value="0" />
                            <label class="form-check-label">Featured Product</label>
                        </div>

                        <div class="mb-3 form-check">
                            <input v-model="productData.is_brand" class="form-check-input" type="checkbox"
                                :true-value="1" :false-value="0" />
                            <label class="form-check-label">Brand Product</label>
                        </div>




                        <div class="row mb-3">
                            <label for="photo" class="col-sm-3 col-form-label">Photo</label>
                            <div class="col-sm-9">
                                <input @change="onFileChange" type="file" class="form-control" id="photo">
                            </div>
                        </div>
                        <!-- photo preview -->
                        <div class="row mb-3" v-if="previewUrl">
                            <label for="photo" class="col-sm-3 col-form-label">Preview</label>
                            <div class="col-sm-9">
                                <img :src="previewUrl" alt="Photo Preview"
                                    style="max-width: 150px; max-height: 150px; border: 1px solid #ddd; padding: 5px;" />
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