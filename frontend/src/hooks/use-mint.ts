import { ERC5727ExampleUpgradeable__factory } from '@phaneroz-labs/soularis-typechain'
import { BigNumber } from 'ethers'
import { useState } from 'react'
import { useAccount, useProvider, useSigner } from 'wagmi'

export const useMint = (programAddr: string) => {
  const provider = useProvider()
  const { data: signer } = useSigner()
  const { address } = useAccount()
  const [isMinting, setIsMinting] = useState(false)

  const contract = ERC5727ExampleUpgradeable__factory.connect(programAddr, signer ?? provider)

  const mint = async (collectionId: number) => {
    if (!address) {
      console.log('account not initialized yet')
      return
    }

    const uri = await contract.slotURI(collectionId)
    const res = await fetch(uri)
    const data = await res.json()
    setIsMinting(true)
    for (const token of data.tokens) {
      const tx = await contract.mint(
        address,
        token.value,
        collectionId,
        BigNumber.from(Number.MAX_SAFE_INTEGER - 1),
        false,
      )
      const receipt = await tx.wait()
      const tokenId: BigNumber = receipt.events?.[0].args?.[0]
      await fetch(`https://gukj1mlb6c.execute-api.ap-northeast-1.amazonaws.com/${programAddr}`, {
        method: 'PUT',
        body: JSON.stringify({
          id: tokenId.toString(),
          name: token.name,
          type: token.type,
          description: token.description,
          image: token.image,
        }),
      })
    }
    setIsMinting(false)
  }

  return { mint, isMinting }
}
