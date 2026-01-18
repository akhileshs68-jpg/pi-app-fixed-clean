import "./globals.css";

export const metadata = {
  title: "Pi App",
  description: "Pi Network App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}