import { ERC5727ExampleUpgradeable__factory } from '@phaneroz-labs/soularis-typechain'
import { useState } from 'react'
import { Collection, CreateCollectionData } from 'src/types/token'
import { useAccount, useProvider, useSigner } from 'wagmi'
import { useIPFS } from './use-ipfs'
import { useMint } from './use-mint'

export const useCollection = (programAddr: string) => {
  const provider = useProvider()
  const { data: signer } = useSigner()
  const { address } = useAccount()
  const ipfs = useIPFS()
  const [creating, setCreating] = useState(false)
  const { mint } = useMint(programAddr)

  const contract = ERC5727ExampleUpgradeable__factory.connect(programAddr, signer ?? provider)

  const getCollections = async () => {
    if (!ipfs) {
      console.log('ipfs not initialized yet')
      return []
    }

    const count = await contract.slotCount()
    const indices = Array.from(Array(count.toNumber()).keys())
    const collections = await Promise.all(
      indices.map(async (i) => {
        const id = await contract.slotByIndex(i)
        const uri = await contract.slotURI(id)
        const res = await fetch(uri)
        const data = await res.json()

        // const stream = ipfs.cat(data.image)
        // const decoder = new TextDecoder()
        // let content = ''

        // for await (const chunk of stream) {
        //   content += decoder.decode(chunk, { stream: true })
        // }
        // const imageData = Buffer.from(content).toString('base64')

        return {
          id: await id,
          name: data.name,
          description: data.description,
          image: `https://phaneroz.infura-ipfs.io${data.image}`,
          tokens: data.tokens,
        } as Collection
      }),
    )

    return collections
  }

  const createCollection = async (data: CreateCollectionData) => {
    if (!ipfs || !address) {
      console.log('ipfs not initialized yet')
      return
    }

    setCreating(true)

    const cover = await ipfs.add(data.image)
    const tokens = []
    for (const token of data.tokens) {
      if (token.image) {
        const res = await ipfs.add(token.image)
        tokens.push({
          ...token,
          image: res.path,
        })
      } else {
        tokens.push({
          ...token,
          image: '',
        })
      }
    }

    const reqData = {
      slot: data.slot,
      name: data.name,
      description: data.description,
      image: cover.path,
      tokens: tokens,
    }

    await fetch(`https://gukj1mlb6c.execute-api.ap-northeast-1.amazonaws.com/${programAddr}/slot`, {
      method: 'PUT',
      body: JSON.stringify(reqData),
    })

    await mint(data.slot)

    setCreating(false)
  }

  return { getCollections, createCollection, creating }
}
