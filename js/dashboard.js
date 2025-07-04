// Dados simulados - substitua por dados reais do backend via API fetch/AJAX

const dadosDashboard = {
    totalUsuarios: 1345,
    totalProdutos: 128,
    vendasHoje: 36,
    receitaMensal: 15480.75,
    vendasPorCategoria: {
      'Eletrônicos': 40,
      'Games': 30,
      'Informática': 20,
      'Acessórios': 10,
    },
    receitaUltimosMeses: [
      { mes: 'Fev', receita: 10200 },
      { mes: 'Mar', receita: 11200 },
      { mes: 'Abr', receita: 12500 },
      { mes: 'Mai', receita: 14800 },
      { mes: 'Jun', receita: 15100 },
      { mes: 'Jul', receita: 15480 },
    ]
  };
  
  function carregarEstatisticas() {
    document.getElementById('totalUsuarios').textContent = dadosDashboard.totalUsuarios;
    document.getElementById('totalProdutos').textContent = dadosDashboard.totalProdutos;
    document.getElementById('vendasHoje').textContent = dadosDashboard.vendasHoje;
    document.getElementById('receitaMensal').textContent = `R$ ${dadosDashboard.receitaMensal.toFixed(2)}`;
  }
  
  function criarGraficoCategorias() {
    const ctx = document.getElementById('graficoCategorias').getContext('2d');
    const labels = Object.keys(dadosDashboard.vendasPorCategoria);
    const data = Object.values(dadosDashboard.vendasPorCategoria);
  
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          label: 'Vendas por Categoria',
          data,
          backgroundColor: ['#0066cc', '#3399ff', '#66b2ff', '#99ccff'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }
  
  function criarGraficoReceita() {
    const ctx = document.getElementById('graficoReceita').getContext('2d');
    const labels = dadosDashboard.receitaUltimosMeses.map(d => d.mes);
    const data = dadosDashboard.receitaUltimosMeses.map(d => d.receita);
  
    new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Receita Mensal (R$)',
          data,
          fill: true,
          backgroundColor: 'rgba(0, 102, 204, 0.2)',
          borderColor: '#0066cc',
          borderWidth: 2,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
  // Inicialização
  window.onload = () => {
    carregarEstatisticas();
    criarGraficoCategorias();
    criarGraficoReceita();
  };
  