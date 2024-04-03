import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

import BillDetails  from 'src/sections/bills/bill-details';

const Page = () => (
  <>
    <Head>
      <title>
        Create New Bill
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
             Create New Bill
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
                <BillDetails />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
