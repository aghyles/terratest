'use client';
import { Typography } from '@mui/material';
import PageContainer from 'src/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from 'src/app/(DashboardLayout)/components/shared/DashboardCard';


const SamplePage = () => {
  return (
    <PageContainer title="En construction" description="Cette page est en cours de construction">
    <DashboardCard title="En construction">
      <Typography>Cette page est actuellement en construction. Nous construisons une autoroute vers l'espace pour les fourmis. Revenez bientôt !</Typography>
    </DashboardCard>
  </PageContainer>
  );
};

export default SamplePage;

