import { Souldrop__factory } from '@phaneroz-labs/soularis-typechain'
import { ethers } from 'ethers'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useUtilContracts } from './use-contract'
import { useIPFS } from './use-ipfs'

export const useSouldrop = (programAddr: string) => {
  const { address } = useAccount()
  const ipfs = useIPFS()
  const { deployer } = useUtilContracts()
  const [deploying, setDeploying] = useState(false)

  const souldrop = async (threshold: number, image: File) => {
    if (!ipfs || !deployer || !address) {
      console.log('ipfs not initialized yet')
      return
    }

    console.log('souldrop', threshold, image)

    setDeploying(true)

    const salt = ethers.utils.formatBytes32String(Math.random().toString().slice(2, 10))
    const proxyAddr = await deployer.calculateProxyAddressByImplementation(
      '0x39c32f98Cf3Bd062C9d7A99a5422e8D11d26467a',
      salt,
    )
    const callData = Souldrop__factory.createInterface().encodeFunctionData('initialize', [
      address,
      threshold,
      `https://gukj1mlb6c.execute-api.ap-northeast-1.amazonaws.com/${proxyAddr}`,
      programAddr,
    ])

    const tx = await deployer.deployProxyByImplementation(
      '0x39c32f98Cf3Bd062C9d7A99a5422e8D11d26467a',
      callData,
      salt,
    )
    const receipt = await tx.wait()
    const nftContractAddr: string = receipt.events?.[0].args?.[1]

    const res = await ipfs.add(image)
    fetch('https://gukj1mlb6c.execute-api.ap-northeast-1.amazonaws.com/', {
      method: 'PUT',
      body: JSON.stringify({
        address: nftContractAddr,
        name: 'Souldrop',
        image: res.path,
      }),
    })

    setDeploying(false)

    return nftContractAddr
  }

  return { souldrop, deploying }
}
