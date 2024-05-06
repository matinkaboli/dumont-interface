import { Container, Layout } from '@/components';

import CTASection from '@/views/_components/CTASection';
import LoadingScreen from '@/views/_components/LoadingScreen';

import HeaderSection from './HeaderSection';
import BlockchainSection from './BlockchainSection';
import PreviewSection from './PreviewSection';
import FeaturesSection from './FeaturesSection';
import MontSection from './MontSection';
import TokenSupplySection from './TokenSupplySection';
import RewardsSection from './RewardsSection';
import BulletPontSection from './BulletPontSection';

const Home = () => {
  return (
    <Layout>
      <LoadingScreen />

      <Container>
        <HeaderSection />
        <BlockchainSection />
      </Container>

      <PreviewSection />

      <Container>
        <FeaturesSection />
      </Container>

      <MontSection />

      <Container>
        <TokenSupplySection />
        <RewardsSection />
        <BulletPontSection />
        <CTASection />
      </Container>
    </Layout>
  );
};

export default Home;
