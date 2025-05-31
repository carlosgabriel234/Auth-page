
import "./globals.css";



export const metadata = {
  title: "Register",
  description: "AuthPage",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body >
        {children}
      </body>
    </html>
  );
}
