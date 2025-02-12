import CategorySlider from "../../Components/CategorySlider/CategorySlider";
import LatestProducts from "../../Components/LatestProducts/LatestProducts";
import styles from "./Home.module.css";
import Hero from "../../Components/Hero/Hero";
export default function Home() {
  return (
    <div>
      <div className="container">
        <Hero />
        <CategorySlider />
        <LatestProducts />
      </div>
    </div>
  );
}
