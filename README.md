# tokyo-web3-hackathon

The DAO tool we designed is to utilize semi-fungible SBT token model (EIP-5727) to solve the problems in DAO governance, such as over-financialization, sybil attack, and bureaucracy. Our demo includes the following features, please note that you must refresh the page when your contract interaction is done:

- Create program: In this section, you can deploy semi-fungible SBT smart contracts, and customize your program name and cover here.

- Soulbound collection:  The collection represents the slots, i.e. the various types of non-transferable content belonging to the program. For every asset minted there should be one contract interaction. For example, if there are 3 assets in one slot, you will have to interact three times.

- Souldrop: The souldrop feature allows the admin to drop rewards to those loyal and active members. You can filter members on the eligibility page and create corresponding rewards. Both contract deployment and NFT distribution will be completed in one interaction.

- Revoke: The revoke feature allows the admin to revoke the SBT that members have. To use this feature, first, you need to search for the appropriate address. All SBTs for this address will be displayed in the list. After being revoked, the corresponding button will be shown as invalid.

## Tech Stacks

- Frontend: Next.js, React.js, TailwindCSS, ethers.js, TypeScript
- Backend: AWS Lambda, AWS DynamoDB, AWS API Gateway, Python
- Blockchain: Ethereum (Goerli), Solidity, Hardhat

