<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/Api'

const router = useRouter()

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
    photo: null,
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
})

// Dropdown data
const categories = ref([])
const brands = ref([])
const uoms = ref([])
const manufacturers = ref([])

// Dropdown data fetch
onMounted(() => {
    api.get('/categories').then(res => categories.value = res.data)
    api.get('/brands').then(res => brands.value = res.data)
    api.get('/uoms').then(res => uoms.value = res.data)
    api.get('/manufacturers').then(res => manufacturers.value = res.data)
})

const handleFileChange = (e) => {
    productData.photo = e.target.files[0]
}

const formSubmit = () => {
    const formData = new FormData()
    for (let key in productData) {
        formData.append(key, productData[key])
    }

    api.post('/product', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then(res => {
            console.log(res.data)
            router.push('/products')
        })
        .catch(err => {
            console.log(err.response.data)
        })
}
</script>

<template>
    <div class="container mt-4">
        <div class="card">
            <div class="card-body">
                <h4 class="mb-4">Create Product</h4>
                <form @submit.prevent="formSubmit">

                    <div class="mb-3">
                        <label class="form-label">Product Name</label>
                        <input v-model="productData.name" type="text" class="form-control" />
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Category</label>
                        <select v-model="productData.category_id" class="form-select">
                            <option disabled value="">Select Category</option>
                            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                                {{ cat.name }}
                            </option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Brand</label>
                        <select v-model="productData.brand_id" class="form-select">
                            <option disabled value="">Select Brand</option>
                            <option v-for="brand in brands" :key="brand.id" :value="brand.id">
                                {{ brand.name }}
                            </option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">UOM</label>
                        <select v-model="productData.uom_id" class="form-select">
                            <option disabled value="">Select UOM</option>
                            <option v-for="u in uoms" :key="u.id" :value="u.id">
                                {{ u.name }}
                            </option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Manufacturer</label>
                        <select v-model="productData.manufacturer_id" class="form-select">
                            <option disabled value="">Select Manufacturer</option>
                            <option v-for="m in manufacturers" :key="m.id" :value="m.id">
                                {{ m.name }}
                            </option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Photo</label>
                        <input type="file" class="form-control" @change="handleFileChange" />
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Generic Name</label>
                        <input v-model="productData.generic_name" type="text" class="form-control" />
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
                        <input v-model="productData.is_brand" class="form-check-input" type="checkbox" :true-value="1"
                            :false-value="0" />
                        <label class="form-check-label">Brand Product</label>
                    </div>

                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>
