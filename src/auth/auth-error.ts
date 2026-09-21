// ----------------------------------------------------------------------

// Supabase returns its errors in English. Translate the ones people actually run into;
// anything else is shown as-is.
const KNOWN_ERRORS: [RegExp, string][] = [
  [/invalid login credentials/i, 'errors.invalidCredentials'],
  [/email not confirmed/i, 'errors.emailNotConfirmed'],
  [/already registered/i, 'errors.userAlreadyRegistered'],
  [/rate limit|too many requests|for security purposes/i, 'errors.tooManyRequests'],
];

export function authErrorMessage(error: unknown, t: (key: string) => string): string {
  const message =
    typeof error === 'string' ? error : ((error as { message?: string })?.message ?? '');

  const known = KNOWN_ERRORS.find(([pattern]) => pattern.test(message));

  return known ? t(known[1]) : message;
}
