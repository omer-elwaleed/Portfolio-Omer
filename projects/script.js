let $grid;
$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }
    });
});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Projects | Portfolio Omer Hussien";
            $("#favicon").attr("href", "/assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "/assets/images/favhand.png");
        }
    });

// fetch projects start
function getProjects() {
    return fetch("projects.json")
        .then(response => response.json())
        .then(data => {
            return data
        });
}

function showProjects(projects) {
  let projectsContainer = document.querySelector("#work .box-container");
  let projectHTML = "";

  projects.forEach(project => {
    const coverHTML = project.image
      ? `<img draggable="false" src="/assets/images/projects/${project.image}.png" alt="${project.name}" />`
      : `<div class="icon-cover"><i class="fas fa-${project.icon || "briefcase"}"></i></div>`;

    const linksHTML = (project.links && (project.links.code || project.links.demo))
      ? `<div class="btns">
          ${project.links.demo ? `<a href="${project.links.demo}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>` : ''}
          ${project.links.code ? `<a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>` : ''}
         </div>`
      : '';

    projectHTML += `
    <div class="box tilt grid-item ${project.category}">
      ${coverHTML}
      <div class="content">
        <div class="tag"><h3>${project.name}</h3></div>
        <div class="desc">
          <p>${project.desc}</p>
          
          ${project.tags ? `<div class="tags">
            ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
          </div>` : ''}

          ${linksHTML}
        </div>
      </div>
    </div>`;
  });

  projectsContainer.innerHTML = projectHTML;

  // Re-apply tilt animation
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.3
    });

  // Reinitialize Isotope
    initIsotope();
    $grid.isotope('reloadItems');
    $grid.isotope('layout');

  VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
  });

  // const srtop = ScrollReveal({
   // origin: 'top',
    //distance: '80px',
    //duration: 1000,
    //reset: true
    //});

  //srtop.reveal('.work .box', { interval: 200 });

}

    // filter items on button click
    $('.button-group').on('click', 'button', function () {
        $('.button-group').find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });

getProjects().then(data => {
    showProjects(data);
    
})

function initIsotope() {
  $grid = $('.box-container').isotope({
    itemSelector: '.grid-item',
    layoutMode: 'fitRows'
  });
}

document.querySelectorAll('.work .box-container .box').forEach(box => {
  box.addEventListener('mouseleave', () => {
    const content = box.querySelector('.content');
    setTimeout(() => {
      content.scrollTop = 0;
    }, 400); // match the transition duration (in ms)
  });
});
// fetch projects end

// disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}