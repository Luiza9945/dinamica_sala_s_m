
document.addEventListener('DOMContentLoaded', () => {

    // ========================================
    // 1. MODAL DE LOGIN
    // ========================================

    const modalLogin = document.getElementById('modal-container');
    const btnLogin = document.getElementById('btn-login');
    const btnFecharLogin = document.getElementById('btn-fechar');

    // Abre o modal de login
    if (btnLogin && modalLogin) {
        btnLogin.addEventListener('click', () => {
            modalLogin.classList.add('ativo');
        });
    }

    // Fecha o modal de login
    if (btnFecharLogin && modalLogin) {
        btnFecharLogin.addEventListener('click', () => {
            modalLogin.classList.remove('ativo');
        });
    }

    // Fecha o login ao clicar fora do conteúdo
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

    // Abre o menu lateral
    function abrirMenuPerfil() {
        if (menuPerfil && fundoPerfil) {
            menuPerfil.classList.add('aberto');
            fundoPerfil.classList.add('ativo');
        }
    }

    // Fecha o menu lateral
    function fecharMenuPerfil() {
        if (menuPerfil && fundoPerfil) {
            menuPerfil.classList.remove('aberto');
            fundoPerfil.classList.remove('ativo');
        }
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
    // 3. BUSCA DE RECEITAS
    // ========================================

    const barraPesquisa = document.getElementById('barra-pesquisa');
    const receitas = document.querySelectorAll('.receita');

    function pesquisarReceitas() {
        if (!barraPesquisa) return;

        const termo = barraPesquisa.value
            .trim()
            .toLowerCase();

        receitas.forEach((receita) => {
            const textoReceita = receita.textContent.toLowerCase();

            if (textoReceita.includes(termo)) {
                receita.style.display = '';
            } else {
                receita.style.display = 'none';
            }
        });
    }

    if (barraPesquisa) {
        barraPesquisa.addEventListener('input', pesquisarReceitas);
    }

    const iconeLupa = document.getElementById('icone-lupa');

    if (iconeLupa) {
        iconeLupa.addEventListener('click', pesquisarReceitas);
    }


    // ========================================
    // 4. MODAL DE DETALHES DA RECEITA
    // ========================================

    const modalReceita = document.getElementById(
        'modal-receita-container'
    );

    const btnFecharReceita = document.getElementById(
        'btn-fechar-receita'
    );

    const imagemModal = document.getElementById(
        'img-modal-receita'
    );

    const tituloModal = document.getElementById(
        'titulo-modal-receita'
    );

    const avaliacaoModal = document.getElementById(
        'avaliacao-modal-receita'
    );

    const descricaoModal = document.getElementById(
        'descricao-modal-receita'
    );

    // Abre os detalhes da receita clicada
    receitas.forEach((receita) => {
        receita.addEventListener('click', () => {

            if (!modalReceita) return;

            // Pega a imagem do card
            const imagemReceita = receita.querySelector(
                '.img-receita'
            );

            // Procura o título no card
            const tituloReceita = receita.querySelector(
                'h2, h3, h4, .titulo-receita'
            );

            // Procura a descrição no card ou nos atributos HTML
            const descricaoReceita =
                receita.dataset.descricao ||
                receita.querySelector('.descricao-receita')?.textContent ||
                'Confira os detalhes desta receita.';

            // Procura a avaliação do card
            const avaliacaoReceita = receita.querySelector(
                '.avaliacao-receita, #avaliacao-receita'
            );

            // Preenche a imagem do modal
            if (imagemModal && imagemReceita) {
                imagemModal.src = imagemReceita.src;
                imagemModal.alt = imagemReceita.alt || 'Imagem da receita';
            }

            // Preenche o título do modal
            if (tituloModal) {
                tituloModal.textContent = tituloReceita
                    ? tituloReceita.textContent.trim()
                    : 'Detalhes da receita';
            }

            // Preenche a descrição
            if (descricaoModal) {
                descricaoModal.textContent = descricaoReceita;
            }

            // Copia a avaliação do card para o modal
            if (avaliacaoModal) {
                avaliacaoModal.replaceChildren();

                if (avaliacaoReceita) {
                    avaliacaoModal.innerHTML = avaliacaoReceita.innerHTML;
                }
            }

            // Mostra o modal
            modalReceita.classList.add('ativo');
        });
    });

    // Fecha os detalhes da receita
    if (btnFecharReceita && modalReceita) {
        btnFecharReceita.addEventListener('click', () => {
            modalReceita.classList.remove('ativo');
        });
    }

    // Fecha os detalhes ao clicar fora do conteúdo
    if (modalReceita) {
        modalReceita.addEventListener('click', (evento) => {
            if (evento.target === modalReceita) {
                modalReceita.classList.remove('ativo');
            }
        });
    }


    // ========================================
    // 5. FECHAR MODAIS E MENU COM ESC
    // ========================================

    document.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape') {

            if (modalLogin) {
                modalLogin.classList.remove('ativo');
            }

            if (modalReceita) {
                modalReceita.classList.remove('ativo');
            }

            fecharMenuPerfil();
        }
    });


    // ========================================
    // 6. BOTÃO CRIAR RECEITA
    // ========================================

    const btnCriarReceita = document.getElementById(
        'btn-criar-receita'
    );

    if (btnCriarReceita) {
        btnCriarReceita.addEventListener('click', () => {
            alert('A opção de criar receita será implementada aqui.');
        });
    }

});
