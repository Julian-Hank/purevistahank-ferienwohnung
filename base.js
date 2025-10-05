var sidebar_toggled = false;

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar_toggled){
    sidebar.style.right = '0px'
  } else{
    sidebar.style.right = '-250px'
  }
  sidebar_toggled = !sidebar_toggled;
}

document.getElementsByTagName("main")[0].addEventListener('click', function() {
  if(sidebar_toggled){
    toggleSidebar();
  }
});

const sidebar = document.getElementById("sidebar")
sidebarList = sidebar.childNodes[1].childNodes[1]
Array.from(sidebarList.children).forEach(child => {
  child.firstChild.addEventListener("focus", function(){
    sidebar_toggled = false
    toggleSidebar()
  })
  child.firstChild.addEventListener("blur", function(){
    toggleSidebar()
  })
})


const menuBtn = document.getElementById('menuBtn')
var clicked = false;
menuBtn.addEventListener('click', function(){
  setTimeout(function(){
    if (clicked){
      menuBtn.style.rotate = "0deg";
      clicked = false;
    } else{
      menuBtn.style.rotate = "180deg";
      clicked = true;
    }
  },10);
});

// const urlPrefix = window.location.href.split(":")[0].toLowerCase()

// if (urlPrefix != "https"){
//   window.location.replace()
// }