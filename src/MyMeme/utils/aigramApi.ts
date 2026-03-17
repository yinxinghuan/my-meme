/**
 * Aigram API Service
 * Handles communication with AIgram telegram mini-app APIs
 */

export interface TelegramUser {
  id: number;
  telegram_id: string;
  name: string;
  sex: 0 | 1 | 2; // 0: other, 1: male, 2: female
  head_url: string;
  introduction: string;
  avatar_describe: string | null;
  invite_code: string;
  invite_url: string;
  invite_text: string;
  fans_num: number;
  follow: boolean;
}

export interface UserInfoResponse {
  retcode: number;
  errcode: number;
  msg: string;
  data: TelegramUser;
}

export interface ContactsResponse {
  retcode: number;
  errcode: number;
  msg: string;
  data: TelegramUser[];
}

interface ApiRequest {
  url: string;
  method: 'GET' | 'POST';
  data: any;
  request_id: string;
  emitter: string;
}

interface ApiResult {
  request_id: string;
  success: boolean;
  data?: any;
  error?: string;
}

/**
 * Get URL parameters from query string
 */
function getQueryParam(name: string): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

/**
 * Get API origin from URL parameters
 * @returns API origin URL or null if not found
 */
export function getApiOrigin(): string | null {
  return getQueryParam('api_origin');
}

/**
 * Get Telegram ID from URL parameters
 * @returns Telegram ID or null if not found
 */
export function getTelegramId(): string | null {
  return getQueryParam('telegram_id');
}

/**
 * Helper function to encode to base64
 */
function toBase64(str: string): string {
  if (typeof window !== 'undefined' && (window as any).Base64) {
    return (window as any).Base64.toBase64(str);
  }
  // Fallback for environments without base64.js
  return btoa(unescape(encodeURIComponent(str)));
}

/**
 * Helper function to decode from base64
 */
function fromBase64(str: string): string {
  if (typeof window !== 'undefined' && (window as any).Base64) {
    return (window as any).Base64.fromBase64(str);
  }
  // Fallback for environments without base64.js
  return decodeURIComponent(escape(atob(str)));
}

/**
 * Call AIgram API using postMessage
 */
function callApi(
  apiOrigin: string,
  requestData: ApiRequest
): Promise<any> {
  return new Promise((resolve, reject) => {
    const requestId = requestData.request_id;
    console.log(`[AIgram API] Calling ${requestData.url.split('?')[0]} with request_id=${requestId}`);

    // Set up listener for response
    const handleMessage = (event: MessageEvent) => {
      const message = event.data;
      if (typeof message === 'string' && message.startsWith('callAPIResult-')) {
        try {
          const encodedResult = message.substring('callAPIResult-'.length);
          const resultJson = fromBase64(encodedResult);
          const result: ApiResult = JSON.parse(resultJson);

          if (result.request_id === requestId) {
            window.removeEventListener('message', handleMessage);
            console.log(`[AIgram API] Response received for request_id=${requestId}`, result);
            if (result.success) {
              resolve(result.data);
            } else {
              reject(new Error(result.error || 'API call failed'));
            }
          }
        } catch (err) {
          // ignore parse errors from unrelated messages
          console.debug('[AIgram API] Ignoring non-API message:', message.substring(0, 50));
        }
      }
    };

    window.addEventListener('message', handleMessage);

    // Send request — AIgram SDK runs in same window context
    try {
      const encodedRequest = toBase64(JSON.stringify(requestData));
      console.log(`[AIgram API] Sending request to ${apiOrigin}:`, requestData);
      // Use '*' to allow any origin to receive (AIgram SDK will handle it)
      window.postMessage(`callAPI-${encodedRequest}`, '*');
    } catch (error) {
      window.removeEventListener('message', handleMessage);
      console.error('[AIgram API] Error encoding request:', error);
      reject(error);
    }

    // Timeout after 30 seconds
    setTimeout(() => {
      window.removeEventListener('message', handleMessage);
      console.error(`[AIgram API] Request timeout for request_id=${requestId}`);
      reject(new Error('API call timeout'));
    }, 30000);
  });
}

/**
 * Get user info by Telegram ID
 */
export async function getUserInfo(
  telegramId: string,
  apiOrigin: string
): Promise<TelegramUser> {
  const request: ApiRequest = {
    url: `/note/telegram/user/get/info/by/telegram_id?telegram_id=${telegramId}`,
    method: 'GET',
    data: null,
    request_id: crypto.randomUUID(),
    emitter: window.location.origin,
  };

  try {
    const response = await callApi(apiOrigin, request);
    return response as TelegramUser;
  } catch (error) {
    console.error('[AIgram API] Failed to get user info:', error);
    throw error;
  }
}

/**
 * Get user's contacts/friends list
 */
export async function getContactsList(
  telegramId: string,
  apiOrigin: string
): Promise<TelegramUser[]> {
  const request: ApiRequest = {
    url: `/note/telegram/user/contact/list?telegram_id=${telegramId}`,
    method: 'GET',
    data: null,
    request_id: crypto.randomUUID(),
    emitter: window.location.origin,
  };

  try {
    const response = await callApi(apiOrigin, request);
    return response as TelegramUser[];
  } catch (error) {
    console.error('[AIgram API] Failed to get contacts list:', error);
    throw error;
  }
}

/**
 * Check if APIs are available
 */
export function isApiAvailable(): boolean {
  return getApiOrigin() !== null && getTelegramId() !== null;
}
