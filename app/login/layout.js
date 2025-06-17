/**
 * Layout component for login page
 * Configures metadata and viewport settings
 */

export const metadata = {
    title: 'Log In | Pathway Infinity',
    description: 'Log in to your Pathway Infinity account to access personalized career guidance.',
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
};

export default function LoginLayout({ children }) {
    return children;
}
