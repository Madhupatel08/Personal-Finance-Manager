import Head from 'next/head';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';
import { TransactionTable } from 'src/sections/transactions/transaction-table';
import { useCallback, useMemo, useState } from 'react';
import { subDays, subHours } from 'date-fns';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography,Unstable_Grid2 as Grid } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { applyPagination } from 'src/utils/apply-pagination';
import { useRouter } from 'next/router';
import { getTransactionData } from 'src/selectors/transactionSelectors';
import { connect } from 'react-redux';
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
        "title": "Expenses",
        "categories": ["Food", "Travl", "Shopping", "Entertainment"],
        "values": [40, 30, 20, 10]
      },
      {
        "title": "Budget",
        "categories": ["Groceries", "Leisure", "No-Cat"],
        "values": [40, 12, 48]
      },
      {
        "title": "Destination Accounts",
        "categories": ["CASH", "Shopping"],
        "values": [40, 60]
      }
    ]
  }
  // Description	Amount	Date	Source account	Destination account	Category
  const transactionData = {
    "transactions": [
      {
        "id": "1",
        "description": "Apple",
        "amount": "400",
        "date": "2021-10-01",
        "source": "SBI",
        "destination": "CASH",
        "category": "Groceries"
      },
      {
        "id": "2",
        "description": "Milk",
        "amount": "100",
        "date": "2021-10-01",
        "source": "SBI",
        "destination": "CASH",
        "category": "Groceries"
      },
      {
        "id": "3",
        "description": "Bread",
        "amount": "50",
        "date": "2021-09-25",
        "source": "HDFC",
        "destination": "CASH",
        "category": "Groceries"
      },
      {
        "id": "4",
        "description": "Gasoline",
        "amount": "40",
        "date": "2021-09-30",
        "source": "Citibank",
        "destination": "CASH",
        "category": "Transportation"
      },
      {
        "id": "5",
        "description": "Coffee",
        "amount": "20",
        "date": "2021-10-03",
        "source": "SBI",
        "destination": "CASH",
        "category": "Food & Drinks"
      },
      {
        "id": "6",
        "description": "Movie Tickets",
        "amount": "120",
        "date": "2021-09-28",
        "source": "HDFC",
        "destination": "CASH",
        "category": "Entertainment"
      }
      

    ]
  }
  return(
    {categories,
    transactionData}
  )
}
const Page = ({data}) => {
  const {categories,transactionData} = fetchData();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(data,page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);
  const router = useRouter();
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

  
  // console.log(categories);


return(
  <>
    <Head>
      <title>
        Transactions | Expy
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
              </Stack>
            </Stack>
            <div>
              <Button
                
                onClick={() => router.push('/transactions/new-transaction')}
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
            item  xs={12}
          >

          { categories.expenses.map((category) => (
             
            <Grid
            xs={12}
            sm={6}
            lg={4}
            >  
              < OverviewTraffic
              title={category.title}
              chartSeries={category.values}
              labels={category.categories}
              sx={{ height: '100%' }}

              />
            </Grid>
            ))}
          </Grid>
          <TransactionTable
          // modify this before production
              count={data.length}
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

const mapStateToProps = (state) => {
  return {
    data:getTransactionData(state)
  }
}

export default connect(mapStateToProps)(Page);

