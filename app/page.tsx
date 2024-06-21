import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';
import { text } from 'stream/consumers';

const frameMetadata = getFrameMetadata({

  buttons: [
    {
      label: 'Start',
    },
   
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/3.png`,
    aspectRatio: '1:1',
  },
  input: {
    text: 'write your name',
    
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/frame?id=1`,
});

export const metadata: Metadata = {
  title: 'zizzamia.xyz',
  description: 'LFG',
  openGraph: {
    title: 'zizzamia.xyz',
    description: 'LFG',
    images: [`${NEXT_PUBLIC_URL}/1.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>Hellow there go to https://warpcast.com/~/developers/frames to test it.</h1>
    </>
  );
}
