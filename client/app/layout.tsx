import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import RootLayoutWrapper from "./layout-wrapper";
import RootServer from "./root-server";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RootLayoutWrapper server={<RootServer/>}>
      {children}
    </RootLayoutWrapper> 
  );
}
