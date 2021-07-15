import React from 'react'
import BusinessIndexItem from './business_index_item'
import BusinessMap from '../map/business_map'

class BusinessIndex extends React.Component{
    
    componentDidMount(){
        this.props.fetchBusinesses()
    }

    render(){
        if (this.props.businesses.length < 1){
            return(
                <div>Loading...</div>
            )
        } else {
            return(
                <div>
                    <div className='business-index-list-container'>
                        {this.props.businesses.map((business, i) => (
                            <div className='business-index-item' key={i}>
                                <BusinessIndexItem
                                    business={business}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )
        }
    }
}

export default BusinessIndex