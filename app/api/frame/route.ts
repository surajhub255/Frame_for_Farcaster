// import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';

// async function getResponse(req: NextRequest): Promise<NextResponse> {
//   const body: FrameRequest = await req.json();
//   const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

//   if (!isValid) {
//     return new NextResponse('Message not valid', { status: 500 });
//   }

//   const text = message.input || '';
//   let state = {
//     page: 0,
//   };
//   try {
//     state = JSON.parse(decodeURIComponent(message.state?.serialized));
//   } catch (e) {
//     console.error(e);
//   }

//   /**
//    * Use this code to redirect to a different page
//    */
//   if (message?.button === 3) {
//     return NextResponse.redirect(
//       'https://www.google.com/search?q=cute+dog+pictures&tbm=isch&source=lnms',
//       { status: 302 },
//     );
//   }

//   return new NextResponse(
//     getFrameHtmlResponse({
//       buttons: [
//         {
//           label: 'Next',
//         },
      
//       ],
//       image: {
//         src: `${NEXT_PUBLIC_URL}/park-1.png`,
//       },
//       postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
//       state: {
//         page: state?.page + 1,
//         time: new Date().toISOString(),
//       },
//     }),
//   );
// }

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams
  const id:any = searchParams.get("id")
  const idAsNumber = parseInt(id)

  const nextId = idAsNumber + 1

  if(idAsNumber === 4){
      return new NextResponse(`<!DOCTYPE html><html><head>
    <title>This is frame 7</title>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${NEXT_PUBLIC_URL}/4.png" />
    <meta property="fc:frame:button:1" content="Cosmic Cowboys" />
    <meta property="fc:frame:button:1:action" content="post_redirect" />
    <meta property="fc:frame:button:2" content="Blog post Tutorial" />
    <meta property="fc:frame:button:2:action" content="post_redirect" />
    <meta property="fc:frame:button:3" content="Video Tutorial" />
    <meta property="fc:frame:button:3:action" content="post_redirect" />
    // <meta property="fc:frame:post_url" content="${NEXT_PUBLIC_URL}/api/end" />
  </head></html>`);
  } else {
  return new NextResponse(`<!DOCTYPE html><html><head>
    <title>This is frame ${id}</title>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${NEXT_PUBLIC_URL}/${id}.png" />
    <meta property="fc:frame:button:1" content="Next Page" />
    <meta property="fc:frame:post_url" content="${NEXT_PUBLIC_URL}/api/frame?id=${nextId}" />
  </head></html>`);
  }
}


export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
