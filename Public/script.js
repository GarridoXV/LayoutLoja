function toggleHamburger() {
    document.querySelector('.nav-links').classList.toggle('active');
    document.querySelector('.hamburger').classList.toggle('open');
}

document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        if (document.querySelector('.nav-links').classList.contains('active')) {
            document.querySelector('.nav-links').classList.remove('active');
            document.querySelector('.hamburger').classList.remove('open');
        }
    });
});

// Usando IIFE para evitar variáveis globais
(function() {
    let slideIndex = 1;
    const slides = document.getElementsByClassName("slide");
    const prevButton = document.querySelector('.slider-control.prev');
    const nextButton = document.querySelector('.slider-control.next');
    const indicators = document.querySelectorAll('.indicator');

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        } else if (n < 1) {
            slideIndex = slides.length;
        }

        Array.from(slides).forEach(slide => slide.style.display = "none");
        Array.from(indicators).forEach(indicator => indicator.classList.remove('active'));

        slides[slideIndex - 1].style.display = "flex";
        indicators[slideIndex - 1].classList.add('active');
    }

    // Avança para o próximo slide
    function nextSlide() {
        showSlides(slideIndex += 1);
    }

    // Retorna para o slide anterior
    function prevSlide() {
        showSlides(slideIndex -= 1);
    }

    // Adiciona evento de clique para os botões de navegação
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    // Adiciona evento de clique para os indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlides(slideIndex = index + 1);
        });
    });

    // Mostra o slide inicial
    showSlides(slideIndex);

    // Comentar a linha abaixo se você não quiser autoplay
    let slideInterval = setInterval(nextSlide, 8000); // Muda a imagem a cada 8 segundos

    // Adiciona pausa no hover sobre os slides
    document.querySelector('.slides').addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    // Reinicia o autoplay quando o mouse deixa a área dos slides
    document.querySelector('.slides').addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 8000);
    });
})();

  
//fim slider

