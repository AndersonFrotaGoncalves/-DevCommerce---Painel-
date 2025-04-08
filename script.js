// Simulação de dados do sistema
const dados = {
    vendas: 1240,
    produtos: 58,
    clientes: 320,
    lucro: 7643.50,
    historicoVendas: [
      { produto: "Camiseta Dev", categoria: "Roupas", qtd: 5, valor: 100 },
      { produto: "Mouse Gamer", categoria: "Tecnologia", qtd: 2, valor: 160 },
      { produto: "Caneca React", categoria: "Utilidades", qtd: 3, valor: 75 },
      { produto: "Caderno JS", categoria: "Papelaria", qtd: 7, valor: 84 },
      { produto: "Chaveiro HTML", categoria: "Acessórios", qtd: 10, valor: 50 }
    ],
    vendasMensais: [120, 180, 240, 310, 390, 470, 610, 750, 820, 940, 1080, 1240]
  };

// Simples verificação de login
// Login com animação suave
const loginForm = document.getElementById("login-form");
const loginPage = document.querySelector(".login-page");
const dashboard = document.querySelector(".dashboard");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  // Simples verificação (você pode trocar depois)
  if (user === "admin" && pass === "1234") {
    loginPage.classList.add("fade-out");

    setTimeout(() => {
      loginPage.style.display = "none";
      dashboard.style.display = "block";
      dashboard.classList.add("fade-in");
    }, 400);
  } else {
    alert("Usuário ou senha inválidos.");
  }
});


// Preenche os cards
document.getElementById("vendas").textContent = dados.vendas;
document.getElementById("produtos").textContent = dados.produtos;
document.getElementById("clientes").textContent = dados.clientes;
document.getElementById("lucro").textContent = `${dados.lucro.toFixed(2)}€`;

// Renderiza a tabela com filtro
const tabela = document.getElementById("tabela-vendas");
const renderTabela = (filtro = "todas") => {
  tabela.innerHTML = "";
  dados.historicoVendas
    .filter(item => filtro === "todas" || item.categoria === filtro)
    .forEach(item => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.produto}</td>
        <td>${item.categoria}</td>
        <td>${item.qtd}</td>
        <td>${item.valor.toFixed(2)}€</td>
      `;
      tabela.appendChild(row);
    });
};

renderTabela();
document.getElementById("filtro-categoria").addEventListener("change", (e) => {
  renderTabela(e.target.value);
});

// Gráfico com Chart.js
const ctx = document.getElementById("graficoVendas").getContext("2d");
new Chart(ctx, {
  type: "line",
  data: {
    labels: [
      "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
      "Jul", "Ago", "Set", "Out", "Nov", "Dez"
    ],
    datasets: [{
      label: "Vendas Mensais",
      data: dados.vendasMensais,
      borderColor: "#00ffcc",
      backgroundColor: "rgba(0, 255, 204, 0.1)",
      tension: 0.3,
      fill: true,
      pointRadius: 4,
      pointBackgroundColor: "#00ffcc"
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#00ffcc"
        }
      }
    },
    scales: {
      x: {
        ticks: { color: "#eee" },
        grid: { color: "#333" }
      },
      y: {
        ticks: { color: "#eee" },
        grid: { color: "#333" }
      }
    }
  }
});

// ScrollReveal animações
ScrollReveal().reveal('.card', {
  origin: 'top',
  distance: '40px',
  duration: 800,
  interval: 100,
  easing: 'ease-in-out'
});
ScrollReveal().reveal('.grafico', {
  origin: 'left',
  distance: '50px',
  duration: 1000,
  easing: 'ease-in-out'
});
ScrollReveal().reveal('.tabela', {
  origin: 'right',
  distance: '50px',
  duration: 1000,
  easing: 'ease-in-out'
});

// Toggle de tema
const toggleBtn = document.getElementById("toggle-theme");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
});
const logoutBtn = document.getElementById("logout-btn");

logoutBtn.addEventListener("click", () => {
  dashboard.classList.remove("fade-in");
  dashboard.classList.add("fade-out");

  setTimeout(() => {
    dashboard.style.display = "none";
    loginPage.style.display = "flex";
    loginPage.classList.remove("fade-out");
    loginPage.classList.add("fade-in");
    loginForm.reset(); // limpa os campos
  }, 400);
});
