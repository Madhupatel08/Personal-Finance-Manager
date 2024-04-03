import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { NewBudgetDetails } from 'src/sections/budgets/new_budget_details';
import  NewTransactionForm  from 'src/sections/transactions/new-transaction-form';

const NewTransaction = () => (
  <>
    <Head>
      <title>
        Create a New Expense 
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">
              Create a New Transaction
            </Typography>
          </div>
          <div>
            <Grid
              
            >
              
              <Grid
                
              >
                <NewTransactionForm pageToShow="a" />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </>
);

NewTransaction.getLayout = (new_transaction) => (
  <DashboardLayout>
    {new_transaction}
  </DashboardLayout>
);

export default NewTransaction;
