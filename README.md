# subgraph_demo



Intro
The Graph is a decentralized protocol that helps indexing and querying data from blockchains. With the help of the Graph, it’s possible to query data that is usually difficult for users to access directly. The Graph protocol can be used to search for any Ethereum data through simple queries. These APIs (indexed "subgraphs") can then be queried with a standard GraphQL API.

Working
Through a subgraph manifest (description), the Graph learns how and what data to index on Ethereum.The Graph works by first allowing decentralized applications to add data to Ethereum through transactions on smart contracts. Through the transaction, one or more events are emitted by the smart contract. The Graph Node then continuously scans for the new blocks and the data for your subgraphs that they may contain. When the Node finds one, it updates the data entities that the Graph Node stores in response to Ethereum events. The application then queries the Graph Node through a complex process using GraphQL to get the index data. Finally, the data source is displayed to the end user.

Creating a subgraph 
Install the Graph CLI using `npm install -g @graphprotocol/graph-cli`. `graph init` command can be used to set up the subgraph project.
`graph init \
  --product subgraph-studio
  --from-contract <CONTRACT_ADDRESS> \
  [--network <ETHEREUM_NETWORK>] \
  [--abi <FILE>] \
  <SUBGRAPH_SLUG> [<DIRECTORY>]`
`graph add <address> ` can be used to add new data sources to an existing subgraph. It will fetch the ABI from etherscan and update the schema and mappings accordingly.
the Graph CLI can generate AssemblyScript types from the subgraph's GraphQL schema and the contract ABIs included in the data sources using `graph codegen [--output-dir <OUTPUT_DIR>] [<MANIFEST>]` or `npm run codegen`. This will generate an AssemblyScript class for every smart contract in the ABI files mentioned in the subgraph.yaml.  It will also generate a class for every contract event to provide easy access to event parameters, as well as the block and transaction the event originated from.
Note: The code generation must be performed again after every change to the GraphQL schema or the ABIs included in the manifest. It must also be performed at least once before building or deploying the subgraph.
Run `graph build` to check the mapping code of AssemblyScript



Subgraph files
subgraph.yaml : contains the subgraph manifest, defines the smart contracts your subgraph indexes, which events from these contracts to pay attention to, and how to map event data to entities that Graph Node stores and allows to query.
subgraph-manifest.md

description 
repository
features
dataSources.source - address, abi and the startblock
dataSources.mapping.entities - the entities that the data source writes to the store (schema is defined in the schema.graphql)
dataSources.mapping.abis
dataSources.mapping.eventHandlers - the smart contract events this subgraph and the handlers in the mapping - ./src/contract.ts
dataSources.mapping.callHandlers - the smart contract functions this subgraph reacts to and handlers in the mapping that transform the inputs and outputs to function calls into entities in the store. Call handlers will only trigger in one of two cases: when the function specified is called by an account other than the contract itself or when it is marked as external in Solidity and called as part of another function in the same contract.
dataSources.mapping.blockHandlers 

schema.graphql : graphql schema that defines what data is stored in the subgraph and  how to query it using GraphQL. Required fields are indicated by the `!` in the schema.
GraphQL API


AssemblyScript (./src/contract.ts file) : code that translates from the event data to the entities defined in the schema. 
For each event handler that is defined in subgraph.yaml under mapping.eventHandlers, create an exported function of the same name. Each handler must accept a single parameter called event with a type corresponding to the name of the event which is being handled.

./generated/contract/contract.ts : The classes provide type-safe entity loading, read and write access to entity fields as well as a save() method to write entities to store. 


For the use of registry or factory contracts 
(where one contract creates, manages or references an arbitrary no. of other contracts that each have their own state and events)
First, you define a regular data source for the main contract.
Then, you add data source templates to the manifest. These are identical to regular data sources, except that they lack a pre-defined contract address under source. Typically, you would define one template for each type of sub-contract managed or referenced by the parent contract.
In the final step, you update your main contract mapping to create a dynamic data source instance from one of the templates.


PROCESS OF UPDATE
In the deployed subgraph repo, the subgraph.yaml (manifest file) can be updated with new contract address, entities, event handlers etc. 
To auto-generate new assembly script, ABI from the ./abis/<contract>.json and schema.graphql file has to be changed with new functionalities 
Run `graph codegen` to generate an AssemblyScript class for every smart contract in the ABI files mentioned in the subgraph.yaml.
Run `graph build` to check the schema file and fix any syntax errors that the TypeScript compiler might find.
Deploy the graph with new version
