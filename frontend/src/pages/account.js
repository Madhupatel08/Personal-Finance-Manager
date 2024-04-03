import React from 'react';
import { applyPagination } from 'src/utils/apply-pagination';
import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccTable } from 'src/sections/account/accountsTable.js';
import { addDays } from 'date-fns';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { useRouter } from 'next/navigation';
import { connect } from "react-redux";
import {getAccData} from "../selectors/accSelectors";

const now = new Date();

// const data = [
//   {
//     "name": "SBI",
//     "current_balance": 1000000
//   },
//   {
//     "name": "HDFC",
//     "current_balance": 100000
//   },
//   {
//     "name": "PayTM",
//     "current_balance": 10000
//   },
//   {
//     "name": "GPay",
//     "current_balance": 10000
//   }
// ];

const useAccounts = (data, page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useAccountsName = (accounts) => {
  return useMemo(
    () => {
      return accounts.map((accounts) => accounts.name);
    },
    [accounts]
  );
};

const Page = ({data}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const accounts = useAccounts(data, page, rowsPerPage);
  const accountsIds = useAccountsName(accounts);
  const accountsSelection = useSelection(accountsIds);

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

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);

  const router=useRouter();
  const handleAddNewAccounts = useCallback(() => {
    router.push('/new_account');
  }, [router]);
  
  return (
    <Router>
      <>
        <Head>
          <title>
            Accounts 
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
                    Accounts
                  </Typography>
                  <Stack
                    alignItems="center"
                    direction="row"
                    spacing={1}
                  >
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
                        onClick={handleAddNewAccounts}
                        startIcon={(
                          <SvgIcon fontSize="small">
                            <PlusIcon />
                          </SvgIcon>
                        )}
                        variant="contained"
                      >
                        New Account
                      </Button>
                  </div>
              </Stack>
              
              <AccTable
                count={data.length}
                items={accounts}
                onDeselectAll={accountsSelection.handleDeselectAll}
                onDeselectOne={accountsSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={accountsSelection.handleSelectAll}
                onSelectOne={accountsSelection.handleSelectOne}
                page={page}
                rowsPerPage={rowsPerPage}
                selected={accountsSelection.selected}
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
    data:getAccData(state)
  }
}

export default connect(
  mapStateToProps
)(Page);
  

