
<script setup>
  import api from '@/Api';
  import { ref, reactive, onMounted } from 'vue';
  
  const orderData = ref([]);
  const customers = ref([]);
  const status = ref([]);
const total_order = ref("0");
const totalAmount = ref("0");
  
  const ObjSearch = reactive({
    start_date: "",
    end_date: "",
    customer_id: "",
    status_id: ""
   
  });
  
  const loadInitialData = () => {
    api.get("sealsReport/data")
      .then(result => {
        customers.value = result.data.customers;
        status.value = result.data.status;
      })
      .catch(err => console.error(err));
  };
  
  const fromSubmit = () => {
    api.post("/sealsReport", ObjSearch)
      .then(result => {
        console.log(result.data);
        orderData.value = result.data.orders;
        // total_order.value = result.data.total_order;
        totalAmount.value = result.data.total_order;
      })
      .catch(err => console.error(err));
  };


function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

  
  // const getCustomerName = (id) => {
  //   const customer = customers.value.find(s => s.id === id);
  //   return customer ? customer.name : "Unknown Customer";
  // };
  
  // const getStatusName = (id) => {
  //   // const status = getStatusName.value.find(p => p.id === id);
  //    const status = statuse.value.find(p => p.id === id);
  //   return status ? status.name : "Unknown Status";
  // };
  
  onMounted(() => {
    loadInitialData();
  });
  </script>




<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="card shadow-sm rounded">
            <div class="card-body">
              <h2 class="mb-4">Sales Report</h2>

              <form @submit.prevent="fromSubmit">
                <div class="row mb-3 g-3">
                  <div class="col-md-4">
                    <label for="start_date" class="form-label">Start Date</label>
                    <input v-model="ObjSearch.start_date" type="date" id="start_date" class="form-control" required>
                  </div>
                  <div class="col-md-4">
                    <label for="end_date" class="form-label">End Date</label>
                    <input v-model="ObjSearch.end_date" type="date" id="end_date" class="form-control" required>
                  </div>
                  <div class="col-md-4">
                    <label for="customer_id" class="form-label">Customer</label>
                    <select v-model="ObjSearch.customer_id" id="customer_id" class="form-control">
                      <option value="">All Customers</option>
                      <option v-for="customer in customers" :key="customer.id" :value="customer.id">
                        {{ customer.name }}
                      </option>
                    </select>
                  </div>
                  <div class="col-md-4">
                    <label for="status_id" class="form-label">Status</label>
                    <select v-model="ObjSearch.status_id" id="status_id" class="form-control">
                      <option value="">All Status</option>
                      <option v-for="s in status" :key="s.id" :value="s.id">
                        {{ s.name }}
                      </option>
                    </select>
                  </div>
                  <div class="col-md-4 d-flex align-items-end">
                    <button type="submit" class="btn btn-primary w-100">Generate Report</button>
                  </div>
                </div>
              </form>

              <table v-if="orderData.length > 0" class="table table-bordered table-hover mt-4">
                <thead class="table-success text-dark">
                  <tr>
                    <th>ID</th>
                    <th>Customer</th>
                    <th>total_order</th>
                    <th>paid_amount</th>
                    <th>status_id</th>
                    <th>vat</th>
                    <th>Order__date</th>
                    <th>Delivery_date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="data in orderData" :key="data.id">
                    <td>{{ data.id }}</td>
                    <td>{{ data.customer.name }}</td>
                    <td>{{ data.total_order }}</td>
                    <td>{{ data.paid_amount }}</td>
                    <td>{{ data.status.name}}</td>
                    <td>{{ data.vat }}</td>
                    <!-- <td>{{ data.order_date }}</td>
                      <td>{{ data.delivery_date }}</td> -->
                    <td>{{ formatDate(data.order_date) }}</td>
                    <td>{{ formatDate(data.delivery_date) }}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th colspan="4" class="text-end">Total:</th>
                    <th>{{ totalAmount }}</th>
                    <th></th>
                  </tr>
                </tfoot>
              </table>

              <p v-else class="mt-4 text-center text-muted">No orders found for the selected date range.</p>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  
  
  <style scoped>
  .card {
    border: 1px solid #dee2e6;
    border-radius: 0.5rem;
  }
  h2 {
    color: #007bff;
  }
  .table th,
  .table td {
    vertical-align: middle;
  }
  </style>
  