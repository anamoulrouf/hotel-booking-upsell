// Lazy env accessors for the delivery plumbing (M7): values are read at call
// time so tests can point RESEND_BASE_URL / SEARCH_BASE_URL at stubs and
// unset keys mid-test. Each accessor returns the string or undefined.

export const RESEND_API_KEY = () => process.env.RESEND_API_KEY;
export const RESEND_BASE_URL = () => process.env.RESEND_BASE_URL;
export const EMAIL_FROM = () => process.env.EMAIL_FROM || "Booking Upsell Report <reports@uplayer.agency>";
export const SALES_ALERT_EMAIL = () => process.env.SALES_ALERT_EMAIL;
export const CRM_WEBHOOK_URL = () => process.env.CRM_WEBHOOK_URL;
export const SCHEDULER_URL = () => process.env.SCHEDULER_URL;
export const APP_URL = () => process.env.APP_URL || "http://localhost:3000";
