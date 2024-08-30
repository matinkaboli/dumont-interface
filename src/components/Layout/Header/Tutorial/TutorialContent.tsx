import Link from 'next/link';
import ReactPlayer from 'react-player';

import { DialogDescription, DialogTitle } from '@/components';

const TutorialContent = () => {
  return (
    <div className="flex flex-col gap-8">
      <DialogTitle>Gameplay Tutorial</DialogTitle>
      <div className="w-full min-h-[136px] overflow-hidden rounded-xl">
        <ReactPlayer
          width="100%"
          height="190px"
          url="https://www.youtube.com/watch?v=FBwtPHXeAHw"
        />
      </div>
      <div className="flex flex-col gap-6">
        <DialogDescription>
          To start every game, a standard deck of 52 cards, including cards 0 to 10 and Jack, Queen,
          and King, across the four suits of spades, diamonds, hearts, and clubs, is placed on the
          table faced down.
        </DialogDescription>
        <DialogDescription>
          After that, the player starts guessing the cards one by one. If they correctly guess the
          value of a card (the suit does not matter), they win the game.
        </DialogDescription>
        <DialogDescription>
          For example, the player might guess the card’s value is either 6 or Jack. So, if the face
          value of the card is one of the following, they win:
        </DialogDescription>
        <ul className="list-disc text-base text-neutral-300 pl-4">
          <li>6 of Clubs, Spads, Diamonds, Hearts</li>
          <li>Jack of Clubs, Spads, Diamonds, Hearts</li>
        </ul>
        <DialogDescription>
          For more details about the gameplay and further explanation,{' '}
          <Link href="/" className="text-primary-250">
            read here {`->`}
          </Link>
        </DialogDescription>
      </div>
    </div>
  );
};

export default TutorialContent;
