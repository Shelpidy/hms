import AnimatableScroll from "@/components/AnimatableScroll";
import CustomDropDown from "@/components/CustomDropDown";
import Image from "next/image";
import {
  blogPageBannerItems as homeBannerItems,
} from "@/utils/data";
import AboutSection from "@/components/AboutSection";
import ContactUs from "@/components/ContactUsSection";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";

// ECEEF4

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pb-5 px-5">
      <Banner items={homeBannerItems} />
      <AnimatableScroll>
        <AboutSection imageUrl='https://picsum.photos/300/300'/>
      </AnimatableScroll>
      <AnimatableScroll>
          <ContactUs/>
      </AnimatableScroll>
     

      <code>let name = `&quot`Mohamed | Dennis</code>
    </main>
  );
}
