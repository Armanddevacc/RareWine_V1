const nft_contract_address = "0x0Fb6EF3505b9c52Ed39595433a21aF9B5FCc4431";
/*
Available deployed contracts
"0xA2991cc511fccf14B4542f10a250683Af04CE374" 
Ethereum Rinkeby 0x0Fb6EF3505b9c52Ed39595433a21aF9B5FCc4431
Polygon Mumbai 0x351bbee7C6E9268A1BF741B098448477E08A0a53
BSC Testnet 0x88624DD1c725C6A95E223170fa99ddB22E1C6DDD
*/



const web3 = new Web3(window.ethereum)
async function getNFTavalider() {
    

    // let table =  `
    // <h6>Nft en préparation:</h6>
    // <table class="table">
    //     <thead>
    //         <tr>
    //             <th scope="col">nom</th>
    //             <th scope="col">initialisateur</th>
    //             <th scope="col">description</th>
    //             <th scope="col">photo</th>
    //             <th scope="col"></th>
    //         </tr>
    //     </thead>
    //     <tbody id="theprepNft">
    //    </tbody>
    // </table>
    // `
//     const target = document.querySelector('#card');

// // insert the element before target element
//     const h2 = document.createElement("h2")
//     h2.innerText+=`Vos NFT à valider:`
//     target.parentNode.insertBefore(h2, target);
//
    document.getElementById("card").innerHTML="";
    var eElement= document.getElementById("tableof");
    var newFirstElement= document.createElement("div"); 
    // newFirstElement.textContent = "";
    // newFirstElement.style.fontWeight="bold";
    newFirstElement.innerHTML+="<h2 style='fontWeight: bold'>NFT à Valider:</h2><p><em>Vous pouvez valider et ainsi publié le nft vendu à votre prix décidé ou alors demander à revoir le NFT pour que nous effectuons des modifications sur le text ou bien quelconque paramètre(s)</em></p>"
    eElement.insertBefore(newFirstElement, eElement.firstChild);
    

 
     let user = Moralis.User.current();
 
 
     const NftModels = Moralis.Object.extend("Product");
     let nftModels = new Moralis.Query(NftModels)
     let result = await nftModels.find();
 
     let bool= false
     for (let index = 0; index < result.length; index++) {
       const address1=user.get("ethAddress").toLowerCase()
       const address2=result[index].get("initialisateur").toLowerCase()
       if (address1==address2) {
         const user2 = result[index];
         const image = user2.get("file");
    //      <tr>
    //      <td>${result[index].get("nom")}</td>
    //      <td>${result[index].get("initialisateur")}</td>
    //      <td>${result[index].get("description")}</td>
    //      <td><img src="${image._url}" width="300px" height="300px"></td>
    //      <td><a onclick="revoir(this)" class="button" href="#popup2" >à revoir</a></td>
    //      <td><a onclick="upload(this)" class="button" href="#popup2" >Valider</a></td>



    //  </tr>
    //let list = [result[index].get("nom"), result[index].get("initialisateur"), result[index].get("description") , image._url];
      
    

    //style="max-width:100%; max-height: 100%;
      let content =  `


         <li>
         <a class="card" ">

           <img src="${image._url}" class="card__image" alt="" />
           <div class="card__overlay">
             <div class="card__header">
               
               
               <div class="card__header-text">
                 <h3 class="card__title">${result[index].get("nom")}</h3>       
                 <span class="card__status">${result[index].get("initialisateur")}</span>     
                 <span class="card__status">${result[index].get("updatedAt")}</span>
               </div>
             </div>
             
            <p class="card__description">${result[index].get("description")}</p>
            <p class="card__description">${JSON.stringify(result[index].get("attribute"))}</p>

            <div class="center">
              <button class="button", onclick="revoir(this)">à revoir</button>
              <button class="button", onclick="upload(this)">valider</button>
            </div>
           </div>
         </a>      
       </li>
         `
         document.getElementById("card").innerHTML+=content;
       }
        
     }

 
 
 
 }



async function upload(button){
    

    const tr = button.parentElement;
    const imagetest = tr.parentElement.previousElementSibling;
    const description = tr.previousElementSibling.previousElementSibling.innerText;
    const attributes = tr.previousElementSibling.innerText;

    const div = tr.previousElementSibling.previousElementSibling.previousElementSibling;
    const div2 = div.children[0];
    const nom = div2.children[0].innerText;
    const initialisateur = div.children[0].children[1].innerText;

    // console.log(description);
    // console.log(nom);
    // console.log(initialisateur);
    // console.log(imagetest.src);




    const imgsrc= imagetest.src;
    let file = 0;
    fetch(imgsrc)
    .then(res => res.blob())
    .then(async blob => {
      file = new File([blob], 'test.png', blob)


      const imageFile = new Moralis.File(file.name, file);
      await imageFile.saveIPFS();
      const imageURI = imageFile.ipfs();


      //const attributes=[{"trait_type": "vintage", "value": "2018"}]
        
      
      const metadata = {
        "name":nom,
        "description":description,
        "image": imageURI,
        "attributes":attributes
      }
      

    
    const metadataFile = new Moralis.File("metadata.json", {base64 : btoa(JSON.stringify(metadata))});
    await metadataFile.saveIPFS();
    const metadataURI = metadataFile.ipfs();
    console.log(metadataFile);
    console.log(metadataURI);
    const txt = await mintToken(metadataURI).then(notify(imgsrc))

    })
}

    async function mintToken(_uri){


      const encodedFunction = web3.eth.abi.encodeFunctionCall({
        name: "mintToken",
        type: "function",
        inputs: [{
          type: 'string',
          name: 'tokenURI'
          }]
      }, [_uri]);

      const transactionParameters = {
        to: nft_contract_address,
        from: ethereum.selectedAddress,
        data: encodedFunction
      };
      const txt = await ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters]
      });
      return txt
    }

    async function notify(imgsrc){
      
    console.log("nft minted");
      
    const NftModels = Moralis.Object.extend("Product");
    let nftModels = new Moralis.Query(NftModels)

    let result = await nftModels.find();

    for (let index = 0; index < result.length; index++) {

      if (result[index].get("file")._url==imgsrc) {
        //result[index].destroy();
        break;
      }
      
    }
      
    } 
    
function deleteRest() {
    try {
        document.getElementById("tableof-nftvalider").innerHTML="";
        document.getElementById("tableof-nftvente").innerHTML="";
        document.getElementById("tableof-transactions").innerHTML="";  
    } catch (error) {
        
    }
     
 }