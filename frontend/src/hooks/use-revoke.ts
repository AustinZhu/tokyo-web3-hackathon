import { ERC5727ExampleUpgradeable__factory } from '@phaneroz-labs/soularis-typechain'
import { BigNumber } from 'ethers'
import { TokenBalance } from 'src/types/token'
import { useAccount, useProvider, useSigner } from 'wagmi'

export const useRevoke = (programAddr: string) => {
  const provider = useProvider()
  const { data: signer } = useSigner()
  const { address } = useAccount()

  const contract = ERC5727ExampleUpgradeable__factory.connect(programAddr, signer ?? provider)

  const getTokenBalances = async (soulAddr: string) => {
    if (!address) {
      console.log('account not initialized yet')
      return
    }

    const balance = await contract.balanceOf(soulAddr)
    const tokenIds = Array.from(Array(balance.toNumber()).keys())
    const tokens = await Promise.all(
      tokenIds.map(async (i) => {
        const id = await contract.tokenOfSoulByIndex(soulAddr, i)
        const uri = await contract.tokenURI(id)
        const res = await fetch(uri)
        const data = await res.json()
        const value = await contract.valueOf_(id)
        return {
          id: id,
          name: data.name,
          value: value.toNumber(),
          type: data.type,
          valid: await contract.isValid(id),
        } as TokenBalance
      }),
    )

    return tokens
  }

  const revoke = async (tokenId: BigNumber) => {
    if (!address) {
      console.log('account not initialized yet')
      return
    }

    const tx = await contract.revoke(tokenId)
    await tx.wait()
    // TODO: pop up notification
  }

  return { getTokenBalances, revoke }
}
