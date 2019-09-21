import React from 'react';

class templateComponent extends React.Component {
    state = {
        text: "WHAT'S UPPPP"
    }
    render() {
        return (
            <div>
                <h1>{this.state.text}</h1>
            </div>
        )
    }
}


export default templateComponent;