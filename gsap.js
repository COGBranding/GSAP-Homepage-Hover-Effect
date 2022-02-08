document.addEventListener('DOMContentLoaded', (event) => {
  //check the script is loading
  console.log('DOM fully loaded and parsed');
  //load gsap plugins required
  gsap.registerPlugin(ScrollToPlugin);

  //declare constants 
  const intro = document.getElementById("intro");
  const left = document.querySelector('#intro .video-panel[data-section="creative"] h1');
  const right = document.querySelector('#intro .video-panel[data-section="solutions"] h1');

  //add custom styling for left hand side hover
  left.addEventListener('mouseover', function() {
    let homepagemenu = document.querySelector('#et-top-navigation a');
    let homepageLogo = document.querySelector('#logo');
    let homepageFooterRight = document.querySelector('#homepage-footer-right span');
    homepageFooterRight.style.color = "#f5f5f5";
    let homepageFooterLeft = document.querySelector('#homepage-footer-left span');
    homepageFooterLeft.style.color = "#f5f5f5";
    homepagemenu.style.color = "#f5f5f5";
    homepageLogo.setAttribute('src', '/wp-content/uploads/2022/02/Barnwell-Cambridge-Logo-wht.svg');
    let customMenu = document.querySelector('#homepage-custom-menu a');
    customMenu.style.color = "#f5f5f5";
  });
  //add custom styling for right hand side hover
  right.addEventListener('mouseover', function() {
    let homepagemenu = document.querySelector('#et-top-navigation a');
    let homepageLogo = document.querySelector('#logo');
    let homepageFooterRight = document.querySelector('#homepage-footer-right span');
    homepageFooterRight.style.color = "#021f57";
    let homepageFooterLeft = document.querySelector('#homepage-footer-left span');
    homepageFooterLeft.style.color = "#021f57";
    homepagemenu.style.color = "#021f57";
    homepageLogo.setAttribute('src', '/wp-content/uploads/2022/02/Barnwell-Cambridge-Logo-blue.svg');
    let customMenu = document.querySelector('#homepage-custom-menu a');
    customMenu.style.color = "#021f57";
  });
  //when mouse leaves the intro section revert styling to original state
  intro.addEventListener('mouseleave', function onIntroLeave(e) {
    gsap.to('#intro .video-panel[data-section="creative"]', {
      duration: 0.2,
      right: '50%',
      ease: "power3.out"
    })
    let homepageLogo = document.querySelector('#logo');
    homepageLogo.setAttribute('src', '/wp-content/uploads/2022/02/Barnwell-Cambridge-Logo-wht.svg');
    let homepagemenu = document.querySelector('#et-top-navigation a');
    homepagemenu.style.color = "#021f57";
    let customMenu = document.querySelector('#homepage-custom-menu a');
    customMenu.style.color = "#f5f5f5";
    let homepageFooterRight = document.querySelector('#homepage-footer-right span');
    homepageFooterRight.style.color = "#021f57";
    let homepageFooterLeft = document.querySelector('#homepage-footer-left span');
    homepageFooterLeft.style.color = "#f5f5f5";
  });
  //on mouse move over the homepage section update the background color
  intro.addEventListener('mousemove', function onIntroHover(e) {
    var per = (e.pageX - window.innerWidth / 2) / (window.innerWidth * 2);
    var dir = Math.min(1, Math.max(-1, e.pageX - window.innerWidth / 2));
    var pow = Math.pow(per * 5.5, 2);
    var right = Math.min(100, Math.max(0, 50 + (50 * pow * dir))) + '%';
    gsap.to('#intro .video-panel[data-section="creative"]', {
      duration: 0.2,
      right: right,
      ease: "power3.out"
    })
  });

//Add an onClick eventListener function to both classes on the homepage.
function multipleEventlistener(className, event, fn) {
  var list = document.getElementsByClassName(className);
  for (var i = 0, len = list.length; i < len; i++) {
      list[i].addEventListener(event, fn, false);
  }
}
multipleEventlistener('video-panel', 'click', onIntroClick); 
//on click add animation video effect and then initilise callback to load page based on permalink in html
function onIntroClick(e) {
  // intro.removeEventListener('mousemove', onIntroHover);
  var section = this.dataset.section;
  var permalink = this.dataset.permalink;
  if (section === 'creative') {
    var headerX = '-3em'
    var right = '0%'
    var otherVideo = intro.querySelector('.video-panel[data-section="solutions"] video')
  } else {
    var headerX = '3em'
    var right = '100%'
    var otherVideo = intro.querySelector('.video-panel[data-section="creative"] video')
  }
  otherVideo.pause()
  // barba.prefetch('/' + section)
  gsap.to('#intro .video-panel[data-section="creative"]', {
    duration: 0.2,
    right: right,
    ease: "power3.inOut"
  })
  gsap.to('#intro .video-panel[data-section="' + section + '"] video', {
    duration: 0.2,
    width: '100vw',
    height: '100vh',
    ease: "power3.inOut"
  })
  var circle = gsap.to('#intro .video-panel[data-section="' + section + '"] video', {
    duration: 0.2,
    css: {
      clipPath: 'ellipse(101vw 101vw)'
    },
    ease: "power3.inOut"
  })
  gsap.to('#intro .video-panel[data-section="' + section + '"] h1', {
    duration: 0.2,
    x: headerX,
    ease: "power3.inOut"
  })
  circle.eventCallback('onComplete', openPage, [section, permalink])
};

//use the below to have SPA loading. Need to assign data sections to other parent pages to have content load seemlessly without 
//hard refresh which is being initialised in the openPage callback below.
// define your routes
const myRoutes = [{
  path: '/projects/',
  name: 'projects'
}, {
  path: '/client-services/',
  name: 'client-services'
}];

// tell Barba to use the router with your routes
barba.use(barbaRouter, {
  routes: myRoutes
});

// init Barba
barba.init();

//callback function to load the page that the user clicks on from homepage sections
function openPage(section, permalink) {
  // console.log("page opened!")
  // console.log(section)
  // console.log(permalink)
  window.location.replace(permalink);
}

});

