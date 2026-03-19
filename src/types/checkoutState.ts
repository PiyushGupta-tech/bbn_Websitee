/** Passed from checkout form → order confirmation via React Router `location.state` */
export type ShippingDetails = {
  fullName: string
  email: string
  phone: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  pinCode: string
}

export type CheckoutThanksState = {
  orderId: string
  subtotal: number
  itemCount: number
  shipping: ShippingDetails
}
