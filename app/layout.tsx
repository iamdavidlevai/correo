import Providers from './providers';
import '../styles/globals.css';

export const metadata = {
  title: 'Correo',
  description: 'Correo is an email client for busy techies',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full bg-gray-100">
      <head />
      <body className="h-full overflow-hidden">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
