// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (finance/PaymentSplitter.sol)
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/finance/PaymentSplitter.sol";


contract PAYMENTS is PaymentSplitter {

      constructor( address[] memory _payees, uint256[] memory _shares) PaymentSplitter( _payees , _shares ) payable { 
      }   

    function release_eth(address payable account) public virtual {
         release(account);
    }  
     


     /*
    function release(address account) public virtual {

        if (_shares[account] == 0) {
            return;
        }

        uint256 payment = pending(account);

        if (payment == 0) {  return;   }

        _released[account] += payment;
        _totalReleased += payment;

        payable(account).transfer(payment);

        emit PaymentReleased(account, payment);

    }
     */


}