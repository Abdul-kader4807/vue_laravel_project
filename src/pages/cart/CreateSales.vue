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
                                    <div>Phone: (123) 456-7890</div>
                                    <div>Email: info@citypharmacy.com</div>
                                </div>
                            </div>
                        </header>
                        <main>
                            <div class="row contacts">
                                <div class="col invoice-to">
                                    <h4 class="to">BILL TO:</h4>
                                    <select class="form-control supplier_id" name="supplier_id" id="supplier_id">
                                        <option value="1">Supplier One</option>
                                        <option value="2">Supplier Two</option>
                                    </select>
                                    <p>Email:<span class="email"></span></p>
                                    <p>Phone:<span class="phone"></span></p>
                                    <p>Address:<span class="address"></span></p>
                                    <p>Representative:<span class="contact_person"></span></p>
                                </div>
                                <div class="col invoice-details">
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
                                        <th class="fw-bold bg-primary"><button
                                                class="btn bg-danger clearAll">ClearAll</button></th>
                                    </tr>
                                    <tr>
                                        <th>M001</th>
                                        <th>
                                            <select class="form-control" name="product_id" id="product_id">
                                                <option value="">Select Product</option>
                                                <option value="1">Paracetamol</option>
                                                <option value="2">Amoxicillin</option>
                                            </select>
                                        </th>
                                        <th><input type="text" disabled class="form-control p_strength"></th>
                                        <th>
                                            <select class="form-control" name="uom_id" id="uom_id">
                                                <option value="">Select Uom</option>
                                                <option value="1">Tablet</option>
                                                <option value="2">Bottle</option>
                                            </select>
                                        </th>
                                        <th><input type="text" disabled class="form-control p_price"></th>
                                        <th><input type="number" class="form-control p_qty"></th>
                                        <th><input type="text" class="form-control p_discount"></th>
                                        <th class="total"></th>
                                        <th>
                                            <button class="btn btn-sm btn-success add_cart_btn">
                                                <i class="fa fa-plus"></i>
                                            </button>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="dataAppend"> </tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="5"></td>
                                        <td colspan="2">SUBTOTAL</td>
                                        <td class="subtotal">$562.00</td>
                                    </tr>
                                    <tr>
                                        <td colspan="5"></td>
                                        <td colspan="2">TOTAL DISCOUNT (5%)</td>
                                        <td class="Discount">$28.10</td>
                                    </tr>
                                    <tr>
                                        <td colspan="5"></td>
                                        <td colspan="2">TAX (5%)</td>
                                        <td class="vat">$28.10</td>
                                    </tr>
                                    <tr>
                                        <td colspan="5"></td>
                                        <td colspan="2">GRAND TOTAL</td>
                                        <td class="grandtotal">$590.10</td>
                                    </tr>
                                </tfoot>
                            </table>
                            <div class="row col-12 mt-">
                                <div class="col-4 p-2 mt-5">
                                    <label for="status_id" class="form-label status fw-bold">Payment Status</label>
                                    <select name="status_id" class="status_button form-control">
                                        <option value="1">Paid</option>
                                        <option value="2">Unpaid</option>
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
                    <a class="btn btn-primary btn_process" href="purchase">Process</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script  setup>

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













