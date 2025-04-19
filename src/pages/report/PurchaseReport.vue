
<script setup>
  import api from '@/Api';
  import { ref, reactive, onMounted } from 'vue';
  
  const purchaseData = ref([]);
  const suppliers = ref([]);
  const status = ref([]);
const total_purchase = ref("0");
// const totalAmount = ref("0");
  
  const ObjSearch = reactive({
    start_date: "",
    end_date: "",
    supplier_id: "",
    status_id: ""
   
  });
  
  const loadInitialData = () => {
    api.get("purchaseReport/data")
      .then(result => {
        suppliers.value = result.data.suppliers;
        status.value = result.data.status;
      })
      .catch(err => console.error(err));
  };
  
  const fromSubmit = () => {
    api.post("/purchaseReport", ObjSearch)
      .then(result => {
        console.log(result.data);
        purchaseData.value = result.data.purchases;
        total_purchase.value = result.data.total_purchase;
        // totalAmount.value = result.data.total_order;
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
                    <label for="supplier_id" class="form-label">Customer</label>
                    <select v-model="ObjSearch.supplier_id" id="supplier_id" class="form-control">
                      <option value="">All Supplier</option>
                      <option v-for="supplier in suppliers" :key="supplier.id" :value="supplier.id">
                        {{ supplier.name }}
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

              <table v-if="purchaseData.length > 0" class="table table-bordered table-hover mt-4">
                <thead class="table-success text-dark">
                  <tr>
                    <th>ID</th>
                    <th>Supplier</th>
                    <th>Total_purchase</th>
                    <th>Paid_amount</th>
                    <th>Status_id</th>
                    <th>Vat</th>
                    <th>purchase_date</th>
                    <th>Delivery_date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="data in purchaseData" :key="data.id">
                    <td>{{ data.id }}</td>
                    <td>{{ data.supplier.name }}</td>
                    <td>{{ data.total_purchase }}</td>
                    <td>{{ data.paid_amount }}</td>
                    <td>{{ data.status.name}}</td>
                    <td>{{ data.vat }}</td>
                    <td>{{ formatDate(data.purchase_date) }}</td>
                    <td>{{ formatDate(data.updated_at) }}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th colspan="4" class="text-end">Total:</th>
                    <th>{{ total_purchase }}</th>
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
  