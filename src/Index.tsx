
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
        <div className='carousel-main'>
          <Carousel className='custom-carousel'>
            <Carousel.Item>
              <img className='d-block w-100' src='/src/assets/vaca.jpg' alt='First' />
              <Carousel.Caption>
                <h1>Vaquitas muuuy felices!</h1>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className='d-block w-100' src='/src/assets/vaca2.jpg' alt='Second' />
              <Carousel.Caption>
                <h1>Vaquitas muuuy felices!</h1>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className='d-block w-100' src='/src/assets/vaca3.jpg' alt='Third' />
              <Carousel.Caption>
                <h1>Vaquitas muuuy felices!</h1>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Index;
