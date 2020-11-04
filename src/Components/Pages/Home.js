import React, { Component } from 'react'
import Preview from '../Posts/Preview'
import { connect } from 'react-redux'
import { db } from '../../Config/fbConfig'
import '../../css/home.css'
import CardResto from '../Restaurante/CardResto'
export class Home extends Component {
    state = {
        restaurantes: null,
        logged: false,
        loaded: false,
        hayFavs: false,
        favs: null,
        skeleton: ["a", "b", "c", "d", "e", "f"]
    }
    componentDidMount = () => {
        db.collection('restaurantes').orderBy("nombre", "asc").get()
            .then(snapshot => {
                const Restaurantes = []
                snapshot.forEach(doc => {
                    const info = doc.data()
                    const id = doc.id;
                    Restaurantes.push({ info, id })
                })
                this.setState({ restaurantes: Restaurantes })
            }).catch(error => console.log(error))
        document.title = process.env.REACT_APP_NAME + '';
    }
    componentDidUpdate = () => {
        if (this.props.profile.isLoaded && !this.state.loaded && this.state.restaurantes) {
            if (this.props.profile.isEmpty) {
                this.setState({
                    logged: false,
                    loaded: true
                })
            } else {
                if (this.props.profile.favoritos) {
                    const Favs = []
                    this.props.profile.favoritos.forEach((fav) => {
                        this.state.restaurantes.forEach((resto) => {
                            if (resto.id === fav) {
                                Favs.push({ ...resto })
                            }
                        })
                    })
                    this.setState({
                        hayFavs: true,
                        favs: Favs,
                        logged: true,
                        loaded: true
                    })
                } else {
                    this.setState({
                        hayFavs: false,
                        loaded: true,
                        logged: true
                    })
                }
            }
        }
    }
    toggleView = () => {
        this.setState({ hayFavs: false })
    }
    render() {
        // console.log("PROFILE:", this.props.profile);
        // console.log("STATE: ", this.state);
        return (
            <div>
                <div className="container">
                    <h4>Publicaciones del equipo:</h4>
                    <div className="container">
                        <div className="row">
                            <Preview />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="container">
                    <h4>Elegi tu restaurante preferido!</h4>
                    <div className="row">
                        {this.state.loaded && this.state.restaurantes.map((r) => {
                            return (
                                <div className="col s4 m3 l2" key={r.id}>
                                    <CardResto resto={r} />
                                </div>
                            )
                        })}
                        {!this.state.loaded && this.state.skeleton.map((s) => {
                            return (
                                <div className="col s4 m3 l2" key={s}>
                                    <CardResto type="skeleton" />
                                </div>
                            )
                        })}
                    </div>
                    <div className="row" style={{marginTop: 10}}>
                        {this.state.hayFavs && <h4>Tus restaurantes favoritos:</h4>}
                        {this.state.hayFavs && this.state.favs.map((r) => {
                            return (
                                <div className="col s4 m3 l2" key={r.id}>
                                    <CardResto resto={r} />
                                </div>
                            )
                        })}
                    </div>

                </div>

            </div >
        )
    }
}
const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile
    }
}
export default connect(mapStateToProps, null)(Home)