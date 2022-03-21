import React, { createContext, useState, useEffect, useContext } from "react";
import { ContractDetails, ContractProps } from "./interface";
import abi                          from "../../contracts/abi/abi.json";
import { IndexGroup, IndexPoint }   from "../../interfaces";
import { useWeb3 }                  from "../webthreeservice";

const ContractServiceContext = createContext<ContractDetails | undefined>(undefined);

/**
 * 
 * HOC that handles connecting to web3, 
 * IT: provides state for the connection
 * Add different ways to connect to web3 here
 */
const ContractProvider: React.FunctionComponent<ContractProps> = ({address, children}) => { 
    
    // pull in web3 and setup some state
    const { web3, state } = useWeb3();
    const [indexes, setIndexes] = useState<Array<IndexPoint>>([]);

    /**
     * HoC. Navigate the contract methods and apply the indexes to a cache. Then 'finally' set it to state
     * @param contract Web3 eth contract
     * @returns void
     */
    const indexData = (contract) => (indexGroup: IndexGroup) => Promise.all(indexGroup.indexes.map(response => contract.methods.getIndex(response).call()));

    /**
     * HoC traverse the group ids of a contract 
     * @param contract Web3 eth contract
     * @returns void
     */
    const groupInfo = (contract) => (groupIds) => Promise.all(groupIds.map(id => contract.methods.getGroup(id).call().then(indexData(contract))))

    /**
     * IT: gets contract details
     * WHEN: web3 is ready
     */
    useEffect(() => { 
        if(state.state === "CONNECTED" && web3 !== null) {
            const contract = new web3.eth.Contract(abi as any, address);
            
            contract.methods.getGroupIds()
            .call()
            .then(groupInfo(contract))
            .then(console.log);
        }
    }, [state, web3, groupInfo, indexData, setIndexes]);


    return (
       
            <ContractServiceContext.Provider value={{indexes}}> 
                {children}
            </ContractServiceContext.Provider>
       
    )
}

/**
 * A consumer hook exposes the smart contract context at any layer of component depth provided they are wrapped in a provider(IOC)
 * ContractServiceContext is not exported -on purpose- to control its usage.
 */
export const useContract = (): ContractDetails => { 
    const contractServiceContext = useContext(ContractServiceContext);
    if(contractServiceContext === undefined) { 
        throw new Error("Please use in conjunction with a context provider")
    }
    return contractServiceContext;
}
export default ContractProvider