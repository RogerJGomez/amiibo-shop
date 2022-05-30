import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Checkout from './pages/Checkout'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import rootReducer from './reducers/rootReducer'
import Header from './components/Header'
import SpinnerLoader from './components/Spinner'

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
})

let persistor = persistStore(store)

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<SpinnerLoader />} persistor={persistor}>
        <div className='h-screen w-full'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/checkout' element={<Checkout />} />
          </Routes>
        </div>
      </PersistGate>
    </Provider>
  )
}

export default App
