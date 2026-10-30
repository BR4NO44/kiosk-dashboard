import './globals.css';

export const metadata = {
  title: 'Smart Kiosk Dashboard',
  description: 'Michalovce Smart Wall Kiosk Interface',
};

export default function RootLayout({ children }) {
  return (
    <html lang="sk">
      <body>{children}</body>
    </html>
  );
}