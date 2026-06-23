import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { service, price, email } = body;

    console.log("Checkout request received:", { service, price, email: email ? email.substring(0, 5) + "..." : null });

    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("STRIPE_SECRET_KEY is missing in environment variables");
      return NextResponse.json({ error: "Stripe configuration error" }, { status: 500 });
    }

    const stripe = (await import('stripe')).default(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: service || 'Service' },
            unit_amount: Math.round((price || 0) * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/book`,
      customer_email: email,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Full checkout error:", error);
    return NextResponse.json({ 
      error: error.message || "Payment failed" 
    }, { status: 500 });
  }
}