'use client';

import Script from 'next/script';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';

export type TurnstileFieldHandle = {
  /** Run the challenge and return a fresh single-use token (for payment submits). */
  getToken: () => Promise<string>;
  reset: () => void;
};

type TurnstileFieldProps = {
  onTokenChange: (token: string) => void;
  /** When true, the challenge runs only when getToken() is called (avoids expired tokens). */
  executeOnSubmit?: boolean;
};

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          'expired-callback'?: () => void;
          'error-callback'?: () => void;
          theme?: 'light' | 'dark' | 'auto';
          size?: 'normal' | 'compact' | 'flexible';
          execution?: 'render' | 'execute';
        },
      ) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId: string) => void;
      execute: (widgetId: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

const isDev = process.env.NODE_ENV === 'development';
const TOKEN_TIMEOUT_MS = 30_000;

export const TurnstileField = forwardRef<TurnstileFieldHandle, TurnstileFieldProps>(
  function TurnstileField({ onTokenChange, executeOnSubmit = false }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);
    const onTokenChangeRef = useRef(onTokenChange);
    const pendingTokenRef = useRef<{
      resolve: (token: string) => void;
      reject: (error: Error) => void;
    } | null>(null);
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

    useEffect(() => {
      onTokenChangeRef.current = onTokenChange;
    }, [onTokenChange]);

    const settlePending = useCallback((token: string | null, error?: Error) => {
      const pending = pendingTokenRef.current;
      if (!pending) {
        return;
      }
      pendingTokenRef.current = null;
      if (token) {
        pending.resolve(token);
      } else {
        pending.reject(error ?? new Error('Turnstile challenge failed'));
      }
    }, []);

    const renderWidget = useCallback(() => {
      if (!containerRef.current || !siteKey || !window.turnstile || widgetIdRef.current) {
        return;
      }

      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        theme: 'light',
        size: 'flexible',
        execution: executeOnSubmit ? 'execute' : 'render',
        callback: (token) => {
          onTokenChangeRef.current(token);
          settlePending(token);
        },
        'expired-callback': () => {
          onTokenChangeRef.current('');
          settlePending(null, new Error('Turnstile token expired'));
        },
        'error-callback': () => {
          onTokenChangeRef.current('');
          settlePending(null, new Error('Turnstile widget error'));
        },
      });
    }, [executeOnSubmit, settlePending, siteKey]);

    const resetWidget = useCallback(() => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
      }
      onTokenChangeRef.current('');
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        getToken: () =>
          new Promise((resolve, reject) => {
            if (isDev || !siteKey) {
              resolve('dev-bypass');
              return;
            }

            if (!widgetIdRef.current || !window.turnstile) {
              reject(new Error('Turnstile not ready'));
              return;
            }

            if (pendingTokenRef.current) {
              reject(new Error('Turnstile challenge already in progress'));
              return;
            }

            const timeoutId = window.setTimeout(() => {
              settlePending(null, new Error('Turnstile timeout'));
            }, TOKEN_TIMEOUT_MS);

            pendingTokenRef.current = {
              resolve: (token) => {
                window.clearTimeout(timeoutId);
                resolve(token);
              },
              reject: (error) => {
                window.clearTimeout(timeoutId);
                reject(error);
              },
            };

            window.turnstile.execute(widgetIdRef.current);
          }),
        reset: resetWidget,
      }),
      [resetWidget, settlePending, siteKey],
    );

    useEffect(() => {
      if (isDev || !siteKey) {
        return;
      }

      window.onTurnstileLoad = renderWidget;
      renderWidget();

      return () => {
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        }
      };
    }, [renderWidget, siteKey]);

    if (isDev || !siteKey) {
      return null;
    }

    return (
      <>
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad"
          strategy="afterInteractive"
        />
        <div ref={containerRef} className="form-turnstile" aria-label="Vérification anti-spam" />
      </>
    );
  },
);
