import Providers from './providers';
import '../styles/globals.css';

export const metadata = {
  title: 'Correo',
  description: 'Correo is an email client for busy techies',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
