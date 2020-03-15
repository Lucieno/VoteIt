import React, { Component } from 'react'
import getWeb3 from './getWeb3.js'
import './App.css';

class App extends Component {
	componentWillMount() {
		this.loadBlockchainData()
	}

	async loadBlockchainData() {
		const web3 = await getWeb3()
		this.web3 = web3
		const accounts = await web3.eth.getAccounts()
		this.setState({ account: accounts[0] })
	}

	constructor(props) {
		super(props)
		this.state = { account: '' }
	}

	render() {
		return (
			<div className="container">
			<h1>Hello, World!</h1>
			<p>Your account: {this.state.account}</p>
			</div>
		);
	}
}

export default App;
