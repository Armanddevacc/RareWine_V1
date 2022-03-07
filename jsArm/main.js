const serverUrl = "https://knh2o8axdkyk.usemoralis.com:2053/server";
const appId = "pmN1N3iX94KXoh48nxfJEUc0XaSmVCUkuO5m1P93";
Moralis.start({ serverUrl, appId });








async function login() {
  let user = Moralis.User.current();
  if (!user) {
    user = await Moralis.authenticate({ signingMessage: "Log in using Moralis" })
    .then(async function (user) {
      
      
      const UserDetails = Moralis.Object.extend("UserDetails");
      const query = new Moralis.Query(UserDetails);
      query.equalTo("ethAddress", user.get("ethAddress"));
      const results = await query.first();
      
      if (results==null) {
        //if no register user
        
        const userDetails = new UserDetails();
        userDetails.set("ethAddress", user.get("ethAddress"));
        userDetails.set("role", user.get("default"));
        
        
        let acl1 = new Moralis.ACL()
        acl1.setReadAccess(user, true)
        acl1.setWriteAccess(user, true)
        acl1.setRoleReadAccess("admin", true)
        acl1.setRoleWriteAccess("admin", true)
        userDetails.setACL(acl1)
        await userDetails.save()
        
        
      } 
      console.log("logged");
      window.location.href = "dashboard.html";
          
      })
      .catch(function (error) {
        console.log(error)
      });
  }
}


async function logOut() {
  await Moralis.User.logOut();
  console.log("logged out");
  window.location.href = "index.html";
}

if (document.querySelector("#btn-login")!=null) {
     document.querySelector("#btn-login").onclick = login;
}
if (document.querySelector("#btn-logout") !=null) {
    document.querySelector("#btn-logout").onclick = logOut;
}




async function createRole(name) { 
    let roleACL = new Moralis.ACL()
        roleACL.setPublicReadAccess(true)
        roleACL.setPublicWriteAccess(true)

    let newRole = new Moralis.Role(name, roleACL)

    newRole.save()
}



async function addUserToRole(name) {

    let roleQuery = new Moralis.Query(Moralis.Role)
    roleQuery.equalTo("name", name)
    let result = await roleQuery.first();
    if (result) {
        result.getUsers().add(Moralis.User.current())

        const user = Moralis.User.current();
        const UserDetails = Moralis.Object.extend("UserDetails");
        const query = new Moralis.Query(UserDetails);
        query.equalTo("ethAddress", user.get("ethAddress"));
        const results = await query.first();

        results.set("role", name);
        await results.save()
        await result.save();
        console.log("saved");


    }
}


