import Image from 'next/image';
import { IconName } from '@/components/Icon/iconConfig';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Icon } from '@/components';

const features = [
  {
    icon: 'shield-check' as IconName,
    iconSize: { width: '16', height: '20' },
    title: 'Trustless payouts',
    description: 'Withdraw anytime. No admin. No delays.',
  },
  {
    icon: 'users' as IconName,
    iconSize: { width: '23', height: '16' },
    title: 'Open for everyone',
    description: 'Connect your wallet. No KYC. No barriers.',
  },
  {
    icon: 'ball' as IconName,
    iconSize: { width: '20', height: '20' },
    title: 'Adrenaline rush',
    description: 'Up to 50x on football. More high-octane games coming.',
  },
];

const faqs = [
  {
    title: 'People most asked question',
    desc: 'We accept major credit cards, including Visa, Mastercard, and American Express. Additionally, we also offer payment through PayPal for added convenience and security.',
  },
  {
    title: 'People most asked question',
    desc: 'We accept major credit cards, including Visa, Mastercard, and American Express. Additionally, we also offer payment through PayPal for added convenience and security.',
  },
  {
    title: 'People most asked question',
    desc: 'We accept major credit cards, including Visa, Mastercard, and American Express. Additionally, we also offer payment through PayPal for added convenience and security.',
  },
  {
    title: 'People most asked question',
    desc: 'We accept major credit cards, including Visa, Mastercard, and American Express. Additionally, we also offer payment through PayPal for added convenience and security.',
  },
];

const FAQ = () => {
  return (
    <>
      <h1 className='font-bold text-3xl text-white'>About Dumont</h1>
      <p className='text-md text-neutral-300 mt-2'>Find out what Dumont is and how it works</p>

      <div className='mt-10'>
        <p className='text-base text-white'>
          Dumont is a provably fair casino that delivers a fun and fair gaming experience powered by blockchain
        </p>
        <ul className='grid grid-cols-3 mt-6 gap-4'>
          {features.map((feature, index) => (
            <li key={index}>
              <h6 className='font-semibold text-neutral-100 text-base flex items-center gap-1'>
                <Icon
                  name={feature.icon}
                  width={feature.iconSize.width}
                  height={feature.iconSize.height}
                  color='#CD3FCD'
                />
                {feature.title}
              </h6>
              <p className='text-neutral-300 text-sm mt-2 xl:pr-16 lg:pr-6 pr-0'>{feature.description}</p>
            </li>
          ))}
        </ul>
        <Image width={0} height={0} className='w-full h-auto mt-8' sizes='100vw' src='/images/faq.png' alt='' />
      </div>

      <Accordion type='single' className='mt-6' collapsible>
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.title}</AccordionTrigger>
            <AccordionContent>{faq.desc}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default FAQ;
