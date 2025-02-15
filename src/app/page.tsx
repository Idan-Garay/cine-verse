"use client"
import { Card, CardContent } from '@/components/ui/card';
import DATA from './data.json'
import { Input } from '@/components/ui/input';
import GradientMoon from "./GradientMoon";
import Image from 'next/image';
import CineverseLogo from "./../../public/cineverse-logo.png"
import { cn } from '@/lib/utils';
import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react"

export default function Home() {
  const { scrollY } = useScroll()
  const scrollYValue = useSpring(100, { duration: 0.8, stiffness: 50 })

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const searchSection = document.querySelector('#catch-phrase');
      if (searchSection) {
        searchSection.scrollIntoView({ behavior: 'smooth', });
      }
    }
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    const invertedScrollYValue = Math.max(0, 100 - latest)
    scrollYValue.set(invertedScrollYValue < 0.5 ? 0 : invertedScrollYValue)
  })

  return (
    <div className="hero-content min-h-screen flex flex-col bg-black text-white">
      <div className="flex flex-col items-center">
        <div className="relative w-screen h-[800px] sm:h-[1600px] overflow-hidden">
          <div className="absolute w-screen h-[1020px]"
            style={{
              background: 'url("https://r0yywfiqn7.ufs.sh/f/YrzlcDBoZLWDB6MGArhcpWxf9Zr2ohmNYJTkKX4M6IGAjEiR") no-repeat center',
              backgroundSize: '100% 100%',
              flexShrink: 0
            }}
          >
          </div>
          <div className="w-[1459px] h-[1461px] top-[186px] sm:top-[184px]  relative left-1/2 -translate-x-1/2  ">
            <div className="size-full relative"
              style={{
                transform: 'rotate(180deg)',
                zIndex: 4,
                flexShrink: 0,
                borderRadius: '100%',
                opacity: 0.4,
                mixBlendMode: 'luminosity',
                rotate: '180deg',
                background: 'radial-gradient(60.42% 60.42% at 50.02% 60.42%, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.00) 69.42%, rgba(255, 255, 255, 0.08) 75.33%, rgba(255, 255, 255, 0.13) 80.42%, rgba(255, 255, 255, 0.31) 86.39%, rgba(255, 255, 255, 0.57) 92.19%, #FFF 100%)',
                boxShadow: '0px -20px 40px 0px rgba(255, 255, 255, 0.60)'
              }}>
              <GradientMoon />
              <div className="absolute bottom-0 w-full h-96 bg-gradient-to-t from-black to-transparent"></div>
            </div>
            <div className="absolute z-50 left-1/2 -translate-x-1/2 -top-8 flex flex-col items-center ">
              <div className="relative size-20">
                <Image src={CineverseLogo} unoptimized alt="logo" fill className=' rounded-full overflow-hidden' />
              </div>
              <h2 className="text-white text-xl sm:text-2xl text-center font-sans font-semibold">Cineverse</h2>
            </div>
          </div>
        </div>
        <div className="absolute top-[284px] sm:top-[286px] flex flex-col items-center gap-8 sm:gap-12 px-6 sm:p-0">
          <motion.p
            id="catch-phrase"
            style={{
              height: scrollYValue,
              opacity: scrollYValue
            }}
            className={cn("w-full h-fit sm:w-[50%] origin-top text-3xl sm:text-5xl font-bold text-center mt-6 sm:mt-12 bg-gradient-to-r from-white via-gray-50 to-transparent bg-clip-text text-transparent")}>A search away from your favorite movie</motion.p>

          <div
            key="input-search"
            className="flex justify-center items-center w-full transition-all"
          >
            <Input onKeyDown={handleKeyPress} placeholder='Search a movie' className='w-auto  min-w-full sm:min-w-[40%] rounded-full h-12 text-white text-xl font-medium font-sans' />
          </div>
          <div id="movie-contents" className="flex flex-wrap justify-center p-8 pb-20 gap-16 sm:p-20 sm:pt-8 font-[family-name:var(--font-geist-sans)]">
            {DATA.map((item, index) => (
              <Card key={index} className="card  overflow-hidden rounded border-none">
                <CardContent className='relative h-72 w-48'>
                  <Image src={item.Poster} alt="poster" fill className='' />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div >
  );
}
