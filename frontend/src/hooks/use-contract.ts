import {
  ERC5727RegistryExample,
  ERC5727RegistryExample__factory,
  MinimalProxyDeployer,
  MinimalProxyDeployer__factory,
} from '@phaneroz-labs/soularis-typechain'
import { useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'
import { useProvider, useSigner } from 'wagmi'

export const minimalProxyDeployerState = atom<MinimalProxyDeployer | null>({
  key: 'minimalProxyDeployerState',
  default: null,
  dangerouslyAllowMutability: true,
})

export const registryState = atom<ERC5727RegistryExample | null>({
  key: 'erc5727RegistryState',
  default: null,
  dangerouslyAllowMutability: true,
})

export function useUtilContracts() {
  const [deployer, setDeployer] = useRecoilState(minimalProxyDeployerState)
  const [registry, setRegistry] = useRecoilState(registryState)
  const provider = useProvider()
  const { data: signer } = useSigner()

  useEffect(() => {
    const deployerContract = MinimalProxyDeployer__factory.connect(
      '0x32f1f1A78cB41e3CB3A544F8f180Ab5083403a93',
      signer ?? provider,
    )
    const registryContract = ERC5727RegistryExample__factory.connect(
      '0xC0e8cF68205EdDcd6Fd53b011f19336D9e38A93A',
      signer ?? provider,
    )

    setDeployer(deployerContract)
    setRegistry(registryContract)
  }, [signer, provider])

  return { deployer, registry }
}
