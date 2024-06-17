import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'See Github Image'
    },
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/ETH.png`,
    aspectRatio: '1:1',
  },

  postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: 'ETH and Github Image',
  description: 'See github and eth image',
  openGraph: {
    title: 'ETH and Github Image',
    description: 'See github and eth image',
    images: [`${NEXT_PUBLIC_URL}/github.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>
        Hellow there got to https://warpcast.com/~/developers/frames to test it.
      </h1>
    </>
  );
}
