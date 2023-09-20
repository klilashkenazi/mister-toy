import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ToyDetails } from './pages/ToyDetails'
import { ToyIndex } from './pages/ToyIndex'
import { ToyEdit } from './pages/ToyEdit'
import { store } from './store/store'
import { AppHeader } from './cmps/AppHeader'
  export function App() {

    return (
        <Provider store={store}>
            <Router>
                <section className="main-layout app">
                    <AppHeader />
                    <main>
                        <Routes>
                            {/* <Route element={<HomePage />} path="/" /> */}
                            {/* <Route element={<AboutUs />} path="/about" /> */}
                            <Route element={<ToyIndex/>} path="/toy" />
                            <Route element={<ToyDetails />} path="/toy/:toyId" />
                            <Route element={<ToyEdit />} path="/toy/edit" />
                            <Route element={<ToyEdit />} path="/toy/edit/:toyId" />

                        </Routes>
                    </main>
                    {/* <AppFooter /> */}
                </section>
            </Router>
        </Provider>
    )
}
