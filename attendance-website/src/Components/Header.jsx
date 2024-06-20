import {useState} from 'react'

import { Link,useLocation,useNavigate } from 'react-router-dom'
import { FaRegCircleUser } from "react-icons/fa6";
const Header = () => {
    const navigate = useNavigate()
    const [openProfile, setOpenProfile] = useState(false)
    const location = useLocation();
    const active= location.pathname
  return (
    <header className=' bg-dark'>
        <div className='header-left'>
            <h3 className='logo text-white'>Logo</h3>
        </div>
        <div className='header-center'>
           <nav className='header-nav'>
                {navData.map((item) => (
                    <Link to={item.link} key={item.id} className={`nav-item ${active === item.link ? 'active' : ''}`}>{item.name}</Link>
                ))}
            </nav>
        </div>
        <div className='header-right'>
             <span className='icon'><FaRegCircleUser size={30} color='white'/></span>
        </div>
    </header>
  )
}

export default Header
const navData = [
    {
        id:1,
        name:'Home',
        link:'/'
    },
    {
        id:2,
        name:'detect',
        link:'/detect'
    },
    {
        id:3,
        name:'My logs',
        link:'/mylogs'
    },
    {
        id:3,
        name:'Log in',
        link:'/login'
    }
]

