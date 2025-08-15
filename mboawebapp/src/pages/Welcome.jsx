//import { useState } from 'react';
import MboaEvent from '../components/mboaevent/index';
import Hero from '../components/hero/index';
import Feature from '../components/features/index';
import Faq from '../components/faq/index';
import CircleTestimonials from '../components/faq/Faq';
import WaitingList from '../components/waitinglist';
import Footer from '../components/footer';

function Welcome() {
  return (
      <div>
        <MboaEvent/>
        <Hero/>
        <Feature/>
        <Faq/>
        <CircleTestimonials/>          
        <WaitingList/>
        <Footer/>
      </div>
      
  )
}

export default Welcome
