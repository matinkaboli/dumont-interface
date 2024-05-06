import { Accordion, Container, Layout, Typography } from '@/components';

import CTASection from '@/views/_components/CTASection';

const data = [
  {
    id: '1',
    title: 'People most asked question',
    body: 'We accept major credit cards, including Visa, Mastercard, and American Express. Additionally, we also offer payment through PayPal for added convenience and security.',
  },
  {
    id: '2',
    title: 'People most asked question',
    body: 'We accept major credit cards, including Visa, Mastercard, and American Express. Additionally, we also offer payment through PayPal for added convenience and security.',
  },
  {
    id: '3',
    title: 'People most asked question',
    body: 'We accept major credit cards, including Visa, Mastercard, and American Express. Additionally, we also offer payment through PayPal for added convenience and security.',
  },
  {
    id: '4',
    title: 'People most asked question',
    body: 'We accept major credit cards, including Visa, Mastercard, and American Express. Additionally, we also offer payment through PayPal for added convenience and security.',
  },
];

const FAQ = () => {
  return (
    <Layout>
      <Container className='md:pt-28 pt-16'>
        <Typography tag='h1' variant='title1' className='text-center'>
          Frequently asked questions
        </Typography>
        <Typography tag='p' variant='body1' className='text-center mt-4'>
          Have any question? We’re here to help
        </Typography>

        <Accordion className='md:mt-20 mt-14' sections={data} />

        <CTASection className="md:mt-28 my-0" />
      </Container>
    </Layout>
  );
};

export default FAQ;
