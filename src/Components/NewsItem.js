import React from 'react';

const NewsItem = (props)=>{
 
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
      <div className="my-3">
        <div className="card">
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
          position: 'absolute',
          right:'0'
           }}>
              <span className="badge rounded-pill bg-info">
                {source}
              </span></div>
          <img src={imageUrl || "https://th.bing.com/th/id/OIP.u_f5rkbrEUWA1ywe9JsbyAHaFj?rs=1&pid=ImgDetMain"}
            className="card-img-top"  alt="News" />
          <div className="card-body">
            <h5 className="card-title">
              {title ? `${title}...` : "No Title Available"}
            </h5>
            <p className="card-text">{description ? `${description}...` : "No Description Available"}</p>
            <p className="card-text"><small className='text-muted'>By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
            <a 
              rel="noreferrer" 
              href={newsUrl} 
              target="_blank" 
              className="btn btn-dark btn-sm"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  
}

export default NewsItem;
