<!doctype html>
<html lang="fr-fr">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>Cool jeux</title>
        <link rel="stylesheet" href="css/styles-conception.css">
    </head>
    <body>
      <div style="display:flex; flex-direction:row; justify-content:center; align-items:center; height:100vh;">
      <?php
      foreach(["gestion_conception"=>"Jeu de l'oie", "conception"=>"Jeu de cartes"] as $k=>$v) {
        ?>
        <a style="display:block; margin:0 25px; padding:40px; color:white; background-color:#1f2f7d; text-transform:uppercase; text-align:center;" href="<?php echo $k; ?>.html"><?php echo $v; ?></a>
        <?php
      }
      ?>
      </div>
    </body>
</html>
