import logo from "../../assets/logo.svg"
import Links from "./Links/Links";
import "./_navbar.scss"

const NavBar = () => {
    return (
        <header className={'header-wrapper'}>
            <div className={'header'}>
                <div>
                    <a href={"/"}><img src={logo} alt="logo" className={'logo'} /></a>
                </div>

                <Links />
            </div>
        </header>
    );
};

export default NavBar;