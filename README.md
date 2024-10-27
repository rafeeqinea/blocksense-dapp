
# Blocksense Oracle Data dApp

## Project Details

**Project Name:**  
Blocksense Oracle Data dApp

**Short Project Description:**  
A decentralized application (dApp) that reads data from Blocksense's catalogue of data feeds and displays it in real-time. The dApp includes features such as a dark mode toggle and wallet connection.

**Explanation of How Sponsor Tech Was Used:**  
This project utilizes Blocksense's oracle data feeds to fetch and display real-time cryptocurrency prices. The smart contract interacts with Blocksense's oracle to retrieve data, which is then displayed in the frontend.

**AI Tool Used:**  
ChatGPT was utilized for generating and refining documentation, helping with code structuring, and assisting with troubleshooting common issues.

---

## Project Structure

The following is the main directory structure for the project:

```
C:/Users/blocksense-dapp/
├── my-dapp/
├── node_modules/
├── package.json
└── package-lock.json
```

The `blocksense-dapp` folder is separate from the original `EncodeLondon_Hackathon` repository. You can obtain the full project source from the GitHub repository linked below.

---

## Codebase

**GitHub Repository:**  
[EncodeLondon Hackathon Repository](https://github.com/blocksense-network/EncodeLondon_Hackathon)

**Readme Overview:**  
The README file provides a detailed overview of the project, including setup instructions, project structure, and a summary of the functionality.

---

## Setup Instructions

1. **Install Dependencies:**  
   Run the following command in the `blocksense-dapp` directory to install the required dependencies:
   ```bash
   npm install
   ```

2. **Compile the Smart Contract:**  
   Use Hardhat to compile the smart contract with:
   ```bash
   npx hardhat compile
   ```

3. **Deploy the Smart Contract:**  
   To deploy the contract locally, run:
   ```bash
   npx hardhat run scripts/deploy.js --network localhost
   ```

4. **Run the React App:**  
   Start the frontend application with:
   ```bash
   npm start
   ```

5. **Docker Compose Commands:**  
   Use Docker Compose to bring up and down the services as needed:
   
   - To start the services:
     ```bash
     docker-compose up -d
     ```
   
   - To stop the services:
     ```bash
     docker-compose down
     ```

---

