import { BigNumber } from 'ethers'

export interface Program {
  addr: string
  name: string
  image: string
}

export interface Collection {
  id: BigNumber
  name: string
  description: string
  image: string
  tokens: TokenTemplate[]
}

export interface TokenTemplate {
  name: string
  description: string
  value: number
  image: string
  type: 'fungible' | 'non-fungible'
}

export interface CreateCollectionData {
  slot: number
  name: string
  description: string
  image: File
  tokens: {
    name: string
    description: string
    value: number
    type: 'fungible' | 'non-fungible'
    image?: File
  }[]
}

export interface TokenBalance {
  id: BigNumber
  name: string
  value: number
  type: 'fungible' | 'non-fungible'
  valid: boolean
}

export interface Token {
  id: BigNumber
  name: string
  description: string
  image: string
  collection: string
  expiry?: Date
  value: BigNumber
  slot: BigNumber
  issuer: string
  isValid: boolean
}
