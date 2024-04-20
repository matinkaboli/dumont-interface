import Image from 'next/image';

const features = [
  { id: '0', text: 'There is no need to trust in operators, just fairness of neutral code.' },
  { id: '1', text: ' Check the system liquidity anytime to ensure bets are settleable.' },
  { id: '2', text: ' Easily verify all system activities, like players bets, cashflows, etc.' },
];

const BulletPontSection = () => {
  return (
    <div className='grid md:grid-cols-3 grid-cols-1 xl:gap-7 gap-6 gap- md:py-28 py-12 mt-10'>
      {features.map((feature) => (
        <div key={feature.id} className='flex items-start gap-2'>
          <Image width='18' height='30' src='/images/gradiant-bullet-points.svg' alt='' />
          <div className='text-white md:text-md text-base'>
            {feature.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BulletPontSection;
