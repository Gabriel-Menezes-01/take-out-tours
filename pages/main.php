<!DOCTYPE html>
<html lang="pt-BR" dir="ltr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Descubra Portugal com alma através de experiências autênticas e guias locais especializados.">
    <meta name="keywords" content="tours portugal, guias locais, sintra, lisboa, alentejo, turismo portugal">
    <meta name="author" content="Take Out Tours">
    <meta property="og:title" content="Take Out Tours - Experiências Autênticas em Portugal">
    <meta property="og:description" content="Descubra Portugal com alma através de experiências autênticas e guias locais especializados.">
    <meta property="og:type" content="website">
    <meta name="theme-color" content="#667eea">

    <title>Take Out Tours - Experiências em Portugal</title>

    <!-- Stylesheets -->
    <link rel="stylesheet" href="../css/navbar.css">
    <link rel="stylesheet" href="../css/footer.css">
    <link rel="stylesheet" href="../css/improvements.css">
    <link rel="stylesheet" href="../css/main.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet">
</head>

<body>
    <!-- Navigation -->
    <nav>
        <div class="navbar">
            <i class='bi bi-list'></i>
            <div class="logo"><a href="../index.php">TAKE OUT TOURS</a></div>
            <div class="nav-links">
                <div class="sidebar-logo">
                    <span class="logo-name">TAKE OUT TOURS</span>
                    <i class='bi bi-x-lg'></i>
                </div>
                <ul class="links">
                    <li><a href="#experiencias">EXPERIÊNCIAS</a>
                        <i class='bi bi-chevron-down experiencias-arrow arrow'></i>
                        <ul class="experiencias-sub-menu sub-menu">
                            <li><a href="#natureza">Natureza & Aventura</a></li>
                            <li><a href="#patrimonio">Património & História</a></li>
                            <li><a href="#sabores">Sabores & Vinhos</a></li>
                            <li><a href="#personalizados">Tours Personalizados</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#destinos">DESTINOS</a>
                        <i class='bi bi-chevron-down destinos-arrow arrow'></i>
                        <ul class="destinos-sub-menu sub-menu">
                            <li><a href="#sintra">Sintra & Cascais</a></li>
                            <li><a href="#lisboa">Lisboa & Setúbal</a></li>
                            <li><a href="#alentejo">Alentejo (Évora, Monsaraz)</a></li>
                            <li><a href="#algarve">Algarve Autêntico</a></li>
                            <li><a href="#centro">Centro (Fátima, Óbidos, Nazaré)</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#sobre">SOBRE NÓS</a>
                        <i class='bi bi-chevron-down sobre-arrow arrow'></i>
                        <ul class="sobre-sub-menu sub-menu">
                            <li><a href="#equipa">A equipa local</a></li>
                            <li><a href="#missao">Missão & valores</a></li>
                            <li><a href="#frota">Frota e conforto</a></li>
                        </ul>
                    </li>
                    <li><a href="#blog">BLOG/DIÁRIO</a></li>
                    <li><a href="#contatos">CONTATOS/RESERVA</a></li>
                </ul>
            </div>
            <div class="search-box">
                <i class='bi bi-search'></i>
                <div class="input-box">
                    <input type="text" placeholder="Pesquisar...">
                </div>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="main-content">
        <!-- Hero Section -->
        <section class="hero-section">
            <div class="hero-content">
                <div class="hero-text">
                    <h1>Descobre Portugal</h1>
                    <p>Experiências autênticas com guias locais especializados</p>
                    <div class="hero-buttons">
                        <button class="btn-primary">Ver Experiências</button>
                        <button class="btn-secondary">Reservar Tour</button>
                    </div>
                </div>
                <div class="hero-image">
                    <img src="../img/carrosel/castelo1.jpg" alt="Portugal - Paisagem">
                </div>
            </div>
        </section>

        <!-- Experiences Categories -->
        <section class="experiences-section" id="experiencias">
            <div class="container">
                <div class="section-header">
                    <h2>Experiências Únicas</h2>
                    <p>Escolha a sua aventura perfeita em Portugal</p>
                </div>

                <div class="experiences-grid">
                    <div class="experience-card" data-category="food">
                        <div class="card-icon">
                            <i class="bi bi-cup-hot"></i>
                        </div>
                        <div class="card-content">
                            <h3>Food & Wine</h3>
                            <p>Saboreie a autêntica gastronomia portuguesa</p>
                            <a href="#sabores" class="card-link">Explorar <i class="bi bi-arrow-right"></i></a>
                        </div>
                    </div>

                    <div class="experience-card" data-category="adventure">
                        <div class="card-icon">
                            <i class="bi bi-mountains"></i>
                        </div>
                        <div class="card-content">
                            <h3>Aventura</h3>
                            <p>Descubra paisagens deslumbrantes e natureza selvagem</p>
                            <a href="#natureza" class="card-link">Explorar <i class="bi bi-arrow-right"></i></a>
                        </div>
                    </div>

                    <div class="experience-card" data-category="heritage">
                        <div class="card-icon">
                            <i class="bi bi-building"></i>
                        </div>
                        <div class="card-content">
                            <h3>Património</h3>
                            <p>Explore a rica história e cultura portuguesa</p>
                            <a href="#patrimonio" class="card-link">Explorar <i class="bi bi-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Destinations Section -->
        <section class="destinations-section" id="destinos">
            <div class="container">
                <div class="section-header">
                    <h2>Descobre Portugal</h2>
                    <p>Os destinos mais incríveis do país</p>
                </div>

                <div class="destinations-grid">
                    <div class="destination-card">
                        <div class="destination-image">
                            <img src="../img/carrosel/castelo1.jpg" alt="Sintra & Cascais">
                            <div class="destination-overlay">
                                <button class="btn-explore">Explorar</button>
                            </div>
                        </div>
                        <div class="destination-info">
                            <h3>Sintra & Cascais</h3>
                            <p>Palácios encantados e praias deslumbrantes</p>
                        </div>
                    </div>

                    <div class="destination-card">
                        <div class="destination-image">
                            <img src="../img/carrosel/castelo2.jpg" alt="Alentejo">
                            <div class="destination-overlay">
                                <button class="btn-explore">Explorar</button>
                            </div>
                        </div>
                        <div class="destination-info">
                            <h3>Alentejo</h3>
                            <p>Vinhas douradas e aldeias históricas</p>
                        </div>
                    </div>

                    <div class="destination-card">
                        <div class="destination-image">
                            <img src="../img/carrosel/castelo3.jpg" alt="Algarve">
                            <div class="destination-overlay">
                                <button class="btn-explore">Explorar</button>
                            </div>
                        </div>
                        <div class="destination-info">
                            <h3>Algarve</h3>
                            <p>Costas selvagens e praias paradisíacas</p>
                        </div>
                    </div>

                    <div class="destination-card">
                        <div class="destination-image">
                            <img src="../img/carrosel/castelo1.jpg" alt="Nazaré & Centro">
                            <div class="destination-overlay">
                                <button class="btn-explore">Explorar</button>
                            </div>
                        </div>
                        <div class="destination-info">
                            <h3>Nazaré & Centro</h3>
                            <p>Tradições milenares e monumentos únicos</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- About Section -->
        <section class="about-section" id="sobre">
            <div class="container">
                <div class="about-content">
                    <div class="about-text">
                        <h2>Somos locais, apaixonados por partilhar. Anda connosco.</h2>
                        <p>A nossa equipa é formada por guias locais especializados que vivem e respiram Portugal. Conhecemos cada recanto, cada história e cada sabor que fazem do nosso país um destino único.</p>
                        <ul class="about-features">
                            <li><i class="bi bi-check-circle-fill"></i> Guias locais certificados</li>
                            <li><i class="bi bi-check-circle-fill"></i> Experiências personalizadas</li>
                            <li><i class="bi bi-check-circle-fill"></i> Grupos pequenos e intimistas</li>
                            <li><i class="bi bi-check-circle-fill"></i> Sustentabilidade e responsabilidade</li>
                        </ul>
                        <div class="about-buttons">
                            <button class="btn-primary">Conhecer a Equipa</button>
                            <button class="btn-secondary">Ver Missão</button>
                        </div>
                    </div>
                    <div class="about-image">
                        <img src="../img/carrosel/castelo2.jpg" alt="Guia local português">
                        <div class="about-badge">
                            <span>+1000</span>
                            <small>Experiências realizadas</small>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="cta-section">
            <div class="container">
                <div class="cta-content">
                    <h2>Pronto para a sua aventura?</h2>
                    <p>Deixe-nos criar a experiência perfeita para si em Portugal</p>
                    <div class="cta-buttons">
                        <button class="btn-primary">Reservar Agora</button>
                        <button class="btn-secondary">Falar Connosco</button>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-content">
            <!-- Sobre a Empresa -->
            <div class="footer-section">
                <h3>Take Out Tours</h3>
                <p>Descubra Portugal com alma através de experiências autênticas e guias locais especializados. Oferecemos tours personalizados que conectam você à verdadeira essência de cada destino.</p>
                <div class="social-media">
                    <a href="#"><i class="bi bi-facebook"></i></a>
                    <a href="#"><i class="bi bi-instagram"></i></a>
                    <a href="#"><i class="bi bi-twitter"></i></a>
                    <a href="#"><i class="bi bi-youtube"></i></a>
                </div>
            </div>

            <!-- Links Rápidos -->
            <div class="footer-section">
                <h3>Links Rápidos</h3>
                <ul>
                    <li><a href="#experiencias">Experiências</a></li>
                    <li><a href="#destinos">Destinos</a></li>
                    <li><a href="#sobre">Sobre Nós</a></li>
                    <li><a href="#blog">Blog/Diário</a></li>
                    <li><a href="#contatos">Contatos</a></li>
                </ul>
            </div>

            <!-- Destinos Populares -->
            <div class="footer-section">
                <h3>Destinos Populares</h3>
                <ul>
                    <li><a href="#sintra">Sintra & Cascais</a></li>
                    <li><a href="#lisboa">Lisboa & Setúbal</a></li>
                    <li><a href="#alentejo">Alentejo (Évora, Monsaraz)</a></li>
                    <li><a href="#algarve">Algarve Autêntico</a></li>
                    <li><a href="#centro">Centro (Fátima, Óbidos, Nazaré)</a></li>
                </ul>
            </div>

            <!-- Contato -->
            <div class="footer-section">
                <h3>Contato</h3>
                <div class="contact-info">
                    <i class="bi bi-geo-alt-fill"></i>
                    <span>Lisboa, Portugal</span>
                </div>
                <div class="contact-info">
                    <i class="bi bi-telephone-fill"></i>
                    <span>+351 123 456 789</span>
                </div>
                <div class="contact-info">
                    <i class="bi bi-envelope-fill"></i>
                    <span>info@takeouttours.pt</span>
                </div>

                <!-- Newsletter -->
                <h3 style="margin-top: 25px;">Newsletter</h3>
                <p>Receba as melhores ofertas e novidades</p>
                <div class="newsletter-form">
                    <input type="email" placeholder="Seu e-mail">
                    <button type="submit">Inscrever</button>
                </div>
            </div>
        </div>

        <div class="footer-bottom">
            <p>&copy; 2024 Take Out Tours. Todos os direitos reservados.</p>
            <div class="footer-links">
                <a href="#">Política de Privacidade</a>
                <a href="#">Termos de Uso</a>
                <a href="#">Cookies</a>
            </div>
        </div>
    </footer>

    <!-- Scroll to Top Button -->
    <button class="scroll-to-top" id="scrollToTop">
        <i class="bi bi-arrow-up"></i>
    </button>

    <!-- Scripts -->
    <script src="../js/script.js"></script>
    <script src="../js/main.js"></script>
</body>

</html>
