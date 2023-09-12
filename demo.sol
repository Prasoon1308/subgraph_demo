// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract demo {
    // 0xB0049F7e339e9DCa2f81cE3c4341dd41770b5BAC
    // 0x6F9bf6804eeB5433aEB7C33EF97448113dF4754b
    uint256 a;
    uint256 b;
    event value(uint256 one);
    event valuetwo(uint256 two);

    function demoFunc(uint256 _a) public {
        a = _a;

        emit value(a);
    }

    function demoFunctwo(uint256 _b) public {
        b = _b;

        emit valuetwo(b);
    }

    function getA() public view returns (uint256) {
        return a;
    }
}
