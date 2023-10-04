'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/app/(DashboardLayout)/components/container/PageContainer';
import Typography from '@mui/material/Typography'

// components
import SalesOverview from 'src/app/(DashboardLayout)/components/dashboard/SalesOverview';
import YearlyBreakup from 'src/app/(DashboardLayout)/components/dashboard/YearlyBreakup';
import RecentTransactions from 'src/app/(DashboardLayout)/components/dashboard/RecentTransactions';
import ProductPerformance from 'src/app/(DashboardLayout)/components/dashboard/ProductPerformance';
import Blog from 'src/app/(DashboardLayout)/components/dashboard/Blog';
import MonthlyEarnings from 'src/app/(DashboardLayout)/components/dashboard/MonthlyEarnings';

import DashboardCard from 'src/app/(DashboardLayout)/components/shared/DashboardCard';
import FormLayoutsCollapsible from 'src/views/forms/form-layouts/FormLayoutsCollapsible'
import FormLayoutsTabs from 'src/views/forms/form-layouts/FormLayoutsTabs'

const SamplePage = () => {
  return (
    <PageContainer title="Bord 1" description="this is Bord 1">
      <DashboardCard title="Bord 1">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid>
          <Grid item xs={12}>
            <Blog />
          </Grid>
        </Grid>



        <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(8)} !important` }}>
          <Typography variant='h6'>Form with Tabs</Typography>
        </Grid>
        <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(4)} !important` }}>
          <FormLayoutsTabs />
        </Grid>
        <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(8)} !important` }}>
          <Typography variant='h6'>Collapsible Sections</Typography>
        </Grid>
        <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(4)} !important` }}>
          <FormLayoutsCollapsible />
        </Grid>





      </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;

