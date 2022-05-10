import { Link, Outlet } from 'react-router-dom';

function Layout () {
    <>
        <header>
            <Link to="/sign-in">SignIn</Link>
            <Link to="/sign-up">SignUp</Link>
        </header>

        <Outlet />

        <footer>2022</footer>
    </>
}

export default Layout ;