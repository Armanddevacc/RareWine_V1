function onClick(element) {
    document.getElementById("img01").src = element.src;
    document.getElementById("modal01").style.display = "block";
    var captionText = document.getElementById("caption");
    captionText.innerHTML = element.alt;
  }
  
  
  // Toggle between showing and hiding the sidebar when clicking the menu icon
  var mySidebar = document.getElementById("mySidebar");
  
  function w3_open() {
    if (mySidebar.style.display === 'block') {
      mySidebar.style.display = 'none';
    } else {
      mySidebar.style.display = 'block';
    }
  }
  
  // Close the sidebar with the close button
  function w3_close() {
      mySidebar.style.display = "none";
  }
  
  function choose() {
    if (window.location.href = "login.html" && Moralis.User.current() != null) {
    window.location.href = "dashboard.html";
    } else {
      window.location.href = "login.html";
    }
  }

  async function getRoleMyUser() {
    let user = Moralis.User.current();
    
    const UserDetails = Moralis.Object.extend("UserDetails");
    const query = new Moralis.Query(UserDetails);
    query.equalTo("ethAddress", user.get("ethAddress"));
    const results = await query.first();
  
    return results.get("role")
  }