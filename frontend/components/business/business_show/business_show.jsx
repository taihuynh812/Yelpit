import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../nav_bar/nav_bar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'
import * as RegFontAwesome from '@fortawesome/free-regular-svg-icons'
import ReviewIndexContainer from '../../review/review_index/review_index_container';

class BusinessShow extends React.Component{
    constructor(props){
        super(props) 
        this.props.fetchBusiness(this.props.match.params.businessId)
    }
    
    componentDidMount(){
        this.props.fetchBusiness(this.props.match.params.businessId)
        this.props.fetchUsers().then(payload => (this.users = payload))
    }

    avgRating(){
        let sum = 0;
        this.props.business.reviews.forEach(review => {
            sum += review.rating
        })
        return (sum/this.props.business.reviews.length).toFixed(1)
    }

    star(rate) {
        let stars = [];
        let rating = Math.round(rate);
        var increment = 0;
        var max = 5; 

        while(increment < rating) {
            if ((rating - increment) > 1 ){
                stars.push(<FontAwesomeIcon className="one-star-rating" icon={faStar} color='red' key={rating-increment}/>);
                increment++;
            } else {
                if ((rating - increment) > 0.1 ){
                    stars.push(<FontAwesomeIcon className="half-star-rating" icon={faStarHalfAlt} color='red' key={rating-increment}/>);
                    increment++;
                }          
            } 
        }
        while(max > rating) {
            stars.push(<FontAwesomeIcon className='max-rating' icon={RegFontAwesome.faStar} color='red' key={max}/>);
            max--;
        }
        return stars;
    };

    render(){
        debugger
        if (!this.props.business || !this.users){
            return (
                <div>Loading...</div>
            )
        } else {
            const rating = this.avgRating()
            const {name, address, city, state, zipcode, phone, website, mon_fri, sat_sun} = this.props.business
            return(
                <div>
                    <div className='business-nav-bar-container'><NavBar/></div>
                    <div className='business-show-header-container'>
                        <div className="business-images-container">
                            {this.props.business.photoUrls.map((photoUrl, i) => (
                                <img key={i} className="business-images" src={photoUrl} />
                            ))}
                            <div className='business-info-container'>
                                <h1 className='business-name'>{name}</h1>
                                {this.props.business.categories.map((category, i) => (
                                    <div className='business-categories' key={i}>{category.category}</div>
                                ))}
                                <div className='business-show-rating'>{this.star(rating)}  {this.props.business.reviews.length} reviews</div>
                            </div>
                        </div>  
                    </div>
                    <div className='business-show-body-container'>

                        <Link to={`/businesses/${this.props.business.id}/reviews/new`}><button>Write a Review</button></Link>
                        
                        <div className="business-schedule-container">
                            <div className="schedule-day">Monday: <div className='schedule-time'>{mon_fri}</div></div>
                            <div className="schedule-day">Tuesday: <div className='schedule-time'>{mon_fri}</div></div>
                            <div className="schedule-day">Wednesday: <div className='schedule-time'>{mon_fri}</div></div>
                            <div className="schedule-day">Thursday: <div className='schedule-time'>{mon_fri}</div></div>
                            <div className="schedule-day">Friday: <div className='schedule-time'>{mon_fri}</div></div>
                            <div className="schedule-day">Saturday: <div className='schedule-time'>{sat_sun}</div></div>
                            <div className="schedule-day">Sunday: <div className='schedule-time'>{sat_sun}</div></div>            
                        </div>

                        <div className ='business-location-container'>
                            <div>{address} {city}, {state} {zipcode}</div>
                        </div>

                        <div className='business-info-container'> 
                            <div>{phone}</div>
                            <div>{website}</div>
                        </div>

                        <div><ReviewIndexContainer users={this.users.users} business={this.props.business}/></div>
                    </div>
                    
                </div>
            )
        }
    }
}

export default BusinessShow