// Espera o HTML carregar completamente antes de rodar o JS
document.addEventListener('DOMContentLoaded', () => {

    // --- DADOS FICTÍCIOS (MOCK) ---
    // (Substitui o banco de dados)

    const mockMovies = [
        {
            id: "the-Batman",
            title: "The Batman",
            synopsis: "Após dois anos espreitando as ruas como Batman, Bruce Wayne se encontra nas profundezas mais sombrias de Gotham City. Com poucos aliados confiáveis, o vigilante solitário se estabelece como a personificação da vingança para a população.",
            posterUrl: "https://img.elo7.com.br/product/zoom/3FBA809/big-poster-filme-batman-2022-90x60-cm-lo002-poster-batman.jpg"
        },
        {
            id: "superman",
            title: "Superman",
            synopsis: "Superman embarca em uma jornada para reconciliar sua herança kryptoniana com sua criação humana.",
            posterUrl: "https://ingresso-a.akamaihd.net/b2b/production/uploads/articles-content/8923869c-f8a6-4258-ba74-4170bf7fb202.jpg"
        },
        {
            id: "deadpool-3",
            title: "Deadpool e Wolverine",
            synopsis: "Wolverine está se recuperando quando cruza seu caminho com Deadpool. Juntos, eles formam uma equipe e enfrentam um inimigo em comum.",
            posterUrl: "https://acdn-us.mitiendanube.com/stores/004/687/740/products/pos-03770-ad5e9cf3e9577a330217219079506308-1024-1024.jpg"
        },
        {
            id: "guerra-infinita",
            title: "Vingadores: Guerra Infinita",
            synopsis: "Uma equipe de exploradores viaja através de um buraco de minhoca no espaço na tentativa de garantir a sobrevivência da humanidade.",
            posterUrl: "https://br.web.img2.acsta.net/pictures/18/03/16/15/08/2019826.jpg"
        },
        {
            id: "batman-cavaleiro-das-trevas",
            title: "Batman: O Cavaleiro Das Trevas",
            synopsis: "Batman tem conseguido manter a ordem em Gotham com a ajuda de Jim Gordon e Harvey Dent. No entanto, um jovem e anárquico criminoso, conhecido apenas como Coringa, pretende testar o Cavaleiro das Trevas e mergulhar a cidade em um verdadeiro caos.",
            posterUrl: "https://br.web.img3.acsta.net/medias/nmedia/18/90/57/96/20121842.jpg"
        }
    ];

    // Nossos "comentários salvos"
    let mockRatings = {
        "the-batman": [
            { score: 5, comment: "Incrível! Obra-prima." },
            { score: 4, comment: "Gostei da investigação, mas as cenas de luta não me apeteceu." }
        ],
        "superman": [
            { score: 2, comment: "Achei o Superman fraco." }
        ],
        "deadpool-3": [], // Nenhum comentário ainda
        "guerra-infinita": [
            { score: 5, comment: "Chorei no final." }
        ],
        "batman-cavaleiro-das-trevas": [] // Nenhum comentário ainda
    };


    // --- SELETORES DO DOM (Pegando os elementos do HTML) ---
    const movieGrid = document.getElementById('movie-grid');
    const modal = document.getElementById('modal');
    const modalCloseBtn = document.getElementById('modal-close');
    
    // Elementos do Modal
    const modalPoster = document.getElementById('modal-poster');
    const modalTitle = document.getElementById('modal-title');
    const modalSynopsis = document.getElementById('modal-synopsis');
    const commentsList = document.getElementById('comments-list');
    
    // Formulário
    const ratingForm = document.getElementById('rating-form');
    const starsContainer = document.querySelector('.stars');
    const allStars = document.querySelectorAll('.stars span');
    const ratingScoreInput = document.getElementById('rating-score');
    const ratingCommentInput = document.getElementById('rating-comment');

    // Variável para guardar o ID do filme que está no modal
    let currentMovieId = null;

    // --- FUNÇÕES ---

    /**
     * 1. Função para mostrar os filmes na tela
     */
    function displayMovies() {
        // Limpa o grid antes de adicionar novos filmes
        movieGrid.innerHTML = ''; 

        mockMovies.forEach(movie => {
            // Cria o HTML para cada card de filme
            const movieCardHTML = `
                <div class="movie-card" data-movie-id="${movie.id}">
                    <img src="${movie.posterUrl}" alt="${movie.title}">
                    <div class="movie-info">
                        <button class="button-purple rate-button">Avaliar</button>
                    </div>
                </div>
            `;
            // Adiciona o novo card ao grid
            movieGrid.innerHTML += movieCardHTML;
        });

        // Adiciona o "escutador de clique" (Event Listener) para os botões DEPOIS de criá-los
        addCardButtonListeners();
    }

    /**
     * 2. Adiciona os cliques aos botões "Avaliar"
     */
    function addCardButtonListeners() {
        const rateButtons = document.querySelectorAll('.rate-button');
        rateButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Pega o ID do filme guardado no 'data-movie-id'
                const card = button.closest('.movie-card');
                const movieId = card.dataset.movieId;
                openModal(movieId);
            });
        });
    }

    /**
     * 3. Abre o Modal com as informações do filme
     */
    function openModal(movieId) {
        // Guarda o ID do filme atual
        currentMovieId = movieId; 

        // Encontra o filme nos nossos dados
        const movie = mockMovies.find(m => m.id === movieId);
        if (!movie) return; // Segurança: se não achar o filme, não faz nada

        // Preenche o modal com os dados do filme
        modalTitle.textContent = movie.title;
        modalPoster.src = movie.posterUrl;
        modalSynopsis.textContent = movie.synopsis;

        // Atualiza a lista de comentários
        displayComments(movieId);
        
        // Limpa o formulário
        resetRatingForm();

        // Mostra o modal (removendo a classe 'hidden')
        modal.classList.remove('hidden');
    }

    /**
     * 4. Fecha o Modal
     */
    function closeModal() {
        modal.classList.add('hidden');
        currentMovieId = null; // Limpa o ID do filme
    }

    /**
     * 5. Mostra os comentários na lista
     */
    function displayComments(movieId) {
        commentsList.innerHTML = ''; // Limpa a lista
        const ratings = mockRatings[movieId] || []; // Pega os comentários (ou um array vazio)

        if (ratings.length === 0) {
            commentsList.innerHTML = '<p>Seja o primeiro a comentar!</p>';
            return;
        }

        ratings.forEach(rating => {
            // Cria o HTML para cada comentário
            const commentHTML = `
                <div class="comment-item">
                    <p class="comment-score">${'&#9733;'.repeat(rating.score)}</p>
                    <p>${rating.comment}</p>
                </div>
            `;
            commentsList.innerHTML += commentHTML;
        });
    }
    
    /**
     * 6. Limpa o formulário de avaliação
     */
    function resetRatingForm() {
        ratingScoreInput.value = "0";
        ratingCommentInput.value = "";
        // Remove a classe 'active' de todas as estrelas
        allStars.forEach(star => star.classList.remove('active'));
    }

    /**
     * 7. Lógica para salvar a nova avaliação (fictícia)
     */
    function handleRatingSubmit(event) {
        event.preventDefault(); // Impede o recarregamento da página

        const score = parseInt(ratingScoreInput.value, 10);
        const comment = ratingCommentInput.value;

        // Validação simples
        if (score === 0 || comment.trim() === "") {
            alert("Por favor, selecione uma nota e escreva um comentário.");
            return;
        }

        // Cria o novo objeto de avaliação
        const newRating = { score, comment };

        // Adiciona a nova avaliação aos nossos dados "mock"
        mockRatings[currentMovieId].push(newRating);

        // Atualiza a exibição dos comentários
        displayComments(currentMovieId);
        
        // Limpa o formulário
        resetRatingForm();
    }
    
    /**
     * 8. Lógica de clique das estrelas
     */
    allStars.forEach(star => {
        star.addEventListener('click', () => {
            const value = parseInt(star.dataset.value, 10);
            ratingScoreInput.value = value; // Guarda o valor no input escondido

            // Remove 'active' de todas
            allStars.forEach(s => s.classList.remove('active'));

            // Adiciona 'active' até a estrela clicada
            for (let i = 0; i < value; i++) {
                allStars[i].classList.add('active');
            }
        });
    });


    // --- INICIALIZAÇÃO E EVENTOS GLOBAIS ---

    // 1. Chama a função para mostrar os filmes assim que a página carrega
    displayMovies();

    // 2. Adiciona evento de clique para fechar o modal
    modalCloseBtn.addEventListener('click', closeModal);
    
    // 3. Adiciona evento de clique para fechar o modal clicando fora
    modal.addEventListener('click', (event) => {
        // Se o clique foi no fundo (o próprio 'modal') e não no 'modal-content'
        if (event.target === modal) {
            closeModal();
        }
    });

    // 4. Adiciona evento de "submit" (envio) ao formulário
    ratingForm.addEventListener('submit', handleRatingSubmit);

});