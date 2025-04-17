<script setup>
import api from '@/Api';
import axios from 'axios';
import { computed, onMounted, reactive, ref } from 'vue';
import { debounce } from 'lodash';



const products = ref([]);
const links = ref({});
const search = ref('');
const modalForm = ref(null)

const imgUrl = import.meta.env.VITE_IMG_BASE_URL;

// fetchproducts
const fetchproducts = (url = "/product") => {

    if (typeof url !== 'string') {
        console.log(url);
        url = '/product';
    }
    api.get(url, { params: { search: search.value } })
        .then((result) => {
            console.log(result);
            products.value = result.data.data
            links.value = result.data

        }).catch((err) => {
            console.log(err);
        });
}
console.clear()
console.log(links)

// const debouncedFetchproducts = debounce(fetchUsers, 300);
const formatPageLabel = (label) => {
    if (label === '&laquo; Previous') return 'Previous';
    if (label === 'Next &raquo;') return 'Next';
    return label;
};

onMounted(() => {
    fetchproducts()

});


// delete product
const deleteproducts = (id) => {
    console.log(id);

    api.delete(`/product/${id}`)
        .then((result) => {
            console.log(result)
            fetchproducts()
        }).catch((err) => {
            console.log(err)
        });
}
</script>
<template>
    {{ search }}
    <div>
        <div class="table-responsive">
            <div id="example2_wrapper" class="dataTables_wrapper dt-bootstrap5">
                <div class="row col-sm-12 ">
                    <div class="col-sm-6 col-md-6">
                        <!-- ekhane kono content nai, tai eta khali thakbe -->
                         
                        <a href="products/create" class="btn btn-primary">Add product</a>
                    </div>
                    <form action="#">
                        <div class="col-sm-6 col-md-12 text-end mb-2 d-flex justify-content-end">
                            <div id="example2_filter" class="dataTables_filter"><label><input v-model="search"
                                        @input="fetchproducts" type="search" class="form-control form-control-sm"
                                        placeholder="Search" aria-controls="example2"></label></div>
                        </div>
                    </form>

                </div>


                <div class="row">
                    <div class="col-sm-12">
                        <table id="example2" class="table table-striped table-bordered dataTable" role="grid"
                            aria-describedby="example2_info">
                            <thead>
                                <tr role="row">
                                    <th class="sorting_asc" tabindex="0" aria-controls="example2" rowspan="1"
                                        colspan="1" aria-sort="ascending"
                                        aria-label="Name: activate to sort column descending" style="width: 161.188px;">
                                        #Id</th>
                                    <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
                                        aria-label="Position: activate to sort column ascending"
                                        style="width: 265.578px;">Name</th>

                                    <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
                                        aria-label="Office: activate to sort column ascending"
                                        style="width: 115.125px;">Photo </th>

                                    <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
                                        aria-label="Position: activate to sort column ascending"
                                        style="width: 265.578px;">Generic_name</th>

                                    <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
                                        aria-label="Age: activate to sort column ascending" style="width: 51.3281px;">
                                        Category_id</th>
                                    <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
                                        aria-label="Start date: activate to sort column ascending"
                                        style="width: 107.422px;">Brand_id</th>
                                    <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
                                        aria-label="Start date: activate to sort column ascending"
                                        style="width: 107.422px;">Dosage</th>
                                    <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
                                        aria-label="Start date: activate to sort column ascending"
                                        style="width: 107.422px;">Strength</th>
                                    <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
                                        aria-label="Start date: activate to sort column ascending"
                                        style="width: 107.422px;">Unit</th>
                                    <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
                                        aria-label="Start date: activate to sort column ascending"
                                        style="width: 107.422px;">Price</th>
                                    <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
                                        aria-label="Start date: activate to sort column ascending"
                                        style="width: 107.422px;">Offer_price</th>


                                    <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
                                        aria-label="Start date: activate to sort column ascending"
                                        style="width: 107.422px;">Max_quantity</th>


                                    <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
                                        aria-label="Start date: activate to sort column ascending"
                                        style="width: 107.422px;">Reorder_level</th>
                                    <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
                                        aria-label="Start date: activate to sort column ascending"
                                        style="width: 107.422px;">Expiry_date</th>
                                    <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
                                        aria-label="Start date: activate to sort column ascending"
                                        style="width: 107.422px;">Uom_id</th>
                                    <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
                                        aria-label="Start date: activate to sort column ascending"
                                        style="width: 107.422px;">Manufacturer_id</th>

                                    <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
                                        aria-label="Start date: activate to sort column ascending"
                                        style="width: 107.422px;">Description</th>



                                    <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
                                        aria-label="Salary: activate to sort column ascending"
                                        style="width: 86.3594px;">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="product in products" role="row" class="odd">
                                    <td class="sorting_1">{{ product.id }}</td>
                                    <td>{{ product.name }}</td>
                                    <td> <img width="50" :src="`${imgUrl}/${product.photo}`" alt="" srcset=""></td>
                                    <td>{{ product.generic_name }}</td>
                                    <td>{{ product.category?.name }}</td>
                                    <td>{{ product.brand?.brand_name }}</td>
                                    <td>{{ product.dosage }}</td>
                                    <td>{{ product.strength }}</td>
                                    <td>{{ product.unit }}</td>
                                    <td>{{ product.price }}</td>
                                    <td>{{ product.offer_price }}</td>
                                    <td>{{ product.max_quantity }}</td>
                                    <td>{{ product.reorder_level }}</td>
                                    <td>{{ product.expiry_date }}</td>
                                    <td>{{ product.uom?.name }}</td>
                                    <td>{{ product.manufacturer?.name }}</td>
                                    <td>{{ product.description }}</td>
                                    <td class="btn btn-group">
                                        <RouterLink :to="`/products/edit/${product.id}`" class="btn btn-info">
                                            Edit
                                        </RouterLink>

                                        <a class="btn btn-danger" @click="deleteproducts(product.id)">Delete</a>
                                    </td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                </div>
                <div class="list-pagination col-md-12 d-flex justify-content-end cursor-pointer">
                    <ul class="pagination">
                        <li v-for="page in links.links" :key="page.label" class="page-item"><a
                                :class="page.active ? 'active page-link' : 'page-link'" @click="fetchproducts(page.url)"
                                data-i="1" data-page="1">{{
                                formatPageLabel(page.label) }}</a></li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
</template>