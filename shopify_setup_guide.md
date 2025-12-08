# How to Get Your Shopify Keys

1.  **Create a Store:**
    *   In your Partner Dashboard, go to **Stores** > **Add store** > **Create development store**.
    *   Choose "Create a store to test and build".
    *   Give it a detailed name (e.g. `retitle-dev`).

2.  **Create the App:**
    *   In your new Shopify Admin, go to **Settings** (bottom left) > **Apps and sales channels**.
    *   Click **Develop apps** (top right).
    *   Click **Create an app**. Name it `Retitle Headless`.

3.  **Configure API Scopes:**
    *   Click **Configuration** > **Storefront API integration**.
    *   Check all the boxes (Products, Collections, etc).
    *   Click **Save**.

4.  **Get the Token:**
    *   Click **API credentials**.
    *   Copy the **Storefront access token** (NOT the Admin API token).

5.  **Add to Retitle:**
    *   Rename `env.example` to `.env.local` in this folder.
    *   Paste your token in `NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN`.
    *   Paste your store domain (e.g. `retitle-dev.myshopify.com`) in `NEXT_PUBLIC_SHOPIFY_DOMAIN`.
