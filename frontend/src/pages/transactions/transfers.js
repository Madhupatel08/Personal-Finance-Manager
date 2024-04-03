import Head from 'next/head';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';
import { TransactionTable } from 'src/sections/transactions/transaction-table';
import { useCallback, useMemo, useState } from 'react';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography,Unstable_Grid2 as Grid } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { applyPagination } from 'src/utils/apply-pagination';


const now = new Date();



const useCustomers = (data,page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useCustomerIds = (customers) => {
  return useMemo(
    () => {
      return customers.map((customer) => customer.id);
    },
    [customers]
  );
};

const fetchData = () => {
  const categories = {
    "expenses" :[
      {
        "title": "Categories",
        "categories": ["Party"],
        "values": [100]
      },
      {
        "title": "Source Account",
        "categories": ["Cash", "Abhyudit"],
        "values": [70,30]
      },
      {
        "title": "Destination Accounts",
        "categories": ["SBI", "HDFC"],
        "values": [40, 60]
      }
    ]
  }
  // Description	Amount	Date	Source account	Destination account	Category
  const transactionData = {
    "transactions": [
        {
            "id": "1",
            "description": "Shruti",
            "amount": "5000",
            "date": "2021-10-01",
            "source": "Cash",
            "destination": "SBI",
            "category": "Party Funds"
          }
      

    ]
  }
  return(
    {categories,
    transactionData}
  )
}
const Page = () => {
  const {categories,transactionData} = fetchData();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(transactionData.transactions,page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  
  console.log(categories);


return(
  <>
    <Head>
      <title>
        Revenue | Expy
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
        <Stack spacing={3}>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={4}
          >
            <Stack spacing={1}>
              <Typography variant="h4">
                Transactions
              </Typography>
              <Stack
                alignItems="center"
                direction="row"
                spacing={1}
              >
                {/* <Button
                  color="inherit"
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <ArrowUpOnSquareIcon />
                    </SvgIcon>
                  )}
                >
                  Import
                </Button>
                <Button
                  color="inherit"
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <ArrowDownOnSquareIcon />
                    </SvgIcon>
                  )}
                >
                  Export
                </Button> */}
              </Stack>
            </Stack>
            <div>
              <Button
              href='/transactions/new-transfer'
                startIcon={(
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                )}
                variant="contained"
              >
                Add
              </Button>
            </div>
          </Stack>
          <Grid
            container
            spacing={3}
            item xs={12} 
          >

            { categories.expenses.map((category) => (
              
              <Grid
              xs={12}
              sm={6}
              lg={4}
              >    
              <OverviewTraffic
              title={category.title}
              chartSeries={category.values}
              labels={category.categories}
              sx={{ height: '100%' }}

              />
              </Grid>
            ))}
            {/* <OverviewTraffic
              chartSeries={[63, 15, 22]}
              labels={['Desktop', 'Tablet', 'Phone']}
              sx={{ height: '100%' }}
            /> */}
            {/* {companies.map((company) => (
              <Grid
                xs={12}
                md={6}
                lg={4}
                key={company.id}
              >
                <CompanyCard company={company} />
              </Grid>
            ))} */}
          </Grid>
          <TransactionTable
              count={transactionData.transactions.length}
              items={customers}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
            />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            {/* <Pagination
              count={3}
              size="small"
            /> */}
          </Box>
        </Stack>
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
