function hamburger() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('expand');


}

function checkWidth() {
    const width = window.outerWidth || 0;
    const navCheck = document.querySelector('nav');
    
    if (width > 600) {
        navCheck.classList = "";
    }

}