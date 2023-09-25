
import {TiDeleteOutline} from 'react-icons/ti'
import {BannerContainer, CloseButton} from './StylingBanner'
import './index.css'

const Add = props => {
    const {show, deleteAdd} = props 

    const deleteBanner = () => {
        deleteAdd()
    }
    return (
        <div >
        {show ? 
        <BannerContainer data-testid="banner" className="add-container">
        <div className="banner">
        <img className="logo" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" alt="nxt watch logo" />
        <p>Buy Nxt Watch Premium</p>
        <button type="button">GET IT NOW</button>
        </div>
        <CloseButton data-testid="close" className="button" type="button" onClick={deleteBanner}>
        <TiDeleteOutline />
        </CloseButton>
        </BannerContainer>
        : ''}
        </div>
    )
}

export default Add