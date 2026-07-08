import { useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { createPayment } from '../lib/pi';

export function usePayments() {
  const { user, accessToken } = useAuth();

  const buyPremium = useCallback(async () => {
    if (!user || !accessToken) throw new Error('Not authenticated');
    await createPayment({
      amount: 0.5,
      memo: 'Ili kuendelea subscribe for premium content',
      metadata: { productId: 'premium_subscription', userId: user.uid }
    });
  }, [user, accessToken]);

  const subscribeToUser = useCallback(async (targetUsername, targetUid) => {
    if (!user || !accessToken) throw new Error('Not authenticated');
    await createPayment({
      amount: 0.1,
      memo: `Subscribe to @${targetUsername} for 0.1 Pi`,
      metadata: { productId: 'subscribe_to_user', recipientUid: targetUid, recipientUsername: targetUsername }
    });
  }, [user, accessToken]);

  return { buyPremium, subscribeToUser };
}