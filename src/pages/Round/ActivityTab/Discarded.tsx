import Image from 'next/image';

const Discarded = () => {
  return (
    <div className="md:bg-neutral-750 bg-transparent rounded-lg md:p-6 p-0">
      <h3 className="text-sm text-neutral-300">
        Here you can view the cards that have been <b>discarded</b> from the game, arranged in
        <span className="text-white"> numerical order.</span>
      </h3>

      <div className="flex flex-wrap md:gap-4 gap-3 mt-6">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <Image
            key={item}
            src="/images/card-show.png"
            width={99}
            height={138}
            className="md:w-[99px] sm:w-[105px] w-[30%] h-auto rounded-lg"
            alt=""
          />
        ))}
      </div>
    </div>
  );
};

export default Discarded;
