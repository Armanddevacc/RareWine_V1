

async function getUsers() {
    deleteRest();
    const UserDetails = Moralis.Object.extend("UserDetails");
    let user = Moralis.User.current();

    let userQuery = new Moralis.Query(UserDetails)
    let results = await userQuery.find();



   let table =  `
   <table class="table">
       <thead>
           <tr>
               <th scope="col">ethAddress</th>
               <th scope="col">mail</th>
               <th scope="col">name</th>
               <th scope="col">role</th>
               <th scope="col">item list</th>
               <th scope="col"></th>
           </tr>
       </thead>
       <tbody id="theusers">
      </tbody>
   </table>
   `

    document.querySelector("#tableofusers").innerHTML=table;

    for (let index = 0; index < results.length; index++) {

        const user = results[index];

        let content =  `
                <tr>
                    <td>${results[index].get("ethAddress")}</td>
                    <td>${results[index].get("email")}</td>
                    <td>${results[index].get("name")}</td>
                    <td>${results[index].get("role")}</td>
                    <td>later</td>
                    <td><a onclick="getTd(this)" class="button" href="#popup1" >Edit</a></td>
                </tr>
        `



        theusers.innerHTML+=content;
        
    }

}


function deleteRest() {
   tableoftransactions
    document.getElementById("tableofusers").innerHTML="";
    document.getElementById("tableofnouveauxnfts").innerHTML="";
    document.getElementById("tableoflistnfts").innerHTML="";
    document.getElementById("tableoftransactions").innerHTML="";
}



async function getTd(button) {
    const tr = button.parentElement.parentElement;
    const tds = tr.children;
    let newtds = [];
    for (let index = 0; index < tds.length; index++) {
        newtds.push(tds[index].textContent);
    }

    const popup = `
    <div id="popup1" class="overlay">
        <div class="popup">
            <h2>Edit User</h2>
            <a class="close" href="#">&times;</a>
            <div class="content">
                <label for="user-ethAddress">ethAddress:</label>
                <input type="text" class="form-control" id="user-ethAddress" placeholder=${newtds[0]}>
                
                <label for="user-role">Role:</label>
                <input type="text" class="form-control" id="user-role" placeholder=${newtds[3]}>
                
                <button id="valid">Valid</button>
            </div>
        </div>
    </div>
    `





    document.querySelector("#tableofusers").innerHTML+=popup;

    document.querySelector("#valid").onclick = async function valid() {


        
        // console.log(newtds);

        const query = new Moralis.Query(Moralis.User);  
        query.equalTo("ethAddress", newtds[0]);
        const user = await query.find();
        //console.log(user[0].get("ethAddress"));

        if (document.getElementById("user-role").value !="") {
            user[0].set("role",document.getElementById("user-role").value);
            await user[0].save();
        } else {
            user[0].set("role",user[0].get("role"));
        }
        if (document.getElementById("user-ethAddress").value !="") {
            user[0].set("ethAddress",document.getElementById("user-ethAddress").value);
            await user[0].save();
        } else {
            user[0].set("role",user[0].get("ethAddress"));
        }

        const popup =document.getElementById("popup1");
        popup.parentElement.removeChild(popup);
        location.reload();

    };

}



    
async function getNouveauxNfts() {
    deleteRest()
    const Userinfo = Moralis.Object.extend("UserDetails");
    let user = Moralis.User.current();

    let userQuery = new Moralis.Query(Userinfo)
    let results = await userQuery.find();



   let table =  `
    <div>
        <div>
            <label for="nft-nom">Nom du Nft:</label>
            <input type="text" class="form-control" id="nft-nom" placeholder="Nom du Nft">

            <label for="nft-init">L'initialisateur du Nft:</label>
            <input type="text" class="form-control" id="nft-init" placeholder="Address ethereum de l'initialisateur du Nft">

            <label for="nft-description">Description du nft:</label>
            <textarea type="text" class="scroll" id="nft-description"></textarea>

            <label for="avatar">Choisir un photo:</label>
            <input type="file" id="nft-file" name="avatar"accept="image/png, image/jpeg">

            <div id="attributes">
                <form>
                    <div class="autocomplete" style="width:600px;">
                        <input class="myInput" id="myInput" type="text" name="monAttribut" placeholder="Attribut">
                        <input class="myInputdata" id="myInputdata" type="text" name="monAttributdata" placeholder="Valeur">

                        <button id="add" onclick="addAtrribut(this.parentElement)">ajouter</button>

                    </div>
                </form>
                </div>
            </div>

        <button id="saveNftModel" onclick="saveNftModel()">crée le model nft</button>

    </div>
   `



    document.querySelector("#tableofnouveauxnfts").innerHTML=table;

}
function addAtrribut(buttonparent) {
    buttonparent.innerHTML+=  `<button onclick="this.parentNode.parentNode.removeChild(this.parentNode)">supp</button>`;
    buttonparent.removeChild(document.getElementById("add"));

    let attibutform =  `
    <form>
        <div class="autocomplete" style="width:600px;">
            <input class="myInput" id="myInput" type="text" name="monAttribut" placeholder="Attribut">
            <input class="myInputdata" id="myInputdata" type="text" name="monAttributdata" placeholder="Valeur">
            <button id="add" onclick="addAtrribut(this.parentElement)">ajouter</button>

        </div>
    </form>
    `



    document.querySelector("#attributes").innerHTML+=attibutform;

}





async function saveNftModel() {

    if (document.getElementById("nft-nom").value!="" && document.getElementById("nft-init").value!="" && document.getElementById("nft-description").value!="" && document.getElementById("nft-file").value!="" ) {

        const user = Moralis.User.current();
        // const query = new Moralis.Query(Moralis.User);  
        // const users = await query.find();
    
        // const id = document.getElementById("nft-init").value;
        // let user;


        // for (let index = 0; index < users.length; index++) {
        //     const id2 = users[index].get("ethAddress")

        //     if(id2.toLowerCase()==id.toLowerCase()) {
        //         user = users[index];
        //         console.log(user);
        //         break;
        //     }
        // }

        const myInput=document.getElementsByClassName("myInput");
        const myInputData=document.getElementsByClassName("myInputdata");
        const myInput2=[];
        const myInputData2=[];
        const tot =[];



        for (let index = 0; index < myInput.length; index++) {
            const t1=myInput[index].value  
            const t2=myInput[index].value
            myInput2+=t1;
            myInputData2=+t2;     
            const obj = { 
                "trait_type":t1, 
                "value":t2
            }
            tot+= obj;
        }

        console.log(obj);


        const NftModels = Moralis.Object.extend("Product");
        const nftModels = new NftModels();
    

        nftModels.set("nom", document.getElementById("nft-nom").value);
        nftModels.set("initialisateur", document.getElementById("nft-init").value);
        nftModels.set("description",document.getElementById("nft-description").value)
        nftModels.set("attribute",tot)


  
        
        
        const data = document.getElementById("nft-file").files[0]
        //console.log(data);
        //console.log(document.getElementById("nft-file"));

        
        const name = document.getElementById("nft-nom").value+".png";
    
        const moralisFile = new Moralis.File(name, data );
        moralisFile.save()
        nftModels.set("file", moralisFile);

       
        const params =  { ethAddress: document.getElementById("nft-init").value};
        const savingPerms = await Moralis.Cloud.run("setAlc", params);

        const acl = savingPerms;
        nftModels.setACL(acl)
        await nftModels.save();

        console.log("saved");
        
        
    } else {
        console.log("missing argument(s)");
    }
}


async function getListNfts() {
    deleteRest();
    let user = Moralis.User.current();


    const NftModels = Moralis.Object.extend("Product");
    let nftModels = new Moralis.Query(NftModels)
    let results = await nftModels.find();


   let table =  `
   <h6>Nft en préparation:</h6>
   <table class="table">
       <thead>
           <tr>
               <th scope="col">nom</th>
               <th scope="col">initialisateur</th>
               <th scope="col">description</th>
               <th scope="col">photo</th>
               <th scope="col"></th>
           </tr>
       </thead>
       <tbody id="theprepNft">
      </tbody>
   </table>
   `

    document.querySelector("#tableoflistnfts").innerHTML=table;

    for (let index = 0; index < results.length; index++) {

        const user = results[index];

        const image = user.get("file");

        let content =  `
                <tr>
                    <td>${results[index].get("nom")}</td>
                    <td>${results[index].get("initialisateur")}</td>
                    <td>${results[index].get("description")}</td>
                    <td><img src="${image._url}" width="300px" height="300px"></td>
                    <td><a onclick="getDB(this)" class="button" href="#popup2" >Edit</a></td>
                </tr>
        `



        theprepNft.innerHTML+=content;
        
    }

}



async function getDB(button) {
    // const tr = button.parentElement.parentElement;
    // const tds = tr.children;
    // let newtds = [];
    // for (let index = 0; index < tds.length; index++) {
    //     newtds.push(tds[index].textContent);
    // }

    // const popup = `
    // <div id="popup1" class="overlay">
    //     <div class="popup">
    //         <h2>Edit User</h2>
    //         <a class="close" href="#">&times;</a>
    //         <div class="content">
    //             <label for="user-ethAddress">ethAddress:</label>
    //             <input type="text" class="form-control" id="user-ethAddress" placeholder=${newtds[0]}>
                
    //             <label for="user-role">Role:</label>
    //             <input type="text" class="form-control" id="user-role" placeholder=${newtds[3]}>
                
    //             <button id="valid">Valid</button>
    //         </div>
    //     </div>
    // </div>
    // `





    // document.querySelector("#tableofusers").innerHTML+=popup;

    // document.querySelector("#valid").onclick = async function valid() {


        
    //     // console.log(newtds);

    //     const query = new Moralis.Query(Moralis.User);  
    //     query.equalTo("ethAddress", newtds[0]);
    //     const user = await query.find();
    //     //console.log(user[0].get("ethAddress"));

    //     if (document.getElementById("user-role").value !="") {
    //         user[0].set("role",document.getElementById("user-role").value);
    //         await user[0].save();
    //     } else {
    //         user[0].set("role",user[0].get("role"));
    //     }
    //     if (document.getElementById("user-ethAddress").value !="") {
    //         user[0].set("ethAddress",document.getElementById("user-ethAddress").value);
    //         await user[0].save();
    //     } else {
    //         user[0].set("role",user[0].get("ethAddress"));
    //     }

    //     const popup =document.getElementById("popup1");
    //     popup.parentElement.removeChild(popup);
    //     location.reload();

    // };

}


 