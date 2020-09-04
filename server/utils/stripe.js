try {
    const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100,
      currency: 'usd',
    });
    console.log('Worked! ', paymentIntent.id);
  } catch(err) {
    console.log('Error! ', err.message);
  }