import React, { Component } from 'react'
// import M from 'materialize-css'
// import swal from 'sweetalert'
export class Test extends Component {
    state={

    }
    componentDidMount = () => {
        var date1 = new Date()
        var date2 = new Date()
        var date3 = Date.now()
        var date4 = Date.now() + 100
        console.log("DATE1: ", date1);
        console.log("DATE2: ", date2);
        console.log("DATE3: ", date3);
        console.log("DATE4: ", date4);
    }
    render() {
        return (
            <div>
                    a
            </div>
        )
    }
}

export default Test
