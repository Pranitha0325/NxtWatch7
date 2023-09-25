import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'
import NextContext from '../../context/NextContext'
import Header from '../Header'
import SideBar from '../SideBar'
import Add from '../Add'
import {HomeContainer, Dark, Light} from '../../StyledComponents'
import './index.css'

const SavedVideos = props => {
  const renderVideosTab = id => {
    const {history} = props 
    history.replace(`/videos/${id}`)
  }

  const renderHeader = () => (
    <NextContext.Consumer>
    {value => {
      const {darkTheme, changeTheme} = value

  const changeLogo = () => {
    changeTheme()
  }
  const renderLogoutButton = () => {
    const {history} = props 
    Cookies.remove("jwt_token")
    history.replace("/login")
    
  }
  console.log("header")
  return (
    <div>
    {darkTheme ? <Dark className="header-dark" data-testid="home">
    <Link to="/" >
    <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png" alt="website logo" />
    </Link>
    <div>
    <button onClick={changeLogo} data-testid="theme" type="button">
    <img className="dark-logo" src="https://media.istockphoto.com/id/1278486961/vector/moon-simple-icon-logo.jpg?s=612x612&w=0&k=20&c=nzNELqLZxTXHnFG9GLSggr8PsBpp9AjWRf9wfPJonSk=" />
    </button>
    <img  className="dark-logo" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png" alt="profile" />
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
    </Dark> : 
    <Light className="header-light" data-testid="home">
    <Link to="/">
    <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" alt="website logo" />
    </Link>
    <div>
    <button onClick={changeLogo} data-testid="theme" type="button">
    <img className="dark-logo" src="https://media.istockphoto.com/id/1278486961/vector/moon-simple-icon-logo.jpg?s=612x612&w=0&k=20&c=nzNELqLZxTXHnFG9GLSggr8PsBpp9AjWRf9wfPJonSk=" />
    </button>
    <img className="dark-logo" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png" alt="profile" />
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
    </Light>
    }
    </div>
  )
    }}
    </NextContext.Consumer>
  )

  return (
    <NextContext.Consumer>
    {value => {
    const {darkTheme, changeTheme, showAdd, deleteAdd, savedVideos } = value
    console.log(savedVideos)
    const background = darkTheme ? "dark" : "light"
    const savedItems = savedVideos.length===0
    console.log(savedItems)
     
      return (
        <div>
        {renderHeader()}
        <HomeContainer background={darkTheme}>
        <div>
        <SideBar theme = {darkTheme} />
        </div>
        <div>
        <Add show={showAdd} deleteAdd={deleteAdd} />
        {savedItems ? 
        <div className="no-videos-container">
          <img className="no-videos" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png" alt="no saved videos" />
          <h1>No saved videos found</h1>
          <p>Save your videos by clicking a button</p>
        </div> 
        :
        <div>
        <h1>Saved Videos</h1>
        <ul>
        {savedVideos.map((item)=>(
          <li className="items" key={item.id} onClick={()=>renderVideosTab(item.id)}>
          <img className="image" src={item.thumbnailUrl} alt="video thumbnail" />
          <div>
          <p>{item.title}</p>
          <p>{item.name}</p>
          <p>{item.viewCount}</p>
          <p>{item.publishedAt}</p>
          </div>
          </li>
          ))}
        </ul>
        </div> }
        </div>
        </HomeContainer>
            </div>
        )
    }}
    </NextContext.Consumer>
    )
}

export default SavedVideos