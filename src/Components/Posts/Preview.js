import React, { Component } from 'react'
import { db, } from '../../Config/fbConfig'
import moment from 'moment'
export class Preview extends Component {
    state = {
        posts: null,
        fecha: null
    }
    componentDidMount = () => {
        db.collection('publicaciones').orderBy("createdAt", "desc").limit(1).get()
            .then((snapshot) => {
                const Posteos = []
                snapshot.forEach(doc => {
                    const info = doc.data()
                    const id = doc.id;
                    Posteos.push({ info, id })
                })
                this.setState({ posts: Posteos })
            }).catch((err) => {
                console.log(err);
            })
    }
    render() {
        console.log(this.state);
        return (
            <>
                {this.state.posts && this.state.posts.map(message => {
                    return (
                        <div className="col s12 m12" key={message.id}>
                            <div className="card light-blue darken-4">
                                <div className="card-content white-text">
                                    <span className="card-title">{message.info.titulo}</span>
                                    <p>{message.info.body}</p>
                                    <hr />
                                    <p className="grey-text text-lighten-2 ">{moment (message.info.createdAt.toDate()).format('L')}</p>
                                </div>
                            </div>
                        </div>
                    )

                })}
                {!this.state.posts && <div>
                    <div className="col s12 m12 ">
                            <div className="card light-blue darken-4">
                                <div className="card-content white-text loading-text">
                                    <span className="card-title">---------</span>
                                    <p>---<br/>---</p>
                                    <hr />
                                    <p className="grey-text text-lighten-2 post-date">------</p>
                                </div>
                            </div>
                        </div>
                    </div>}
            </>
        )
    }
}

export default Preview
