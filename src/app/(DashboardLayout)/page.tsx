'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from 'src/app/(DashboardLayout)/components/shared/DashboardCard';
import ProductPerformance from 'src/app/(DashboardLayout)/components/dashboard/ProductPerformance';

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
     <DashboardCard title="Tableau de bord">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid>
        </Grid>
      </Box>
      </DashboardCard>
    </PageContainer>
  )
}

export default Dashboard;
