import React, { Component } from 'react'
import M from 'materialize-css'
export class Test extends Component {
    componentDidMount = () => {
        var options
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, options);
        options = instances
    }
    render() {
        return (
            <div>
                <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>

                <div id="modal1" class="modal">
                    <div class="modal-content">
                        <h4>Modal Header</h4>
                        <p>A bunch of text</p>
                    </div>
                    <div class="modal-footer">
                        <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Test
