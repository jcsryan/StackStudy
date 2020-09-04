try {
    const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 99,
      currency: 'usd',
    });
    console.log('Worked! ', paymentIntent.id);
  } catch(err) {
    console.log('Error! ', err.message);
  }

  /*
const Footer = () => {
    const data = 99;
    const [isClicked, setClicked] = useState(false);
    function buttonPress(status) {
        setClicked(status.isClicked)
    }
    useEffect(() => {
         stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: data.donation.session })
            })
        
    }, [data]);
    if (buttonPress =! isClicked) {
    return (
        <div>
            <button onClick={buttonPress}>Donate $0.99!</button>
        </div>
    )
    }
};

export default Footer
*/
