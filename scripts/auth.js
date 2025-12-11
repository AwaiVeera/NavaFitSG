const AUTH_STORAGE_KEY = 'navafitUser';
const redirectParam = new URLSearchParams(window.location.search).get('redirect');
let firebaseApp;
let firebaseAuth;
let emailMode = 'signIn';

const firebaseConfig = {
  apiKey: "AIzaSyDjZaPepgushiuRtEKDX5Pb5wc0pxQ4dEU",
  authDomain: "adenaya-d37da.firebaseapp.com",
  projectId: "adenaya-d37da",
  storageBucket: "adenaya-d37da.firebasestorage.app",
  messagingSenderId: "685300496749",
  appId: "1:685300496749:web:1e48df6eec12424b460264",
  measurementId: "G-JTLFELS7HL"
};

function persistUser(user) {
  if (!user) return;
  const payload = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    provider: user.providerData?.[0]?.providerId || 'password',
    timestamp: Date.now()
  };
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(payload));
}

function redirectAfterAuth() {
  const target = redirectParam || 'index.html';
  window.location.href = target;
}

function showStatus(message, variant = 'info') {
  const statusNode = document.querySelector('[data-auth-status]');
  if (!statusNode) return;
  statusNode.textContent = message;
  statusNode.dataset.variant = variant;
}

async function ensureFirebase() {
  if (firebaseApp) return { firebaseAuth };
  const [{ initializeApp }] = await Promise.all([
    import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'),
  ]);
  const [{ getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, OAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword }] = await Promise.all([
    import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js')
  ]);

  firebaseApp = initializeApp(firebaseConfig);
  firebaseAuth = getAuth(firebaseApp);
  firebaseAuth.languageCode = 'en';

  const providers = {
    google: new GoogleAuthProvider(),
    apple: new OAuthProvider('apple.com')
  };
  providers.apple.addScope('email');
  providers.apple.addScope('name');

  onAuthStateChanged(firebaseAuth, (user) => {
    if (user) {
      persistUser(user);
      showStatus('Authenticated as ' + (user.displayName || user.email), 'success');
      setTimeout(redirectAfterAuth, 800);
    }
  });

  return {
    firebaseAuth,
    providers,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
  };
}

function initEmailModeToggle() {
  const toggle = document.querySelector('[data-email-mode-toggle]');
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    emailMode = emailMode === 'signIn' ? 'signUp' : 'signIn';
    toggle.textContent = emailMode === 'signIn' ? 'Need an account? Switch to Sign Up' : 'Already have an account? Sign In';
    const label = document.querySelector('[data-email-mode-label]');
    if (label) label.textContent = emailMode === 'signIn' ? 'Sign In with Email' : 'Sign Up with Email';
  });
}

async function handleGoogleSignIn() {
  try {
    const { providers, signInWithPopup } = await ensureFirebase();
    await signInWithPopup(firebaseAuth, providers.google);
  } catch (error) {
    console.error('Google auth failed', error);
    showStatus(error.message || 'Google login failed', 'error');
  }
}

async function handleAppleSignIn() {
  try {
    const { providers, signInWithPopup } = await ensureFirebase();
    await signInWithPopup(firebaseAuth, providers.apple);
  } catch (error) {
    console.error('Apple auth failed', error);
    showStatus(error.message || 'Apple login failed', 'error');
  }
}

async function handleEmailSubmit(event) {
  event.preventDefault();
  const email = document.getElementById('emailInput')?.value;
  const password = document.getElementById('passwordInput')?.value;
  if (!email || !password) {
    showStatus('Email and password required', 'error');
    return;
  }
  try {
    const { signInWithEmailAndPassword, createUserWithEmailAndPassword } = await ensureFirebase();
    if (emailMode === 'signUp') {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
      showStatus('Account created successfully', 'success');
    } else {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      showStatus('Welcome back', 'success');
    }
  } catch (error) {
    console.error('Email auth failed', error);
    showStatus(error.message || 'Authentication failed', 'error');
  }
}

function hydrateUserSummary() {
  const stored = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!stored) return;
  try {
    const user = JSON.parse(stored);
    const summary = document.querySelector('[data-auth-summary]');
    if (summary) {
      summary.innerHTML = `<p class="text-sm text-gray-400">Signed in as</p><p class="text-lg">${user.displayName || user.email}</p>`;
    }
  } catch (error) {
    console.warn('Failed to parse stored user', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const googleBtn = document.querySelector('[data-auth-google]');
  const appleBtn = document.querySelector('[data-auth-apple]');
  const emailForm = document.querySelector('[data-auth-email-form]');

  googleBtn?.addEventListener('click', handleGoogleSignIn);
  appleBtn?.addEventListener('click', handleAppleSignIn);
  emailForm?.addEventListener('submit', handleEmailSubmit);

  initEmailModeToggle();
  hydrateUserSummary();
});
