import Download from "@/components/download/Download";
import { seo } from "@/utils/seo";

export const metadata = seo.download;

export default function page(){

    return (
    <>
     <Download/>
    </>
    )
}