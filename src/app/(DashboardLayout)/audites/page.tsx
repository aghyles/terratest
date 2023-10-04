'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/app/(DashboardLayout)/components/container/PageContainer';
import Typography from '@mui/material/Typography'

// components

import DashboardCard from 'src/app/(DashboardLayout)/components/shared/DashboardCard';
import TableFilter from 'src/app/(DashboardLayout)/audites/TableFilter';

const SamplePage = () => {
  return (
    <PageContainer title="audites" description="this is audites">
      <DashboardCard title="audites">
      <Box>




      <Grid item xs={12}>
        <TableFilter />
      </Grid>




      </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;

