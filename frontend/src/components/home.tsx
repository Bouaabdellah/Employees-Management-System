import Footer from "./footer";
import image from '../imgs/landing-image.png';
import Container from "./utils/container";

function Home() {
  return (
    <div className='flex flex-col min-h-screen'>
    <Container>
    <div className="mb-32 flex justify-center gap-8 md:gap-20 flex-wrap pt-10 items-center">
    <div className="md:basis-[50%]">
      <div className="text-xl md:text-2xl font-bold capitalize scale-y-150 tracking-wide mb-8">
      welcome to our employees management system
      </div>
      <div className="leading-normal text-[18px] md:text-xl md:scale-y-125">
      here you gona find everything about your job, your profile, also you can contact the administration
      </div>
    </div>
    <div>
      <img src={image} alt="welcome_image" className="w-[300px] md:w-[450px] animate-up"/>
    </div>
    </div>
    </Container>
    <Footer/>
    </div>
  )
}

export default Home;