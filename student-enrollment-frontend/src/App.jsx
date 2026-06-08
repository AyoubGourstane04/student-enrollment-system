import './App.css';
import { Main } from './sections/Main';
import { Header } from './sections/Header';
import { Footer } from './sections/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NotFound } from './sections/NotFound';
import { ServerError } from './sections/ServerError';

function App() {
  return(
    <BrowserRouter>
      <div className="min-h-screen flex flex-col overflow-x-hidden bg-background">
        <Header/>
        <main className="flex-1 flex flex-col items-center py-10 w-full px-3 sm:px-6">
          <Routes> 
            <Route path='/' element={
              <div className="w-full max-w-4xl flex flex-col gap-4">
                  <Main />
              </div>
            } />

            <Route path="/500" element={<ServerError />} />
            
            <Route path='*' element={<NotFound/>} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </BrowserRouter>
   
  )

}

export default App;
