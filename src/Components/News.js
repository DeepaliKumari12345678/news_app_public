import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsOck`;
    fetchNews();
    // eslint-disable-next-line
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const fetchNews = async () => {
    props.setProgress(10);
    const { country, category, pageSize, apiKey } = props;

    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    setLoading(true);
    setError(null);

    try {
      let response = await fetch(url);
      props.setProgress(30);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      let parseData = await response.json();
      if (!parseData.articles) {
        throw new Error('No articles found');
      }
      props.setProgress(70);
      setArticles((prevArticles) => [...prevArticles, ...parseData.articles]);
      setLoading(false);
      setTotalResults(parseData.totalResults);
    } catch (error) {
      console.error('Failed to fetch news:', error);
      setLoading(false);
      setError(error.message);
    }
    props.setProgress(100);
  };

  const fetchMoreData = async () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (page > 1) {
      fetchNews();
    }
    // eslint-disable-next-line
  }, [page]);

  return (
    <div className={`container my-3 bg-${props.category}`} style={{ overflowX: 'hidden' }}>
      <h2 className='text-center' style={{ margin: '35px' , marginTop: '90px' }}>
        NewsOck - Top {capitalizeFirstLetter(props.category)} Headlines
      </h2>
      {error && <div className="alert alert-danger">Error: {error}</div>}
      <InfiniteScroll
        dataLength={articles.length || 0}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="row" style={{ margin: 0 }}>
          {articles && articles.map((element, index) => (
            element && (
              <div className="col-md-4" key={index}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : " "}
                  description={element.description ? element.description.slice(0, 90) : 'No description available'}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            )
          ))}
        </div>
      </InfiniteScroll>
      {loading && <Spinner />}
    </div>
  );
};

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default News;
