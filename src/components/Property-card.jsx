import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import imagesoon from '../asert/imagesoon.jpg';


export default function PropertyCard(props) {
    const { village_name, mandal_name, district_name, total_land_size_in_acres, price_per_acre_crore, land_media } = props.landDetails
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
            slidesToSlide: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
            slidesToSlide: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1
        }
    };

    return (
        <div className='landcard' >
            <Carousel
                responsive={responsive}
                swipeable={true}
                draggable={true}
                infinite={true}
                partialVisible={false}
                dotListClass="custom-dot-list-style"
                containerClass="carousel-container"
            >
                {land_media.length > 0 && land_media.map((data, index) => (
                    <img key={++index} src={data.image} className="property-image" alt="landImg" />
                ))} 
                { land_media.length === 0 && <img key={0} src={imagesoon} className="property-image" alt="landImg" /> }
            </Carousel>
            <div className="card-content">
                <div className='title'>{village_name} , {mandal_name}</div>
                <div className='title'>{district_name} (dt)</div>
                <div className='details'> {total_land_size_in_acres.acres> 0 && <span >{total_land_size_in_acres.acres} acres</span>}  {total_land_size_in_acres.guntas > 0 && <span>{total_land_size_in_acres.guntas} guntas</span> } 
                <span className='amount'>
                {<span> • ₹ </span> } {price_per_acre_crore.crore > 0 && <>{price_per_acre_crore.crore} crore </>}
                {price_per_acre_crore.lakh > 0 && <> {price_per_acre_crore.lakh} lakh </> }</span>
                </div>
            </div>
        </div>
    )
}
