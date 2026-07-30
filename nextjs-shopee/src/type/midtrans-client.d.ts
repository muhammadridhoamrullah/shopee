import "midtrans-client";

declare module "midtrans-client" {
  interface ItemDetail {
    id: string;
    price: number;
    quantity: number;
    name: string;
  }

  interface CustomerDetails {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
  }

  interface SnapTransactionParameters {
    item_details?: ItemDetail[];
    customer_details?: CustomerDetails;
  }
}
