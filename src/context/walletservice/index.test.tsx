import React from 'react';
import WalletServiceProvider, { useMetaMask} from '.';

import {render} from "@testing-library/react";

describe("Tests for Wallet context", () => {
    it("should render at runtime", () => { 
        expect(<WalletServiceProvider />).toBeDefined();
    });

    it("Should throw is useMetaMask is not used under Webservice context", () => { 
         //setup     
         //execute
         const throwable = () => useMetaMask();
 
         //verify
         expect(throwable).toThrow();
    });


});