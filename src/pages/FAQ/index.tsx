import { Accordion, Container, Layout, Typography } from '@/components';

import CTASection from '@/pages/_components/CTASection';

const FAQ = () => {
  return (
    <Layout>
      <Container className="pt-28">
        <Typography tag="h1" variant="title1" className="text-center">
          Frequently asked questions
        </Typography>
        <Typography tag="p" variant="body1" className="text-center mt-4">
          Have any question? We’re here to help
        </Typography>

        <Accordion />

        <CTASection />
      </Container>
    </Layout>
  );
};

export default FAQ;
