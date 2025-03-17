import { useEffect, useState } from "react";
import { Container, TextField, Button, Select, MenuItem, Typography, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { getInvoices, createInvoice, deleteInvoice } from "../services/InvoiceService";
import axios from "axios";

const Invoice = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/customers").then((res) => setCustomers(res.data));
    axios.get("http://localhost:8080/api/products").then((res) => setProducts(res.data));
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    const data = await getInvoices();
    setInvoices(data);
  };

  const handleCreateInvoice = async () => {
    await createInvoice(selectedCustomer, selectedProducts);
    loadInvoices();
  };

  const handleDeleteInvoice = async (id) => {
    await deleteInvoice(id);
    loadInvoices();
  };

  return (
    <Container>
      <Typography variant="h4">Invoices</Typography>

      <Select fullWidth value={selectedCustomer} onChange={(e) => setSelectedCustomer(e.target.value)}>
        {customers.map((c) => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
      </Select>

      <Select multiple fullWidth value={selectedProducts} onChange={(e) => setSelectedProducts(e.target.value)}>
        {products.map((p) => <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)}
      </Select>

      <Button variant="contained" color="primary" onClick={handleCreateInvoice}>Create Invoice</Button>

      <Table>
        <TableHead>
          <TableRow><TableCell>ID</TableCell><TableCell>Customer</TableCell><TableCell>Total</TableCell><TableCell>Actions</TableCell></TableRow>
        </TableHead>
        <TableBody>
          {invoices.map((inv) => (
            <TableRow key={inv.id}>
              <TableCell>{inv.id}</TableCell>
              <TableCell>{inv.customer.name}</TableCell>
              <TableCell>{inv.totalAmount}</TableCell>
              <TableCell>
                <Button color="secondary" onClick={() => handleDeleteInvoice(inv.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default Invoice;
