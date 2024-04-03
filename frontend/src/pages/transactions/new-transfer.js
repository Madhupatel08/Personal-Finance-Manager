import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import NewTransactionForm  from 'src/sections/transactions/new-transaction-form';

const NewTransfer = () => (
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
              Create a New Transfer
            </Typography>
          </div>
          <div>
            <Grid
              
            >
              
              <Grid
                
              >
                <NewTransactionForm />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </>
);

NewTransfer.getLayout = (new_budget) => (
  <DashboardLayout>
    {new_budget}
  </DashboardLayout>
);

export default NewTransfer;
