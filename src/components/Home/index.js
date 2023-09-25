import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {AiOutlineSearch} from 'react-icons/ai'
import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'
import SideBar from '../SideBar'
import Add from '../Add'
import {HomeContainer, Input, Dark, Light} from '../../StyledComponents'
import NextContext from '../../context/NextContext'

import './index.css'

const api = {initial:"INITIAL", inProgress:"INPROGRESS", success:"SUCCESS", failure:"FAILURE"}
class Home extends Component{
  state = {apiStatus:api.initial, data:[], searchInput:""} 

  componentDidMount () {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus:api.inProgress})
    const {searchInput} = this.state
    const jwtToken = Cookies.get("jwt_token")
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    
    if (response.ok===true){
      const updated = data.videos 
      const updatedData = updated.map((item)=>({
      id:item.id,
      thumbnailUrl: item.thumbnail_url,
      profileImageUrl:item.channel.profile_image_url,
      title:item.title,
      name:item.channel.name,
      viewCount: item.view_count,
      publishedAt: item.published_at
    }))
      this.setState({data:updatedData, apiStatus:api.success})
    }else{
      this.setState({apiStatus:api.failure})
    }
  }

  searchValue = e =>{
    this.setState({searchInput:e.target.value})
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="blue" height="50" width="50" />
    </div>
  )

  renderDetailsOnRetry = () => {
    this.getData()
  }

  searchButtonClicked = () =>{
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
    const {apiStatus, data} = this.state 
    if (apiStatus==="SUCCESS"){
      if (data.length===0){
        return (
          <div>
          <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png" alt="no videos" />
          <h1>No Search results found</h1>
          <p>Try different key words or remove search filter</p>
          <button>Retry</button>
          </div>
        )

      }else{
      return (
        <div>
        <ul className="container">
        {data.map((item)=>(          
          <li className="item" key={item.id}>
          <Link to={`/videos/${item.id}`} className="lint-styling">
          <img className="thumbnail"  src={item.thumbnailUrl} alt="video thumbnail" />
          <div className="title">
          <img className="profile" src={item.profileImageUrl} alt="channel logo" />
          <p>{item.title}</p>
          </div>
          <p>{item.name}</p>
          <div className="item">
          <p>{item.viewCount}</p>
          <p>{item.publishedAt}</p>
          </div>
          </Link>
          </li>          
        ))}
        </ul>
        </div>
      )
      }
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

  return (
    <div>
    {darkTheme ? <Dark className="header-dark" data-testid="home">
    <Link to="/" >
    <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png" alt="website logo" />
    </Link>
    <div>
    <button onClick={changeLogo} data-testid="theme" type="button">
    <img onClick={changeLogo} className="dark-logo" src="https://media.istockphoto.com/id/1278486961/vector/moon-simple-icon-logo.jpg?s=612x612&w=0&k=20&c=nzNELqLZxTXHnFG9GLSggr8PsBpp9AjWRf9wfPJonSk=" />
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
    <Light className="header-light" data-testid="home">
    <Link to="/">
    <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" alt="website logo" />
    </Link>
    <div>
    <button data-testid="theme" onClick={changeLogo} type="button">
    <img onClick={changeLogo} className="dark-logo" src="https://media.istockphoto.com/id/1278486961/vector/moon-simple-icon-logo.jpg?s=612x612&w=0&k=20&c=nzNELqLZxTXHnFG9GLSggr8PsBpp9AjWRf9wfPJonSk=" />
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
    </Light>
    }
    </div>
  )
    }}
    </NextContext.Consumer>
  )


  render(){
    const {apiStatus, data} = this.state
    const apis = apiStatus==="INPROGRESS"
    return (
  <NextContext.Consumer>

    {value => {
      const {darkTheme, changeTheme, showAdd, deleteAdd} = value
     
      return (
        <div>
        {this.renderHeader()}
        <HomeContainer background={darkTheme}>
        <div>
        <SideBar theme = {darkTheme} />
        </div>
        <div>
        <Add show={showAdd} deleteAdd={deleteAdd} />
        <Input  type="search" placeholder="Shearch" onChange={this.searchValue}></Input>
        <button onClick={this.searchButtonClicked} data-testid="searchButton" type="button" >
        <AiOutlineSearch  />
        </button>
        <div >
        {apis ? this.renderLoader()
         : 
         this.renderData()}
        </div>
        </div>
        </HomeContainer>
        </div>
      )}}
      </NextContext.Consumer>
)
}
}

export default Home
