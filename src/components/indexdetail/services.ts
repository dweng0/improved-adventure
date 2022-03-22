import BigNumber from "bignumber.js";
import { WEI_DECIMAL_PLACES, CENT_DECIMAL_PLACES } from "../../constants";

export const getEthFromWei =    (wei) => new BigNumber(wei).shiftedBy(WEI_DECIMAL_PLACES).toFormat(2);
export const getDollarsFromCents = (cents) => new BigNumber(cents).shiftedBy(CENT_DECIMAL_PLACES).toFormat(2);
export const formatMarketCap = (marketCap) => new BigNumber(marketCap).toFormat(2);
export const asBigNumber = (num) => new BigNumber(num);
export const isLong = (num: BigNumber) => (num.gt(0));