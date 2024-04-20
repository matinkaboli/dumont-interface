import GradiantBadge from './_components/GradiantBadge';
import ProveCard from './_components/ProveCard';

const BlockchainSection = () => {
  return (
    <div className='pt-20 md:pb-40 pb-24'>
      <div className='flex flex-col gap-4 text-center'>
        <GradiantBadge icon='globe' label='Powered by blockchain' className='mx-auto' />
        <h2 className='title'>Proven by Cryptography</h2>
        <p className='description-text'>
          We utilize blockchain technology to offer what next-generation gamblers deserve.
        </p>
      </div>

      <div className='grid md:grid-cols-2 grid-cols-1 gap-6 md:pt-24 pt-14'>
        <ProveCard
          imgSrc='/images/fair.png'
          title='Fair at the core'
          desc='The game logic is encoded and operated by a non-upgradable smart contract, which prevents manipulation within the game.'
        />
        <ProveCard
          imgSrc='/images/transparent.png'
          title='Transparent by default'
          desc='All game operations and players activities are recorded on the blockchain, ensuring public verifiability by anyone.'
        />
      </div>
    </div>
  );
};

export default BlockchainSection;
