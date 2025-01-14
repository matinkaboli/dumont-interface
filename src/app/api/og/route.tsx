import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const postTitle = searchParams.get('title') || 'default one';

  const interRegularFontP = fetch(
    new URL('../../../../public/fonts/Inter-Regular.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer());

  const interBoldFontP = fetch(
    new URL('../../../../public/fonts/Inter-Bold.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer());

  const interItalicFontP = fetch(
    new URL('../../../../public/fonts/Inter-MediumItalic.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer());

  const [interRegularFont, interBoldFont, interItalicFont] = await Promise.all([
    interRegularFontP,
    interBoldFontP,
    interItalicFontP,
  ]);

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
          backgroundImage: `url(http://localhost:3000/images/social-preview.png)`,
          backgroundRepeat: 'no-repeat',
          padding: '5% 0',
        }}
      >
        <img
          width="280"
          height="181"
          src="http://localhost:3000/images/share-logo.svg"
          alt="dumont"
        />
        <div
          style={{
            marginLeft: 190,
            marginRight: 190,
            display: 'flex',
            fontSize: 110,
            fontFamily: 'Inter',
            color: 'black',
            lineHeight: '120px',
            whiteSpace: 'pre-wrap',
            marginTop: '30px',
          }}
        >
          <i style={{ fontStyle: 'italic' }}>YAAY!</i>
          <b style={{ fontWeight: 'bold', fontStyle: 'normal' }}> I won</b>
        </div>
        <div
          style={{
            marginLeft: 190,
            marginRight: 190,
            display: 'flex',
            fontSize: 130,
            fontFamily: 'Inter',
            fontStyle: 'normal',
            color: 'black',
            fontWeight: 'bold',
            lineHeight: '120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          ${postTitle}
        </div>
        <div
          style={{
            marginLeft: 190,
            marginRight: 190,
            display: 'flex',
            background: 'white',
            alignItems: 'center',
            fontSize: 100,
            fontFamily: 'Inter',
            fontStyle: 'italic',
            padding: '0 50px',
            border: '4px solid black',
            marginTop: 'auto',
          }}
        >
          ODDS 100x
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
          data: interBoldFont,
          style: 'normal',
          weight: 700,
        },
        {
          name: 'Inter',
          data: interItalicFont,
          style: 'italic',
          weight: 400,
        },
      ],
    },
  );
}
