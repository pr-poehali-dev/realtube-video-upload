export interface Channel {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  subscribers: string;
  description?: string;
}

const SUBSCRIPTIONS_KEY = 'realtube_subscriptions';

export const getSubscriptions = (): Channel[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(SUBSCRIPTIONS_KEY);
  if (!stored) return [];
  
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const isSubscribed = (channelId: string): boolean => {
  const subscriptions = getSubscriptions();
  return subscriptions.some(sub => sub.id === channelId);
};

export const subscribe = (channel: Channel): void => {
  const subscriptions = getSubscriptions();
  
  if (!isSubscribed(channel.id)) {
    subscriptions.push(channel);
    localStorage.setItem(SUBSCRIPTIONS_KEY, JSON.stringify(subscriptions));
  }
};

export const unsubscribe = (channelId: string): void => {
  const subscriptions = getSubscriptions();
  const filtered = subscriptions.filter(sub => sub.id !== channelId);
  localStorage.setItem(SUBSCRIPTIONS_KEY, JSON.stringify(filtered));
};

export const getSubscribedChannels = (): Channel[] => {
  return getSubscriptions();
};
