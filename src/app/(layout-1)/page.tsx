import Home from "@/components/home/Home";
import { seo } from "@/utils/seo";

export const metadata = seo.home;

export default async function Page() {
  
  return (
    <>
      <Home/>
    </>
  );
}
