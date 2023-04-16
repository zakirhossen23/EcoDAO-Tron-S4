import { useState, useEffect } from "react";
import TronWeb from 'tronweb';

export default function useContract() {
	const [contractInstance, setContractInstance] = useState({
		contract: null,
		signerAddress: null,
		sendTransaction: sendTransaction
	})

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (window.localStorage.getItem("login-type") === "tronlink"){
					const contract = { contract: null, signerAddress: null, sendTransaction: sendTransaction }
	
					contract.contract =  await window?.tronWeb?.contract().at('TM5wdc1Rk9RuGNGQfRk3ySK17vxejbpiU7');
					contract.signerAddress =  window?.tronWeb?.defaultAddress?.base58;
					window.contract = contract.contract;
					setContractInstance(contract);
				}
			} catch (error) {
				console.error(error)
			}
		}

		fetchData()
	}, [])

	async function sendTransaction(methodWithSignature) {
		let output = await methodWithSignature.send({
			feeLimit: 1_000_000_000,
			shouldPollResponse: false
		});
		return output;
	}


	return contractInstance
}
