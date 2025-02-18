import React from 'react'
import { Button } from '../components/ui/button'
import background from '../assets/pexels-cottonbro-3584994.jpg'
import logo from '../assets/Creatrium_Logo.png'
import { useNavigate } from 'react-router-dom'
import withAuth from '../high-order-component/withAuth'
import withoutAuth from '../high-order-component/withoutAuth'

function Home() {

  const navigate = useNavigate()

  return (
    <div className='w-screen h-screen overflow-y-auto overflow-x-hidden bg-main grid grid-cols-1 grid-rows-1 justify-items-center'>
      <div className='w-11/12 h-full col-[1] z-[1] flex flex-col gap-14 py-7'>
        <header className='flex h-24 items-center justify-between'>
          <div className='flex items-center gap-3'>
            <img className='w-6' src={`${logo}`}></img>
            <h3 className='text-3xl font-display text-contrast'>Creatrium</h3>
          </div>
          <div className='flex gap-5 items-center'>
            <Button className='bg-contrast' onClick={() => navigate('/register')}>Register</Button>
            <Button onClick={() => navigate('/login')}>Log in</Button>
          </div>
        </header>
        <div className=' w-2/5 h-fit flex flex-col gap-8 items-start'>
          <div className='flex flex-col items-center'>
            <h2 className='text-8xl font-display'>Creatrium</h2>
            <h4 className='text-2xl'>Welcome to Creatrium</h4>
          </div>
          <div>
            <h3 className='text-7xl font-serif leading-tight'>The Project Gallery for Students</h3>
          </div>
          <Button className='bg-contrast h-10 font-[Inter]' onClick={() => navigate('/register')}>Get Started</Button>
        </div>
        {/* insert content about what the app can offer */}
      </div>
      <div className='w-full h-[137vh] flex justify-center items-center bg-cover mix-blend-overlay col-[1]' style={{ backgroundImage: `url(${background})` }}>
      </div>
    </div>
  )
}
export default withoutAuth(Home)