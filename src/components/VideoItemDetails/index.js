
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {AiOutlineDislike, AiFillDislike, AiFillLike, AiOutlineLike} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'
import NextContext from '../../context/NextContext'
import Header from '../Header'
import SideBar from '../SideBar'
import Add from '../Add'
import {HomeContainer, Dark, Light} from '../../StyledComponents'
import {ActiveButton, InactiveButton} from './StylingVideoItemDetails'
import './index.css'

const api = {initial:"INITIAL", inProgress:"INPROGRESS", success:"SUCCESS", failure:"FAILURE"}
class VideoItemDetails extends Component {
  state = {videoDetails:{}, apiStatus:api.initial, isVideoSaved:false, isLike:false, disLike:false}

  componentDidMount () {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    this.setState({apiStatus:api.inProgress})
    const token = Cookies.get("jwt_token")
    const {match} = this.props
    const {params} = match 
    const {id} = params 
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers:{
        Authorization :`Bearer ${token}`
      },
      method:"GET"
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    
    if (response.ok===true) {
      const item = data.video_details 
      const updated = {
      id:item.id,
      videoUrl:item.video_url,
      description:item.description,
      thumbnailUrl: item.thumbnail_url,
      title:item.title,
      viewCount:item.view_count,
      publishedAt:item.published_at,
      channel : item.channel,
      name:item.channel.name,
      profileImageUrl : item.channel.profile_image_url,
      subscribersCount:item.channel.subscriber_count,
    }
      this.setState({videoDetails:updated, apiStatus:api.success})
    }else if (response.status===400){
      console.log("failed")
      this.setState({apiStatus:api.failure})
    }
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="blue" height="50" width="50" />
    </div>
  )

  renderDetailsOnRetry = () => {
    this.getVideoDetails()
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

  renderdetailsView = () => {
    const {apiStatus} = this.state 
    console.log(apiStatus)
    if (apiStatus==="SUCCESS"){
      return (
        <NextContext.Consumer>
        {value => {
          const {isVideoSaved, videoDetails, isLike, disLike} = this.state
          const {id , videoUrl, description, title, viewCount, publishedAt, channel, name, profileImageUrl, subscribersCount} = videoDetails
          const {addToSaveVideos, savedVideos, removeSaveVideos} = value 

            const saveItem = () =>{
              if (isVideoSaved===true){
                this.setState({isVideoSaved:false}, removeSaveVideos(id))
              }else{
                this.setState({isVideoSaved:true}, addToSaveVideos({...videoDetails}))
              }
          }

          const saveText = isVideoSaved ? "saved" : "save"

          const saveItemToList = () => {
            this.setState((prevState)=>({
              isVideoSaved:!prevState.isVideoSaved
            }), saveItem)
          }

          const like = () =>{
            this.setState((prevState)=>({isLike:!prevState.isLike, disLike:false}))
          }
          const dislike = () => {
            this.setState((prevState)=>({disLike:!prevState.disLike, isLike:false}))
          }

        return (
        <div data-testid="videoItemDetails">
        <ReactPlayer url={videoUrl} />
        <p>{title}</p>
        <div className="count">
        <p>{viewCount}</p>
        <p>{publishedAt}</p>
        {isLike ? 
        <div>
        <AiFillLike  onClick={like}/>
        <ActiveButton onClick={like} className="like-button">Like</ActiveButton>
        </div>
         : 
         <div>
         <AiOutlineLike onClick={like}/>
         <InactiveButton onClick={like} className="button-inactive">Like</InactiveButton>
         </div>
         }
        {disLike ? 
        <div>
        <AiFillDislike onClick={dislike} />
        <ActiveButton onClick={dislike} className="like-button">Dislike</ActiveButton>
        </div>
         : 
         <div>
        <AiOutlineDislike onClick={dislike} />
         <InactiveButton onClick={dislike} className="button-inactive">Dislike</InactiveButton>
         </div>
         }
        <button type="button" onClick={saveItemToList}>{saveText}</button>
        </div>
        <hr/>
        <div className="count">
        <img className="image_" src={profileImageUrl} alt="channel logo" />
        <div>
        <p>{name}</p>
        <p>{subscribersCount}</p>
        </div>
        </div>
        <p data-testid="videoItemDetails">{description}</p>
        </div>
        )
        }}
        </NextContext.Consumer>
      )
    }
    return   this.failureView()
       
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
    {darkTheme ? <Dark className="header-dark" data-testid="home">
    <Link to="/" >
    <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png" alt="website logo" />
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
    </Dark> : 
    <Light className="header-light" data-testid="home">
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
    </Light>
    }
    </div>
  )
    }}
    </NextContext.Consumer>
  )

  render () {
    const {apiStatus} = this.state 
    const loading = apiStatus==="INPROGRESS"
    return (
      <NextContext.Consumer>
    {value => {
    const {darkTheme, changeTheme, showAdd, deleteAdd, savedVideos } = value
    const background = darkTheme ? "dark" : "light"
    console.log(savedVideos)
  
      return (
        <div>
        {this.renderHeader()}
        <HomeContainer background={darkTheme}>
        <div>
        <SideBar theme = {darkTheme} />
        </div>
        <div>
        <Add show={showAdd} deleteAdd={deleteAdd} />
        {loading ? this.renderLoading() : this.renderdetailsView()
        }
        </div>
        </HomeContainer>
        </div>
        )
    }}
    </NextContext.Consumer>
        )
    }
}
    
export default VideoItemDetails