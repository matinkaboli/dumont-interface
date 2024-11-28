import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const postTitle = searchParams.get('title') || 'default one';

  async function loadGoogleFont (font: string, text: string) {
    const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`
    const css = await (await fetch(url)).text()
    const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

    if (resource) {
      const response = await fetch(resource[1])
      if (response.status == 200) {
        return await response.arrayBuffer()
      }
    }

    throw new Error('failed to load font data')
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `url(https://app.dumont.gg/images/wavy.jpg)`,
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div
          style={{
            marginLeft: 190,
            marginRight: 190,
            display: 'flex',
            fontSize: 140,
            fontFamily: 'Inter',
            fontStyle: 'normal',
            color: 'white',
            lineHeight: '120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {postTitle}
        </div>
      </div>
    ),
    // ImageResponse options
    {
      width: 1920,
      height: 1080,
      fonts: [
        {
          name: "inter",
          data: await loadGoogleFont('Inter', postTitle),
          style: "normal",
        },
      ],
    },
  );
}
