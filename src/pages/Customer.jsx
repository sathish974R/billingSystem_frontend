import { useEffect, useState } from "react";
import CustomerService from "../services/CustomerService";
import { Container, Table, TableHead, TableBody, TableRow, TableCell, Button, TextField, Paper, Typography } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await CustomerService.getAllCustomers();
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleChange = (e) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await CustomerService.createCustomer(newCustomer);
      fetchCustomers();
      setNewCustomer({ name: "", email: "", phone: "", address: "" });
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await CustomerService.deleteCustomer(id);
      fetchCustomers();
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <Container className="mt-4">
      <Typography variant="h4" align="center" gutterBottom>
        Customers
      </Typography>

      {/* Add Customer Form */}
      <Paper elevation={3} className="p-4 mb-4" style={{ padding: "20px", backgroundColor: "#f5f5f5" }}>
        <form onSubmit={handleSubmit} className="d-flex flex-wrap gap-2">
          <TextField label="Name" name="name" value={newCustomer.name} onChange={handleChange} required fullWidth variant="outlined" margin="dense" />
          <TextField label="Email" type="email" name="email" value={newCustomer.email} onChange={handleChange} required fullWidth variant="outlined" margin="dense" />
          <TextField label="Phone" name="phone" value={newCustomer.phone} onChange={handleChange} fullWidth variant="outlined" margin="dense" />
          <TextField label="Address" name="address" value={newCustomer.address} onChange={handleChange} fullWidth variant="outlined" margin="dense" />
          <Button variant="contained" color="primary" type="submit" style={{ marginTop: "10px" }}>
            Add Customer
          </Button>
        </form>
      </Paper>

      {/* Customer List */}
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Table>
          <TableHead style={{ backgroundColor: "#1976d2", color: "white" }}>
            <TableRow>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Phone</TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Address</TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id} hover>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.address}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={() => handleDelete(customer.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default Customer;
