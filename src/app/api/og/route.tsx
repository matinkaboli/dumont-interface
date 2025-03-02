import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

import toFixedNumber from '@/helpers/toFixedNumber';
import parseUnits from '@/helpers/parseUnits';

export const runtime = 'edge';

const website = process.env.NEXT_PUBLIC_WEBSITE_URL;

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const gameId = searchParams.get('gameId') || 0;
  const cardId = searchParams.get('cardId');

  const cardIndex = cardId ? parseInt(cardId, 10) - 1 : 0;

  const apiEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/games/${gameId}/activities`;
  const gameData = await fetch(apiEndpoint)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch data for gameId: ${gameId}, cardId: ${cardIndex}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.error(err);
      return null;
    });

  const card = gameData?.result.find((x: any) => x.index === cardIndex);

  const interRegularFontP = fetch(
    new URL('../../../../public/fonts/Inter-Regular.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer());

  const interBoldFontP = fetch(
    new URL('../../../../public/fonts/Inter-Bold.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer());

  const interExtraBoldFontP = fetch(
    new URL('../../../../public/fonts/Inter-ExtraBold.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer());

  const interItalicFontP = fetch(
    new URL('../../../../public/fonts/Inter-MediumItalic.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer());

  const [interRegularFont, interBoldFont, interExtraBold, interItalicFont] = await Promise.all([
    interRegularFontP,
    interBoldFontP,
    interExtraBoldFontP,
    interItalicFontP,
  ]);

  if (!card?.result.isPlayerWinner) {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            backgroundSize: '100% 100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: `url(${website}/images/default-social-preview.png)`,
            backgroundRepeat: 'no-repeat',
            padding: '5% 0',
          }}
        />
      ),
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `url(${website}/images/social-preview.png)`,
          backgroundRepeat: 'no-repeat',
          padding: '5% 0',
        }}
      >
        <img width="330" height="207" src={`${website}/images/share-logo.svg`} alt="dumont" />
        <div
          style={{
            marginLeft: 190,
            marginRight: 190,
            display: 'flex',
            fontSize: 190,
            fontFamily: 'Inter',
            color: 'black',
            lineHeight: '190px',
            whiteSpace: 'pre-wrap',
            marginTop: '50px',
          }}
        >
          <i style={{ fontWeight: '500', fontStyle: 'italic' }}>YAAY!</i>
          <b style={{ fontWeight: '900', fontStyle: 'normal' }}> I WON</b>
        </div>
        <div
          style={{
            marginLeft: 190,
            marginRight: 190,
            display: 'flex',
            fontSize: 190,
            fontFamily: 'Inter',
            fontStyle: 'normal',
            color: 'black',
            fontWeight: '900',
            lineHeight: '190px',
            whiteSpace: 'pre-wrap',
          }}
        >
          ${toFixedNumber(parseUnits(card?.totalAmount, 6))}
        </div>
        <div
          style={{
            marginLeft: 190,
            marginRight: 190,
            display: 'flex',
            background: 'white',
            alignItems: 'center',
            fontSize: 102,
            fontFamily: 'Inter',
            fontStyle: 'italic',
            padding: '0 50px',
            border: '4px solid black',
            marginTop: 'auto',
          }}
        >
          ODDS {toFixedNumber(card?.result?.rate)}X
        </div>
      </div>
    ),
    {
      width: 1920,
      height: 1080,
      fonts: [
        {
          name: 'Inter',
          data: interRegularFont,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'Inter',
          data: interItalicFont,
          style: 'italic',
          weight: 400,
        },
        {
          name: 'Inter',
          data: interBoldFont,
          style: 'normal',
          weight: 700,
        },
        {
          name: 'Inter',
          data: interExtraBold,
          style: 'normal',
          weight: 900,
        },
      ],
    },
  );
}
