import Layout1 from "../../components/layout/Layout1";

export default function RootLayout({ children }: any) {
  return (
    <>
      <Layout1>{children}</Layout1>
    </>
  );
}
