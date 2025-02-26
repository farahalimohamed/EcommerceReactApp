import CategorySlider from "../../Components/CategorySlider/CategorySlider";
import LatestProducts from "../../Components/LatestProducts/LatestProducts";
import Hero from "../../Components/Hero/Hero";
import { Helmet } from "react-helmet";
export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Fresh Market</title>
      </Helmet>
      <div className="container">
        <Hero />
        <CategorySlider />
        <LatestProducts />
      </div>
    </div>
  );
}
