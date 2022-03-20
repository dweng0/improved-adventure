import { MetaMaskInpageProvider } from '@metamask/providers';
import { AbstractProvider } from 'web3-core/types';
import { AbiItem } from 'web3-utils/types';
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import './App.css';
import { IndexGroup } from './interfaces';

const App: React.FunctionComponent = () => {

  /**
   *  0x8e7cb6e1: ƒ ()
      0xc02b8b2c: ƒ ()
      0xceb60654: ƒ ()
      getGroup: ƒ ()
      getGroup(uint256): ƒ ()
      getGroupIds: ƒ ()
      getGroupIds(): ƒ ()
      getIndex: ƒ ()
      getIndex(uint256): ƒ ()
   */
  
  //first
  const address = '0x4f7f1380239450AAD5af611DB3c3c1bb51049c29';
  const providerUrl = process.env.PROVIDER_URL;
  let web3;

  // wont accept AbiItem as type...
  const abi: any = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[],"name":"getGroupIds","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_groupId","type":"uint256"}],"name":"getGroup","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256[]","name":"indexes","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_indexId","type":"uint256"}],"name":"getIndex","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"ethPriceInWei","type":"uint256"},{"internalType":"uint256","name":"usdPriceInCents","type":"uint256"},{"internalType":"uint256","name":"usdCapitalization","type":"uint256"},{"internalType":"int256","name":"percentageChange","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"}];
  const [beef, setBeef] = useState(null);
  useEffect(() => { 
    // check if we have metamask wallet installed
    let provider: MetaMaskInpageProvider = (window.ethereum) as MetaMaskInpageProvider;

    if(typeof provider !== undefined) { 
      provider.request({method: "eth_requestAccounts"})
        .then((accounts) => {
          console.log(accounts);
        }).catch((err) => { 
          console.log(err);
        }).finally(() => { 
          web3 = new Web3(provider as AbstractProvider);
          
          
          const contract = new web3.eth.Contract(abi, address);
          //At first you should get all group ids:getGroupIds
          contract.methods.getGroupIds().call().then((a: any) => { 
            console.log(a);
            //Then get group info by it’s id:getGroup
            a.forEach(item => contract.methods.getGroup(item).call()
              .then((result: IndexGroup) => { 
                  //And to get data for each index you should use function:getIndex
                  result.indexes.forEach(res => {
                    contract.methods.getIndex(res).call().then(response => {
                      //console.log(response);
                    })
                  });
                
              }));
            });
          console.log(contract.methods);
        });
    }
    
  }, []);
  return (
    <div className="App">
      hey
    </div>
  );
}

export default App;
