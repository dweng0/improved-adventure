import { IndexGroup } from "./interface";

  /**
     * IT: Promises to return all indexes in a given group id
     * @param contract Web3 eth contract
     * @returns void
     * @HoC
     */
   export const fetchIndexData = (contract) => (indexGroup: IndexGroup) => Promise.all(indexGroup.indexes.map(response => contract.methods.getIndex(response).call()));

   /**
    * IT: promises to return the promises of all groupIds 
    * @param contract Web3 eth contract
    * @returns void
    * @HoC
    */
export const fetchGroupIds = (contract) => (groupIds) => Promise.all(groupIds.map(id => contract.methods.getGroup(id).call().then(fetchIndexData(contract))))