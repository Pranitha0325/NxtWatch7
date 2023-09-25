import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'
import {AiOutlineHome, AiTwotoneHeart, AiFillFire} from 'react-icons/ai'
import './index.css'

const Header = props => {
  const {theme, changeTheme} = props

  const changeLogo = () => {
    changeTheme()
  }
  const renderLogoutButton = () => {
    const {history} = props 
    Cookies.remove("jwt_token")
    history.replace("/login")
    
  }
  return (
    <div>
    {theme ? <div className="header-dark">
    <Link to="/" >
    <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png" alt="website logo" />
    </Link>
    <div>
    <img onClick={changeLogo} className="dark-logo" src="https://media.istockphoto.com/id/1278486961/vector/moon-simple-icon-logo.jpg?s=612x612&w=0&k=20&c=nzNELqLZxTXHnFG9GLSggr8PsBpp9AjWRf9wfPJonSk=" />
    <img data-testid="theme" className="dark-logo" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png" alt="profile" />
    <div>
    <Popup 
    model 
    trigger = {
      <button  type="button">Logout</button>
    } position = "absotule"
    >
    {close => (
      <>
      <div>
      <p>Are you sure, you want to logout</p>
      </div>
      <div>
      <button type ="button" onClick={()=>close()}>Cancel</button>
      <button type="button" onClick={renderLogoutButton}>Confirm</button>
      </div>
      </>
    )}
    </Popup>
    </div>
    </div> 
    </div> : 
    <div className="header-light">
    <Link to="/">
    <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" alt="website logo" />
    </Link>
    <div>
    <img onClick={changeLogo} className="dark-logo" src="https://media.istockphoto.com/id/1278486961/vector/moon-simple-icon-logo.jpg?s=612x612&w=0&k=20&c=nzNELqLZxTXHnFG9GLSggr8PsBpp9AjWRf9wfPJonSk=" />
    <img data-testid="theme" className="dark-logo" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png" alt="profile" />
    <div>
    <Popup 
    model 
    trigger = {
      <button  type="button">Logout</button>
    } position = "absotule"
    >
    {close => (
      <>
      <div>
      <p>Are you sure, you want to logout</p>
      </div>
      <div>
      <button type ="button" onClick={()=>close()}>Cancel</button>
      <button type="button" onClick={renderLogoutButton}>Confirm</button>
      </div>
      </>
    )}
    </Popup>
    </div>
    </div>
    </div>
    }
    </div>
  )
}

export default withRouter(Header)