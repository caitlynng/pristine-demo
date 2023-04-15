import logo from '../assets/images/logo.svg'
import logoName from '../assets/images/logo-name.svg'
import { Link } from 'react-router-dom'
import SVG from "react-inlinesvg";
const Logo = () => {
  return (
    <Link to="/" className="logo-container">
      <SVG src={logo} alt='logo-pristine' className='logo' />
      <SVG src={logoName} alt='pristine' className='logo-name' />
    </Link>
  )
}

export default Logo
