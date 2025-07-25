<!DOCTYPE html>
<!-- Designined by CodingLab | www.youtube.com/codinglabyt -->
<html lang="en" dir="ltr">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Descubra Portugal com alma através de experiências autênticas e guias locais especializados. Tours personalizados em Sintra, Lisboa, Alentejo e muito mais.">
  <meta name="keywords" content="tours portugal, guias locais, sintra, lisboa, alentejo, turismo portugal, experiências autênticas">
  <meta name="author" content="Take Out Tours">
  <meta property="og:title" content="Take Out Tours - Portugal com Alma">
  <meta property="og:description" content="Descubra Portugal com alma através de experiências autênticas e guias locais especializados.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://takeouttours.pt">
  <meta name="theme-color" content="#667eea">

  <title>Take Out Tours - Portugal com Alma</title>

  <!-- Preload critical resources -->
  <link rel="preload" href="./css/navbar.css" as="style">
  <link rel="preload" href="./css/slider.css" as="style">

  <!-- Stylesheets -->
  <link rel="stylesheet" href="./css/navbar.css">
  <link rel="stylesheet" href="./css/slider.css">
  <link rel="stylesheet" href="./css/footer.css">
  <link rel="stylesheet" href="./css/main.css">
  <link rel="stylesheet" href="./css/improvements.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css">
</head>

<body>
  <!-- header -->
  <?php include './pages/header.php'; ?>

  <!-- slider de imagens -->
  <?php include './pages/slide.php'; ?>

  <!-- main content -->
  <?php include './pages/main.php'; ?>

  <!-- footer -->
  <?php include './pages/footer.php'; ?>
  <!-- Scroll to Top Button -->
  <button class="scroll-to-top" id="scrollToTop">
    <i class="bi bi-arrow-up"></i>
  </button>

  <script src="./js/script.js"></script>
  <script src="./js/slider.js"></script>

</body>

</html>