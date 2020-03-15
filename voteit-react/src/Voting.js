import React, { Component } from 'react'

class Voting extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedOption: -1
        }

        this.handleOptionChange = this.handleOptionChange.bind(this)
    }

    handleOptionChange(event) {
        this.setState({ selectedOption: event.target.name })
    }

    render() {
        return (
            <div id="content">
            <label className="question">{this.props.question}</label>
            <ul id="candidateList" className="list-unstyled">
            {this.props.candidates.map((candidate, key) => {
                return (
                    <div key={key}>
                    <label className="candidateTemplate">
                    <input
                    type="radio"
                    name={candidate.id}
                    value={candidate.id}
                    ref={(input) => { this.radio = input }}
                    checked={this.state.selectedOption === candidate.id}
                    onChange={this.handleOptionChange}
                    className="form-check-input"
                    />
                    {candidate.name}
                    <label className="candidateVote">{candidate.num_vote}</label>
                    </label>
                    </div>
                )
            })}
            </ul>
            <label className="price">Price for each vote: {this.props.votePrice / 1000000000000000000} ETH</label>
            </div>
        );
    }
}

export default Voting;

