import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import NewAccountDetails from 'src/sections/account/new_acc_details.js';

const New_Account = () => (
  <>
    <Head>
      <title>
        Create a New Account
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
              Create a New Account
            </Typography>
          </div>
          <div>
            <Grid
              container
              spacing={3}
            >
              
              <Grid
                xs={12}
                md={6}
                lg={8}
              >
                <NewAccountDetails />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </>
);

New_Account.getLayout = (new_budget) => (
  <DashboardLayout>
    {new_budget}
  </DashboardLayout>
);

export default New_Account;

