# Expense Tracker

Expense Tracker é uma aplicação web simples para controlar seus gastos. Ele permite adicionar, listar e exibir o total de despesas.

## Funcionalidades

- Adicionar novas despesas com descrição e valor.
- Listar todas as despesas adicionadas.
- Exibir o total das despesas.

## Configuração do Ambiente

1. Clone o repositório para sua máquina local:
    ```sh
    git clone https://github.com/gvezono/controle_gastos.git
    ```

2. Navegue até o diretório do projeto:
    ```sh
    cd expense-tracker
    ```

3. Configure seu servidor web (XAMPP, WAMP, etc.) para apontar para o diretório `public`.

4. Crie um banco de dados MySQL e uma tabela `gastos` com a seguinte estrutura:
    ```sql
    CREATE TABLE gastos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        description VARCHAR(255) NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        date DATE NOT NULL
    );
    ```

5. Configure o arquivo `src/db.php` com suas credenciais de conexão com o banco de dados:
    ```php
    <?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "seu_banco_de_dados";

    // Criar conexão
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Checar conexão
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    ?>
    ```

## Uso

1. Abra o navegador e acesse a URL onde o projeto está hospedado (por exemplo, `http://localhost/expense-tracker/public`).

2. Adicione suas despesas usando o formulário na página principal.

3. As despesas adicionadas serão listadas abaixo do formulário, juntamente com o total de despesas.