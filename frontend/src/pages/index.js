import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewBudget } from 'src/sections/overview/overview-net-in-out';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { OverviewLatestProducts } from 'src/sections/overview/overview-latest-products';
import { OverviewSales } from 'src/sections/overview/overview-worth-time';
import { OverviewBillsToPay } from 'src/sections/overview/overview-bills-to-pay';
import { OverviewLeftToSpent } from 'src/sections/overview/overview-left-to-spend';
import { OverviewNetWorth } from 'src/sections/overview/overview-net-worth';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';
import { OverviewBar } from 'src/sections/overview/overview-bar';
const now = new Date();

const fetchData = () => {
  const dashboardData = {
    "in": "5000",
    "out": "1800",
    "difference": "3200",
    "billsPaid": "900",
    "billToPay": 9000,
    "leftToSpent": "779",
    "netWorth": "14000"
  }
  
  const categoryData = {
    "categories": ["Food", "Travel", "Shopping", "Entertainment"],
    "values": ["400", "3000", "2000", "2780"]
  }

  
  
  const dashboardChart = {
    data:[
      {
        "name": "SBI",
        "data": [1000, 2000, 3000, 4000, 5000, 6000, 7000]
      },
      {
        "name": "HDFC",
        "data": [500, 1240, 2300, 3040, 5500, 6500, 1200]
      },
      {
        "name": "ICICI",
        "data": [5300, 1424, 5230, 3404, 5540, 6530, 1230]
      },
      {
        "name": "Total",
        "data": [1500, 3240, 5300, 7040, 10500, 12500, 8200]
      }
    ]
  }

  const transactions = {
    "transactions": [
    {
      "name": "SBI",
      "initial": "10000",
      "transactions": [
        {
          "id":"1",
          "to": "Abhyudit",
          "value":"100",
          "type":"0"
        },
        {
          "id":"2",
          "to": "Varshneya",
          "value":"200",
          "type":"1"

        }
      ]
    },
    {
      "name": "HDFC",
      "initial": "15000",
      "transactions": [
        {
          "id": "1",
          "to": "Abhyudit",
          "value":"100",
          "type":"1"
        },
        {
          "id": "2",
          "to": "Varshneya",
          "value":"200",
          "type":"1"
        }
    ]
  }
  ]
}
  const products = [
    {
      id: '5ece2c077e39da27658aa8a9',
      image: '/assets/products/product-1.png',
      name: 'Healthcare Erbology',
      updatedAt: subHours(now, 6).getTime()
    },
    {
      id: '5ece2c0d16f70bff2cf86cd8',
      image: '/assets/products/product-2.png',
      name: 'Makeup Lancome Rouge',
      updatedAt: subDays(subHours(now, 8), 2).getTime()
    },
    {
      id: 'b393ce1b09c1254c3a92c827',
      image: '/assets/products/product-5.png',
      name: 'Skincare Soja CO',
      updatedAt: subDays(subHours(now, 1), 1).getTime()
    },
    {
      id: 'a6ede15670da63f49f752c89',
      image: '/assets/products/product-6.png',
      name: 'Makeup Lipstick',
      updatedAt: subDays(subHours(now, 3), 3).getTime()
    },
    {
      id: 'bcad5524fe3a2f8f8620ceda',
      image: '/assets/products/product-7.png',
      name: 'Healthcare Ritual',
      updatedAt: subDays(subHours(now, 5), 6).getTime()
    }
  ]

  return{
    dashboardData,
    categoryData,
    dashboardChart,
    products,
    transactions
  }
}





const Page = () => {

  const {dashboardData, categoryData, dashboardChart,products,transactions} = fetchData();
  
  // console.log(dashboardData);
  return (
  <>
    <Head>
      <title>
        Overview | Expense Traker | ₹Expy
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
          item  xs={12}
        >
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewBudget
              difference={[dashboardData.in,dashboardData.out]}
              positive
              sx={{ height: '100%' }}
              value={dashboardData.difference}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewLeftToSpent
              difference={16}
              positive={false}
              sx={{ height: '100%' }}
              value={dashboardData.leftToSpent}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewBillsToPay
              sx={{ height: '100%' }}
              value={dashboardData.billToPay}
            />
          </Grid>
          <Grid
            
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewNetWorth
              sx={{ height: '100%' }}
              value= {dashboardData.netWorth}
            />
          </Grid>
          </Grid>
          <Grid>
          
          <Grid>
          <Grid>
          <Grid
            xs={12}
            lg={8}
          >
            <OverviewSales
              chartSeries={dashboardChart.data}
              sx={{ height: '100%' }}
              title="Net Worth"
            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <OverviewBar
              chartData={ categoryData}
              // sx={{ height: '100%' }}
              title="Category wise"
            />
          </Grid>
          </Grid>
          { transactions.transactions.map((transaction) => (
            <Grid key={transaction.id}
            xs={12}
            md={6}
            lg={4}
            >
              <OverviewLatestProducts
              title={transaction.name}
              products= {transaction.transactions}
              sx={{ height: '100%' }}
            />
            </Grid>
          ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);
}
Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);


export default Page;
