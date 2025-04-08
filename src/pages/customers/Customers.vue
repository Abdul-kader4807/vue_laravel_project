<script  setup>
import api from '@/Api';
import axios from 'axios';
import { computed, onMounted, reactive, ref } from 'vue';
import { debounce } from 'lodash';





const customers = ref([]);
const search = ref('');

const imgUrl = import.meta.env.VITE_IMG_BASE_URL;



// customers
const fetchCustomers = (url = "/customers") => {
    if (typeof url !== 'string') {
        console.log(url);
        url = '/customers'; // fallback to default
    }
    api.get(url, { params: { search: search.value } })
        .then((result) => {
            console.log(result.data);
            users.value = result.data
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
    fetchCustomers()
    
});


// create Customers
const customerData = reactive({
    name: "",
    email: "",
    photo: "",
    phone: "",
    address: ""
})

const onFileChange = (e) => {
    customerData.photo = e.target.files[0];
}


const createCustomers = () => {
    const formData = new FormData();
    formData.append('name', customerData.name);
    formData.append('email', customerData.email);
    formData.append('photo', customerData.photo);
    formData.append('phone', customerData.phone);
    formData.append('address', customerData.address);

    api.post('/customers', formData)
        .then((result) => {
            console.log(result.data);

        }).catch((err) => {
            console.log(err.data);
        });
}


</script> 

<template>
    {{ search }}
    <div class="card">
        <div class="card-body">
            <div class="card-header">
                <h5>Add, Edit &amp; Remove table</h5>
            </div>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                data-bs-target="#exampleModal">Add</button>

            <form @submit.prevent="createCustomers" id="add_employee_form" enctype="multipart/form-data">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Add User
                            </h1>
                            {{ customerData }}
                            <button type="button" class="btn-close m-0" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div class="modal-body">

                            <div class="employee mb-3">
                                <input type="hidden" id="id-field">
                                <label class="form-label">Name :</label>
                                <input v-model="customerData.name" class="form-control" type="text" id="employee-field"
                                    placeholder="user" required="">
                            </div>

                            <div class="email mb-3">
                                <label class="form-label">Email :</label>
                                <input v-model="customerData.email" class="form-control" type="email" id="email-field"
                                    placeholder="email" required="">
                            </div>

                            <div class="contact mb-3">
                                <label class="form-label">Phone :</label>
                                <input v-model="customerData.phone" class="form-control" type="text" id="contact-field"
                                    placeholder="contact" required="">
                            </div>

                            <div class="date mb-3">
                                <label class="form-label">Photo :</label>
                                <input @change="onFileChange" class="form-control" type="file" id="date-field"
                                    required="" name="photo">
                            </div>

                            <div class="contact mb-3">
                                <label class="form-label">Address :</label>
                                <input v-model="customerData.address" class="form-control" type="text" id="contact-field"
                                    placeholder="address" required="">
                            </div>
                        </div>
                        <div class="modal-footer add">
                            <input type="button" class="btn btn-secondary" data-bs-dismiss="modal" value="Close">
                            <input type="submit" class="btn btn-primary" id="add-btn" value="Add">
                            <button class="btn btn-success" id="edit-btn" style="display: none;">Edit</button>
                        </div>
                    </div>
                </div>
            </form>

            <div class="table-responsive">
                <div id="example2_wrapper" class="dataTables_wrapper dt-bootstrap5">
                    <div class="row col-sm-12 ">
                        <div class="col-sm-6 col-md-6">
                            <!-- ekhane kono content nai, tai eta khali thakbe -->

                        </div>
                        <div class="col-sm-6 col-md-6 text-end mb-2">
                            <div id="example2_filter" class="dataTables_filter"><label>Search:<input type="search"
                                        class="form-control form-control-sm" placeholder=""
                                        aria-controls="example2"></label></div>
                        </div>
                    </div>







                    <div class="row">
                        <div class="col-sm-12">
                            <table id="example2" class="table table-striped table-bordered dataTable" role="grid"
                                aria-describedby="example2_info">
                                <thead>
                                    <tr role="row">
                                        <th class="sorting_asc" tabindex="0" aria-controls="example2" rowspan="1"
                                            colspan="1" aria-sort="ascending"
                                            aria-label="Name: activate to sort column descending"
                                            style="width: 161.188px;">Name</th>
                                        <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1"
                                            colspan="1" aria-label="Position: activate to sort column ascending"
                                            style="width: 265.578px;">Position</th>
                                        <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1"
                                            colspan="1" aria-label="Office: activate to sort column ascending"
                                            style="width: 115.125px;">Office</th>
                                        <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1"
                                            colspan="1" aria-label="Age: activate to sort column ascending"
                                            style="width: 51.3281px;">Age</th>
                                        <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1"
                                            colspan="1" aria-label="Start date: activate to sort column ascending"
                                            style="width: 107.422px;">Start date</th>
                                        <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1"
                                            colspan="1" aria-label="Salary: activate to sort column ascending"
                                            style="width: 86.3594px;">Salary</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr role="row" class="odd">
                                        <td class="sorting_1">Airi Satou</td>
                                        <td>Accountant</td>
                                        <td>Tokyo</td>
                                        <td>33</td>
                                        <td>2008/11/28</td>
                                        <td>$162,700</td>
                                    </tr>
                                    <tr role="row" class="even">
                                        <td class="sorting_1">Angelica Ramos</td>
                                        <td>Chief Executive Officer (CEO)</td>
                                        <td>London</td>
                                        <td>47</td>
                                        <td>2009/10/09</td>
                                        <td>$1,200,000</td>
                                    </tr>
                                    <tr role="row" class="odd">
                                        <td class="sorting_1">Ashton Cox</td>
                                        <td>Junior Technical Author</td>
                                        <td>San Francisco</td>
                                        <td>66</td>
                                        <td>2009/01/12</td>
                                        <td>$86,000</td>
                                    </tr>
                                    <tr role="row" class="even">
                                        <td class="sorting_1">Bradley Greer</td>
                                        <td>Software Engineer</td>
                                        <td>London</td>
                                        <td>41</td>
                                        <td>2012/10/13</td>
                                        <td>$132,000</td>
                                    </tr>
                                    <tr role="row" class="odd">
                                        <td class="sorting_1">Brenden Wagner</td>
                                        <td>Software Engineer</td>
                                        <td>San Francisco</td>
                                        <td>28</td>
                                        <td>2011/06/07</td>
                                        <td>$206,850</td>
                                    </tr>
                                    <tr role="row" class="even">
                                        <td class="sorting_1">Brielle Williamson</td>
                                        <td>Integration Specialist</td>
                                        <td>New York</td>
                                        <td>61</td>
                                        <td>2012/12/02</td>
                                        <td>$372,000</td>
                                    </tr>
                                    <tr role="row" class="odd">
                                        <td class="sorting_1">Bruno Nash</td>
                                        <td>Software Engineer</td>
                                        <td>London</td>
                                        <td>38</td>
                                        <td>2011/05/03</td>
                                        <td>$163,500</td>
                                    </tr>
                                    <tr role="row" class="even">
                                        <td class="sorting_1">Caesar Vance</td>
                                        <td>Pre-Sales Support</td>
                                        <td>New York</td>
                                        <td>21</td>
                                        <td>2011/12/12</td>
                                        <td>$106,450</td>
                                    </tr>
                                    <tr role="row" class="odd">
                                        <td class="sorting_1">Cara Stevens</td>
                                        <td>Sales Assistant</td>
                                        <td>New York</td>
                                        <td>46</td>
                                        <td>2011/12/06</td>
                                        <td>$145,600</td>
                                    </tr>
                                    <tr role="row" class="even">
                                        <td class="sorting_1">Cedric Kelly</td>
                                        <td>Senior Javascript Developer</td>
                                        <td>Edinburgh</td>
                                        <td>22</td>
                                        <td>2012/03/29</td>
                                        <td>$433,060</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th rowspan="1" colspan="1">Name</th>
                                        <th rowspan="1" colspan="1">Position</th>
                                        <th rowspan="1" colspan="1">Office</th>
                                        <th rowspan="1" colspan="1">Age</th>
                                        <th rowspan="1" colspan="1">Start date</th>
                                        <th rowspan="1" colspan="1">Salary</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 col-md-5">
                            <div class="dataTables_info" id="example2_info" role="status" aria-live="polite">Showing 1
                                to 10 of 57 entries</div>
                        </div>
                        <div class="col-sm-12 col-md-7 d-flex justify-content-end ">
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
                                            aria-controls="example2" data-dt-idx="7" tabindex="0"
                                            class="page-link">Next</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style >

</style>