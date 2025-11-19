import { Elements } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom';

import stripePromisse from '../../config/stripeConfig';
import CheckoutForm  from '../../components/Stripe/CheckoutForm';

export function Checkout() {
  const {
    state: { clientSecret },
  } = useLocation();

  if (!clientSecret) {
    return <div>Erro, volte e tente novamente</div>
  }

  return (
    <Elements stripe={stripePromisse} options={{ clientSecret }}>
      <CheckoutForm>Checkout</CheckoutForm>;
    </Elements>
  );
}