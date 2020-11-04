import React, { Component } from 'react'
import { db, } from '../../Config/fbConfig'
import moment from 'moment'
// import logo from '../../iconos/logo.png'
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
                                    <p className="grey-text text-lighten-3">- El equipo de {process.env.REACT_APP_NAME}
                                        <svg style={{marginLeft: 5}} width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M0.848669 10.9029C0.291034 9.82559 0 8.63022 0 7.41715H1.0946C1.0946 8.45511 1.34363 9.47793 1.82077 10.3997C2.2979 11.3215 2.98923 12.1154 3.83671 12.7147C4.68418 13.314 5.66307 13.7012 6.69118 13.8439C7.7193 13.9865 8.76663 13.8804 9.74526 13.5345C10.7239 13.1886 11.6052 12.6129 12.3153 11.8558C13.0254 11.0987 13.5435 10.1824 13.826 9.1836C14.1086 8.18485 14.1475 7.13287 13.9393 6.11599C13.7312 5.09911 13.2821 4.14702 12.6298 3.33963L13.4812 2.65173C14.2436 3.59533 14.7684 4.70805 15.0117 5.89648C15.255 7.08491 15.2096 8.31436 14.8793 9.48161C14.549 10.6489 13.9436 11.7198 13.1137 12.6046C12.2838 13.4894 11.2538 14.1622 10.1101 14.5665C8.96634 14.9708 7.74232 15.0948 6.54075 14.9281C5.33919 14.7614 4.19516 14.3088 3.20471 13.6084C2.21426 12.908 1.4063 11.9802 0.848669 10.9029Z" fill="white" />
                                            <circle cx="0.621537" cy="5.26247" r="0.290055" fill="white" />
                                            <circle cx="11.1257" cy="1.13954" r="0.890884" fill="white" />
                                            <circle cx="2.27902" cy="3.06634" r="0.414365" fill="white" />
                                            <circle cx="7.87294" cy="0.662983" r="0.662983" fill="white" />
                                            <circle cx="4.95167" cy="1.30519" r="0.517956" fill="white" />
                                            <path d="M5.77521 12.4625C8.28212 7.05503 11.3691 5.00393 11.9907 4.23735C11.9492 4.15448 9.42162 4.42382 5.71305 9.62409C4.98791 6.80641 3.43405 8.21525 3.20615 8.87824C3.18543 8.91967 3.18543 8.96111 3.20615 8.98183C3.57079 8.88238 3.85532 9.13376 3.95201 9.27188C4.36637 9.85199 5.52659 12.3382 5.58875 12.4418C5.63847 12.5246 5.73377 12.4901 5.77521 12.4625Z" fill="white" />
                                        </svg>
                                    </p>
                                    <p className="grey-text text-lighten-2 ">{moment(message.info.createdAt.toDate()).format('L')}</p>
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
                                <p>---<br />---</p>
                                <hr />
                                <p className="grey-text text-lighten-2 post-date">----</p>
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
