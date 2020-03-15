import React, { Component } from 'react'
import './App.css'
import Voting from './Voting.js'

import getWeb3 from './getWeb3.js'
import VOTING_ABI from './contracts/Voting.json';
import { VOTING_ADDRESS } from './config.js'

class App extends Component {
    componentWillMount() {
        this.loadBlockchainData()
    }

    async loadBlockchainData() {
        const web3 = await getWeb3()
        this.web3 = web3
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
        const voting = new web3.eth.Contract(VOTING_ABI.abi, VOTING_ADDRESS)
        this.setState({ voting })
        this.votePrice = await voting.methods.votePrice().call();
        this.question = await voting.methods.question().call();
        const num_candidate = await voting.methods.num_candidate().call()
        this.setState({ num_candidate })
        for (var i = 1; i <= num_candidate; i++) {
            const candidate = await voting.methods.candidates(i).call()
            this.setState({
                candidates: [...this.state.candidates, candidate]
            })
        }
        this.setState({ loading: false })
        console.log(this.state)
    }

    constructor(props) {
        super(props)
        this.state = {
            account: '',
            num_candidate: 0,
            candidates: [],
            loading: true
        }
    }

    render() {
        return (
            <div>
            <div className="container-fluid">
            <div className="row">
            <main role="main" className="col-lg-12 d-flex justify-content-center">
            {this.state.loading
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                : <Voting
                candidates={this.state.candidates}
                voteCandidate={this.voteCandidate}
                votePrice={this.votePrice}
                question={this.question}
                />
            }
            </main>
            </div>
            </div>
            </div>
        );
    }
}

export default App;

