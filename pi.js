let Pi;

export const initPi = async () => {
  if (typeof window === 'undefined') return null;
  Pi = window.Pi;
  if (!Pi) {
    console.warn('Pi SDK not found – running outside Pi Browser');
    return null;
  }
  // Sandbox mode during development
  await Pi.init({ version: "2.0", sandbox: true });
  return Pi;
};

export const authenticate = async (scopes = ['username', 'payments']) => {
  if (!Pi) throw new Error('Pi SDK not initialized');
  try {
    const auth = await Pi.authenticate(scopes, onIncompletePaymentFound);
    return { user: auth.user, accessToken: auth.accessToken };
  } catch (err) {
    console.error('Authentication failed', err);
    throw err;
  }
};

export const createPayment = async (paymentData) => {
  if (!Pi) throw new Error('Pi SDK not initialized');
  try {
    const payment = await Pi.createPayment(paymentData, {
      onReadyForServerApproval: async (paymentId) => {
        await fetch('/api/payments/approve', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentId })
        });
      },
      onReadyForServerCompletion: async (paymentId, txid) => {
        await fetch('/api/payments/complete-server', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentId, txid })
        });
      },
      onCancel: (paymentId) => console.log('Payment cancelled', paymentId),
      onError: (err) => console.error('Payment error', err)
    });
    return payment;
  } catch (err) {
    console.error('createPayment error', err);
    throw err;
  }
};

const onIncompletePaymentFound = async (payment) => {
  if (!Pi) return;
  console.log('Incomplete payment found:', payment);
  try {
    const token = Pi.currentUser?.accessToken;
    await fetch('/api/payments/complete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        paymentId: payment.identifier,
        txid: payment.transaction?.txid,
        amount: payment.amount,
        memo: payment.memo,
        metadata: payment.metadata
      })
    });
  } catch (err) {
    console.error('Failed to complete incomplete payment', err);
  }
};