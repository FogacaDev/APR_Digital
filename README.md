<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Renan Fogaça | Tecnólogo em Análise e Desenvolvimento de Sistemas, Bacharelado em Tecnologia da informação & Técnico Químico</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
    <style>
        :root {
            --primary-color: #2c3e50;
            --secondary-color: #3498db;
            --accent-color: #e74c3c;
            --light-color: #ecf0f1;
            --dark-color: #2c3e50;
            --text-color: #333;
            --text-light: #7f8c8d;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
            line-height: 1.6;
            color: var(--text-color);
            background-color: #f5f5f5;
        }
        
        a {
            text-decoration: none;
            color: var(--secondary-color);
            transition: color 0.3s ease;
        }
        
        a:hover {
            color: var(--accent-color);
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        /* Header */
        header {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            padding: 80px 0 50px;
            position: relative;
        }
        
        .header-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
        }
        
        .profile-img {
            width: 180px;
            height: 180px;
            border-radius: 50%;
            background-color: var(--light-color);
            margin-bottom: 20px;
            border: 4px solid white;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 72px;
            color: var(--secondary-color);
        }
        
        h1 {
            font-size: 3rem;
            margin-bottom: 10px;
            font-weight: 700;
        }
        
        .tagline {
            font-size: 1.5rem;
            margin-bottom: 20px;
            color: rgba(255, 255, 255, 0.9);
        }
        
        .header-info {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 15px;
            margin-top: 15px;
        }
        
        .info-item {
            background: rgba(255, 255, 255, 0.1);
            padding: 8px 15px;
            border-radius: 20px;
            display: flex;
            align-items: center;
            gap: 8px;
            backdrop-filter: blur(5px);
        }
        
        .cta-btn {
            display: inline-block;
            background-color:  #25D366;
            color: black;
            padding: 12px 25px;
            border-radius: 30px;
            font-weight: 600;
            margin-top: 30px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        
        .cta-btn:hover {
            background-color: #25D366;
            transform: translateY(-2px);
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
            color: white;
        }
        
        /* Main Content */
        main {
            padding: 60px 0;
        }
        
        section {
            margin-bottom: 60px;
            background-color: white;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }
        
        .section-title {
            font-size: 1.8rem;
            color: var(--primary-color);
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: 2px solid var(--light-color);
            position: relative;
        }
        
        .section-title::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -2px;
            width: 60px;
            height: 2px;
            background-color: var(--accent-color);
        }
        
        /* About Section */
        .about-content {
            display: flex;
            flex-wrap: wrap;
            gap: 30px;
        }
        
        .about-text {
            flex: 1;
            min-width: 300px;
        }
        
        .features {
            flex: 1;
            min-width: 300px;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
            gap: 15px;
        }
        
        .feature-item {
            background-color: var(--light-color);
            padding: 12px;
            border-radius: 8px;
            text-align: center;
            transition: all 0.3s ease;
        }
        
        .feature-item:hover {
            background-color: var(--secondary-color);
            color: white;
            transform: translateY(-3px);
        }
        
        .feature-icon {
            font-size: 24px;
            margin-bottom: 8px;
            color: var(--secondary-color);
        }
        
        .feature-item:hover .feature-icon {
            color: white;
        }
        
        /* Education and Courses */
        .timeline {
            position: relative;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .timeline::after {
            content: '';
            position: absolute;
            width: 2px;
            background-color: var(--light-color);
            top: 0;
            bottom: 0;
            left: 50%;
            margin-left: -1px;
        }
        
        .timeline-item {
            padding: 10px 40px;
            position: relative;
            width: 50%;
        }
        
        .timeline-item::after {
            content: '';
            position: absolute;
            width: 20px;
            height: 20px;
            background-color: white;
            border: 4px solid var(--secondary-color);
            border-radius: 50%;
            top: 15px;
            z-index: 1;
        }
        
        .left {
            left: 0;
        }
        
        .right {
            left: 50%;
        }
        
        .left::after {
            right: -10px;
        }
        
        .right::after {
            left: -10px;
        }
        
        .timeline-content {
            padding: 20px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
        }
        
        .timeline-year {
            color: var(--accent-color);
            font-weight: 600;
        }
        
        .timeline-title {
            font-weight: 600;
            margin: 5px 0;
            color: var(--primary-color);
        }
        
        /* Experience Section */
        .experience-item {
            margin-bottom: 35px;
            position: relative;
            padding-left: 30px;
            border-left: 2px solid var(--light-color);
        }
        
        .experience-item::before {
            content: '';
            position: absolute;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background-color: var(--secondary-color);
            left: -9px;
            top: 5px;
        }
        
        .experience-date {
            font-size: 0.9rem;
            color: var(--text-light);
            margin-bottom: 5px;
        }
        
        .experience-company {
            font-weight: 600;
            font-size: 1.2rem;
            margin-bottom: 5px;
            color: var(--primary-color);
        }
        
        .experience-position {
            font-weight: 500;
            margin-bottom: 5px;
            color: var(--secondary-color);
        }
        
        .experience-department {
            font-style: italic;
            margin-bottom: 8px;
        }
        
        /* Skills Section */
        .skills-container {
            display: flex;
            flex-wrap: wrap;
            gap: 30px;
        }
        
        .skills-category {
            flex: 1;
            min-width: 250px;
        }
        
        .skills-category h3 {
            font-size: 1.2rem;
            margin-bottom: 15px;
            color: var(--primary-color);
        }
        
        .skill-item {
            margin-bottom: 15px;
        }
        
        .skill-name {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
        }
        
        .skill-bar {
            height: 8px;
            background-color: var(--light-color);
            border-radius: 4px;
            overflow: hidden;
        }
        
        .skill-progress {
            height: 100%;
            background-color: var(--secondary-color);
            border-radius: 4px;
        }
        
        /* Contact Section */
        .contact-info {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .contact-item {
            flex: 1;
            min-width: 200px;
            background-color: var(--light-color);
            padding: 20px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 15px;
            transition: all 0.3s ease;
        }
        
        .contact-item:hover {
            background-color: var(--secondary-color);
            color: white;
            transform: translateY(-3px);
        }
        
        .contact-icon {
            font-size: 24px;
            color: var(--primary-color);
        }
        
        .contact-item:hover .contact-icon {
            color: white;
        }
        
        /* Footer */
        footer {
            background-color: var(--primary-color);
            color: white;
            text-align: center;
            padding: 30px 0;
        }
        
        .social-links {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .social-link {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            color: white;
            transition: all 0.3s ease;
        }
        
        .social-link:hover {
            background-color: var(--secondary-color);
            transform: translateY(-3px);
        }
        
        /* Responsiveness */
        @media (max-width: 768px) {
            h1 {
                font-size: 2.5rem;
            }
            
            .tagline {
                font-size: 1.2rem;
            }
            
            .timeline::after {
                left: 31px;
            }
            
            .timeline-item {
                width: 100%;
                padding-left: 70px;
                padding-right: 25px;
            }
            
            .left::after, .right::after {
                left: 21px;
            }
            
            .right {
                left: 0;
            }
        }
        
        @media (max-width: 576px) {
            .header-content {
                padding: 0 15px;
            }
            
            section {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <!-- Header Section -->
    <header>
        <div class="container">
            <div class="header-content">
                <div class="profile-img">
                    <i class="fas fa-user"></i>
                </div>
                <h1>Renan Fogaça</h1>
                <p class="tagline">Análise e Desenvolvimento de Sistemas, Tecnologia da informação & Técnico Químico</p>
                <div class="header-info">
                    <div class="info-item">
                <i class="fas fa-birthday-cake"></i>
                <span>24/01/1986 (38 anos)</span>
             </div>
             <div class="info-item">
                <i class="fas fa-map-marker-alt"></i>
                <span>São Paulo, Brasil</span>
             </div>
             <div class="info-item">
                <i class="fas fa-users"></i>
             <span>Casado, 2 Filhas</span>
             </div>
         <div class="info-item">
    <i class="fas fa-id-card"></i>
    <span>Habilitação A/B</span>
         </div>
         </div>
    <a href="https://wa.me/5511997057953" class="cta-btn">WhatsApp</a>
        </div>
    </header>

    <!-- Main Content -->
    <main class="container">
        <!-- About Section -->
        <section id="about">
            <h2 class="section-title">Sobre Mim</h2>
            <div class="about-content">
                <div class="about-text">
                    <p>Sou um profissional multidisciplinar com formação técnica em Química, Tecnólogo graduado em Análise e Desenvolvimento de sistemas e bacharelando em Tecnologia da Informação. Minha trajetória profissional inclui experiências valiosas em controle de qualidade, análises laboratoriais e operações industriais.</p>
                    <p>Estou em busca de um novo desafio profissional para desempenhar minhas habilidades agregando o desenvolvimento mútuo. Busco construir e contribuir com minha carreira em empresas renomadas com base em todas as minhas experiências prévias, buscando novos conhecimentos profissionais, visando resoluções sustentáveis ao desenvolvimento humano e tecnológico com ousadia, humildade, ética e profissionalismo.</p>
                </div>
                <div class="features">
                    <div class="feature-item">
                        <div class="feature-icon">
                            <i class="fas fa-code"></i>
                        </div>
                        <div>Programação</div>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon">
                            <i class="fas fa-flask"></i>
                        </div>
                        <div>Química</div>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon">
                            <i class="fas fa-clipboard-check"></i>
                        </div>
                        <div>Controle de Qualidade</div>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon">
                            <i class="fas fa-language"></i>
                        </div>
                        <div>Inglês & Espanhol</div>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon">
                            <i class="fas fa-users-cog"></i>
                        </div>
                        <div>Trabalho em Equipe</div>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon">
                            <i class="fas fa-lightbulb"></i>
                        </div>
                        <div>Inovação</div>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon">
                            <i class="fas fa-tachometer-alt"></i>
                        </div>
                        <div>Aprendizado Rápido</div>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon">
                            <i class="fas fa-rocket"></i>
                        </div>
                        <div>Proatividade</div>
                    </div>

		    <div class="feature-item">
                        <div class="feature-icon">
                            <i class="fas fa-glasses"></i>
                        </div>
                        <div>Soft-Skills</div>
                    </div>
	
                </div>
            </div>
        </section>

        <!-- Education Section -->
        <section id="education">
            <h2 class="section-title">Educação</h2>
            <div class="timeline">
                <div class="timeline-item left">
                    <div class="timeline-content">
                        <span class="timeline-year">2022 - 2026</span>
                        <h3 class="timeline-title">Bacharel em Tecnologia da Informação</h3>
                        <p>Universidade Virtual do Estado de São Paulo (UNIVESP)</p>
                    </div>
                </div>
                <div class="timeline-item right">
                    <div class="timeline-content">
                        <span class="timeline-year">2020 - 2024</span>
                        <h3 class="timeline-title">Análise e Desenvolvimento de Sistemas</h3>
                        <p>Universidade Nove de Julho (UNINOVE)</p>
                    </div>
                </div>
                <div class="timeline-item left">
                    <div class="timeline-content">
                        <span class="timeline-year">2015</span>
                        <h3 class="timeline-title">Técnico Químico</h3>
                        <p>Colégio Dom Pedro I</p>
                    </div>
                </div>
                <div class="timeline-item right">
                    <div class="timeline-content">
                        <span class="timeline-year">2014</span>
                        <h3 class="timeline-title">Mecânico de refrigeração</h3>
                        <p>EMAC, Alumínio - SP</p>
                    </div>
                </div>
                <div class="timeline-item left">
                    <div class="timeline-content">
                        <span class="timeline-year">2008</span>
                        <h3 class="timeline-title">Operador de Ponte Rolante</h3>
                        <p>SENAI, Alumínio - SP</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Experience Section -->
        <section id="experience">
            <h2 class="section-title">Experiência Profissional</h2>


<div class="experience-item">
                <div class="experience-date">Fevereiro 2024 - agora</div>
                <div class="experience-company">Companhia Brasileira de Alumínio (CBA)</div>
                <div class="experience-position">Técnico de Automação</div>
                <div class="experience-department">Departamento: Automação de Salas Fornos</div>
                <p>Atuo no setor de automação para geração e monitoramento de dados de sistemas para cubas eletrolíticas de operações e produção de alumínio. Garantindo a eficiencia da geração e leitura de dados com segurança, automatizando e agilizando processos.</p>
            </div>



            <div class="experience-item">
                <div class="experience-date">Março 2016 - Agosto 2023</div>
                <div class="experience-company">Sorocaba Refrescos S.A. (Coca Cola)</div>
                <div class="experience-position">Operador ETA e ETE (Tratamento de Água e efluentes)</div>
                <div class="experience-department">Departamento: Controle de Qualidade</div>
                <p>Responsável por análises laboratoriais, entrada de dados, controle de qualidade, manuseio e controle de produtos químicos. Também atuei como brigadista de incêndio, garantindo a segurança das instalações.</p>
            </div>
            <div class="experience-item">
                <div class="experience-date">Novembro 2013 - Novembro 2015</div>
                <div class="experience-company">Engenharia e Manutenção de ares condicionados - EMAC</div>
                <div class="experience-position">Mecânico de Refrigeração</div>
                <div class="experience-department">Departamento: Manutenção</div>
                <p>Realizava manutenção corretiva, manutenção preventiva e instalação de sistemas de refrigeração, assegurando o funcionamento adequado dos equipamentos.</p>
            </div>
            <div class="experience-item">
                <div class="experience-date">Maio 2012 - Outubro 2013</div>
                <div class="experience-company">Flex Tintas indústria e comercio. Ltda</div>
                <div class="experience-position">Operador de Máquinas A</div>
                <div class="experience-department">Departamento: Controle de Qualidade</div>
                <p>Conduzia análises laboratoriais físico-químicas de controle de qualidade, manuseio e controle de químicos, entrada de dados e operação de máquinas.</p>
            </div>
            <div class="experience-item">
                <div class="experience-date">Abril 2007 - Fevereiro 2012</div>
                <div class="experience-company">Companhia Brasileira de Alumínio (CBA)</div>
                <div class="experience-position">Auxiliar de Produção</div>
                <div class="experience-department">Departamento: Laminação de Chapas, Salas Fornos</div>
                <p>Atuava na operação de máquinas e ponte rolante, entrada de dados e conciliação de inventários, contribuindo para o processo produtivo da empresa.</p>
            </div>
        </section>

        <!-- Skills Section -->
        <section id="skills">
            <h2 class="section-title">Habilidades</h2>
            <div class="skills-container">
                <div class="skills-category">
                    <h3>Técnicas</h3>
                    <div class="skill-item">
                        <div class="skill-name">
                            <span>Análises Laboratoriais</span>
                            <span>90%</span>
                        </div>
                        <div class="skill-bar">
                            <div class="skill-progress" style="width: 90%"></div>
                        </div>
                    </div>
                    <div class="skill-item">
                        <div class="skill-name">
                            <span>Controle de Qualidade</span>
                            <span>85%</span>
                        </div>
                        <div class="skill-bar">
                            <div class="skill-progress" style="width: 85%"></div>
                        </div>
                    </div>
                    <div class="skill-item">
                        <div class="skill-name">
                            <span>Python</span>
                            <span>70%</span>
                        </div>
                        <div class="skill-bar">
                            <div class="skill-progress" style="width: 70%"></div>
                        </div>
                    </div>
                    <div class="skill-item">
                        <div class="skill-name">
                            <span>HTML5</span>
                            <span>75%</span>
                        </div>
                        <div class="skill-bar">
                            <div class="skill-progress" style="width: 75%"></div>
                        </div>
                    </div>
                    <div class="skill-item">
                        <div class="skill-name">
                            <span>Java</span>
                            <span>65%</span>
                        </div>
                        <div class="skill-bar">
                            <div class="skill-progress" style="width: 65%"></div>
                        </div>
                    </div>
                </div>
                <div class="skills-category">
                    <h3>Idiomas</h3>
                    <div class="skill-item">
                        <div class="skill-name">
                            <span>Português</span>
                            <span>100%</span>
                        </div>
                        <div class="skill-bar">
                            <div class="skill-progress" style="width: 100%"></div>
                        </div>
                    </div>
                    <div class="skill-item">
                        <div class="skill-name">
                            <span>Inglês</span>
                            <span>70%</span>
                        </div>
                        <div class="skill-bar">
                            <div class="skill-progress" style="width: 70%"></div>
                        </div>
                    </div>
                    <div class="skill-item">
                        <div class="skill-name">
                            <span>Espanhol</span>
                            <span>65%</span>
                        </div>
                        <div class="skill-bar">
                            <div class="skill-progress" style="width: 65%"></div>
                        </div>
                    </div>
                </div>
                <div class="skills-category">
                    <h3>Soft Skills</h3>
                    <div class="skill-item">
                        <div class="skill-name">
                            <span>Trabalho em Equipe</span>
                            <span>95%</span>
                        </div>
                        <div class="skill-bar">
                            <div class="skill-progress" style="width: 95%"></div>
                        </div>
                    </div>
                    <div class="skill-item">
                        <div class="skill-name">
                            <span>Comunicação</span>
                            <span>85%</span>
                        </div>
                        <div class="skill-bar">
                            <div class="skill-progress" style="width: 85%"></div>
                        </div>
                    </div>
                    <div class="skill-item">
                        <div class="skill-name">
                            <span>Resolução de Problemas</span>
                            <span>90%</span>
                        </div>
                        <div class="skill-bar">
                            <div class="skill-progress" style="width: 90%"></div>
                        </div>
                    </div>
                    <div class="skill-item">
                        <div class="skill-name">
                            <span>Proatividade</span>
                            <span>95%</span>
                        </div>
                        <div class="skill-bar">
                            <div class="skill-progress" style="width: 95%"></div>
                        </div>
                    </div>
                    <div class="skill-item">
                        <div class="skill-name">
                            <span>Adaptabilidade</span>
                            <span>90%</span>
                        </div>
                        <div class="skill-bar">
                            <div class="skill-progress" style="width: 90%"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Contact Section -->
        <section id="contact">
            <h2 class="section-title">Contato</h2>
            <div class="contact-info">
                <div class="contact-item">
                    <div class="contact-icon">
                        <i class="fas fa-envelope"></i>
                    </div>
                    <div>
                        <h3>Email</h3>
                        <p>renan.fogaca@hotmail.com</p>
                    </div>
                </div>
                <div class="contact-item">
                    <div class="contact-icon">
                        <i class="fas fa-phone"></i>
                    </div>
                    <div>
                        <h3>Telefone</h3>
                        <p>(11) 99705-7953</p>
                    </div>
                </div>
                <div class="contact-item">
                    <div class="contact-icon">
                        <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <div>
                        <h3>Localização</h3>
                        <p>São Paulo, Brasil</p>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer>
        <div class="container">
    <div class="social-links">
        <a href="https://www.linkedin.com/in/fogacadev/" target="_blank" 
            style="display: inline-block; font-size: 32px; margin: 10px; padding: 10px; border-radius: 50%; transition: transform 0.3s ease;">
            <i class="fab fa-linkedin-in"></i>
        </a>
        <a href="https://github.com/FogacaDev" target="_blank" 
            style="display: inline-block; font-size: 32px; margin: 10px; padding: 10px; border-radius: 50%; transition: transform 0.3s ease;">
            <i class="fab fa-github"></i>
        </a>
        <a href="https://wa.me/5511997057953" target="_blank" 
            style="display: inline-block; font-size: 32px; margin: 10px; padding: 10px; border-radius: 50%; transition: transform 0.3s ease;">
            <i class="fab fa-whatsapp"></i>
        </a>
        <a href="https://www.facebook.com/drogaria.brasilina" target="_blank" 
            style="display: inline-block; font-size: 32px; margin: 10px; padding: 10px; border-radius: 50%; transition: transform 0.3s ease;">
            <i class="fab fa-facebook"></i>
        </a>
    </div>
</div>

            <p>© 2025 Renan Fogaça. Todos os direitos reservados.</p>
        </div>
    </footer>
</body>
</html>
