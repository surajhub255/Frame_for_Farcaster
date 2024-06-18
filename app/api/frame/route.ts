import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';
import { addHyperFrame, getHyperFrame } from '../hyperframe';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress: string | undefined = '';
  let text: string | undefined = '';

  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
  } else {
    return new NextResponse('Message not valid', { status: 500 });
  }
 
 
  // if (message?.button === 3) {
  //   return NextResponse.redirect(
  //     'https://www.google.com/search?q=cute+dog+pictures&tbm=isch&source=lnms',
  //     { status: 302 },
  //   );
  // }
  let state = { frame: 'start' };
  try {
    state = JSON.parse(decodeURIComponent(message.state?.serialized));
  } catch (e) {
    // Note that this error will always be triggered by the first frame
    console.error(e);
  }
  // return new NextResponse(
  addHyperFrame('Start',{
    frame:   getFrameHtmlResponse({
      buttons: [
        {
          label: 'Next'
        },
        {
          label: 'Buy',
        },
        {
          action: 'link',
          label: 'More Imformation',
          target: 'https://www.google.com'
        }
      ],
      image: {
        src: `${NEXT_PUBLIC_URL}/github.png`,
        aspectRatio: '1:1',
      },
      state: { frame: 'start' },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
    }),
    1: 'Next',
    2: 'Buy',
    3: 'More Information',
  });
  // ,
  // );
  addHyperFrame('Next', {
    frame: getFrameHtmlResponse({
      buttons: [
        {
          label: 'Go Back',
        },
        {
          label: 'Buy',
        },
        {
          label: 'Next',
        },
        {
          action: 'link',
          label: 'More Imformation',
          target: 'https://www.google.com'
        }
      ],
      image: {
        src: `${NEXT_PUBLIC_URL}/meta.png`,
        aspectRatio: '1:1',
      },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
    }),
    1: 'start',
    2: 'shack',
    3: 'desert-road',
  });

  if (!frames) {
    return new NextResponse('Frame not found', { status: 404 });
  }
  
  // There should always be a button number
  if (!message?.button) {
    return new NextResponse('Button not found', { status: 404 });
  }
  return new NextResponse(getHyperFrame(frames as unknown as string, text || '', message?.button));
}


export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
