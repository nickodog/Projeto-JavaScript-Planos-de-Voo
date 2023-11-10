# Projeto-JavaScript-Planos-de-Voo
Projeto JavaScript sobre sistema de criação de planos de voo.

O projeto é dividido em scripts para cada classe e um script geral, onde se situa o menu e suas funções (que interagem com todos as outras classes/objetos). Isso só se faz possível por ser uma linguagem orientada a objetos.
'Aeronave.js' é o script que cria a classe padrão 'Aeronave' e todas suas classes derivadas. Cada classe tem seu constructor com suas exigências.
'Aerovia.js' segue o mesmo padrão, só que neste caso, as aerovias não possuem diversas classes.
'Piloto.js' também, cria a classe Piloto.
'Plano.js' atua da mesma forma.
todos estes scripts acima tem consigo uma classe adicional chamada 'Servico{nomedaclasse}', usada como debug, para garantir o total funcionamento das classes.
'OcupaçãoAerovia.js' interage inteiramente com a lista 'ocupacoes', criada no 'projetoparte2.js', servindo quase como um debug.
E então temos 'projetoparte2.js'. Neste script, temos a culminação de todos os elementos deste projeto, com um menu de texto com 8 opções (funções), as quais interagem com todos objetos (criados por código ou retirados dos arquivos .csv). A maior e mais importante função, a qual este projeto é baseado, é a criação de planos de voo e sua aprovação/cancelamento. Nele também temos a criação dos objetos das classes de debug (chamados de 'Gerenciador...', contendo no script várias linhas que usufruem das funções de tais classes.
Por fim, temos 2 arquivos .csv, um com dados de aerovias, e outro com dados de pilotos.
O projeto usa algumas dependencias como 'bycontract' e 'n-readlines'. Todas as dependencias estão listadas no arquivo 'package.json'.
