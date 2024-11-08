import * as checkoutNodeJssdk from '@paypal/checkout-server-sdk';

export class PaymentConfig {
    private static client(): checkoutNodeJssdk.core.PayPalHttpClient {
        const clientId = process.env.PAYPAL_CLIENT_ID;
        const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

        const environment =
            process.env.NODE_ENV === 'production'
                ? new checkoutNodeJssdk.core.LiveEnvironment(
                      clientId,
                      clientSecret
                  )
                : new checkoutNodeJssdk.core.SandboxEnvironment(
                      clientId,
                      clientSecret
                  );

        return new checkoutNodeJssdk.core.PayPalHttpClient(environment);
    }

    static get(): checkoutNodeJssdk.core.PayPalHttpClient {
        return this.client();
    }
}
