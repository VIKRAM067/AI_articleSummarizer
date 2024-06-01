import React from 'react'
import logo from './assets/logo.png'
import logo1 from './assets/Infinity_logo.png'

const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav className='flex justify-between items-center w-full mb-10  '>
        <img src={logo} alt='summarizer_Logo' className='w-32 object-contain'/>
       
      </nav>
      <h1 className='head_text'>
        AI article Summarizer using <br className='max-md:hidden'/>
        <span className='orange_gradient'>Rapid API</span>
      </h1>
      <h2 className='desc'>
        Condense big articles and reports into concise and clear with the help of Rapid 
        article-extractor-and-summarizer Api Which intends to generates the ouput rapidly indeed.  
      </h2>
    </header>
  )
}

export default Hero