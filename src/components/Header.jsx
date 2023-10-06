import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div style={{ backgroundImage: "url('https://www.spacex.com/static/images/backgrounds/dragon_feature.jpg')" }}>
    <div className="bg-gray-900 text-white p-4">
      <nav className="flex items-center justify-between max-w-4xl mx-auto">
        <a href="/" className="text-2xl font-bold hover:text-gray-300 hidden sm:block">SpaceX</a>
        <div className="sm:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>
    </div>

    {/* Mobile Menu */}
    {mobileMenuOpen && (
      <div className="sm:hidden bg-gray-900 text-white py-2 text-center">
      </div>
    )}

      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            DRAGON
          </h1>
          <p className="mt-6 text-lg leading-8 text-white">
            SENDING HUMANS AND CARGO INTO SPACE
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <p className="mt-6 text-lg leading-8 text-white">
              The Dragon spacecraft is capable of carrying up to 7 passengers to and from Earth orbit, 
              and beyond. It is the only spacecraft currently flying that is capable of 
              returning significant amounts of cargo to Earth, 
              and is the first private spacecraft to take humans to the space station.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
