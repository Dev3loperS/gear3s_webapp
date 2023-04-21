import { Product } from './product.type'

export type PurchaseStatus = -1 | 1 | 2 | 3 | 4 | 5
/**
 * -1: san pham dang trong gio hang
 * 0: tat ca san pham
 * 2: san pham dang duoc lay hang
 * 3: san pham dang duoc van chuyen
 * 4: san pham da duoc giao
 * 5: san pham da bi huy
 */

export type PurchaseListStatus = PurchaseStatus | 0

export interface Purchase {
  disabled: boolean | undefined
  _id: string
  buy_count: number
  price: number
  price_before_discount: number
  status: PurchaseStatus
  user: string
  product: Product
  createdAt: string
  updatedAt: string
}

export interface ExtendedPurchase extends Purchase {
  disabled: boolean
  checked: boolean
}
