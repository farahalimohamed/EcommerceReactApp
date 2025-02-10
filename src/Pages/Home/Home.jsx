import CategorySlider from '../../Components/CategorySlider/CategorySlider'
import LatestProducts from '../../Components/LatestProducts/LatestProducts'
import styles from './Home.module.css'
export default function Home() {
  return (
    <div className='container'>
      <CategorySlider/>
      <LatestProducts/>
    </div>
  )
}
