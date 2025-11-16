import React from 'react'
import Navbar from '../../Components/Landing/Navbar'
import Hero from '../../Components/Landing/Hero'
import Fonctionnalite from '../../Components/Landing/Fonctionalite'
import Offres from '../../Components/Landing/Offres'
import Footer from '../../Components/Landing/Footer'

const Landing = () => {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar />
            <Hero /> 
           <Fonctionnalite /> 
           <Offres /> 
           <Footer /> 

        </div>
    )
}

export default Landing
