// Fires a Google Analytics 4 event
export function trackEvent(
  action: string,
  category: string,
  label?: string,
) {
  if (typeof window === 'undefined' || !(window as any).gtag) return;
  (window as any).gtag('event', action, {
    event_category: category,
    event_label: label,
  });
}

// Shorthand helpers
export const track = {
  whatsapp: (label: string) => trackEvent('whatsapp_click', 'Conversion', label),
  phone:    (label: string) => trackEvent('phone_click',    'Conversion', label),
  form:     (label: string) => trackEvent('form_submit',    'Conversion', label),
  carView:  (label: string) => trackEvent('car_view',       'Engagement', label),
};
