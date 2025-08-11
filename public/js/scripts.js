document.addEventListener('DOMContentLoaded', () => {
  // Menu mobile toggle
  const menuToggle = document.getElementById('menuToggle');
  const menu = document.querySelector('.menu');

  if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
      menu.classList.toggle('ativo');
    });

    // Fecha o menu ao clicar em um link
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => menu.classList.remove('ativo'));
    });
  }

  // Função para carregar próximo lançamento
  function carregarProximoLancamento() {
    fetch("https://opensheet.elk.sh/1SeaT_oYgJwLiR7Q-zQuBcJ75Q5QtZhhMgf37qwIbmrk/Página2")
      .then(res => res.json())
      .then(data => {
        const destaque = document.getElementById("proximo-lancamento");
        const proximo = data.find(m => m.Status?.trim().toLowerCase() === "próximo lançamento");

        if (proximo) {
          destaque.innerHTML = `
            <h3>🎵 Próximo Lançamento</h3>
            <img src="${proximo["Local Foto Capa"]}" alt="Capa da música ${proximo["Nome da Musica"]}" />
            <p><strong>${proximo["Nome da Musica"]}</strong></p>
            <p><em>Álbum: ${proximo.Album}</em></p>
            <p><strong>Data:</strong> ${proximo["Data do Lançamento"]}</p>
          `;
        } else {
          destaque.innerHTML = `<h3>🎵 Próximo Lançamento</h3><p>Nenhum lançamento encontrado.</p>`;
        }
      })
      .catch(err => {
        console.error("Erro ao carregar próximo lançamento:", err);
      });
  }

  // Função para carregar próximo show
  function carregarProximoShow() {
    fetch("https://opensheet.elk.sh/1SeaT_oYgJwLiR7Q-zQuBcJ75Q5QtZhhMgf37qwIbmrk/Página1")
      .then(res => res.json())
      .then(data => {
        const box = document.getElementById("proximo-show");
        const show = data.find(s => s.Status?.trim().toLowerCase() === "próximo");

        if (show) {
          box.innerHTML = `
            <h3>🎤 Próximo Show</h3>
            <img src="${show["Caminho da Foto foto do local"]}" alt="Foto do local" />
            <p><strong>${show.Local}</strong> - ${show.Cidade}</p>
            <p><strong>Data:</strong> ${show.Data} às ${show.Hora}</p>
            <p><a href="${show["Link do Local"]}" target="_blank">📍 Ver local</a></p>
          `;
        } else {
          box.innerHTML = `<h3>🎤 Próximo Show</h3><p>Nenhum show agendado.</p>`;
        }
      })
      .catch(err => {
        console.error("Erro ao carregar próximo show:", err);
      });
  }

  // Executa os carregamentos ao iniciar
  carregarProximoLancamento();
  carregarProximoShow();
});