import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../../../hooks/CartContext.jsx';
import { api } from '../../../services/api';

import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import '../styles.css';

export default function CheckoutForm() {
  const { cartProducts, clearCart } = useCart();

  const stripe = useStripe();
  const elements = useElements();

  const {
    state: { dpmCheckerLink },
  } = useLocation();

  const navigate = useNavigate();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      console.error('Stripe.js has not yet loaded.');
      return;
    }

    setIsLoading(true);

    //chama a função confirmPayment do stripe
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (error) {
      setMessage(error.message);
      toast.error(error.message);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      //se o pagamento foi bem sucedido envia o pedido para o backend
      try {
        const products = cartProducts.map((product) => {
          return {
            id: product.id,
            quantity: product.quantity,
            price: product.price,
          };
        });
        const { status } = await api.post(
          '/orders',
          { products },
          {
            validateStatus: () => true,
          },
        );

        if (status === 201 || status === 200) {
          setTimeout(() => {
            navigate(
              `/complete?payment_intent_client_secret=${paymentIntent.client_secret}`,
            );
          }, 3000);
          clearCart();
          toast.success('Pedido Realizado com Sucesso!');
        } else if (status === 409) {
          toast.error('Erro ao realizar o pedido!');
        } else {
          throw new Error();
        }
      } catch (error) {
        toast.error('Falha no Sistema!, Tente novamente');
      }
    } else {
      navigate(
        `/complete?payment_intent_client_secret=${paymentIntent.client_secret}`,
      );
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: 'accordion',
  };

  return (
    <div className="container">
      <form id="payment-form" onSubmit={handleSubmit}>
        {/* O formulário não está carregando na tela nao sei o motivo. */}
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button
          className="button"
          disabled={isLoading || !stripe || !elements}
          id="submit"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              'Pagar Agora'
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>

      <div>
        <p>Os metodos são disponibilidados de acordo com sua região.</p>

        <a
          href={dpmCheckerLink}
          target="_blank"
          rel="noopener noreferrer"
          id="dpm-integarion-checker"
        >
          Ver métodos de pagamento
        </a>
      </div>
    </div>
  );
}
