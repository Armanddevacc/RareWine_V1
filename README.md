# 🍷 NFT Collatéralisé sur le Vin - Web3 & React

## ⚠️ Ce projet est obsolète (3+ ans)  
Ce projet a été développé il y a **plus de 3 ans** et utilise des technologies qui peuvent être **outdatées**. Certaines dépendances, outils ou réseaux (comme le **testnet Ropsten**, qui a été déprécié) peuvent ne plus fonctionner. Des mises à jour seraient nécessaires pour le rendre compatible avec les solutions Web3 actuelles.

---

## 🌍 Contexte du projet  
Ce projet explore **l'univers du Web3** en développant une plateforme permettant de **créer et gérer des NFTs collatéralisés par un actif réel : le vin**.  

Inspiré par **Blockbar.com**, l’idée était d’expérimenter l’intégration des **contrats intelligents (Solidity)** avec un **site ReactJS**, pour permettre aux utilisateurs de **minter des NFTs liés à des bouteilles de vin physiques**.  

À l’origine, les **NFTs étaient déployés sur le testnet Ropsten**, mais ce réseau ayant été désactivé, il faudrait maintenant adapter le projet à un autre testnet (Goerli, Sepolia) ou à un **mainnet** compatible (Polygon, Ethereum, etc.).

---

## 🛠️ Technologies utilisées  
- **ReactJS** → Interface utilisateur interactive  
- **Solidity** → Développement des **smart contracts** sur Ethereum  
- **Hardhat** → Déploiement et test des contrats  
- **Ethers.js** → Interaction avec la blockchain  
- **MetaMask** → Connexion et signature des transactions  
- **IPFS** → Stockage décentralisé des métadonnées des NFTs  

---

## 🚀 Fonctionnalités principales  
✅ **Génération de NFTs** associés à une bouteille de vin réelle  
✅ **Déploiement initial des smart contracts** sur **Ropsten (aujourd’hui obsolète)**  
✅ **Connexion avec MetaMask** pour signer les transactions  
✅ **Affichage des NFTs possédés** par l’utilisateur  
✅ **Stockage des métadonnées** sur **IPFS**  

---

## 🔧 Installation & Lancement  

### 📥 1. Installation  
Assurez-vous d’avoir **Node.js** installé, puis clonez le projet :  

```bash
git clone https://github.com/ton-repo/nft-wine.git
cd nft-wine
npm install
```
## ⚙️ 2. Configuration de l’environnement
Créez un fichier .env à la racine du projet et ajoutez votre clé privée pour signer les transactions :
```bash
PRIVATE_KEY="ta_clé_privée"
INFURA_API_KEY="ta_clé_infura"
```
## ▶️ 3. Lancer le projet
Démarrer le frontend React :
npm start
L’application sera accessible sur http://localhost:3000.
Déployer les smart contracts avec Hardhat :
npx hardhat run scripts/deploy.js --network ropsten
⚠️ Ropsten étant obsolète, il faut mettre à jour la configuration pour utiliser Goerli ou Sepolia.
📜 Explication des smart contracts

Le contrat principal, NFTWine.sol, permet de :
🔹 Créer un NFT associé à une adresse Ethereum et à une bouteille de vin
🔹 Stocker les métadonnées sur IPFS (nom du vin, domaine, millésime...)
🔹 Vérifier l’authenticité du NFT et donc du vin correspondant

##🛠️ Mise à jour nécessaire

✅ Changer de testnet (Goerli ou Sepolia à la place de Ropsten)
✅ Mettre à jour les dépendances Solidity, Hardhat et Ethers.js
✅ Adapter les smart contracts aux standards ERC-721 actuels
✅ Ajouter un marché secondaire pour la revente des NFTs


