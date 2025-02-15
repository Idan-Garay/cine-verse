import Image from 'next/image'
import React from 'react'
import gradientMoonIcon from "../../public/gradient-moon.svg"

const GradientMoon = () => {
    return (
        <Image
            src={gradientMoonIcon}
            alt="Gradient Moon"
            fill
            className='size-full object-fit'
        />
    )
}

export default GradientMoon
