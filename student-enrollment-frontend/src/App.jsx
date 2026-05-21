import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Main } from './sections/Main'
import { Header } from './sections/Header'
import { Footer } from './sections/Footer'


function App() {
  return(
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-background">
      <Header/>
      <main className="flex-1 flex flex-col items-center py-10 w-full px-3 sm:px-6">
          <div className="w-full max-w-4xl flex flex-col gap-4">
              <Main />
          </div>
      </main>
      <Footer/>
    </div>
  )

}

export default App;
