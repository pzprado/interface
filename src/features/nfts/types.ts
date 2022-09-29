import { ChainId } from 'src/constants/chains'

export interface OpenseaNFTAssetResponse {
  next: string
  previous: string
  assets: NFTAsset.Asset[]
}

export interface OpenseaNFTCollectionResponse {
  collection: NFTAsset.Collection
}

/**
 * Following types generated by json2ts from `v1/assets` and `vi/collection` json response
 */
export module NFTAsset {
  export interface AssetContract {
    address: string
    asset_contract_type: string
    created_date: Date
    name: string
    nft_version?: string
    opensea_version?: string
    owner: number
    schema_name: string
    symbol: string
    total_supply?: any
    description: string
    external_link?: any
    image_url?: any
    default_to_fiat: boolean
    dev_buyer_fee_basis_points: number
    dev_seller_fee_basis_points: number
    only_proxied_transfers: boolean
    opensea_buyer_fee_basis_points: number
    opensea_seller_fee_basis_points: number
    buyer_fee_basis_points: number
    seller_fee_basis_points: number
    payout_address?: any
  }

  export interface PrimaryAssetContract {
    address: string
    asset_contract_type: string
    created_date: Date
    name: string
    nft_version: string
    opensea_version?: any
    owner: number
    schema_name: string
    symbol: string
    total_supply: string
    description: string
    external_link: string
    image_url: string
    default_to_fiat: boolean
    dev_buyer_fee_basis_points: number
    dev_seller_fee_basis_points: number
    only_proxied_transfers: boolean
    opensea_buyer_fee_basis_points: number
    opensea_seller_fee_basis_points: number
    buyer_fee_basis_points: number
    seller_fee_basis_points: number
    payout_address: string
  }

  export interface PaymentToken {
    id: number
    symbol: string
    address: string
    image_url: string
    name: string
    decimals: number
    eth_price: number
    usd_price: number
  }

  export interface DisplayData {
    card_display_style: string
    images: any[]
  }

  export interface Stats {
    one_day_volume: number
    one_day_change: number
    one_day_sales: number
    one_day_average_price: number
    seven_day_volume: number
    seven_day_change: number
    seven_day_sales: number
    seven_day_average_price: number
    thirty_day_volume: number
    thirty_day_change: number
    thirty_day_sales: number
    thirty_day_average_price: number
    total_volume: number
    total_sales: number
    total_supply: number
    count: number
    num_owners: number
    average_price: number
    num_reports: number
    market_cap: number
    floor_price: number
  }

  export interface Collection {
    editors: string[]
    payment_tokens: PaymentToken[]
    primary_asset_contracts: PrimaryAssetContract[]
    traits: any
    stats: Stats
    banner_image_url: string
    chat_url?: any
    created_date: Date
    default_to_fiat: boolean
    description: string | null
    dev_buyer_fee_basis_points: string
    dev_seller_fee_basis_points: string
    discord_url: string
    display_data: DisplayData
    external_url: string
    featured: boolean
    featured_image_url: string
    hidden: boolean
    safelist_request_status: string
    image_url: string
    is_subject_to_whitelist: boolean
    large_image_url: string
    medium_username?: any
    name: string
    only_proxied_transfers: boolean
    opensea_buyer_fee_basis_points: string
    opensea_seller_fee_basis_points: string
    payout_address: string
    require_email: boolean
    short_description?: any
    slug: string
    telegram_url?: any
    twitter_username: string
    instagram_username?: any
    wiki_url?: any
    is_nsfw: boolean
  }

  export interface User {
    username: string
  }

  export interface Owner {
    user: User
    profile_img_url: string
    address: string
    config: string
  }

  export interface User2 {
    username: string
  }

  export interface Creator {
    user: User2
    profile_img_url: string
    address: string
    config: string
  }

  export interface Trait {
    trait_type: string
    value: string
    display_type?: any
    max_value?: any
    trait_count: number
    order?: any
  }

  export interface Asset {
    id: number
    num_sales: number
    background_color?: string
    image_url: string
    image_preview_url: string
    image_thumbnail_url: string
    image_original_url?: string
    animation_url: string
    animation_original_url: string
    name: string
    description: string
    external_link?: string
    asset_contract: AssetContract
    permalink: string
    collection: Collection
    decimals?: number
    token_metadata?: any
    is_nsfw: boolean
    owner: Owner
    sell_orders?: any
    creator: Creator
    traits: Trait[]
    last_sale?: any
    top_bid?: any
    listing_date?: any
    is_presale: boolean
    transfer_fee_payment_token?: any
    transfer_fee?: any
    token_id: string

    // manually added for convenience
    chainId: ChainId
  }

  export interface RootObject {
    next: string
    previous?: any
    assets: Asset[]
  }
}

export type NFTItem = {
  name?: string
  description?: string
  contractAddress?: string
  tokenId?: string
  imageUrl?: string
  collectionName?: string
}
