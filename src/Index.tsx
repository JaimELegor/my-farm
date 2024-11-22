
import Footer from './Footer';
import Header from './Header';
import { Carousel } from 'react-bootstrap';

function Index() {
  return (
    <>
      <Header tabs={true} />
      <div className='index'>
        <h4>Registrate! Comienza a disfrutar de nuestra granja virtual</h4>
        <h2>Noticias MyFarm</h2>
        <Carousel className='custom-carousel'>
          <Carousel.Item>
            <img className='d-block w-100' src='vaca.jpg' alt='First' />
          </Carousel.Item>
          <Carousel.Item>
            <img className='d-block w-100' src='vaca2.jpg' alt='Second' />
          </Carousel.Item>
          <Carousel.Item>
            <img className='d-block w-100' src='vaca3.jpg' alt='Third' />
          </Carousel.Item>
        </Carousel>
      </div>
      <Footer />
    </>
  );
}

export default Index;
