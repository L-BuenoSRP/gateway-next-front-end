# Plano de construção de tela / app - Front end

#### Gerar um app onde eu possa sinalizar que uma empresa precisa gerenciar as faturas/pagamentos de uma empresa, sendo que essa empresa pode ter filiais e sua matriz


#### Prompt para usar junto aos prints do Ux Pilot no V0.dev

Criar 7 telas para construção de um app responsavel por realizar as operações de cartão de uma empresa com multiplas filiais, seguindo a ordem dos prints, cada print é uma pagina

Crie as páginas e separe os componentes conforme julgar necessário, abaixo o contexto de cada pagina a ser criada

Os itens abaixo representam tambem a ordem das fotos, tambem esta seguindo o nome das fotos com o nome frame + numero referente a pagina

Os subitens não numerados abaixo de cada numero, representam pontos importantes para a tela e a funcionalidade, podendo ter ou não refletir em algum componente ou regra do frontend, avalie quais podem ser relevantes e fique a vontade para customizar o que conseguir conforme estes subitens

1. A tela de login receberá o cnpj da matriz e a senha para seguir para a proxima tela
    - A entidade que representa as matrizes é a Company

2. O botão de registro da tela de login sera para direcionar para a tela de cadastro de novas empresas matrizes, (baseado no radical do cnpj), onde tambem sera cadastrado a senha e demais dados da matriz

3. Apos o login / registro, sera direcionado para uma tela de seleção de filiais, a qual tera opção selecionar uma das filiais da matriz logada ou clicar no botão de cadastrar nova filial
    - Cada filial é representada pela entidade Account
    - Ao clicar no botão selecionar, deverá enviar o API-Key da filial para a proxima tela, item que ja estara como um valor do registro na busca para a tela da seleção de filial

4. A tela de cadastrar filial, devera receber o restante do cnpj(ultimos digitos, mostrando parte inalteravel do cnpj, o inicio do radical deste), tambem deve receber endereço e telefone, ao terminar de cadastrar deve voltar para tela de lista de filiais

5. A proxima tela sera a de listar as faturas da filial selecionada, onde tera uma opção para um novo pagamento ou para os existentes, sera possivel ver a tela de detalhes
    - A entidade que representa as faturas é a Invoice

6. A tela de detalhes tera os dados da transação feita e processos relacionados ao pagamento
    
7. A tela de criação de fatura / pagamento devera receber o valor da transação, dados do cartao usado e um botao para processar o pagamento e outro para cancelar
    - Considerar o uso de taxa de processamento, item que tambem vira da api em algum momento


>Obs
> - Preciso validar se o cnpj é valido tanto para matriz ou filial. Talvez por ser um projeto de estudo, caiba fazer algo, talvez seja valido o uso de uma mascara e de form validators para alguns campos 
> - Considere usar label em portugues porem todo o codigo e nomes de arquivos e variaveis em ingles
> - Meus protopipos podem não estar 100% alinhados, mas tenha em consideração de que as telas geradas devem ter um mesmo enquadramento dos itens em tela ao trocar de tela
> - Faça uma barra de navegação e como bonus um botão para trocar para tema escuro, essa preferencia do tema escuro ou claro pode ficar em cache no browser a cada troca, sendo o claro o default
> - Não use o ThemeProvider



`Obs: Escrever as telas primeiro de forma individual, para não consumir tokens do ux pilot, se precisar refinar algo, fazer depois ou no proprio front end`