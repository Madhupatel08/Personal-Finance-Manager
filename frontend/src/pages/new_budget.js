import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import  NewBudgetDetails  from 'src/sections/budgets/new_budget_details';

const New_Budget = () => (
  <>
    <Head>
      <title>
        Create a New Budget
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
              Create a New Budget
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
                <NewBudgetDetails />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </>
);

New_Budget.getLayout = (new_budget) => (
  <DashboardLayout>
    {new_budget}
  </DashboardLayout>
);

export default New_Budget;
