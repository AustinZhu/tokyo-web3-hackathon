import { create, IPFSHTTPClient } from 'ipfs-http-client'
import { useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'

export const ipfsClientState = atom<IPFSHTTPClient | null>({
  key: 'ipfsClientState',
  default: null,
  dangerouslyAllowMutability: true,
})

export function useIPFS() {
  const [ipfs, setIpfs] = useRecoilState(ipfsClientState)

  useEffect(() => {
    const auth =
      'Basic ' +
      Buffer.from(
        '2ClAMnRw4c7Ec2ZxKw21aadWg3u' + ':' + '249ae6694f798157a0fe209ac7b4b6dd',
      ).toString('base64')
    const client = create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      headers: {
        authorization: auth,
      },
    })
    setIpfs(client)
  }, [setIpfs])

  return ipfs
}
