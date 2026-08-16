// iyzico Checkout Form entegrasyonu.
// Türkiye'deki dernek/vakıflar için en yaygın kullanılan ödeme kuruluşlarından biridir.
// PCI-DSS yükümlülüğü iyzico'nun barındırdığı ödeme formunda kalır — kart bilgisi
// asla kendi sunucumuza dokunmaz. Bu yüzden "Checkout Form" (iframe/redirect) modeli
// tercih edildi; ham kart numarası alan bir entegrasyon KESİNLİKLE önerilmez.

// @ts-expect-error - iyzipay için resmi TypeScript tipi yok
import Iyzipay from "iyzipay";
import { randomUUID } from "crypto";

const iyzipay = new Iyzipay({
  apiKey: process.env.IYZICO_API_KEY ?? "sandbox-api-key",
  secretKey: process.env.IYZICO_SECRET_KEY ?? "sandbox-secret-key",
  uri: process.env.IYZICO_BASE_URL ?? "https://sandbox-api.iyzipay.com",
});

export type CheckoutBuyer = {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  identityNumber: string; // TC kimlik no - iyzico zorunlu tutuyor (yabancılar için 11111111111 kullanımı yaygın)
  address: string;
  city: string;
  ip: string;
};

export type CheckoutItem = {
  id: string;
  name: string;
  category: string;
  priceTl: string; // "150.00" formatında string - iyzico ondalık string bekliyor
};

/**
 * Bağış için ödeme formu (checkout form) başlatır.
 * Dönen `checkoutFormContent` bir <script> içerir; bağış sayfasında
 * bir div'e enjekte edilerek iyzico'nun kendi güvenli formu render edilir.
 */
export function initializeCheckoutForm(params: {
  conversationId: string;
  priceTl: string;
  buyer: CheckoutBuyer;
  items: CheckoutItem[];
  callbackUrl: string;
}): Promise<{
  status: string;
  token?: string;
  checkoutFormContent?: string;
  errorMessage?: string;
}> {
  const request = {
    locale: Iyzipay.LOCALE.TR,
    conversationId: params.conversationId,
    price: params.priceTl,
    paidPrice: params.priceTl,
    currency: Iyzipay.CURRENCY.TRY,
    basketId: params.conversationId,
    paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    callbackUrl: params.callbackUrl,
    enabledInstallments: [1],
    buyer: {
      id: params.buyer.id,
      name: params.buyer.name,
      surname: params.buyer.surname,
      gsmNumber: params.buyer.phone,
      email: params.buyer.email,
      identityNumber: params.buyer.identityNumber,
      registrationAddress: params.buyer.address,
      ip: params.buyer.ip,
      city: params.buyer.city,
      country: "Turkey",
    },
    shippingAddress: {
      contactName: `${params.buyer.name} ${params.buyer.surname}`,
      city: params.buyer.city,
      country: "Turkey",
      address: params.buyer.address,
    },
    billingAddress: {
      contactName: `${params.buyer.name} ${params.buyer.surname}`,
      city: params.buyer.city,
      country: "Turkey",
      address: params.buyer.address,
    },
    basketItems: params.items.map((item) => ({
      id: item.id,
      name: item.name,
      category1: item.category,
      itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
      price: item.priceTl,
    })),
  };

  return new Promise((resolve, reject) => {
    iyzipay.checkoutFormInitialize.create(request, (err: unknown, result: any) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

/** Kullanıcı ödeme formunu tamamladıktan sonra callback'te sonucu doğrular. */
export function retrieveCheckoutForm(token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    iyzipay.checkoutForm.retrieve({ locale: Iyzipay.LOCALE.TR, token }, (err: unknown, result: any) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

export function newConversationId() {
  return randomUUID();
}
