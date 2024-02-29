// const stripeGateway = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const DOMAIN = process.env.DOMAIN;
//
// app.post('/stripe-checkout', async (req, res) => {
//     try {
//         const session = await stripeGateway.checkout.sessions.create({
//             payment_method_types: ["card"],
//             mode: "payment",
//             success_url: `${DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}&order=${encodeURIComponent(JSON.stringify(req.body))}`,
//             cancel_url: `${DOMAIN}/checkout?payment_fail=true`,
//             line_items: req.body.items.map(item => {
//                 return {
//                     price_data: {
//                         currency: "usd",
//                         product_data: {
//                             name: item.name,
//                             description: item.shortDes,
//                             images: [item.image]
//                         },
//                         unit_amount: item.price * 100
//                     },
//                     quantity: item.item
//                 };
//             })
//         });
//
//         res.json({ url: session.url });
//     } catch (error) {
//         console.error("Error during checkout session creation:", error);
//         res.status(500).json({ error: 'Failed to create checkout session' });
//     }
// });
//
// app.get('/success', async (req, res) => {
//     try {
//         const { order, session_id } = req.query;
//         const decodedOrder = JSON.parse(decodeURIComponent(order));
//         const session = await stripeGateway.checkout.sessions.retrieve(session_id);
//         const customerEmail = session.customer_details.email;
//
//         const ordersCollection = collection(db, "orders");
//         const docName = `${customerEmail}-order-${Date.now()}`;
//
//         await setDoc(doc(ordersCollection, docName), decodedOrder);
//         res.redirect('/checkout?payment=done');
//     } catch (error) {
//         console.error("Error processing successful payment:", error);
//         res.status(500).json({ error: 'Failed to process successful payment' });
//     }
// });
