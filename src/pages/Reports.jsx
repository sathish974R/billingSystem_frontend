import { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent } from "@mui/material";
import { getSalesReport } from "../services/reportService";

const Report = () => {
  const [report, setReport] = useState({ totalSales: 0, totalInvoices: 0 });

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    const data = await getSalesReport();
    setReport(data);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Sales Report</Typography>
      <Card>
        <CardContent>
          <Typography variant="h6">Total Sales: ${report.totalSales}</Typography>
          <Typography variant="h6">Total Invoices: {report.totalInvoices}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Report;
