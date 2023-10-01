import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ToyDetails } from './pages/ToyDetails'
import { ToyIndex } from './pages/ToyIndex'
import { ToyEdit } from './pages/ToyEdit'
import { store } from './store/store'
import { AppHeader } from './cmps/AppHeader'
import './assets/style/main.scss'
import { About } from './pages/About'
import { Dashboard } from './pages/Dashboard'
import { Login } from './pages/Login'
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
                            <Route element={<About />} path="/about" />
                            <Route element={<Dashboard />} path="/dashboard" />
                            <Route element={<Login />} path="/auth" />
                        </Routes>
                    </main>
                    {/* <AppFooter /> */}
                </section>
            </Router>
        </Provider>
    )
}
