'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/app/(DashboardLayout)/components/container/PageContainer';
import Typography from '@mui/material/Typography'

// components

import DashboardCard from 'src/app/(DashboardLayout)/components/shared/DashboardCard';
import FormLayoutsCollapsible from 'src/views/forms/form-layouts/FormLayoutsCollapsible'
import FormLayoutsTabs from 'src/views/forms/form-layouts/FormLayoutsTabs'

const SamplePage = () => {
  return (
    <PageContainer title="Nouvel audite" description="this is New audite">
      <DashboardCard title="Nouvel audite">
      <Box>




        <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(8)} !important` }}>
          <Typography variant='h6'>Formulaires</Typography>
        </Grid>
        <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(4)} !important` }}>
          <FormLayoutsTabs />
        </Grid>
        <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(8)} !important` }}>
          <Typography variant='h6'> Sections rétractables</Typography>
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

