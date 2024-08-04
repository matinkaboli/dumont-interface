import './styles.css';

import { Icon } from '@/components';
import links from '@/constants/externalLinks';

const PlayButton = ({ className = '' }: { className?: string }) => {
  return (
    <div className={className}>
      <div className='btn-glow' />
      <a href={links.DUMONT_APP} target="_blank" className='btn-gradiant'>
        Start Playing
        <Icon name='angle-right' color='white' />
      </a>
    </div>
  );
};

export default PlayButton;
