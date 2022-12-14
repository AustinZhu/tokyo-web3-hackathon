//SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.0;

import "./IERC5727Upgradeable.sol";

/**
 * @title ERC5727 Soulbound Token Shadow Interface
 * @dev This extension allows restricting the visibility of specific soulbound tokens.
 *    interfaceId = 0x3475cd68
 */
interface IERC5727ShadowUpgradeable is IERC5727Upgradeable {
    /**
     * @notice Shadow a token.
     * @dev MUST revert if the `tokenId` token does not exists.
     * @param tokenId The token to shadow
     */
    function shadow(uint256 tokenId) external;

    /**
     * @notice Reveal a token.
     * @dev MUST revert if the `tokenId` token does not exists.
     * @param tokenId The token to reveal
     */
    function reveal(uint256 tokenId) external;

    /**
     * @notice Get if a token is shadowed.
     * @dev MUST revert if the `tokenId` token does not exists.
     * @param tokenId The token to query
     */
    function isShadowed(uint256 tokenId) external returns (bool);
}
