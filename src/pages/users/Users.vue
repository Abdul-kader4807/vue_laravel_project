
<script setup>
import api from '@/Api';
import axios from 'axios';
import { computed, onMounted, reactive, ref } from 'vue';
import { debounce } from 'lodash';



const users = ref([]);
const roles = ref([]);
const search = ref('');
const modalForm = ref(null)

const imgUrl = import.meta.env.VITE_IMG_BASE_URL;

// fetchUsers
const fetchUsers = (url = "/users") => {

    if (typeof url !== 'string') {
        console.log(url);
        url = '/users'; 
    }
    api.get(url, { params: { search: search.value } })
        .then((result) => {
            console.log(result.data.data);
            users.value = result.data.data
        }).catch((err) => {
            console.log(err);
        });
}

// const debouncedFetchUsers = debounce(fetchUsers, 300);
const formatPageLabel = (label) => {
    if (label === '&laquo; Previous') return 'Previous';
    if (label === 'Next &raquo;') return 'Next';
    return label;
};

onMounted(() => {
    fetchUsers()

});


// delete User
const deleteUser = (id) => {
    console.log(id);

    api.delete(`/users/${id}`)
        .then((result) => {
            console.log(result)
            fetchUsers()
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

                    </div>
                    <form action="#">
                        <div class="col-sm-6 col-md-12 text-end mb-2 d-flex justify-content-end">
                            <div id="example2_filter" class="dataTables_filter"><label><input v-model="search"
                                        @input="fetchUsers" type="search" class="form-control form-control-sm"
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
                                        style="width: 115.125px;">Email</th>
                                    <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
                                        aria-label="Age: activate to sort column ascending" style="width: 51.3281px;">
                                        Photo</th>
                                    <!-- <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
                                        aria-label="Start date: activate to sort column ascending"
                                        style="width: 107.422px;">Role_id</th> -->
                                    <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
                                        aria-label="Salary: activate to sort column ascending"
                                        style="width: 86.3594px;">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="user in users" role="row" class="odd">
                                    <td class="sorting_1">{{ user.id }}</td>
                                    <td>{{ user.name }}</td>
                                    <td>{{ user.email }}</td>
                                    <td> <img width="100" :src="`${imgUrl}/${user.photo}`" alt="" srcset=""></td>
                                    <!-- <td>{{ user.role_id }}</td> -->
                                    <td class="btn btn-group">
                                        <RouterLink :to="`/users/edit/${user.id}`" class="btn btn-info">
                                            Edit
                                        </RouterLink>

                                        <a class="btn btn-danger" @click="deleteUser(user.id)">Delete</a>
                                    </td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                </div>
                <div class="list-pagination">
                    <ul class="pagination">
                        <li v-for="page in users.links" :key="page.label"
                            :class="page.active ? 'active cursor-pointer' : 'cursor-pointer'"><a class="page"
                                @click="fetchUsers(page.url)" data-i="1" data-page="1">{{
                                formatPageLabel(page.label) }}</a></li>
                    </ul>
                </div>
                <div class="row">



                    <!-- <div class="col-sm-12 col-md-5">
                        <div class="dataTables_info" id="example2_info" role="status" aria-live="polite">Showing 1
                            to 10 of 57 entries</div>
                    </div> -->
                    <!-- <div class="col-sm-12 col-md-12 d-flex justify-content-end ">
                        <div class="dataTables_paginate paging_simple_numbers" id="example2_paginate">
                            <ul class="pagination">
                                <li class="paginate_button page-item previous disabled" id="example2_previous"><a
                                        href="#" aria-controls="example2" data-dt-idx="0" tabindex="0"
                                        class="page-link">Prev</a></li>
                                <li class="paginate_button page-item active"><a href="#" aria-controls="example2"
                                        data-dt-idx="1" tabindex="0" class="page-link">1</a></li>
                                <li class="paginate_button page-item "><a href="#" aria-controls="example2"
                                        data-dt-idx="2" tabindex="0" class="page-link">2</a></li>
                                <li class="paginate_button page-item "><a href="#" aria-controls="example2"
                                        data-dt-idx="3" tabindex="0" class="page-link">3</a></li>
                                <li class="paginate_button page-item "><a href="#" aria-controls="example2"
                                        data-dt-idx="4" tabindex="0" class="page-link">4</a></li>
                                <li class="paginate_button page-item "><a href="#" aria-controls="example2"
                                        data-dt-idx="5" tabindex="0" class="page-link">5</a></li>
                                <li class="paginate_button page-item "><a href="#" aria-controls="example2"
                                        data-dt-idx="6" tabindex="0" class="page-link">6</a></li>
                                <li class="paginate_button page-item next" id="example2_next"><a href="#"
                                        aria-controls="example2" data-dt-idx="7" tabindex="0" class="page-link">Next</a>
                                </li>
                            </ul>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>


<style>

</style>