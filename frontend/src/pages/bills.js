import React from 'react';
import { applyPagination } from 'src/utils/apply-pagination';
import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { BillTable } from 'src/sections/bills/bill-table.js';
import { addDays } from 'date-fns';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { useRouter } from 'next/navigation';
import { connect } from "react-redux";
import {getBillsData} from "../selectors/billSelectors"

 
const now = new Date();

// const data = [
//   {
//     id: '5e887ac47eed253091be10cb',
//     name: 'House Rent',
//     amount: '10000',
//     paidOn:'12/06/2023',
//     repeats:'Monthly',
//     nextExpected: '12/07/2023'
    
    
    
//   },
//   {
//     id: '5e887ac47eed253091be10wr',
//     name: 'Electricity',
//     amount: '50000',
//     paidOn:'14/06/2023',
//     repeats:'Monthly',
//     nextExpected: '14/07/2023'
    
//   },
//   {
//     id: '5e887ac47eed2530913410wr',
//     name: 'Maintenance',
//     amount: '20000',
//     paidOn:'20/06/2023',
//     repeats:'Monthly',
//     nextExpected: '20/07/2023'
//   },
//   {
//     id: '5e887ac47eed2530nn0wr',
//     name: 'Water',
//     amount: '500',
//     paidOn:'21/06/2023',
//     repeats:'Monthly',
//     nextExpected: '21/07/2023'
//     },
//     {
//         id: '5e887ac47eed25399n0wr',
//         name: 'Fees',
//         amount: '100000',
//         paidOn:'01/07/2023',
//         repeats:'Quaterly',
//         nextExpected: '01/10/2023'
//     },

//     {
//         id: '5e887ac47aaa25399n0wr',
//         name: 'Subscription',
//         amount: '1000',
//         paidOn:'01/07/2023',
//         repeats:'Quaterly',
//         nextExpected: '01/10/2023'
//     }
        
// ];

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

const Page = ({data}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(data,page, rowsPerPage);
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


  const router=useRouter();
  const handleCreateBill= useCallback(() => {
    router.push('/create');
  }, [router]);



  return (
    <Router>
    
    <>
      <Head>
        <title>
          Bills
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
                  Bills
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
                  </Button> */}
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <div>
              
                <Button
                   onClick={handleCreateBill}
                   startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  New Bill
                </Button>
                
              </div>


            </Stack>
            
            <BillTable
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
            
            
          </Stack>
        </Container>
      </Box>
    </>
    </Router>
  );
};



Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

const mapStateToProps = (state,props)=> {
  return {
    data:getBillsData(state)
  }
  }
  export default connect(
    mapStateToProps
  )(Page);
  