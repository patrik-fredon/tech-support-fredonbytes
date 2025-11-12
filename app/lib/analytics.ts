/**
 * Plausible Analytics Helper
 * Provides type-safe event tracking for Plausible Analytics
 */

declare global {
  interface Window {
    plausible?: (
      eventName: string,
      options?: {
        props?: Record<string, string | number | boolean>;
        revenue?: { currency: string; amount: number };
        callback?: () => void;
      }
    ) => void;
  }
}

/**
 * Track a custom event in Plausible Analytics
 */
export function trackEvent(
  eventName: string,
  props?: Record<string, string | number | boolean>
): void {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(eventName, { props });
  }
}

/**
 * Track a pageview with custom properties
 */
export function trackPageview(
  props?: Record<string, string | number | boolean>
): void {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible('pageview', { props });
  }
}

/**
 * Track a revenue event
 */
export function trackRevenue(
  eventName: string,
  amount: number,
  currency: string = 'CZK',
  props?: Record<string, string | number | boolean>
): void {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(eventName, {
      props,
      revenue: { currency, amount },
    });
  }
}

/**
 * Predefined event trackers for common actions
 */
export const analytics = {
  // Support form events
  supportForm: {
    submitted: (category: string) =>
      trackEvent('Support Form Submitted', { category }),
    error: (error: string) =>
      trackEvent('Support Form Error', { error }),
  },

  // File download tracking
  fileDownload: (fileName: string) =>
    trackEvent('File Download', { file: fileName }),

  // Outbound link tracking
  outboundLink: (url: string) =>
    trackEvent('Outbound Link Click', { url }),

  // Language switch tracking
  languageSwitch: (from: string, to: string) =>
    trackEvent('Language Changed', { from, to }),

  // Theme switch tracking
  themeSwitch: (theme: string) =>
    trackEvent('Theme Changed', { theme }),

  // Error tracking
  error: (errorType: string, message: string) =>
    trackEvent('Error Occurred', { type: errorType, message }),
};
