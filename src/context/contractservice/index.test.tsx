import Context, { useContract } from "./index";
import { fetchIndexData, fetchGroupIds } from "./services";
import App from "../../App";
import {render} from "@testing-library/react";
import { resolve } from "path/posix";

describe("Testing theme toggle button", () => {
    it("should compile at runtime", () => expect(Context).toBeDefined());
    it("Should throw if no address is provided", () => { 
       
        //execute
        //@ts-ignore
        const executeTest = () => render(<Context/>);
    
        //verify
        expect(executeTest).toThrowError();
       
    });

    it("should throw if not used in context", () => { 
        //verify
        const throwable = () => useContract();
        expect(throwable).toThrowError()
    });
})