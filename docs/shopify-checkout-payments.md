# Shopify Checkout And Payments Setup

The website uses Shopify cart and Shopify hosted checkout. The code can create a
cart and redirect customers to `checkoutUrl`, but payments and checkout settings
must be configured inside Shopify before the shop can take real orders.

## Payments

Configure in Shopify Admin:

**Settings -> Payments**

Status: blocked until business details are confirmed. Shopify Payments may ask
for company details, payout details, and a KVK number depending on the account
setup.

Checklist:

- [ ] Confirm whether Poppy Joy has a KVK number.
- [ ] Confirm legal business name and payout account details.
- [ ] Activate Shopify Payments or another payment provider.
- [ ] Complete business verification and payout details.
- [ ] Confirm accepted payment methods, such as card, Apple Pay, iDEAL, or PayPal.
- [ ] Confirm payout currency and store currency.
- [ ] Place a test order or use Shopify test mode before launch.

## Checkout

Configure in Shopify Admin:

**Settings -> Checkout**

Checklist:

- [ ] Configure customer contact method.
- [ ] Configure customer accounts preference.
- [ ] Configure required customer information.
- [ ] Configure order processing settings.
- [ ] Configure checkout branding to match Poppy Joy where possible.
- [ ] Confirm email notifications and order confirmation language.

## Shipping

Configure in Shopify Admin:

**Settings -> Shipping and delivery**

Checklist:

- [ ] Add shipping zones.
- [ ] Add shipping rates.
- [ ] Confirm local pickup or local delivery if relevant.
- [ ] Confirm free shipping thresholds if desired.

## Taxes

Configure in Shopify Admin:

**Settings -> Taxes and duties**

Checklist:

- [ ] Confirm tax registration and VAT settings.
- [ ] Confirm whether prices include tax.
- [ ] Confirm cross-border duties if selling outside the Netherlands.

## Storefront Validation

The frontend should validate:

- [x] Storefront API can create carts.
- [x] Cart response includes Shopify `checkoutUrl`.
- [ ] Product page Add to cart button creates or updates a cart.
- [ ] Checkout button redirects to Shopify hosted checkout.
- [ ] Test order can be completed in Shopify test mode.
