// Funcionalidade da barra de navegação
document.addEventListener('DOMContentLoaded', function() {

  // Funcionalidade de abrir/fechar a caixa de pesquisa
  let navbar = document.querySelector(".navbar");
  let searchBox = document.querySelector(".search-box .bi-search");

  if (searchBox) {
    searchBox.addEventListener("click", () => {
      navbar.classList.toggle("showInput");
      if(navbar.classList.contains("showInput")){
        searchBox.classList.replace("bi-search", "bi-x-lg");
      } else {
        searchBox.classList.replace("bi-x-lg", "bi-search");
      }
    });
  }

  // Funcionalidade de abrir/fechar o menu lateral
  let navLinks = document.querySelector(".nav-links");
  let menuOpenBtn = document.querySelector(".navbar .bi-list");
  let menuCloseBtn = document.querySelector(".nav-links .bi-x-lg");

  if (menuOpenBtn) {
    menuOpenBtn.onclick = function() {
      navLinks.classList.add("show");
    }
  }

  if (menuCloseBtn) {
    menuCloseBtn.onclick = function() {
      navLinks.classList.remove("show");
    }
  }

  // Efeito de rolagem na barra de navegação
  window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Alternar submenu no mobile
  const subMenuParents = document.querySelectorAll('.links li');
  subMenuParents.forEach(parent => {
    const arrow = parent.querySelector('.arrow');
    const subMenu = parent.querySelector('.sub-menu');
    
    if (arrow && subMenu) {
      arrow.addEventListener('click', function(e) {
        e.preventDefault();
        if (window.innerWidth <= 1200) {
          subMenu.style.display = subMenu.style.display === 'block' ? 'none' : 'block';
          arrow.style.transform = subMenu.style.display === 'block' ? 'rotate(180deg)' : 'rotate(0deg)';
        }
      });
    }
  });

  // Fechar menu mobile ao clicar fora
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 1200) {
      if (!navLinks.contains(e.target) && !menuOpenBtn.contains(e.target)) {
        navLinks.classList.remove("show");
      }
    }
  });

  // Fechar pesquisa ao clicar fora
  document.addEventListener('click', function(e) {
    if (!searchBox.contains(e.target) && !navbar.contains(e.target)) {
      navbar.classList.remove("showInput");
      searchBox.classList.replace("bi-x-lg", "bi-search");
    }
  });

  // Funcionalidade de rolar para o topo
  const scrollToTopBtn = document.getElementById('scrollToTop');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }
  });

  scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Funcionalidade do formulário de newsletter
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      if (email) {
        // Animar botão
        const button = this.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Inscrevendo...';
        button.disabled = true;
        
        setTimeout(() => {
          button.textContent = '✓ Inscrito!';
          button.style.background = '#28a745';
          this.querySelector('input[type="email"]').value = '';
          
          setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            button.style.background = '';
          }, 2000);
        }, 1000);
      }
    });
  }

  // Animar elementos ao rolar a página
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observar seções do rodapé
  document.querySelectorAll('.footer-section').forEach(section => {
    section.classList.add('animate-on-scroll');
    observer.observe(section);
  });

  // Interações aprimoradas de botões
  document.querySelectorAll('.btn-reserva button').forEach(button => {
    button.addEventListener('click', function() {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  });
});
