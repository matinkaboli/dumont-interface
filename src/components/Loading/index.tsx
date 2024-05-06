import Image from 'next/image';

const primaryColor = '#FAFF00';
const secondaryColor = '#FF5BCF';
const tertiaryColor = '#5100FE';
const quaternaryColor = '#52008C';

const duration = '5s';

const Loading = () => {
  return (
    <div className='w-20 h-20 relative flex justify-center items-center'>
      <Image
        width={0}
        height={0}
        sizes='100vw'
        src='/images/logo.svg'
        alt='dumont'
        className='relative z-10 w-14 h-auto'
      />
      <svg width='80' height='80' className='absolute inset-0 rounded-2xl'>
        <defs>
          <linearGradient id='myGradient' x1='100%' y1='100%' x2='0%' y2='0%'>
            <stop offset='0%' stop-color={primaryColor}>
              <animate
                attributeName='stop-color'
                values={`${primaryColor}; ${secondaryColor}; ${tertiaryColor}; ${quaternaryColor}; ${primaryColor}`}
                dur={duration}
                repeatCount='indefinite' />
            </stop>
            <stop offset='25%' stop-color={secondaryColor}>
              <animate
                attributeName='stop-color'
                values={`${secondaryColor}; ${tertiaryColor}; ${quaternaryColor}; ${primaryColor}; ${secondaryColor}`}
                dur={duration}
                repeatCount='indefinite'
              />
            </stop>
            <stop offset='50%' stop-color={tertiaryColor}>
              <animate
                attributeName='stop-color'
                values={`${tertiaryColor}; ${quaternaryColor}; ${primaryColor}; ${secondaryColor}; ${tertiaryColor}`}
                dur={duration}
                repeatCount='indefinite'
              />
            </stop>
            <stop offset='75%' stop-color={quaternaryColor}>
              <animate
                attributeName='stop-color'
                values={`${quaternaryColor}; ${primaryColor}; ${secondaryColor}; ${tertiaryColor}; ${quaternaryColor}`}
                dur='5s'
                repeatCount='indefinite'
              />
            </stop>
            <stop offset='100%' stop-color={primaryColor}>
              <animate
                attributeName='stop-color'
                values={`${primaryColor}; ${secondaryColor}; ${tertiaryColor}; ${quaternaryColor}; ${primaryColor}`}
                dur={duration}
                repeatCount='indefinite'
              />
            </stop>
          </linearGradient>
        </defs>
        <rect width='80' height='80' fill='url(#myGradient)' />
      </svg>
    </div>
  );
};

export default Loading;
