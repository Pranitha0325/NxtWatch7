
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'
import NextContext from '../../context/NextContext'
import Header from '../Header'
import SideBar from '../SideBar'
import Add from '../Add'
import {HomeContainer, Dark, Light} from '../../StyledComponents'
import './index.css'

const api = {initial:"INITIAL", inProgress:"INPROGRESS", success:"SUCCESS", failure:"FAILURE"}
class Gaming extends Component {
  state = {apiStatus:api.initial, data:[]} 

  componentDidMount () {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus:api.inProgress})
    const jwtToken = Cookies.get("jwt_token")
    const url = `https://apis.ccbp.in/videos/gaming`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response)
    if (response.ok===true){
      const updated = data.videos 
      const updatedList = updated.map((item)=>({
      id:item.id,
      title:item.title,
      thumbnailUrl : item.thumbnail_url,
      viewCount: item.view_count
    }))
      this.setState({data:updatedList, apiStatus:api.success})
    }else{
      this.setState({apiStatus:api.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="blue" height="50" width="50" />
    </div>
  )

  renderDetailsOnRetry = () => {
    this.getData()
  }

  failureView = () => (
    <NextContext.Consumer>
    {value => {
      const {darkTheme} = value 
      return (
        <div>
        {darkTheme ? 
        (<div className="failure">
        <img className="failure-logo" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png" alt="failure view" />
        <h1>Oops! Something Went Wrong</h1>
        <p>We are having some trouble to complete your request. Please try again.</p>
        <button onClick={this.renderDetailsOnRetry} type="button">Retry</button>
        </div>)
         : 
         (<div className="failure">
        <img className="failure-logo" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png" alt="failure view" />
        <h1>Oops! Something Went Wrong</h1>
        <p>We are having some trouble to complete your request. Please try again.</p>
        <button onClick={this.renderDetailsOnRetry} type="button">Retry</button>
         </div>)}
        </div>
      )
    }}
    </NextContext.Consumer>
  )


  renderData = () => {
    const {data, apiStatus} = this.state 
    console.log(apiStatus)
    if (apiStatus==="SUCCESS"){
      return (
        <div>
        <h1>Gaming</h1>
        <ul className="list-items">
        {data.map((item) => (
          <li key={item.id}>
          <Link to={`/videos/${item.id}`}>
          <img className="image" src={item.thumbnailUrl} alt="video thumbnail" />
          <p>{item.title}</p>
          <p>{item.viewCount}</p>
          </Link>
          </li>
        ))}
        </ul>
        </div>
      )
    }
      return this.failureView()
    
  }

  renderHeader = () => (
    <NextContext.Consumer>
    {value => {
      const {darkTheme, changeTheme} = value

  const changeLogo = () => {
    changeTheme()
  }
  const renderLogoutButton = () => {
    const {history} = this.props 
    Cookies.remove("jwt_token")
    history.replace("/login")
    
  }
  console.log("header")
  return (
    <div>
    {darkTheme ? <Dark className="header-dark" data-testid="gaming">
    <Link to="/" >
    <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png" alt="website logo" />
    </Link>
    <div>
    <button onClick={changeLogo} data-testid="theme">
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
    </Dark> : 
    <Light className="header-light" data-testid="gaming">
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
  
  render () {
    const {apiStatus} = this.state 
    const apis = apiStatus==="INPROGRESS"
    return (
      <NextContext.Consumer>
    {value => {
    const {darkTheme, changeTheme, showAdd, deleteAdd } = value
     
      return (
        <div>
        {this.renderHeader()}
        <HomeContainer background={darkTheme}>
        <div>
        <SideBar theme = {darkTheme} />
        </div>
        <div>
        <Add show={showAdd} deleteAdd={deleteAdd} />
        <div >
        {apis ? this.renderLoader()
         : 
         this.renderData()}
        </div>
        </div>
        </HomeContainer>
        </div>
        )
    }}
    </NextContext.Consumer>
    )
  }
}
export default Gaming