<script setup>
import api from '@/Api';
import axios from 'axios';
import { computed, onMounted, reactive, ref } from 'vue';
import { debounce } from 'lodash';



const suppliers = ref([]);
const links = ref({});
const search = ref('');
const modalForm = ref(null)

const imgUrl = import.meta.env.VITE_IMG_BASE_URL;

// fetchSuppliers
const fetchSuppliers = (url = "/suppliers") => {

    if (typeof url !== 'string') {
        console.log(url);
        url = '/suppliers';
    }
    api.get(url, { params: { search: search.value } })
        .then((result) => {
            console.log(result.data);
            suppliers.value = result.data.data
            links.value = result.data

        }).catch((err) => {
            console.log(err);
        });
}



console.clear()
console.log(links)

// const debouncedfetchSuppliers = debounce(fetchUsers, 300);
const formatPageLabel = (label) => {
    if (label === '&laquo; Previous') return 'Previous';
    if (label === 'Next &raquo;') return 'Next';
    return label;
};

onMounted(() => {
    fetchSuppliers()

});


// delete supplier
const deletesuppliers = (id) => {
    console.log(id);

    api.delete(`/suppliers/${id}`)
        .then((result) => {
            console.log(result)
            fetchSuppliers()
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
                        <a href="suppliers/create" class="btn btn-primary">Add Suppliers</a>
                    </div>
                    <form action="#">
                        <div class="col-sm-6 col-md-12 text-end mb-2 d-flex justify-content-end">
                            <div id="example2_filter" class="dataTables_filter"><label><input v-model="search"
                                        @input="fetchSuppliers" type="search" class="form-control form-control-sm"
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
                                        aria-label="Position: activate to sort column ascending"
                                        style="width: 265.578px;">Contact_person</th>
                                    <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
                                        aria-label="Office: activate to sort column ascending"
                                        style="width: 115.125px;">Photo </th>
                                    <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
                                        aria-label="Age: activate to sort column ascending" style="width: 51.3281px;">
                                        Phone</th>
                                    <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
                                        aria-label="Start date: activate to sort column ascending"
                                        style="width: 107.422px;">Email</th>
                                    <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
                                        aria-label="Start date: activate to sort column ascending"
                                        style="width: 107.422px;">Address</th>

                                    <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
                                        aria-label="Salary: activate to sort column ascending"
                                        style="width: 86.3594px;">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="supplier in suppliers" role="row" class="odd">
                                    <td class="sorting_1">{{ supplier.id }}</td>
                                    <td>{{ supplier.name }}</td>
                                    <td>{{ supplier.contact_person }}</td>
                                    <td> <img width="50" :src="`${imgUrl}/${supplier.photo}`" alt="" srcset=""></td>
                                    <td>{{ supplier.phone }}</td>
                                    <td>{{ supplier.email }}</td>
                                    <td>{{ supplier.address }}</td>
                                    <td class="btn btn-group">
                                        <RouterLink :to="`/suppliers/edit/${supplier.id}`" class="btn btn-info">
                                            Edit
                                        </RouterLink>

                                        <a class="btn btn-danger" @click="deletesuppliers(supplier.id)">Delete</a>
                                    </td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                </div>
                <div class="list-pagination col-md-12 d-flex justify-content-end cursor-pointer">
                    <ul class="pagination">
                        <li v-for="page in links.links" :key="page.label" class="page-item"><a
                                :class="page.active ? 'active page-link' : 'page-link'"
                                @click="fetchSuppliers(page.url)" data-i="1" data-page="1">{{
                                formatPageLabel(page.label) }}</a></li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
</template>