import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'
import Header from '../Header'
import SideBar from '../SideBar'
import {HomeContainer} from '../../StyledComponents'
import NextContext from '../../context/NextContext'
import './index.css'

const NotFound = () =>(
    <NextContext.Consumer>
    {value => {
    const {darkTheme, changeTheme, showAdd, deleteAdd } = value
     
      return (
        <div>
        <Header theme={darkTheme} changeTheme={changeTheme}/>
        <HomeContainer background={darkTheme}>
        <div>
        <SideBar theme = {darkTheme} />
        </div>
        {darkTheme ?
        <div className="not-found-container">
        <img className="image" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png" alt="not found" />
        <h1>Page Not Found</h1>
        <p>We are sorry, the page you requested could not be found</p>
        </div> :
        <div className="not-found-container">
         <img className="image" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png" alt="not found"/>
         <h1>Page Not Found</h1>
        <p>We are sorry, the page you requested could not be found</p>
        </div> }
        </HomeContainer>
        </div>
        )
    }}
    </NextContext.Consumer>
    )



export default NotFound