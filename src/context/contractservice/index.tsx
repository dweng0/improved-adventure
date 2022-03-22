import React, { createContext, useState, useEffect, useContext } from "react";
import { ContractDetails, ContractProps } from "./interface";
import abi                          from "../../contracts/abi/abi.json";
import { IndexGroup, IndexPoint }   from "../../interfaces";
import { useMetaMask }                  from "../walletservice";

const ContractServiceContext = createContext<ContractDetails | undefined>(undefined);

/**
 * 
 * Handles connecting to ethereum net, 
 * IT: provides state for the connection
 * Add different ways to connect to web3 here
 */
const ContractProvider: React.FunctionComponent<ContractProps> = ({address, children}) => { 
    
    // pull in web3 and setup some state
    const { web3, state } = useMetaMask();
    const [indexes, setIndexes] = useState<Array<IndexPoint>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    

    /**
     * IT: Promises to return all indexes in a given group id
     * @param contract Web3 eth contract
     * @returns void
     * @HoC
     */
    const fetchIndexData = (contract) => (indexGroup: IndexGroup) => Promise.all(indexGroup.indexes.map(response => contract.methods.getIndex(response).call()));

    /**
     * IT: promises to return the promises of all groupIds 
     * @param contract Web3 eth contract
     * @returns void
     * @HoC
     */
    const fetchGroupIds = (contract) => (groupIds) => Promise.all(groupIds.map(id => contract.methods.getGroup(id).call().then(fetchIndexData(contract))))

    const flattenIndexMatrix = (accummulatedIndexes, currentIndexArray) => accummulatedIndexes.concat(currentIndexArray);
    console.log('hehe');
    /**
     * IT: gets contract details
     * WHEN: web3 is ready
     */
    useEffect(() => { 
        setLoading(true);
        if(state.state === "IDLE" && web3 !== null) {
            const contract = new web3.eth.Contract(abi as any, address);            
            contract.methods.getGroupIds()
            .call()
            .then(fetchGroupIds(contract))
            .then((indexMatrix) => indexMatrix.reduce(flattenIndexMatrix, []))
            .then(setIndexes)
            .finally(() => setLoading(false));

        }
    }, [setIndexes, state, web3]);
    
    return (
       
            <ContractServiceContext.Provider value={{indexes, loading, web3}}> 
                {children}
            </ContractServiceContext.Provider>
       
    )
}

/**
 * A consumer hook exposes the smart contract context at any layer of component depth provided they are wrapped in a provider(IOC)
 * ContractProvider is not exported -on purpose- to control its usage.
 */
export const useContract = (): ContractDetails => { 
    const contractServiceContext = useContext(ContractServiceContext);
    if(contractServiceContext === undefined) { 
        throw new Error("Please use in conjunction with a context provider")
    }
    return contractServiceContext;
}
export default ContractProvider