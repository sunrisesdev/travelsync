import type { Metadata } from 'next';
import 'normalize.css';

export const metadata: Metadata = {
  title: 'Travelsync',
  description:
    'Magna sunt amet anim est nulla cupidatat mollit aliqua amet occaecat. Et laboris consequat do do eu ipsum esse id veniam aliquip proident magna deserunt fugiat. Lorem aliquip eiusmod incididunt ipsum ad laborum nostrud tempor. Exercitation magna aliquip proident quis veniam amet duis dolore magna culpa fugiat. Ullamco quis deserunt elit laboris tempor laborum anim exercitation sint commodo irure aliqua sunt.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='de'>
      <body>{children}</body>
    </html>
  );
}
