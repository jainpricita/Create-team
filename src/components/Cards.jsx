import React from 'react'
import "../App.scss"

export default function Cards({userData}) {
  return (
    <div className="row" id="user-cards">
                {userData && userData.map(data => (
                    <div className="col-lg-3 col-md-4 col-sm-6 mb-2" key={data.id}>
                        <div className="card">
                            <div className='card-image'> <img src={data.avatar} className="card-img-top" alt="User" /></div>
                            <div className="card-body">
                                <h4 className="card-title">{data.first_name} {data.last_name}</h4>
                                <p className="card-text"><h6>Email:</h6>{data.email}</p>
                                <p className="card-text"><h6>Gender:</h6>{data.gender}</p>
                                <p className="card-text"><h6>Domain:</h6> {data.domain}</p>
                                <h6 className="card-text">{data.available ? "Available" : "Not Available"}</h6>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
  )
}
