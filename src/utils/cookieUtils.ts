interface CookieOptions {
  expires?: Date;
  maxAge?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  httpOnly?: boolean;
}

class CookieService {
  /**
   * Set a cookie with the given name, value, and options
   */
  set(name: string, value: string, options: CookieOptions = {}): void {
    const {
      expires,
      maxAge,
      path = '/',
      domain,
      secure = window.location.protocol === 'https:',
      sameSite = 'lax'
    } = options;

    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (expires) {
      cookieString += `; expires=${expires.toUTCString()}`;
    }

    if (maxAge) {
      cookieString += `; max-age=${maxAge}`;
    }

    if (path) {
      cookieString += `; path=${path}`;
    }

    if (domain) {
      cookieString += `; domain=${domain}`;
    }

    if (secure) {
      cookieString += '; secure';
    }

    if (sameSite) {
      cookieString += `; samesite=${sameSite}`;
    }

    document.cookie = cookieString;
  }

  /**
   * Get a cookie value by name
   */
  get(name: string): string | null {
    const nameEQ = `${encodeURIComponent(name)}=`;
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1, cookie.length);
      }
      if (cookie.indexOf(nameEQ) === 0) {
        return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
      }
    }
    return null;
  }

  /**
   * Remove a cookie by setting its expiration to the past
   */
  remove(name: string, options: CookieOptions = {}): void {
    const { path = '/', domain } = options;
    
    // Set expiration to past date to remove the cookie
    const pastDate = new Date(0);
    this.set(name, '', { ...options, expires: pastDate, path, domain });
  }

  /**
   * Check if a cookie exists
   */
  exists(name: string): boolean {
    return this.get(name) !== null;
  }

  /**
   * Get all cookies as an object
   */
  getAll(): Record<string, string> {
    const cookies: Record<string, string> = {};
    const cookieArray = document.cookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
      const cookie = cookieArray[i].trim();
      const [name, value] = cookie.split('=');
      if (name && value) {
        cookies[decodeURIComponent(name)] = decodeURIComponent(value);
      }
    }

    return cookies;
  }

  /**
   * Clear all cookies (use with caution)
   */
  clearAll(): void {
    const cookies = this.getAll();
    Object.keys(cookies).forEach(name => {
      this.remove(name);
    });
  }
}

// Create and export a singleton instance
export const cookieService = new CookieService();

// Export the class for testing or custom instances
export { CookieService };

// Convenience functions for common use cases
export const setAuthCookie = (name: string, value: string, days: number = 30): void => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  
  cookieService.set(name, value, {
    expires,
    path: '/',
    secure: window.location.protocol === 'https:',
    sameSite: 'lax'
  });
};

export const getAuthCookie = (name: string): string | null => {
  return cookieService.get(name);
};

export const removeAuthCookie = (name: string): void => {
  cookieService.remove(name, { path: '/' });
};
