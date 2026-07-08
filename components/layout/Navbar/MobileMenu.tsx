"use client"
import React, { useState } from 'react'
import { AlignLeft } from 'lucide-react'
import SideMenu from './SideMenu'

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
   <button onClick = {() => setIsOpen(!isOpen)}>
    <AlignLeft className="hover:text-accent hoverEffect md:hidden
    hover:cursor-pointer" />
   </button>
   <div className="md:hidden">
   <SideMenu isOpen={isOpen} 
   onClose={() => setIsOpen(false)} />
   </div>
   </>
  )
}

export default MobileMenu