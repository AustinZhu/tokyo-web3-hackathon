import { ERC5727ExampleUpgradeable__factory } from '@phaneroz-labs/soularis-typechain'
import { ethers } from 'ethers'
import { useState } from 'react'
import { atom } from 'recoil'
import { Program } from 'src/types/token'
import { useAccount, useProvider, useSigner } from 'wagmi'
import { useUtilContracts } from './use-contract'
import { useIPFS } from './use-ipfs'

export const programState = atom<Program>({
  key: 'programState',
  default: undefined,
  dangerouslyAllowMutability: true,
})

export const useProgram = () => {
  const provider = useProvider()
  const { data: signer } = useSigner()
  const { deployer, registry } = useUtilContracts()
  const { address } = useAccount()
  const ipfs = useIPFS()
  const [deploying, setDeploying] = useState(false)

  const deployProxy = async (name: string, image: File) => {
    if (!deployer || !ipfs || !address || !registry) {
      console.log('deployer not initialized yet')
      return
    }

    setDeploying(true)

    console.log('deploying proxy', name, image)

    const salt = ethers.utils.formatBytes32String(Math.random().toString().slice(2, 10))
    const contractAddr = await deployer.calculateProxyAddressByImplementation(
      '0x350da6304ED8cc3a7f322A6155557ECc3585bA90',
      salt,
    )
    const callData = ERC5727ExampleUpgradeable__factory.createInterface().encodeFunctionData(
      '__ERC5727Example_init',
      [
        address,
        name,
        name,
        [address],
        `https://gukj1mlb6c.execute-api.ap-northeast-1.amazonaws.com/${contractAddr}/`,
      ],
    )

    const tx = await deployer.deployProxyByImplementation(
      '0x350da6304ED8cc3a7f322A6155557ECc3585bA90',
      callData,
      salt,
    )

    const receipt = await tx.wait()
    const proxyAddr: string = receipt.events?.[0].args?.[1]

    const erc5727 = ERC5727ExampleUpgradeable__factory.connect(proxyAddr, signer ?? provider)
    const txReg = await erc5727.register(registry.address)
    await txReg.wait()

    const res = await ipfs.add(image)
    await fetch('https://gukj1mlb6c.execute-api.ap-northeast-1.amazonaws.com/', {
      method: 'PUT',
      body: JSON.stringify({
        address: proxyAddr,
        name,
        image: res.path,
      }),
    })

    setDeploying(false)

    return proxyAddr
  }

  const getAllPrograms = async () => {
    if (!registry || !address || !ipfs) {
      console.log('registry not initialized yet')
      return
    }

    const balance = await registry.totalSupply()
    const indices = Array.from(Array(balance.toNumber()).keys())
    const programs = await Promise.all(
      indices.map(async (i) => {
        const id = await registry.tokenByIndex(i)
        const uri = await registry.tokenURI(id)
        const addr = await registry.addressOf(id)
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
          addr: addr,
          name: data.name,
          image: `https://phaneroz.infura-ipfs.io/ipfs/${data.image}`,
        } as Program
      }),
    )

    return programs
  }

  const getMyPrograms = async () => {
    if (!registry || !address || !ipfs) {
      console.log('registry not initialized yet')
      return []
    }

    const balance = await registry.balanceOf(address)
    const indices = Array.from(Array(balance.toNumber()).keys())
    const programs = await Promise.all(
      indices.map(async (i) => {
        const id = await registry.tokenOfOwnerByIndex(address, i)
        const uri = await registry.tokenURI(id)
        const addr = await registry.addressOf(id)
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
          addr: addr,
          name: data.name,
          image: `https://phaneroz.infura-ipfs.io/ipfs/${data.image}`,
        } as Program
      }),
    )

    return programs
  }

  return { deployProxy, getMyPrograms, getAllPrograms, deploying }
}
