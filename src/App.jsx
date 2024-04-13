import React, { useState, useEffect } from 'react';
import './App.css'
import PropertyCard from './components/Property-card';
import axios from "axios";

import InfiniteScroll from 'react-infinite-scroll-component';

function App() {
  const [property, setProperty] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [errorText , setErrorText] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://prod-be.1acre.in/lands/?ordering=-updated_at&page=${page}&page_size=10`);
        const newproperty = response.data.results;
        setProperty((prevproperty) => [...prevproperty, ...newproperty]);
        setHasMore(newproperty.length > 0);
      } catch (error) {
        setErrorText("The requested resource was not found.")
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (hasMore && !loading) {
      fetchData();
    }
  }, [page]);

  return (
    <div className='container'>
      <InfiniteScroll
        dataLength={property.length}
        next={() => setPage(page + 1)}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>End of content.</p>}
      >
        <div className="property">
          {property.map((landDetails, index) => (
            <PropertyCard key={index} landDetails={landDetails}> </PropertyCard>
          ))}
        </div>
      </InfiniteScroll>
      <>{ errorText && <h3>{errorText}</h3> }</>
    </div>
  );
};

export default App
