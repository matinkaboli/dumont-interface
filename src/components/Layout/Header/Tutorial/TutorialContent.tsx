import Link from 'next/link';
import ReactPlayer from 'react-player';

import { DialogTitle } from '@/components';
import links from '@/constants/links';

const TutorialContent = () => {
  return (
    <div className="flex flex-col gap-8 overflow-y-auto max-h-[80vh]">
      <DialogTitle>Gameplay Tutorial</DialogTitle>
      <div className="w-full min-h-[300px] overflow-hidden rounded-xl">
        <ReactPlayer
          width="100%"
          height="300px"
          url={links.TUTORIAL_VIDEO}
        />
      </div>
      <div className="flex flex-col gap-6 text-base">
        <p className="text-neutral-100">
          To start every game, a standard deck of 52 cards, including cards 0 to 10 and Jack, Queen,
          and King, across the four suits of spades, diamonds, hearts, and clubs, is placed on the
          table faced down.
        </p>
        <p className="text-neutral-100">
          After that, the player starts guessing the cards one by one. If they correctly guess the
          value of a card (the suit does not matter), they win the game.
        </p>
        <p className="text-neutral-100">
          For example, the player might guess the card’s value is either 6 or Jack. So, if the face
          value of the card is one of the following, they win:
        </p>
        <ul className="list-disc text-base text-neutral-100 pl-4">
          <li>6 of Clubs, Spads, Diamonds, Hearts</li>
          <li>Jack of Clubs, Spads, Diamonds, Hearts</li>
        </ul>
        <p className="text-neutral-100">
          For more details about the gameplay and further explanation,{' '}
          <Link href="/" className="text-primary-300">
            read here {`->`}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default TutorialContent;
