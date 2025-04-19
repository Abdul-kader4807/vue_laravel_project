<template>
    <div class="card">
        <div class="card-body">
            <div id="invoice">
                <div class="toolbar hidden-print">
                    <div class="text-end">
                        <button type="button" class="btn btn-dark"><i class="fa fa-print"></i> Print</button>
                        <button type="button" class="btn btn-danger"><i class="fa fa-file-pdf-o"></i> Export as
                            PDF</button>
                    </div>
                    <hr />
                </div>
                <div class="invoice overflow-auto">
                    <div style="min-width: 800px">
                        <header>
                            <div class="row">
                                <div class="col">
                                    <a href="javascript:;">
                                        <img src="/assets/images/logo-icon.png" width="80" alt="Pharmacy Logo" />
                                    </a>
                                </div>
                                <div class="col company-details">
                                    <h2 class="name">
                                        <a target="_blank" href="#">
                                            City Pharmacy Ltd.
                                        </a>
                                    </h2>
                                    <div>123 Health Street, Medicity</div>
                                    <div>Phone: (+88) 0177-1509646</div>
                                    <div>Email: info@citypharmacy.com</div>
                                </div>
                            </div>
                        </header>
                        <main>
                            <div class="row contacts col-12">
                                <h4 class="to">BILL TO:</h4>
                                <div class="col invoice-to col sm-4">
                                    <h4 class="pb-2">Supplier</h4>
                                    <select v-model="dataObj.selectedSupplier" class="form-control" name="" id="">
                                        <option disabled value="">Select Supplier</option>
                                        <option v-for="s in suppliers" :key="s.id" :value="s">{{ s.name }}</option>
                                    </select>
                                    <p>Phone:{{ dataObj.selectedSupplier.phone }}</p>
                                    <p>Email:{{ dataObj.selectedSupplier.email }}</p>
                                    <p>Address:{{ dataObj.selectedSupplier.address }}</p>
                                    <p>Representative::{{ dataObj.selectedSupplier.contact_person }}</p>

                                </div>
                                <div class="col sm-4">
                                    <h5 class="pb-2">Warehouse</h5>
                                    <select v-model="dataObj.selectedWareHouse" class="form-control" name="" id="">
                                        <option disabled value=""> Select warehouse</option>
                                        <option v-for="w in warehouse" :key="w.id" :value="w">{{ w.name }}</option>
                                    </select>
                                    <p>Phone: {{ dataObj.selectedWareHouse.phone }}</p>
                                    <p>Location: {{ dataObj.selectedWareHouse.location }}</p>
                                    <p>Address: {{ dataObj.selectedWareHouse.address }}</p>

                                </div>
                                <div class="col invoice-details col sm-4">
                                    <h1 class="invoice-id">INVOICE #001</h1>
                                    <div class="date">Date of Invoice: 17/04/2025</div>
                                    <div class="date">Due Date: 02/05/2025</div>
                                </div>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th class="fw-bold bg-primary">SL</th>
                                        <th class="fw-bold bg-primary">Item Description</th>
                                        <th class="fw-bold bg-primary">Strength</th>
                                        <th class="fw-bold bg-primary">Uom</th>
                                        <th class="fw-bold bg-primary">Price</th>
                                        <th class="fw-bold bg-primary">Qty</th>
                                        <th class="fw-bold bg-primary">Discount</th>
                                        <th class="fw-bold bg-primary">Total</th>
                                        <th class="fw-bold bg-primary">
                                            <button @click="clearCart" class="btn bg-danger">ClearAll</button>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>#</th>
                                        <th>
                                            <select v-model="dataObj.selectedProduct" class="form-control" name=""
                                                id="">
                                                <option disabled value="">Select Product</option>
                                                <option v-for="p in products" :key="p.id" :value="p">{{ p.name }}
                                                </option>

                                            </select>

                                        </th>
                                        <th>{{ dataObj.selectedProduct.strength }}</th>
                                        <th>
                                            <select v-model="dataObj.selectedUom" class="form-control" name="" id="">
                                                <option disabled value="">Select Uom</option>
                                                <option v-for="u in uoms" :key="u.id" :value="u">{{ u.name }}</option>

                                            </select>
                                        </th>
                                        <th>{{ dataObj.selectedProduct.offer_price }}</th>
                                        <th>
                                            <input v-model="dataObj.qty" type="number" name="qty" class="form-control"
                                                value="1">
                                        </th>

                                        <th><input v-model="dataObj.discount" type="number" class="form-control"
                                                name="discount"></th>
                                        <!-- <th><input type="text" class="form-control "></th> -->
                                        <th class="total"></th>
                                        <th>
                                            <button @click="addToCart" class="btn btn-sm btn-success">
                                                <i class="fa fa-plus"></i>
                                            </button>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, i) in cartItems" :key="item.id">
                                        <td>{{ i + 1 }}</td>
                                        <td>{{ item.name }}</td>
                                        <td>{{ item.strength }}</td>
                                        <td>{{ item.uom_name }}</td>
                                        <td>{{ item.price }}</td>
                                        <td>{{ item.qty }}</td>
                                        <td>{{ item.discount }}</td>
                                        <td>{{ item.subtotal }}</td>
                                        <td><button @click="itemRemove(item.item_id)" class="btn btn-warning"> <i
                                                    class="fa fa-minus"></i></button></td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <!-- <td colspan="5" class="text-end">SUBTOTAL</td> -->
                                        <td colspan="7" class="text-end">SUBTOTAL</td>
                                        <td class="subtotal">{{ dataObj.grandTotal - dataObj.vat }}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="5"></td>
                                        <td colspan="2">TOTAL DISCOUNT (5%)</td>
                                        <td class="Discount">{{ dataObj.totalDiscount }}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="5"></td>
                                        <td colspan="2">TAX (5%)</td>
                                        <td class="vat">{{ dataObj.vat }}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="5"></td>
                                        <td colspan="2">GRAND TOTAL</td>
                                        <td class="grandtotal">{{ dataObj.grandTotal }}</td>
                                    </tr>
                                </tfoot>
                            </table>
                            <div class="row col-12 mt-">
                                <div class="col-4 p-2 mt-5">
                                    <label for="status_id" class="form-label status fw-bold">Payment Status</label>
                                    <select v-model="dataObj.selectedStatus" name="" class="form-control">
                                        <option disabled value="">Select Status</option>
                                        <option v-for="s in status" :key="s.id" :value="s">{{ s.name }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="notices col-12 mt-5">
                                <div>NOTES:</div>
                                <div class="notice">
                                    1. All prices include VAT where applicable<br>
                                    2. Please make checks payable to City Pharmacy Ltd.<br>
                                    3. Returns accepted within 7 days of purchase
                                </div>
                            </div>
                            <div class="signature-section">
                                <div style="display: flex; justify-content: space-between; margin-top: 30px;">
                                    <div style="width: 45%;">
                                        <div class="signature-line"
                                            style="border-bottom: 1px solid #000; width: 80%; margin: 20px 0;"></div>
                                        <div style="font-weight: bold;">Supplier Signature</div>
                                    </div>
                                    <div style="width: 45%;">
                                        <div class="signature-line"
                                            style="border-bottom: 1px solid #000; width: 80%; margin: 20px 0;"></div>
                                        <div style="font-weight: bold;">Pharmacy Authorized Signature</div>
                                    </div>
                                </div>
                            </div>
                        </main>
                        <footer>Pharmacy Invoice - Valid without signature</footer>
                    </div>
                    <button @click="processOrder" class="btn btn-primary">Process</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import api from '@/Api';
import { onMounted, reactive, ref } from 'vue';
import { useCart } from './Cart';



const cart = useCart("purchase");
const cartItems = ref(cart.getCart());
const suppliers = ref([]);
const warehouse = ref([]);
const products = ref([]);
const uoms = ref([]);
const status = ref([]);


const dataObj = reactive({
    selectedSupplier: {},
    selectedWareHouse: {},
    selectedProduct: {},
    selectedUom: {},
    selectedStatus: {},
    qty: 1,
    discount: 0,
    totalDiscount: 0,
    grandTotal: 0,
    vat: 0
})


const grandTotalCalculation = () => {
    // dataObj.totalDiscount = cart.getCart().reduce((acc, ele) => acc + ele.discount, 0);
    // dataObj.vat = cart.getCart().reduce((acc, ele) => acc + ele.subtotal * 0.05, 0);
    // dataObj.grandTotal = cart.getCart().reduce((acc, ele) => acc +  ele.subtotal , 0);


    const subtotal = cart.getCart().reduce((acc, ele) => acc + ele.subtotal, 0);
    dataObj.totalDiscount = cart.getCart().reduce((acc, ele) => acc + ele.discount, 0);
    dataObj.vat = subtotal * 0.05;
    dataObj.grandTotal = subtotal + dataObj.vat;



    console.log(dataObj.totalDiscount);
    console.log(dataObj.vat);
    console.log(dataObj.grandTotal);


}

// add to cart 

const addToCart = () => {

    let calculate_discount = dataObj.discount * dataObj.qty
    let subtotal = (dataObj.selectedProduct.offer_price * dataObj.qty) - calculate_discount
    const data = {
        item_id: dataObj.selectedProduct.id,
        name: dataObj.selectedProduct.name,
        strength: dataObj.selectedProduct.strength,
        price: dataObj.selectedProduct.offer_price,
        discount: calculate_discount,
        qty: dataObj.qty,
        subtotal: subtotal,
        uom: dataObj.selectedUom.id,
        uom_name: dataObj.selectedUom.name
    }
    cart.save(data)
    cartItems.value = cart.getCart();
    grandTotalCalculation()



    console.log(data);
    dataObj.selectedProduct = {}
    dataObj.qty = 1
    dataObj.discount = 0
}

// item remove 
const itemRemove = (id) => {
    console.log(id);

    cart.deleteItem(id);
    cartItems.value = cart.getCart();
    grandTotalCalculation()
}

const clearCart = () => {
    cart.clearCart();
    cartItems.value = cart.getCart();
    grandTotalCalculation()
}

// order process 
const processOrder = () => {

    const processData = {
        products: cart.getCart(),
        supplier: dataObj.selectedSupplier,
        warehouse: dataObj.selectedWareHouse,
        uom: dataObj.selectedUom,
        status: dataObj.selectedStatus,
        discount: dataObj.totalDiscount,
        grandtotal: dataObj.grandTotal,
        vat: dataObj.vat
    }

    api.post("/purchases/processPurchase", processData)
        .then((result) => {
            console.log(result.data);
        }).catch((err) => {
            console.log(err);
        });

}



// fetch purchaseData
const purchaseData = () => {
    api.get("/purchases/data")
        .then((result) => {
            console.log(result.data);

            warehouse.value = result.data.warehouse
            suppliers.value = result.data.suppliers
            products.value = result.data.products
            uoms.value = result.data.uoms
            status.value = result.data.status
        }).catch((err) => {
            console.log(err);
        });
}

onMounted(() => {
    purchaseData()
    grandTotalCalculation()
})


</script>

<style>
.add-button {
    padding: 3px 8px;
    border-radius: 50%;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th {
    background: #f8f9fa;
    padding: 12px;
    border-bottom: 2px solid #dee2e6;
}

td {
    padding: 10px;
    border-bottom: 1px solid #dee2e6;
}

.total,
.unit,
.qty,
.discount {
    text-align: right;
}

.signature-section {
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px solid #ddd;
}
</style>
