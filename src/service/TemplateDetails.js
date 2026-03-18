export const templateDetailsMap = {
    "Cardiologia": {
        description: `
            A IA da Vitalfy interpreta a conversa entre médico e paciente e organiza automaticamente a
            anamnese cardiológica, identificando sintomas cardiovasculares, fatores de risco e histórico
            clínico relevante.
        `,

        structure: [
            "Queixa principal",
            "História da doença atual",
            "Sintomas cardiovasculares associados",
            "Características da dor torácica",
            "Fatores de risco cardiovascular",
            "Histórico cardíaco pessoal",
            "Histórico familiar cardiovascular",
            "Medicações em uso",
            "Exames cardíacos realizados ou solicitados",
            "Suspeita diagnóstica (CID)",
            "Conduta e tratamento",
            "Orientações ao paciente"
        ],

        example: `
            <h2><strong>Dor torácica associada a esforço físico</strong></h2>
            <br/>
            <h3><strong>Queixa Principal</strong></h3>
            <p>Paciente relata dor no peito em aperto iniciada há cerca de 3 dias, principalmente ao subir escadas.</p>
            <br/>
            <h3><strong>História da Doença Atual</strong></h3>
            <p>Dor torácica iniciada há três dias, de intensidade moderada, com piora durante esforço físico e melhora ao repouso. Episódios duram aproximadamente 10 minutos.</p>
            <br/>
            <h3><strong>Sintomas Cardiovasculares Associados</strong></h3>
            <p>Paciente refere falta de ar leve durante os episódios e fadiga.</p>
            <br/>
            <h3><strong>Fatores de Risco Cardiovascular</strong></h3>
            <p>Hipertensão arterial e tabagismo há 20 anos.</p>
            <br/>
            <h3><strong>Suspeita Diagnóstica (CID)</strong></h3>
            <ul>
                <li>I20 - Angina pectoris</li>
            </ul>
            <br/>
            <h3><strong>Conduta e Tratamento</strong></h3>
            <p>Solicitado eletrocardiograma e teste ergométrico. Iniciado ajuste da medicação anti-hipertensiva.</p>
            <br/>
            <h3><strong>Orientações ao Paciente</strong></h3>
            <ul>
                <li>Evitar esforços intensos até avaliação completa</li>
                <li>Reduzir consumo de sal</li>
                <li>Retornar após realização dos exames</li>
            </ul>
        `
    },

    "Neurologia": {
        description: "Estrutura voltada para avaliação neurológica detalhada.",
        structure: [
            "Queixa principal",
            "História neurológica",
            "Exame neurológico",
            "Diagnóstico",
            "Conduta"
        ],
        example: `<p>Paciente com cefaleia recorrente há 2 semanas...</p>`
    }
}