import Layout1 from "../../components/layout/Layout1";

export default function RootLayout({ children }: {children : React.ReactNode}) {
  return (
    <>
      <Layout1>{children}</Layout1>
    </>
  );
}
