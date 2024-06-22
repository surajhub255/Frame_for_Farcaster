import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

import { getFarcasterUserAddress } from '@coinbase/onchainkit/farcaster';

type GetFarcasterUserAddressResponse = {
  custodyAddress?: string; // Custody Address of a given fid
  verifiedAddresses?: string[]; // List of all verified addresses for a given fid
};

// Asynchronous function to get metadata
async function getMetadata(fid: string, options: {}): Promise<Metadata> {
  const userAddress = await getFarcasterUserAddress(fid, options);

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
    postUrl: `${NEXT_PUBLIC_URL}/api/frame?id=1&userAddress=${userAddress.custodyAddress}`,
  });

  return {
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
}

export default async function Page() {
  const fid = 'some-fid'; // Replace with actual fid
  const options = {}; // Replace with actual options if needed
  const metadata = await getMetadata(fid, options);

  return (
    <>
      <h1>Hellow there go to https://warpcast.com/~/developers/frames to test it.</h1>
      {/* The metadata can be used in any component if needed */}
    </>
  );
}
