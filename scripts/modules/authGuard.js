const AUTH_STORAGE_KEY = 'navafitUser';
const LOCAL_PREVIEW_HOSTS = new Set(['localhost', '127.0.0.1']);

function getDefaultWindow(candidate) {
    if (candidate) return candidate;
    if (typeof window !== 'undefined') return window;
    return undefined;
}

function getDefaultDocument(candidate) {
    if (candidate) return candidate;
    if (typeof document !== 'undefined') return document;
    return undefined;
}

function getStorage(win = getDefaultWindow()) {
    if (win && win.localStorage) {
        return win.localStorage;
    }
    return {
        getItem: () => null,
        removeItem: () => {}
    };
}

export function getStoredUser(storage = getStorage()) {
    const payload = storage.getItem(AUTH_STORAGE_KEY);
    if (!payload) return null;
    try {
        return JSON.parse(payload);
    } catch (error) {
        console.warn('Invalid auth payload', error);
        return null;
    }
}

export function shouldEnforceAuth(hostname, protocol, config) {
    const isLocalHost = LOCAL_PREVIEW_HOSTS.has(hostname) || protocol === 'file:';
    if (isLocalHost) return false;
    return Boolean(config ? .enforceAuth);
}

export function buildLoginRedirect(locationLike, targetHref) {
    if (!locationLike) {
        throw new Error('location is required to build login redirect');
    }
    const redirectURL = new URL('login.html', locationLike.origin || locationLike.href);
    const fallbackPath = (locationLike.pathname || '') + (locationLike.search || '');
    redirectURL.searchParams.set('redirect', targetHref ? targetHref : fallbackPath);
    return redirectURL.toString();
}

export function createAuthState(options = {}) {
    const win = getDefaultWindow(options.window);
    const storage = options.storage || getStorage(win);
    return {
        get user() {
            return getStoredUser(storage);
        },
        isAuthenticated() {
            return Boolean(this.user);
        },
        logout() {
            storage.removeItem(AUTH_STORAGE_KEY);
            if (win ? .location) {
                win.location.href = 'login.html';
            }
        }
    };
}

export const authState = createAuthState();

function createRouter(win = getDefaultWindow()) {
    if (!win ? .location) {
        return () => {};
    }
    return (targetHref) => {
        win.location.href = buildLoginRedirect(win.location, targetHref);
    };
}

export function guardLinks(doc = getDefaultDocument(), auth = authState, routeToLogin = createRouter()) {
    if (!doc) return;
    const guarded = doc.querySelectorAll('[data-auth-guard]');
    guarded.forEach(link => {
        link.addEventListener('click', (event) => {
            if (auth.isAuthenticated()) return;
            event.preventDefault();
            const target = link.getAttribute('href');
            routeToLogin(target || undefined);
        });
    });
}

export function enforcePageAccess(win = getDefaultWindow(), auth = authState, routeToLogin = createRouter(win)) {
    if (!win ? .location) return;
    const shouldGate = shouldEnforceAuth(
        win.location.hostname || '',
        win.location.protocol || '',
        win.NavaFitAuthConfig
    );
    if (!shouldGate) return;
    if (auth.isAuthenticated()) return;
    const current = (win.location.pathname || '') + (win.location.search || '');
    routeToLogin(current);
}

export function injectUserBadge(doc = getDefaultDocument(), auth = authState) {
    if (!doc) return;
    const badge = doc.querySelector('[data-auth-user]');
    if (!badge) return;
    if (!auth.isAuthenticated()) {
        badge.textContent = 'Guest';
        return;
    }
    const user = auth.user;
    badge.textContent = user ? .displayName || user ? .email || 'Member';
}

export function initAuthGuard(context = {}) {
    const doc = getDefaultDocument(context.document);
    const win = getDefaultWindow(context.window);
    const router = createRouter(win);

    guardLinks(doc, authState, router);
    enforcePageAccess(win, authState, router);
    injectUserBadge(doc, authState);

    if (win) {
        win.NavaFitAuth = authState;
    }

    return {
        guardLinks,
        enforcePageAccess,
        injectUserBadge
    };
}

export const __testing = {
    getDefaultWindow,
    getDefaultDocument,
    getStorage,
    createRouter
};