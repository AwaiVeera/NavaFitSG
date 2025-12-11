import {
    __testing,
    authState,
    buildLoginRedirect,
    createAuthState,
    enforcePageAccess,
    getStoredUser,
    guardLinks,
    injectUserBadge,
    initAuthGuard,
    shouldEnforceAuth
} from '../../scripts/modules/authGuard.js';

describe('auth guard module', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
        localStorage.clear();
    });

    it('parses a stored user payload safely', () => {
        localStorage.setItem('navafitUser', JSON.stringify({
            email: 'hero@navafit.sg'
        }));
        expect(getStoredUser()).toEqual({
            email: 'hero@navafit.sg'
        });
    });

    it('handles malformed payloads without throwing', () => {
        const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
        localStorage.setItem('navafitUser', '{bad json');
        expect(getStoredUser()).toBeNull();
        expect(warnSpy).toHaveBeenCalled();
    });

    it('throws when building redirects without location data', () => {
        expect(() => buildLoginRedirect(null, '/collectives.html')).toThrow();
    });

    it('skips enforcement for localhost and file previews', () => {
        expect(shouldEnforceAuth('localhost', 'http:', {
            enforceAuth: true
        })).toBe(false);
        expect(shouldEnforceAuth('navafit.sg', 'file:', {
            enforceAuth: true
        })).toBe(false);
        expect(shouldEnforceAuth('navafit.sg', 'https:', {
            enforceAuth: false
        })).toBe(false);
        expect(shouldEnforceAuth('navafit.sg', 'https:', {
            enforceAuth: true
        })).toBe(true);
    });

    it('builds login redirects with explicit targets', () => {
        const locationLike = new URL('https://navafit.sg/nexus');
        const redirect = buildLoginRedirect(locationLike, '/collectives.html');
        const redirectURL = new URL(redirect);
        expect(redirectURL.origin + redirectURL.pathname).toBe('https://navafit.sg/login.html');
        expect(redirectURL.searchParams.get('redirect')).toBe('/collectives.html');
    });

    it('guards links and routes to login when user is missing', () => {
        document.body.innerHTML = `<a href="training.html" data-auth-guard>Training</a>`;
        const router = vi.fn();
        const fakeAuth = {
            isAuthenticated: () => false
        };

        guardLinks(document, fakeAuth, router);

        const link = document.querySelector('a');
        const event = new MouseEvent('click', {
            bubbles: true,
            cancelable: true
        });
        link.dispatchEvent(event);

        expect(event.defaultPrevented).toBe(true);
        expect(router).toHaveBeenCalledWith('training.html');
    });

    it('injects badge label for guests and members', () => {
        document.body.innerHTML = `<span data-auth-user></span>`;
        injectUserBadge(document, authState);
        expect(document.querySelector('[data-auth-user]').textContent).toBe('Guest');

        const customAuth = createAuthState({
            storage: {
                getItem: () => JSON.stringify({
                    displayName: 'Nava Warrior'
                }),
                removeItem: vi.fn()
            },
            window
        });
        injectUserBadge(document, customAuth);
        expect(document.querySelector('[data-auth-user]').textContent).toBe('Nava Warrior');
    });

    it('enforces page access when unauthenticated', () => {
        const route = vi.fn();
        const fakeWin = {
            location: {
                hostname: 'navafit.sg',
                protocol: 'https:',
                pathname: '/training.html',
                search: '?plan=warrior'
            },
            NavaFitAuthConfig: {
                enforceAuth: true
            }
        };
        const fakeAuth = {
            isAuthenticated: () => false
        };

        enforcePageAccess(fakeWin, fakeAuth, route);
        expect(route).toHaveBeenCalledWith('/training.html?plan=warrior');
    });

    it('creates auth state that logs out via window navigation', () => {
        const storage = {
            getItem: () => JSON.stringify({
                email: 'hero@navafit.sg'
            }),
            removeItem: vi.fn()
        };
        const fakeWin = {
            location: {
                href: ''
            }
        };
        const customAuth = createAuthState({
            storage,
            window: fakeWin
        });
        customAuth.logout();
        expect(storage.removeItem).toHaveBeenCalledWith('navafitUser');
        expect(fakeWin.location.href).toBe('login.html');
    });

    it('returns a no-op router when no window location is provided', () => {
        const router = __testing.createRouter({});
        expect(() => router('/training.html')).not.toThrow();
    });

    it('initializes the guard and exposes auth on window', () => {
        document.body.innerHTML = `
            <a href="ai-coach.html" data-auth-guard>AI Coach</a>
            <span data-auth-user></span>
        `;
        const fakeWin = {
            location: {
                hostname: 'navafit.sg',
                protocol: 'https:',
                pathname: '/index.html',
                search: ''
            },
            NavaFitAuthConfig: {
                enforceAuth: false
            }
        };

        initAuthGuard({
            document,
            window: fakeWin
        });
        expect(fakeWin.NavaFitAuth).toBeDefined();
    });

    it('skips guard logic gracefully when document is unavailable', () => {
        const route = vi.fn();
        guardLinks(null, {
            isAuthenticated: () => false
        }, route);
        expect(route).not.toHaveBeenCalled();
    });

    it('does not alter UI when badge is missing', () => {
        document.body.innerHTML = `<div></div>`;
        injectUserBadge(document, authState);
        expect(document.body.textContent).toBe('');
    });

    it('short-circuits enforcement when already authenticated', () => {
        const fakeAuth = {
            isAuthenticated: () => true
        };
        const fakeWin = {
            location: {
                hostname: 'navafit.sg',
                protocol: 'https:',
                pathname: '/',
                search: ''
            },
            NavaFitAuthConfig: {
                enforceAuth: true
            }
        };
        const route = vi.fn();
        enforcePageAccess(fakeWin, fakeAuth, route);
        expect(route).not.toHaveBeenCalled();
    });
});