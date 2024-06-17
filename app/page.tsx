import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Get current ETH Price!',
    },

    {
      label: 'ETH / USD',
      action: 'post',
    },
    {
      label: 'ETH / BTC',
      action: 'post',
    },
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/ETH.png`,
    aspectRatio: '1:1',
  },

  postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
  metadataBase: new URL(NEXT_PUBLIC_URL),
  title: 'ETH Price',
  description: 'Get real-time ETH price!',
  openGraph: {
    title: 'ETH Price',
    description: 'Get real-time ETH price!',
    images: [`${NEXT_PUBLIC_URL}/ETH.png`],
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
