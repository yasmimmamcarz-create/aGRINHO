document.addEventListener("DOMContentLoaded", () => {
    const btnCalcular = document.getElementById("btn-calcular");
    const inputMassaUmida = document.getElementById("mu");
    const inputMassaSeca = document.getElementById("ms");
    const containerResultado = document.getElementById("resultado-calculo");

    if (btnCalcular) {
        btnCalcular.addEventListener("click", () => {
            // Converte valores tratando possíveis substituições de vírgula por ponto
            const mu = parseFloat(inputMassaUmida.value.replace(",", "."));
            const ms = parseFloat(inputMassaSeca.value.replace(",", "."));

            // Validação dos dados inseridos
            if (isNaN(mu) || isNaN(ms) || ms <= 0 || mu < ms) {
                containerResultado.innerHTML = `
                    <p class="text-destructive font-medium text-sm">
                        ⚠️ Erro: Por favor, insira valores válidos. A massa úmida deve ser maior ou igual à massa seca, e a massa seca deve ser maior que zero.
                    </p>
                `;
                containerResultado.classList.remove("hidden");
                return;
            }

            // Execução da Fórmula Gravimétrica: Ug (%) = ((Mu - Ms) / Ms) * 100
            const umidadeGravimetrica = ((mu - ms) / ms) * 100;

            // Renderização do resultado formatado na tela
            containerResultado.innerHTML = `
                <div class="space-y-1">
                    <h4 class="text-sm font-semibold tracking-wide text-foreground">Resultado da Análise:</h4>
                    <p class="text-2xl font-display font-bold text-primary">
                        ${umidadeGravimetrica.toFixed(2).replace(".", ",")}% <span class="text-sm font-normal text-muted-foreground">(Ug)</span>
                    </p>
                    <p class="text-xs text-muted-foreground">
                        Massa de água evaporada: ${(mu - ms).toFixed(2).replace(".", ",")} g
                    </p>
                </div>
            `;
            containerResultado.classList.remove("hidden");
        });
    }
});