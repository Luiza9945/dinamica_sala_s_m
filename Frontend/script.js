
document.addEventListener('DOMContentLoaded', () => {

    // ========================================
    // 1. MODAL DE LOGIN
    // ========================================

    const modalLogin = document.getElementById('modal-container');
    const btnLogin = document.getElementById('btn-login');
    const btnFecharLogin = document.getElementById('btn-fechar');

    if (btnLogin && modalLogin) {
        btnLogin.addEventListener('click', () => {
            modalLogin.classList.add('ativo');
        });
    }

    if (btnFecharLogin && modalLogin) {
        btnFecharLogin.addEventListener('click', () => {
            modalLogin.classList.remove('ativo');
        });
    }

    if (modalLogin) {
        modalLogin.addEventListener('click', (evento) => {
            if (evento.target === modalLogin) {
                modalLogin.classList.remove('ativo');
            }
        });
    }


    // ========================================
    // 2. MENU LATERAL DO PERFIL
    // ========================================

    const menuPerfil = document.getElementById('menu-perfil');
    const fundoPerfil = document.getElementById('fundo-perfil');
    const btnPerfil = document.querySelector('.btn-perfil');
    const btnFecharPerfil = document.getElementById('fechar-perfil');

    function abrirMenuPerfil() {
        if (menuPerfil) menuPerfil.classList.add('aberto');
        if (fundoPerfil) fundoPerfil.classList.add('ativo');
    }

    function fecharMenuPerfil() {
        if (menuPerfil) menuPerfil.classList.remove('aberto');
        if (fundoPerfil) fundoPerfil.classList.remove('ativo');
    }

    if (btnPerfil) {
        btnPerfil.addEventListener('click', abrirMenuPerfil);
    }

    if (btnFecharPerfil) {
        btnFecharPerfil.addEventListener('click', fecharMenuPerfil);
    }

    if (fundoPerfil) {
        fundoPerfil.addEventListener('click', fecharMenuPerfil);
    }


    // ========================================
    // 3. PESQUISA DE RECEITAS
    // ========================================

    const barraPesquisa = document.getElementById('barra-pesquisa');
    const iconeLupa = document.getElementById('icone-lupa');
    const muralReceitas = document.querySelector('.mural-receitas');

    function pesquisarReceitas() {
        if (!barraPesquisa || !muralReceitas) return;

        const termo = barraPesquisa.value.trim().toLowerCase();
        const receitas = muralReceitas.querySelectorAll('.receita');

        receitas.forEach((receita) => {
            const textoReceita = receita.textContent.toLowerCase();
            const descricao = (
                receita.dataset.descricao || ''
            ).toLowerCase();

            receita.style.display =
                textoReceita.includes(termo) ||
                descricao.includes(termo)
                    ? ''
                    : 'none';
        });
    }

    if (barraPesquisa) {
        barraPesquisa.addEventListener('input', pesquisarReceitas);
    }

    if (iconeLupa) {
        iconeLupa.addEventListener('click', pesquisarReceitas);
    }


    // ========================================
    // 4. ESTRELAS E NOTAS DAS RECEITAS
    // ========================================

    // Configura uma estrela e evita adicionar o mesmo evento duas vezes
    function configurarEstrela(estrela) {
        if (estrela.dataset.eventoConfigurado === 'true') return;

        estrela.dataset.eventoConfigurado = 'true';
        estrela.style.cursor = 'pointer';

        estrela.addEventListener('click', (evento) => {
            evento.preventDefault();
            evento.stopPropagation();

            // Alterna o estado da estrela
            const ficouAtiva = estrela.classList.toggle('ativa');

            // Encontra a nota ao lado da estrela
            const contadorP = estrela.nextElementSibling;

            if (contadorP) {
                const valorAtual = parseInt(contadorP.textContent, 10) || 0;

                if (ficouAtiva) {
                    contadorP.textContent = valorAtual + 1;
                } else {
                    contadorP.textContent = Math.max(0, valorAtual - 1);
                }
            }
        });
    }

    // Configura as estrelas que já estão no HTML
    function configurarTodasAsEstrelas() {
        if (!muralReceitas) return;

        const estrelas = muralReceitas.querySelectorAll(
            '.avaliacao-receita .img-icone'
        );

        estrelas.forEach(configurarEstrela);
    }

    configurarTodasAsEstrelas();


    // ========================================
    // 5. MODAL DE DETALHES DA RECEITA
    // ========================================

    const modalReceita = document.getElementById(
        'modal-receita-container'
    );

    const btnFecharReceita = document.getElementById(
        'btn-fechar-receita'
    );

    const imagemModal = document.getElementById('img-modal-receita');
    const tituloModal = document.getElementById('titulo-modal-receita');
    const avaliacaoModal = document.getElementById('avaliacao-modal-receita');
    const descricaoModal = document.getElementById('descricao-modal-receita');

    function abrirDetalhesReceita(receita) {
        if (!modalReceita) return;

        const imagemReceita = receita.querySelector('.img-receita');

        const tituloReceita = receita.querySelector(
            '.titulo-receita, h2, h3, h4, p'
        );

        const descricaoReceita =
            receita.dataset.descricao ||
            receita.querySelector('.descricao-receita')?.textContent ||
            'Confira os detalhes desta receita.';

        const notaReceita = receita.querySelector(
            '.avaliacao-receita p'
        );

        if (imagemModal && imagemReceita) {
            imagemModal.src = imagemReceita.src;
            imagemModal.alt = imagemReceita.alt || 'Imagem da receita';
        }

        if (tituloModal) {
            tituloModal.textContent = tituloReceita
                ? tituloReceita.textContent.trim()
                : 'Detalhes da receita';
        }

        if (descricaoModal) {
            descricaoModal.textContent = descricaoReceita;
        }

        if (avaliacaoModal) {
            avaliacaoModal.textContent = notaReceita
                ? notaReceita.textContent
                : '0';
        }

        modalReceita.classList.add('ativo');
    }

    if (muralReceitas) {
        muralReceitas.addEventListener('click', (evento) => {
            // A estrela tem sua própria ação
            if (evento.target.closest('.avaliacao-receita .img-icone')) {
                return;
            }

            const receita = evento.target.closest('.receita');

            if (receita && muralReceitas.contains(receita)) {
                abrirDetalhesReceita(receita);
            }
        });
    }

    if (btnFecharReceita && modalReceita) {
        btnFecharReceita.addEventListener('click', () => {
            modalReceita.classList.remove('ativo');
        });
    }

    if (modalReceita) {
        modalReceita.addEventListener('click', (evento) => {
            if (evento.target === modalReceita) {
                modalReceita.classList.remove('ativo');
            }
        });
    }


    // ========================================
    // 6. MODAL DE CRIAR RECEITA
    // ========================================

    const btnCriarReceita = document.getElementById('btn-criar-receita');
    const modalCriarReceita = document.getElementById('modal-criar-receita');
    const btnFecharCriar = document.getElementById('btn-fechar-criar');
    const formCriarReceita = document.getElementById('form-criar-receita');

    if (btnCriarReceita && modalCriarReceita) {
        btnCriarReceita.addEventListener('click', () => {
            fecharMenuPerfil();
            modalCriarReceita.classList.add('ativo');
        });
    }

    if (btnFecharCriar && modalCriarReceita) {
        btnFecharCriar.addEventListener('click', () => {
            modalCriarReceita.classList.remove('ativo');
        });
    }

    if (modalCriarReceita) {
        modalCriarReceita.addEventListener('click', (evento) => {
            if (evento.target === modalCriarReceita) {
                modalCriarReceita.classList.remove('ativo');
            }
        });
    }


    // ========================================
    // 7. PUBLICAR NOVA RECEITA
    // ========================================

    if (formCriarReceita) {
        formCriarReceita.addEventListener('submit', (evento) => {
            evento.preventDefault();

            const campoNome = document.getElementById('nome-receita');
            const campoDescricao = document.getElementById('descricao-receita');
            const campoIngredientes = document.getElementById('ingredientes-receita');
            const campoPreparo = document.getElementById('preparo-receita');
            const campoImagem = document.getElementById('imagem-receita');

            const nome = campoNome.value.trim();
            const descricao = campoDescricao.value.trim();
            const ingredientes = campoIngredientes.value.trim();
            const preparo = campoPreparo.value.trim();
            const arquivoImagem = campoImagem.files[0];

            if (
                !nome ||
                !descricao ||
                !ingredientes ||
                !preparo ||
                !arquivoImagem
            ) {
                alert('Preencha todos os campos e escolha uma foto.');
                return;
            }

            if (!arquivoImagem.type.startsWith('image/')) {
                alert('Selecione um arquivo de imagem válido.');
                return;
            }

            const leitor = new FileReader();

            leitor.onload = () => {
                const novaReceita = document.createElement('div');

                novaReceita.classList.add('receita');
                novaReceita.dataset.id = `receita-${Date.now()}`;

                novaReceita.dataset.descricao =
                    `${descricao}\n\nIngredientes:\n${ingredientes}` +
                    `\n\nModo de preparo:\n${preparo}`;

                const imagem = document.createElement('img');
                imagem.classList.add('img-receita');
                imagem.src = leitor.result;
                imagem.alt = nome;

                const titulo = document.createElement('p');
                titulo.textContent = nome;

                // Cria a avaliação com a estrela do projeto
                const avaliacao = document.createElement('div');
                avaliacao.classList.add('avaliacao-receita');

                const estrela = document.createElement('img');
                estrela.classList.add('img-icone');
                estrela.src = '../anexos_prova/icones/estrela.svg';
                estrela.alt = 'Avaliação';

                const nota = document.createElement('p');
                nota.textContent = '0';

                avaliacao.append(estrela, nota);
                novaReceita.append(imagem, titulo, avaliacao);

                if (muralReceitas) {
                    muralReceitas.prepend(novaReceita);

                    // Faz a estrela da nova receita funcionar também
                    configurarEstrela(estrela);
                }

                // Atualiza a quantidade de receitas no perfil
                const quantidadeReceitas = document.getElementById(
                    'quantidade-receitas'
                );

                if (quantidadeReceitas && muralReceitas) {
                    quantidadeReceitas.textContent =
                        muralReceitas.querySelectorAll('.receita').length;
                }

                // Limpa a pesquisa para exibir a nova receita
                if (barraPesquisa) {
                    barraPesquisa.value = '';
                    pesquisarReceitas();
                }

                formCriarReceita.reset();
                modalCriarReceita.classList.remove('ativo');

                alert('Receita publicada com sucesso!');
            };

            leitor.onerror = () => {
                alert('Não foi possível carregar a imagem. Tente novamente.');
            };

            leitor.readAsDataURL(arquivoImagem);
        });
    }


    // ========================================
    // 8. FECHAR MODAIS E MENU COM ESC
    // ========================================

    document.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape') {
            if (modalLogin) modalLogin.classList.remove('ativo');
            if (modalReceita) modalReceita.classList.remove('ativo');
            if (modalCriarReceita) modalCriarReceita.classList.remove('ativo');

            fecharMenuPerfil();
        }
    });

});
