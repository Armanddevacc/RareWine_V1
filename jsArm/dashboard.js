


async function SetThingsUpAndRunning() {
  if(Moralis.User.current()!=null){
    let user = Moralis.User.current();
    const UserDetails = Moralis.Object.extend("UserDetails");
    const query = new Moralis.Query(UserDetails);
    query.equalTo("ethAddress", user.get("ethAddress"));
    const results = await query.first();
    document.getElementById("sidebarMenu").innerHTML = "";

    switch (results.get("role")) {
      case "initialisateur":
      const slidedefault1 = `     
      <div class="position-sticky pt-3">
        <ul class="nav flex-column" id="slidelist">

          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">
              <span data-feather="home"></span>
              Informations Personnel
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="#">
              <span data-feather="file"></span>
              Vos NFT
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="#">
              <span data-feather="shopping-cart"></span>
              Devenir Partenaire
              </a>
            </li>
          </ul>
        </div>
        `
        document.getElementById("sidebarMenu").innerHTML = slidedefault1;

        const tableofdefault1 =`          
        <div id="tableofusers" class="table-responsive">

        </div>
        <div id="tableofnouveauxnfts" class="table-responsive">

        </div>
        <div id="tableoflistnfts" class="table-responsive">

        </div>`
        document.getElementById("tableof").innerHTML = tableofdefault1;


          const slidedefault2 = `     
            <li class="nav-item">
              <a class="nav-link" onclick="getNFTavalider()">
                <span data-feather="shopping-cart"></span>
                vos NFT à valider !
              </a>
            </li>
            `

          document.getElementById("slidelist").innerHTML += slidedefault2;

          const tableofdefault2 =`          
          <div id="tableofnftavalider" class="table-responsive ">
            <ul class="cards", id="card">
            </ul>

          </div>
          `
          document.getElementById("tableof").innerHTML += tableofdefault2;






      break;
          case "admin":
            const slideadmin = `     
            <div class="position-sticky pt-3">
          <ul class="nav flex-column">
          <li class="nav-item">
          <a class="nav-link active" aria-current="page" >
          <span data-feather="home"></span>
          Espace Client
              </a>
              </li>
              <li class="nav-item">
              <a class="nav-link"id="get-User" onclick="getUsers()">
              <span data-feather="file"></span>
              Users
              </a>
              </li>
              <li class="nav-item">
              <a class="nav-link"id="get-nouveauxnfts" onclick="getNouveauxNfts()">
              <span data-feather="shopping-cart"></span>
              Nouveaux NFTs

              </a>
              </li>
              <li class="nav-item">
              <a class="nav-link" id="get-listnfts" onclick="getListNfts()">
              <span data-feather="shopping-cart"></span>
              Liste des NFTs

              </a>
              </li>
              <li class="nav-item">
              <a class="nav-link"  id="get-Transation">
                <span data-feather="users"></span>
                Transations
                </a>
                </li>
                </ul>
                </div>
            `
            document.getElementById("sidebarMenu").innerHTML = slideadmin;

            const tableofadmin =`          
            <h2>Users</h2>
            <div id="tableofusers" class="table-responsive">

              </div>
              <h2>Nouveaux NFTs</h2>
              <div id="tableofnouveauxnfts" class="table-responsive">

              </div>
              <h2>Listes NFTs</h2>
              <div id="tableoflistnfts" class="table-responsive">

              </div>
              <h2>Transations</h2>
              <div id="tableoftransactions" class="table-responsive">

              </div>`
              document.getElementById("tableof").innerHTML = tableofadmin;

              break;

      default:
        const slidedefault = `     
        <div class="position-sticky pt-3">
          <ul class="nav flex-column" id="slidelist">

            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">
                <span data-feather="home"></span>
                Informations Personnel
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="#">
                <span data-feather="file"></span>
                Vos NFT
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="#">
                <span data-feather="shopping-cart"></span>
                Devenir Partenaire
                </a>
              </li>
            </ul>
          </div>
          `
          document.getElementById("sidebarMenu").innerHTML = slidedefault;

          const tableofdefault =`          
          <h2>Informations Personnel</h2>
          <div id="tableofusers" class="table-responsive">

          </div>
          <h2>Vos NFT</h2>
          <div id="tableofnouveauxnfts" class="table-responsive">

          </div>
          <h2>Devenir Partenaire</h2>
          <div id="tableoflistnfts" class="table-responsive">

          </div>`
          document.getElementById("tableof").innerHTML = tableofdefault;




        break;
      }

    SetThingsUpAndRunning();
    } else {
      window.location.href="login.html" 
    }
    

  }
  
  
  


  

