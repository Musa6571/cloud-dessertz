// api/create-checkout.js
const Stripe = require('stripe');

// This loads your Stripe Secret Key from Vercel's environment variables
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
    // 1. Allow only POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // 2. Get the cart data from your order.html page
    const { items, customerEmail, customerName } = req.body;

    // 3. Validate that the cart is not empty
    if (!items || items.length === 0) {
        return res.status(400).json({ error: 'Your cart is empty.' });
    }

    try {
        // 4. Convert your cart items into Stripe's format
        const lineItems = items.map((item) => ({
            price_data: {
                currency: 'gbp', // Use 'usd' if you are in the US
                product_data: {
                    name: item.name,
                },
                // Stripe wants the price in pennies (e.g., £10.00 = 1000)
                unit_amount: Math.round((item.price || 0) * 100),
            },
            quantity: item.quantity,
        }));

        // 5. Create the Checkout Session on Stripe's servers
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'apple_pay', 'google_pay'],
            line_items: lineItems,
            mode: 'payment',
            // Where to send the customer after payment
            success_url: `${req.headers.origin}/order.html?success=true`,
            // Where to send the customer if they cancel
            cancel_url: `${req.headers.origin}/order.html?canceled=true`,
            // Store the customer's email in the session so Stripe can send a receipt too
            customer_email: customerEmail,
            metadata: {
                customer_name: customerName,
            },
        });

        // 6. Send the checkout URL back to your order.html page
        res.status(200).json({ url: session.url });
    } catch (error) {
        console.error('Stripe Error:', error);
        res.status(500).json({ error: error.message });
    }
};
