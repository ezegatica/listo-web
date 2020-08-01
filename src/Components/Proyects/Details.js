import React from 'react'

const Details = (props) => {
    const id = props.match.params.id;
    return (
        <div className="container section project-details">
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title">Project Title - {id}</span>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus animi neque molestias nostrum in reiciendis suscipit facere harum ipsam, necessitatibus ullam perferendis. Suscipit at corrupti mollitia enim natus voluptatem quidem?</p>
                </div>
                <div className="card-action grey lighten-4 grey-text">
                    <div>Posted by: Admin</div>
                    <div>3 de Febrero</div>
                </div>
            </div>
        </div>
    )
}

export default Details