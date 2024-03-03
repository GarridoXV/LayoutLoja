const express = require('express');
const app = express();
const path = require('path');
const mariadb = require('mariadb');

// Middleware para analisar o corpo das requisições POST
app.use(express.urlencoded({ extended: true }));

// Configuração do MariaDB
const pool = mariadb.createPool({
    host: 'localhost', 
    user: 'root', // Usuário padrão do XAMPP para MariaDB
    password: '', // Padrão é sem senha no XAMPP
    database: 'BrunaCovieloSJTeste', // Substitua pelo nome do seu banco de dados
    connectionLimit: 5
});

// Endpoint para tratar o cadastro do formulário
app.post('/cadastrar-usuario', async (req, res) => {
    let conn;
    try {
        // Receber dados do formulário
        const { Nome, Sobrenome, Genero, Endereco, CEP, CPF, Telefone, Email, Senha } = req.body;

        // Conectar ao banco de dados e inserir os dados
        conn = await pool.getConnection();
        const result = await conn.query('INSERT INTO usuarios (Nome, Sobrenome, Genero, Endereco, CEP, CPF, Telefone, Email, Senha VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [Nome, Sobrenome, Genero, Endereco, CEP, CPF, Telefone, Email]);

        // Se tudo estiver ok, enviar uma resposta positiva
        res.send('Usuário cadastrado com sucesso!');
    } catch (err) {
        console.error('Erro ao cadastrar usuário:', err);
        res.status(500).send('Ocorreu um erro ao cadastrar o usuário.');
    } finally {
        if (conn) conn.end(); // Encerrar a conexão com o banco de dados
    }
});


// Definir EJS como o motor de visualização
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Paginas'));

// Servir arquivos estáticos da pasta 'Public'
app.use('/public', express.static(path.join(__dirname, 'Public')));

// Rota para a página inicial
app.get('/', (req, res) => {
    res.render('index');
});

// Outras rotas e configurações...

// Definindo a porta do servidor
const PORT = process.env.PORT || 3000; // A porta padrão para aplicações web geralmente é 3000
// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
