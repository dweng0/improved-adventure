import IndexCard from '.';
import { asBigNumber, getDollarsFromCents, getEthFromWei, isLong } from './services';
describe("Tests for index cards", () => { 
    it("should compile at runtime", () => expect(IndexCard).toBeDefined());

    it("Should format market cap correctly", () => { 
        //setup
        //execute
        //verify
    });
    it("should return USD in dollars", () => { 
        //setup
        const cents = "25";
        
        //execute
        const result = getDollarsFromCents(cents);
        
        //verify
        expect(result).toEqual("0.25");
    });

    it("should return ethereum in ether", () => { 

        //setup
        const wei = "0260000000000000000";        
        
        //execute
        const result = getEthFromWei(wei);

        //verify
        expect(result).toEqual("0.26");
    });

    it("should be true of big number is long", () => { 
        //setup
        const long = "100";

        //execute
        const result = isLong(asBigNumber(long));

        //verify
        expect(result).toBe(true);
    });

    it("should return false if big number is short", () => { 
        //setup
        const short = -100;

        //execute
        const result = isLong(asBigNumber(short));

        //verify
        expect(result).toBe(false);
    });
});