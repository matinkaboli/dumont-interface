import './styles.css';

import { Icon } from '@/components';

const PlayButton = ({ className = '' }: { className?: string }) => {
  return (
    <div className={className}>
      <div className='btn-glow' />
      <a href='/' className='btn-gradiant'>
        Start Playing
        <Icon name='angle-right' color='white' />
      </a>
    </div>
  );
};

export default PlayButton;
