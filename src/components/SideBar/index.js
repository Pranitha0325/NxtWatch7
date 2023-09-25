import {Link} from 'react-router-dom'
import {AiOutlineHome, AiTwotoneHeart, AiFillFire} from 'react-icons/ai'

import './index.css'

const SideBar = props => {
    const {theme} = props 
    let color = "item-light"
      if (theme===true){
      color = "item-dark"
    }
    return(
    <div className={color}>
    <div className="side-bar">
    <ul>
    <Link to="/" className="links">
    <li>
    <AiOutlineHome />
    <p>Home</p>
    </li>
    </Link>
    <Link to="/trending" className="links">
    <li>
    <AiFillFire />
    <p>Trending</p>
    </li>
    </Link>
    <Link to="/gaming" className="links">
    <li>
    <AiTwotoneHeart />
    <p>Gaming</p>
    </li>
    </Link>
    <Link to="/saved-videos" className="links">
    <AiOutlineHome />
    <p>Saved Videos</p>
    </Link>
    </ul>
    <div>
    <p>CONTACT US</p>
    <div className="contacts">
    <img className="contact-icon" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png" alt="facebook logo" />
    <img className="contact-icon" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png" alt=" twitter logo" />
    <img className="contact-icon" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png " alt="linked in logo" />
    </div>
    <p>Enjoy! Now to see your channels and recommendations!</p>
    </div>
    </div>
    </div>
    )
}

export default SideBar