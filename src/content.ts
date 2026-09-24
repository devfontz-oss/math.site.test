/**
 * CONTEÚDO DA REVISÃO
 * ---------------------------------------------------------------
 * ESTE É O ÚNICO ARQUIVO QUE VOCÊ PRECISA EDITAR PARA ALTERAR O
 * CONTEÚDO ACADÊMICO DA PLATAFORMA.
 *
 * Conteúdo atual: Matemática — Matrizes, Álgebra Matricial e
 * Geometria Analítica (A.D de 29/09), estruturado a partir do
 * material bruto fornecido.
 *
 * NOTAÇÃO MATEMÁTICA
 * ---------------------------------------------------------------
 * Qualquer texto (teoria, flashcards, questões, alternativas,
 * explicações, tabelas) pode conter matemática usando:
 *   - $...$   → matemática inline, ex: "o elemento $a_{ij}$"
 *   - $$...$$ → matemática em bloco
 * O componente MathText converte isso em notação real via KaTeX.
 * Nunca digite a_ij, x^2, sqrt(x) etc. soltos no texto do usuário.
 * ---------------------------------------------------------------
 */

import type { Review } from "@/lib";

export const review: Review = {
  kicker: "Revisão pra 29/09",
  title: "Revisão de Matemática",
  subtitle: "Matrizes, Álgebra Matricial e Geometria Analítica",
  identifier: "A.D de Matemática — 29/09",
  description:
    "Revisão organizada a partir do conteúdo indicado para a avaliação: matrizes (conceito, classificação, operações e equações matriciais) e geometria analítica (simetria de pontos, distância, ponto médio, baricentro e retas). O conteúdo está dividido em 5 partes, cada uma com teoria, flashcards e questões objetivas, além de uma área de questões discursivas com resolução comentada.",
  studyTips: [
    "Refaça os exemplos calculando você mesmo(a) antes de olhar a resposta — matemática se aprende resolvendo, não só lendo.",
    "Depois de errar uma questão, volte à teoria da mesma parte antes de tentar de novo.",
    "Revise primeiro as classificações de matrizes: elas aparecem como base de quase todo o restante do conteúdo.",
  ],
  parts: [
    // ────────────────────────────────────────────────────────────
    // PARTE 1 — Conceito, Notação e Leis de Formação
    // ────────────────────────────────────────────────────────────
    {
      id: "conceito-e-notacao-de-matrizes",
      number: 1,
      title: "Conceito, Notação e Leis de Formação",
      description:
        "O que é uma matriz, como indicar sua ordem e como montar uma matriz a partir de uma fórmula.",
      icon: "grid",
      objectives: [
        { id: "obj-1", text: "Reconhecer a notação de uma matriz e sua ordem $m \\times n$." },
        { id: "obj-2", text: "Interpretar o significado do elemento genérico $a_{ij}$." },
        { id: "obj-3", text: "Construir uma matriz a partir de uma lei de formação." },
      ],
      theory: [
        { type: "heading", text: "O que é uma matriz?" },
        {
          type: "paragraph",
          text: "Uma matriz é uma tabela organizada em linhas e colunas, usada para reunir números de forma prática. Ela é representada por letras maiúsculas, como $A$, $B$ ou $C$.",
        },
        { type: "definition", term: "Matriz", text: "Tabela organizada em $m$ linhas e $n$ colunas." },

        { type: "heading", text: "Ordem (dimensão) da matriz" },
        {
          type: "paragraph",
          text: "A ordem de uma matriz indica seu tamanho e é escrita como $m \\times n$, sendo $m$ o número de linhas e $n$ o número de colunas.",
        },
        { type: "example", title: "Exemplo", text: "Uma matriz com 4 linhas e 2 colunas tem ordem $4 \\times 2$." },

        { type: "heading", text: "Elemento genérico $a_{ij}$" },
        {
          type: "paragraph",
          text: "Cada posição da matriz é ocupada por um elemento, representado por $a_{ij}$. O índice $i$ indica a linha e o índice $j$ indica a coluna onde esse elemento está.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Lembre-se",
          text: "Em $a_{ij}$: $1 \\leq i \\leq m$ e $1 \\leq j \\leq n$.",
        },

        { type: "heading", text: "Lei de formação de uma matriz" },
        {
          type: "paragraph",
          text: "Uma matriz também pode ser definida por uma fórmula, chamada lei de formação. Para descobrir cada elemento, basta substituir os valores de $i$ (linha) e $j$ (coluna) na fórmula.",
        },
        {
          type: "example",
          title: "Exemplo do material",
          text: "Se $a_{ij} = (2i - j)^2$ em uma matriz $3 \\times 3$, o elemento da linha 2 e coluna 1 é: $a_{21} = (2 \\cdot 2 - 1)^2 = 3^2 = 9$.",
        },
      ],
      flashcards: [
        { id: "fc-1", question: "O que é uma matriz?", answer: "Uma tabela organizada em $m$ linhas e $n$ colunas." },
        {
          id: "fc-2",
          question: "Como se indica a ordem (dimensão) de uma matriz?",
          answer: "Por $m \\times n$, sendo $m$ o número de linhas e $n$ o número de colunas.",
        },
        {
          id: "fc-3",
          question: "O que representa o elemento genérico $a_{ij}$?",
          answer: "O elemento posicionado na linha $i$ e na coluna $j$ da matriz.",
        },
        {
          id: "fc-4",
          question: "Em $a_{ij}$, qual é a condição para os índices $i$ e $j$?",
          answer: "$1 \\leq i \\leq m$ e $1 \\leq j \\leq n$.",
        },
        {
          id: "fc-5",
          question: "Como se calcula um elemento a partir de uma lei de formação?",
          answer: "Substituindo os valores de $i$ (linha) e $j$ (coluna) na fórmula dada.",
        },
        {
          id: "fc-6",
          question: "Como as matrizes costumam ser representadas (nomeadas)?",
          answer: "Por letras maiúsculas, como $A$, $B$ e $C$.",
        },
        {
          id: "fc-7",
          question: "Quantos elementos tem uma matriz de ordem $m \\times n$?",
          answer: "$m \\cdot n$ elementos ($m$ linhas com $n$ elementos cada).",
        },
      ],
      questions: [
        {
          id: "q-1",
          statement: "Uma matriz possui 4 linhas e 2 colunas. Qual é a sua ordem?",
          alternatives: [
            { id: "a", text: "$4 \\times 2$" },
            { id: "b", text: "$2 \\times 4$" },
            { id: "c", text: "$8 \\times 1$" },
            { id: "d", text: "$6 \\times 1$" },
          ],
          correctAlternativeId: "a",
          explanation:
            "A ordem de uma matriz é indicada por $m \\times n$, sendo $m$ o número de linhas e $n$ o número de colunas: aqui, $4 \\times 2$.",
        },
        {
          id: "q-2",
          statement: "Em uma matriz $A$, o elemento $a_{32}$ representa:",
          alternatives: [
            { id: "a", text: "O elemento da linha 2 e coluna 3." },
            { id: "b", text: "O elemento da linha 3 e coluna 2." },
            { id: "c", text: "O produto entre a linha 3 e a coluna 2." },
            { id: "d", text: "O total de elementos da linha 3." },
          ],
          correctAlternativeId: "b",
          explanation:
            "Por definição, em $a_{ij}$, o índice $i$ indica a linha e $j$ indica a coluna. Logo, $a_{32}$ está na linha 3, coluna 2.",
        },
        {
          id: "q-3",
          statement:
            "Em uma matriz $3 \\times 3$ definida pela lei $a_{ij} = (2i - j)^2$, qual é o valor de $a_{12}$?",
          alternatives: [
            { id: "a", text: "$0$" },
            { id: "b", text: "$1$" },
            { id: "c", text: "$4$" },
            { id: "d", text: "$9$" },
          ],
          correctAlternativeId: "a",
          explanation: "$a_{12} = (2 \\cdot 1 - 2)^2 = 0^2 = 0$.",
        },
        {
          id: "q-4",
          statement: "Quantos elementos possui uma matriz de ordem $3 \\times 4$?",
          alternatives: [
            { id: "a", text: "$7$" },
            { id: "b", text: "$9$" },
            { id: "c", text: "$12$" },
            { id: "d", text: "$16$" },
          ],
          correctAlternativeId: "c",
          explanation:
            "A ordem $3 \\times 4$ indica 3 linhas e 4 colunas. Cada linha tem 4 elementos, então o total é $3 \\cdot 4 = 12$. (Somar $3 + 4 = 7$ é um erro comum.)",
        },
        {
          id: "q-5",
          statement: "Em uma matriz $A$ de ordem $2 \\times 3$, definida por $a_{ij} = i + j$, qual é o valor de $a_{23}$?",
          alternatives: [
            { id: "a", text: "$2$" },
            { id: "b", text: "$3$" },
            { id: "c", text: "$4$" },
            { id: "d", text: "$5$" },
          ],
          correctAlternativeId: "d",
          explanation: "Em $a_{23}$, temos $i = 2$ (linha) e $j = 3$ (coluna). Substituindo na lei: $a_{23} = 2 + 3 = 5$.",
        },
        {
          id: "q-6",
          statement:
            "Considere a matriz $A = \\begin{bmatrix}4 & 7 & 1\\\\0 & 5 & 9\\end{bmatrix}$. Qual é o elemento $a_{13}$?",
          alternatives: [
            { id: "a", text: "$7$" },
            { id: "b", text: "$0$" },
            { id: "c", text: "$1$" },
            { id: "d", text: "$9$" },
          ],
          correctAlternativeId: "c",
          explanation:
            "$a_{13}$ está na linha 1 e na coluna 3. A linha 1 é $(4, 7, 1)$, e o terceiro elemento dela é $1$. Cuidado para não inverter linha e coluna.",
        },
        {
          id: "q-7",
          statement: "Construa a matriz $A = (a_{ij})$ de ordem $2 \\times 2$ com $a_{ij} = 2i - j$. Qual é a matriz obtida?",
          alternatives: [
            { id: "a", text: "$\\begin{bmatrix}1 & 3\\\\0 & 2\\end{bmatrix}$" },
            { id: "b", text: "$\\begin{bmatrix}1 & 0\\\\3 & 2\\end{bmatrix}$" },
            { id: "c", text: "$\\begin{bmatrix}0 & 1\\\\2 & 3\\end{bmatrix}$" },
            { id: "d", text: "$\\begin{bmatrix}1 & 2\\\\3 & 4\\end{bmatrix}$" },
          ],
          correctAlternativeId: "b",
          explanation:
            "$a_{11} = 2 - 1 = 1$, $a_{12} = 2 - 2 = 0$, $a_{21} = 4 - 1 = 3$ e $a_{22} = 4 - 2 = 2$. Logo, $A = \\begin{bmatrix}1 & 0\\\\3 & 2\\end{bmatrix}$.",
        },
      ],
      videos: [],
    },

    // ────────────────────────────────────────────────────────────
    // PARTE 2 — Classificação das Matrizes
    // ────────────────────────────────────────────────────────────
    {
      id: "classificacao-das-matrizes",
      number: 2,
      title: "Classificação das Matrizes",
      description:
        "Os principais tipos de matrizes — quadrada, diagonal, identidade, transposta, simétrica e outras.",
      icon: "scale",
      objectives: [
        { id: "obj-1", text: "Diferenciar matriz quadrada de matriz retangular." },
        { id: "obj-2", text: "Identificar matriz linha, matriz coluna e matriz nula." },
        { id: "obj-3", text: "Reconhecer matriz diagonal e matriz identidade ($I_n$)." },
        { id: "obj-4", text: "Calcular a matriz oposta e a matriz transposta ($A^t$) de uma matriz dada." },
        { id: "obj-5", text: "Verificar se uma matriz quadrada é simétrica ($A^t = A$)." },
      ],
      theory: [
        { type: "heading", text: "Tipos de matrizes" },
        {
          type: "paragraph",
          text: "As matrizes podem ser classificadas de acordo com sua forma e com os valores de seus elementos. Conhecer essas classificações ajuda a identificar rapidamente as propriedades de uma matriz.",
        },
        {
          type: "table",
          headers: ["Tipo", "Definição"],
          rows: [
            ["Matriz quadrada", "Número de linhas igual ao número de colunas ($m = n$)."],
            ["Matriz retangular", "Número de linhas diferente do número de colunas ($m \\neq n$)."],
            ["Matriz linha", "Possui apenas uma linha ($1 \\times n$)."],
            ["Matriz coluna", "Possui apenas uma coluna ($m \\times 1$)."],
            ["Matriz nula", "Todos os elementos são iguais a zero."],
            [
              "Matriz diagonal",
              "Matriz quadrada em que todos os elementos fora da diagonal principal são zero ($a_{ij} = 0$ para $i \\neq j$).",
            ],
            ["Matriz identidade ($I_n$)", "Matriz quadrada com 1 em toda a diagonal principal e 0 nas demais posições."],
            ["Matriz oposta ($-A$)", "Obtida trocando o sinal de todos os elementos de $A$."],
            ["Matriz transposta ($A^t$)", "Obtida trocando ordenadamente as linhas pelas colunas de $A$."],
            ["Matriz simétrica", "Matriz quadrada em que $A^t = A$, ou seja, $a_{ij} = a_{ji}$."],
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "Propriedade da transposta",
          text: "$(A^t)^t = A$ — transpor uma matriz duas vezes devolve a matriz original.",
        },
        { type: "heading", text: "Transposta na prática" },
        {
          type: "example",
          title: "Exemplo",
          text: "Se $A = \\begin{bmatrix}2 & 5\\\\1 & 3\\end{bmatrix}$, então $A^t = \\begin{bmatrix}2 & 1\\\\5 & 3\\end{bmatrix}$ — a primeira linha de $A$ vira a primeira coluna de $A^t$.",
        },
      ],
      flashcards: [
        {
          id: "fc-1",
          question: "Quando uma matriz é chamada quadrada?",
          answer: "Quando o número de linhas é igual ao número de colunas ($m = n$).",
        },
        { id: "fc-2", question: "O que caracteriza uma matriz retangular?", answer: "$m \\neq n$ (linhas diferente de colunas)." },
        { id: "fc-3", question: "O que é uma matriz linha?", answer: "Uma matriz com apenas uma linha ($1 \\times n$)." },
        { id: "fc-4", question: "O que é uma matriz coluna?", answer: "Uma matriz com apenas uma coluna ($m \\times 1$)." },
        { id: "fc-5", question: "O que define uma matriz nula?", answer: "Todos os elementos são iguais a zero." },
        {
          id: "fc-6",
          question: "O que caracteriza uma matriz diagonal?",
          answer: "Matriz quadrada em que todos os elementos fora da diagonal principal são zero.",
        },
        {
          id: "fc-7",
          question: "O que é a matriz identidade $I_n$?",
          answer: "Matriz quadrada com 1 na diagonal principal e 0 nas demais posições.",
        },
        { id: "fc-8", question: "Como se obtém a matriz oposta $-A$?", answer: "Trocando o sinal de todos os elementos de $A$." },
        {
          id: "fc-9",
          question: "O que é a matriz transposta $A^t$?",
          answer: "A matriz obtida trocando ordenadamente as linhas pelas colunas de $A$.",
        },
        {
          id: "fc-10",
          question: "Quando uma matriz quadrada é simétrica?",
          answer: "Quando $A^t = A$, ou seja, $a_{ij} = a_{ji}$ para todas as posições.",
        },
      ],
      questions: [
        {
          id: "q-1",
          statement: "Uma matriz possui 3 linhas e 3 colunas. Ela é classificada como:",
          alternatives: [
            { id: "a", text: "Retangular" },
            { id: "b", text: "Linha" },
            { id: "c", text: "Quadrada" },
            { id: "d", text: "Nula" },
          ],
          correctAlternativeId: "c",
          explanation: "Uma matriz é quadrada quando o número de linhas é igual ao número de colunas ($m = n$); aqui, $3 = 3$.",
        },
        {
          id: "q-2",
          statement: "Em uma matriz diagonal, os elementos fora da diagonal principal são:",
          alternatives: [
            { id: "a", text: "Iguais entre si" },
            { id: "b", text: "Sempre iguais a 1" },
            { id: "c", text: "Sempre iguais a zero" },
            { id: "d", text: "Iguais aos elementos da diagonal" },
          ],
          correctAlternativeId: "c",
          explanation: "Por definição, na matriz diagonal $a_{ij} = 0$ para $i \\neq j$.",
        },
        {
          id: "q-3",
          statement: "Seja $A = \\begin{bmatrix}2 & 5\\\\1 & 3\\end{bmatrix}$. Qual é a matriz transposta $A^t$?",
          alternatives: [
            { id: "a", text: "$\\begin{bmatrix}2 & 1\\\\5 & 3\\end{bmatrix}$" },
            { id: "b", text: "$\\begin{bmatrix}2 & 5\\\\1 & 3\\end{bmatrix}$" },
            { id: "c", text: "$\\begin{bmatrix}-2 & -5\\\\-1 & -3\\end{bmatrix}$" },
            { id: "d", text: "$\\begin{bmatrix}3 & 1\\\\5 & 2\\end{bmatrix}$" },
          ],
          correctAlternativeId: "a",
          explanation:
            "Na transposta, a linha 1 de $A$ ($2, 5$) vira a coluna 1 de $A^t$ e a linha 2 de $A$ ($1, 3$) vira a coluna 2 de $A^t$, resultando em $\\begin{bmatrix}2 & 1\\\\5 & 3\\end{bmatrix}$.",
        },
        {
          id: "q-4",
          statement: "Uma matriz quadrada $A$ é simétrica quando:",
          alternatives: [
            { id: "a", text: "$A = -A$" },
            { id: "b", text: "$A^t = A$" },
            { id: "c", text: "$A^2 = I$" },
            { id: "d", text: "$A = I_n$" },
          ],
          correctAlternativeId: "b",
          explanation: "A definição de matriz simétrica é $A^t = A$, ou seja, $a_{ij} = a_{ji}$ para todas as posições.",
        },
        {
          id: "q-5",
          statement: "Na matriz identidade $I_3$, o valor do elemento $a_{23}$ é:",
          alternatives: [
            { id: "a", text: "$0$" },
            { id: "b", text: "$1$" },
            { id: "c", text: "$2$" },
            { id: "d", text: "$3$" },
          ],
          correctAlternativeId: "a",
          explanation: "Na matriz identidade, $a_{ij} = 1$ apenas quando $i = j$. Como $2 \\neq 3$, $a_{23} = 0$.",
        },
        {
          id: "q-6",
          statement: "Qual das matrizes abaixo é uma matriz coluna?",
          alternatives: [
            { id: "a", text: "$\\begin{bmatrix}1 & 2 & 3\\end{bmatrix}$" },
            { id: "b", text: "$\\begin{bmatrix}1 & 0\\\\0 & 1\\end{bmatrix}$" },
            { id: "c", text: "$\\begin{bmatrix}0 & 0\\\\0 & 0\\end{bmatrix}$" },
            { id: "d", text: "$\\begin{bmatrix}4\\\\5\\\\6\\end{bmatrix}$" },
          ],
          correctAlternativeId: "d",
          explanation:
            "A matriz coluna tem apenas uma coluna (ordem $m \\times 1$). A alternativa D tem ordem $3 \\times 1$. A alternativa A é uma matriz linha, a B é a identidade $I_2$ e a C é uma matriz nula.",
        },
        {
          id: "q-7",
          statement: "Qual é a matriz oposta de $A = \\begin{bmatrix}3 & -1\\\\0 & 2\\end{bmatrix}$?",
          alternatives: [
            { id: "a", text: "$\\begin{bmatrix}3 & 0\\\\-1 & 2\\end{bmatrix}$" },
            { id: "b", text: "$\\begin{bmatrix}-3 & 1\\\\0 & -2\\end{bmatrix}$" },
            { id: "c", text: "$\\begin{bmatrix}-3 & -1\\\\0 & -2\\end{bmatrix}$" },
            { id: "d", text: "$\\begin{bmatrix}-3 & 1\\\\0 & 2\\end{bmatrix}$" },
          ],
          correctAlternativeId: "b",
          explanation:
            "A oposta $-A$ é obtida trocando o sinal de todos os elementos: $3 \\to -3$, $-1 \\to 1$, $0 \\to 0$ e $2 \\to -2$. A alternativa A é a transposta, não a oposta.",
        },
      ],
      videos: [],
    },

    // ────────────────────────────────────────────────────────────
    // PARTE 3 — Operações e Equações Matriciais
    // ────────────────────────────────────────────────────────────
    {
      id: "operacoes-e-equacoes-matriciais",
      number: 3,
      title: "Operações e Equações Matriciais",
      description: "Igualdade, adição, subtração e resolução de equações com matrizes.",
      icon: "sigma",
      objectives: [
        { id: "obj-1", text: "Aplicar a condição de igualdade entre matrizes para determinar valores desconhecidos." },
        { id: "obj-2", text: "Somar e subtrair matrizes de mesma ordem." },
        { id: "obj-3", text: "Resolver equações matriciais isolando a matriz incógnita." },
      ],
      theory: [
        { type: "heading", text: "Igualdade de matrizes" },
        {
          type: "paragraph",
          text: "Duas matrizes de mesma ordem são iguais quando todos os seus elementos correspondentes são iguais.",
        },
        { type: "formula", text: "a_{ij} = b_{ij}" },

        { type: "heading", text: "Adição e subtração de matrizes" },
        {
          type: "paragraph",
          text: "Para somar ou subtrair duas matrizes de mesma ordem, basta somar ou subtrair os elementos que ocupam a mesma posição em cada uma delas.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "Atenção",
          text: "Só é possível somar ou subtrair matrizes que tenham exatamente a mesma ordem.",
        },
        {
          type: "example",
          title: "Exemplo",
          text: "Se $A = \\begin{bmatrix}1 & 2\\\\3 & 4\\end{bmatrix}$ e $B = \\begin{bmatrix}5 & 6\\\\7 & 8\\end{bmatrix}$, então $A + B = \\begin{bmatrix}6 & 8\\\\10 & 12\\end{bmatrix}$.",
        },

        { type: "heading", text: "Equações matriciais" },
        {
          type: "paragraph",
          text: "Em uma equação com uma matriz incógnita, como $2X - I_3 = B$, o objetivo é isolar $X$, operando com as matrizes dadas passo a passo — da mesma forma que se resolve uma equação numérica.",
        },
        {
          type: "example",
          title: "Exemplo",
          text: "Se $2X - I_2 = A$, então $2X = A + I_2$ e, em seguida, $X = \\dfrac{A + I_2}{2}$.",
        },
      ],
      flashcards: [
        {
          id: "fc-1",
          question: "Quando duas matrizes de mesma ordem são iguais?",
          answer: "Quando todos os elementos correspondentes são iguais ($a_{ij} = b_{ij}$).",
        },
        {
          id: "fc-2",
          question: "Como se soma ou subtrai duas matrizes de mesma ordem?",
          answer: "Somando ou subtraindo os elementos das posições correspondentes.",
        },
        {
          id: "fc-3",
          question: "Qual é a condição necessária para somar ou subtrair duas matrizes?",
          answer: "Elas precisam ter a mesma ordem (mesmo número de linhas e colunas).",
        },
        {
          id: "fc-4",
          question: "Como se resolve uma equação matricial como $2X - I_3 = B$?",
          answer: "Isola-se a matriz incógnita $X$, operando com as matrizes dadas passo a passo.",
        },
        {
          id: "fc-5",
          question: "Como se calcula a diferença $A - B$ entre duas matrizes de mesma ordem?",
          answer: "Subtraindo cada elemento de $B$ do elemento correspondente de $A$: $a_{ij} - b_{ij}$.",
        },
        {
          id: "fc-6",
          question: "Em $2X - I_3 = B$, qual é o primeiro passo para isolar $X$?",
          answer: "Somar $I_3$ aos dois lados, obtendo $2X = B + I_3$.",
        },
        {
          id: "fc-7",
          question: "Na igualdade de matrizes com incógnitas, como se encontram os valores desconhecidos?",
          answer: "Igualando os elementos de mesma posição ($a_{ij} = b_{ij}$) e resolvendo as equações obtidas.",
        },
      ],
      questions: [
        {
          id: "q-1",
          statement:
            "Considere as matrizes $A = \\begin{bmatrix}1 & 2\\\\3 & 4\\end{bmatrix}$ e $B = \\begin{bmatrix}5 & 6\\\\7 & 8\\end{bmatrix}$. Qual é o resultado de $A + B$?",
          alternatives: [
            { id: "a", text: "$\\begin{bmatrix}6 & 8\\\\10 & 12\\end{bmatrix}$" },
            { id: "b", text: "$\\begin{bmatrix}-4 & -4\\\\-4 & -4\\end{bmatrix}$" },
            { id: "c", text: "$\\begin{bmatrix}5 & 12\\\\21 & 32\\end{bmatrix}$" },
            { id: "d", text: "$\\begin{bmatrix}6 & 8\\\\10 & 8\\end{bmatrix}$" },
          ],
          correctAlternativeId: "a",
          explanation:
            "Somando os elementos correspondentes: $1+5=6$, $2+6=8$, $3+7=10$, $4+8=12$, resultando em $\\begin{bmatrix}6 & 8\\\\10 & 12\\end{bmatrix}$.",
        },
        {
          id: "q-2",
          statement:
            "As matrizes $A = \\begin{bmatrix}x & 4\\\\2 & y\\end{bmatrix}$ e $B = \\begin{bmatrix}3 & 4\\\\2 & 5\\end{bmatrix}$ são iguais. Qual é o valor de $x + y$?",
          alternatives: [
            { id: "a", text: "$7$" },
            { id: "b", text: "$8$" },
            { id: "c", text: "$9$" },
            { id: "d", text: "$15$" },
          ],
          correctAlternativeId: "b",
          explanation:
            "Para que $A = B$, cada elemento correspondente deve ser igual: $x = 3$ e $y = 5$. Logo, $x + y = 8$.",
        },
        {
          id: "q-3",
          statement: "Para que a soma $A + B$ seja possível, é necessário que:",
          alternatives: [
            { id: "a", text: "$A$ e $B$ sejam quadradas" },
            { id: "b", text: "$A$ e $B$ tenham a mesma ordem" },
            { id: "c", text: "$A$ e $B$ tenham o mesmo número de linhas apenas" },
            { id: "d", text: "$A$ e $B$ sejam simétricas" },
          ],
          correctAlternativeId: "b",
          explanation: "A adição (ou subtração) de matrizes só é definida quando as duas matrizes têm a mesma ordem.",
        },
        {
          id: "q-4",
          statement: "Se $A = \\begin{bmatrix}5 & 2\\\\0 & 7\\end{bmatrix}$ e $2X - I_2 = A$, qual é a matriz $X$?",
          alternatives: [
            { id: "a", text: "$\\begin{bmatrix}3 & 1\\\\0 & 4\\end{bmatrix}$" },
            { id: "b", text: "$\\begin{bmatrix}2 & 1\\\\0 & 3\\end{bmatrix}$" },
            { id: "c", text: "$\\begin{bmatrix}6 & 2\\\\0 & 8\\end{bmatrix}$" },
            { id: "d", text: "$\\begin{bmatrix}3 & 2\\\\0 & 4\\end{bmatrix}$" },
          ],
          correctAlternativeId: "a",
          explanation:
            "Isolando $X$: $2X = A + I_2 = \\begin{bmatrix}6 & 2\\\\0 & 8\\end{bmatrix}$, logo $X = \\begin{bmatrix}3 & 1\\\\0 & 4\\end{bmatrix}$.",
        },
        {
          id: "q-5",
          statement:
            "Sendo $A = \\begin{bmatrix}7 & 3\\\\-2 & 5\\end{bmatrix}$ e $B = \\begin{bmatrix}4 & 1\\\\3 & -2\\end{bmatrix}$, qual é o resultado de $A - B$?",
          alternatives: [
            { id: "a", text: "$\\begin{bmatrix}11 & 4\\\\1 & 3\\end{bmatrix}$" },
            { id: "b", text: "$\\begin{bmatrix}-3 & -2\\\\5 & -7\\end{bmatrix}$" },
            { id: "c", text: "$\\begin{bmatrix}3 & 2\\\\-5 & 7\\end{bmatrix}$" },
            { id: "d", text: "$\\begin{bmatrix}3 & 2\\\\1 & 7\\end{bmatrix}$" },
          ],
          correctAlternativeId: "c",
          explanation:
            "Subtraindo posição por posição: $7 - 4 = 3$, $3 - 1 = 2$, $-2 - 3 = -5$ e $5 - (-2) = 7$. A alternativa A é $A + B$ e a B é $B - A$.",
        },
        {
          id: "q-6",
          statement:
            "Sejam $A = \\begin{bmatrix}2x & 5\\\\1 & y + 3\\end{bmatrix}$ e $B = \\begin{bmatrix}8 & 5\\\\1 & 10\\end{bmatrix}$. Se $A = B$, qual é o valor de $x \\cdot y$?",
          alternatives: [
            { id: "a", text: "$11$" },
            { id: "b", text: "$21$" },
            { id: "c", text: "$32$" },
            { id: "d", text: "$28$" },
          ],
          correctAlternativeId: "d",
          explanation:
            "Igualando os elementos correspondentes: $2x = 8 \\Rightarrow x = 4$ e $y + 3 = 10 \\Rightarrow y = 7$. Logo, $x \\cdot y = 4 \\cdot 7 = 28$.",
        },
        {
          id: "q-7",
          statement:
            "Resolva a equação matricial $X + A = B$, sendo $A = \\begin{bmatrix}1 & 2\\\\3 & 4\\end{bmatrix}$ e $B = \\begin{bmatrix}5 & 5\\\\5 & 5\\end{bmatrix}$.",
          alternatives: [
            { id: "a", text: "$X = \\begin{bmatrix}6 & 7\\\\8 & 9\\end{bmatrix}$" },
            { id: "b", text: "$X = \\begin{bmatrix}-4 & -3\\\\-2 & -1\\end{bmatrix}$" },
            { id: "c", text: "$X = \\begin{bmatrix}4 & 3\\\\2 & 1\\end{bmatrix}$" },
            { id: "d", text: "$X = \\begin{bmatrix}4 & 2\\\\3 & 1\\end{bmatrix}$" },
          ],
          correctAlternativeId: "c",
          explanation:
            "Isolando $X$: $X = B - A$. Subtraindo posição por posição: $5 - 1 = 4$, $5 - 2 = 3$, $5 - 3 = 2$ e $5 - 4 = 1$.",
        },
      ],
      videos: [],
    },

    // ────────────────────────────────────────────────────────────
    // PARTE 4 — Geometria Analítica: Pontos e Simetrias
    // ────────────────────────────────────────────────────────────
    {
      id: "geometria-analitica-pontos-e-simetrias",
      number: 4,
      title: "Geometria Analítica: Pontos e Simetrias",
      description: "Simetrias no plano cartesiano, distância entre pontos e ponto médio de um segmento.",
      icon: "compass",
      objectives: [
        { id: "obj-1", text: "Determinar o simétrico de um ponto em relação aos eixos, à origem e às bissetrizes." },
        { id: "obj-2", text: "Calcular a distância entre dois pontos no plano cartesiano." },
        { id: "obj-3", text: "Calcular as coordenadas do ponto médio de um segmento." },
      ],
      theory: [
        { type: "heading", text: "Simetria de pontos no plano cartesiano" },
        {
          type: "paragraph",
          text: "A simetria de um ponto $P(x, y)$ muda o sinal e/ou a ordem de suas coordenadas, dependendo do eixo ou reta de referência.",
        },
        {
          type: "table",
          headers: ["Simetria em relação a", "Transformação"],
          rows: [
            ["Eixo $x$ ($Ox$)", "$(x, y) \\to (x, -y)$"],
            ["Eixo $y$ ($Oy$)", "$(x, y) \\to (-x, y)$"],
            ["Origem $(0,0)$", "$(x, y) \\to (-x, -y)$"],
            ["1ª bissetriz ($y = x$)", "$(x, y) \\to (y, x)$"],
            ["2ª bissetriz ($y = -x$)", "$(x, y) \\to (-y, -x)$"],
          ],
        },

        { type: "heading", text: "Distância entre dois pontos" },
        {
          type: "paragraph",
          text: "A distância $d_{AB}$ entre os pontos $A(x_A, y_A)$ e $B(x_B, y_B)$ deriva do Teorema de Pitágoras, aplicado às diferenças entre as coordenadas dos dois pontos.",
        },
        {
          type: "formula",
          text: "d_{AB} = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}",
          caption: "Derivada do Teorema de Pitágoras.",
        },

        { type: "heading", text: "Ponto médio de um segmento" },
        {
          type: "paragraph",
          text: "As coordenadas do ponto médio $M$ de um segmento com extremidades $A(x_A, y_A)$ e $B(x_B, y_B)$ são calculadas pela média aritmética das coordenadas.",
        },
        {
          type: "formula",
          text: "M = \\left(\\dfrac{x_A + x_B}{2}, \\dfrac{y_A + y_B}{2}\\right)",
          caption: "Média aritmética das coordenadas dos extremos.",
        },
      ],
      flashcards: [
        {
          id: "fc-1",
          question: "Qual é o simétrico do ponto $P(x, y)$ em relação ao eixo $x$?",
          answer: "$(x, -y)$.",
        },
        {
          id: "fc-2",
          question: "Qual é o simétrico do ponto $P(x, y)$ em relação ao eixo $y$?",
          answer: "$(-x, y)$.",
        },
        {
          id: "fc-3",
          question: "Qual é o simétrico do ponto $P(x, y)$ em relação à origem?",
          answer: "$(-x, -y)$.",
        },
        {
          id: "fc-4",
          question: "Qual é o simétrico de $P(x, y)$ em relação à 1ª bissetriz ($y = x$)?",
          answer: "$(y, x)$.",
        },
        {
          id: "fc-5",
          question: "Qual é o simétrico de $P(x, y)$ em relação à 2ª bissetriz ($y = -x$)?",
          answer: "$(-y, -x)$.",
        },
        {
          id: "fc-6",
          question: "Em que teorema se baseia a fórmula da distância entre dois pontos?",
          answer: "No Teorema de Pitágoras.",
        },
        {
          id: "fc-7",
          question: "Como se calculam as coordenadas do ponto médio de um segmento?",
          answer: "Pela média aritmética das coordenadas dos extremos.",
        },
      ],
      questions: [
        {
          id: "q-1",
          statement: "Qual é o simétrico do ponto $P(4, -3)$ em relação ao eixo $y$?",
          alternatives: [
            { id: "a", text: "$(4, 3)$" },
            { id: "b", text: "$(-4, -3)$" },
            { id: "c", text: "$(-4, 3)$" },
            { id: "d", text: "$(-3, 4)$" },
          ],
          correctAlternativeId: "b",
          explanation:
            "A simetria em relação ao eixo $y$ troca o sinal da coordenada $x$, mantendo $y$: $(x, y) \\to (-x, y)$. Assim, $P(4, -3) \\to (-4, -3)$.",
        },
        {
          id: "q-2",
          statement: "A simetria de um ponto em relação à origem inverte:",
          alternatives: [
            { id: "a", text: "Apenas a coordenada $x$" },
            { id: "b", text: "Apenas a coordenada $y$" },
            { id: "c", text: "As duas coordenadas" },
            { id: "d", text: "Nenhuma coordenada" },
          ],
          correctAlternativeId: "c",
          explanation: "Na simetria em relação à origem, $(x, y) \\to (-x, -y)$: o sinal das duas coordenadas é invertido.",
        },
        {
          id: "q-3",
          statement: "Qual é a distância entre os pontos $A(1, 2)$ e $B(4, 6)$?",
          alternatives: [
            { id: "a", text: "$5$" },
            { id: "b", text: "$7$" },
            { id: "c", text: "$\\sqrt{13}$" },
            { id: "d", text: "$25$" },
          ],
          correctAlternativeId: "a",
          explanation: "$d_{AB} = \\sqrt{(4-1)^2 + (6-2)^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$.",
        },
        {
          id: "q-4",
          statement: "Qual é o ponto médio do segmento com extremidades $A(2, -3)$ e $B(6, 5)$?",
          alternatives: [
            { id: "a", text: "$(4, 1)$" },
            { id: "b", text: "$(8, 2)$" },
            { id: "c", text: "$(2, 4)$" },
            { id: "d", text: "$(4, -1)$" },
          ],
          correctAlternativeId: "a",
          explanation: "$M = \\left(\\dfrac{2+6}{2}, \\dfrac{-3+5}{2}\\right) = (4, 1)$.",
        },
        {
          id: "q-5",
          statement: "Qual é o simétrico do ponto $P(2, 5)$ em relação à 1ª bissetriz ($y = x$)?",
          alternatives: [
            { id: "a", text: "$(2, -5)$" },
            { id: "b", text: "$(-2, 5)$" },
            { id: "c", text: "$(-5, -2)$" },
            { id: "d", text: "$(5, 2)$" },
          ],
          correctAlternativeId: "d",
          explanation:
            "Na simetria em relação à 1ª bissetriz, inverte-se a ordem das coordenadas: $(x, y) \\to (y, x)$. Assim, $P(2, 5) \\to (5, 2)$. A alternativa C seria a simetria em relação à 2ª bissetriz.",
        },
        {
          id: "q-6",
          statement: "O ponto $Q(-3, 4)$ é refletido em relação ao eixo $x$. Quais são as coordenadas do ponto obtido?",
          alternatives: [
            { id: "a", text: "$(3, 4)$" },
            { id: "b", text: "$(-3, -4)$" },
            { id: "c", text: "$(3, -4)$" },
            { id: "d", text: "$(4, -3)$" },
          ],
          correctAlternativeId: "b",
          explanation:
            "A simetria em relação ao eixo $x$ troca apenas o sinal da coordenada $y$: $(x, y) \\to (x, -y)$. Assim, $Q(-3, 4) \\to (-3, -4)$.",
        },
        {
          id: "q-7",
          statement: "Qual é a distância entre os pontos $A(-2, 1)$ e $B(4, 9)$?",
          alternatives: [
            { id: "a", text: "$14$" },
            { id: "b", text: "$8$" },
            { id: "c", text: "$10$" },
            { id: "d", text: "$100$" },
          ],
          correctAlternativeId: "c",
          explanation:
            "$d_{AB} = \\sqrt{(4 - (-2))^2 + (9 - 1)^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$. A alternativa D esquece de tirar a raiz quadrada.",
        },
      ],
      videos: [],
    },

    // ────────────────────────────────────────────────────────────
    // PARTE 5 — Geometria Analítica: Baricentro e Retas
    // ────────────────────────────────────────────────────────────
    {
      id: "geometria-analitica-baricentro-e-retas",
      number: 5,
      title: "Geometria Analítica: Baricentro e Retas",
      description: "Cálculo do baricentro de um triângulo e verificação de pontos pertencentes a uma reta.",
      icon: "pen-line",
      objectives: [
        { id: "obj-1", text: "Calcular as coordenadas do baricentro de um triângulo." },
        { id: "obj-2", text: "Verificar se um ponto pertence a uma reta a partir de sua equação." },
      ],
      theory: [
        { type: "heading", text: "Baricentro de um triângulo" },
        {
          type: "paragraph",
          text: "O baricentro $G$ é o centro de gravidade do triângulo — o ponto de encontro de suas três medianas.",
        },
        {
          type: "formula",
          text: "G = \\left(\\dfrac{x_A + x_B + x_C}{3}, \\dfrac{y_A + y_B + y_C}{3}\\right)",
          caption: "Média aritmética das coordenadas dos três vértices.",
        },

        { type: "heading", text: "Pontos e a equação de uma reta" },
        {
          type: "paragraph",
          text: "Para verificar se um ponto $P(x_0, y_0)$ pertence a uma reta do tipo $ax + by = c$, basta substituir $x = x_0$ e $y = y_0$ na equação. Se a igualdade for satisfeita, o ponto pertence à reta.",
        },
        {
          type: "example",
          title: "Exemplo",
          text: "Na reta $x + y = 5$, o ponto $(2, 3)$ pertence a ela, pois $2 + 3 = 5$.",
        },

        { type: "heading", text: "Exemplos de questões" },
        {
          type: "table",
          headers: ["Tipo de questão", "Conceito exigido", "Procedimento"],
          rows: [
            [
              "Construção de matriz e transposta",
              "Lei de formação $a_{ij}$ e transposição",
              "Monte a matriz genérica, aplique a lei em cada posição e inverta linhas por colunas.",
            ],
            [
              "Igualdade matricial",
              "Sistemas de equações",
              "Iguale os elementos na mesma posição ($a_{ij} = b_{ij}$) para calcular os valores das incógnitas.",
            ],
            [
              "Matriz aplicada / tabelas",
              "Leitura de dados $a_{ij}$ e média",
              "Identifique a linha $i$ e a coluna $j$ correspondentes no enunciado e efetue a média aritmética solicitada.",
            ],
            [
              "Trajetos e geometria analítica",
              "Distância entre pontos e baricentro",
              "Calcule a distância de cada trecho ($d = d_1 + d_2$) usando a fórmula da distância e a média das 3 coordenadas para o baricentro.",
            ],
            [
              "Pontos sobre uma reta",
              "Pertencimento de ponto a reta",
              "Substitua as coordenadas do ponto na equação da reta e confirme se a igualdade é satisfeita.",
            ],
          ],
        },
      ],
      flashcards: [
        {
          id: "fc-1",
          question: "O que representa o baricentro de um triângulo?",
          answer: "O centro de gravidade do triângulo, ponto de encontro das três medianas.",
        },
        {
          id: "fc-2",
          question: "Como se calculam as coordenadas do baricentro $G$ a partir dos vértices $A$, $B$ e $C$?",
          answer: "Pela média aritmética das três coordenadas $x$ e das três coordenadas $y$.",
        },
        {
          id: "fc-3",
          question: "Como verificar se um ponto $P(x_0, y_0)$ pertence a uma reta $ax + by = c$?",
          answer:
            "Substituindo $x = x_0$ e $y = y_0$ na equação; se a igualdade for satisfeita, o ponto pertence à reta.",
        },
        {
          id: "fc-4",
          question: "Se, ao substituir as coordenadas de um ponto na equação da reta, a igualdade não for satisfeita, o que se conclui?",
          answer: "Que o ponto não pertence à reta.",
        },
        {
          id: "fc-5",
          question: "Sabendo que $P(m, y_0)$ pertence a uma reta, como encontrar o valor de $m$?",
          answer: "Substituindo as coordenadas de $P$ na equação da reta e resolvendo a equação para $m$.",
        },
        {
          id: "fc-6",
          question: "Como se calcula a distância total de um trajeto $A \\to B \\to C$?",
          answer: "Somando as distâncias de cada trecho: $d = d_{AB} + d_{BC}$.",
        },
        {
          id: "fc-7",
          question: "Em uma tabela representada por uma matriz, como se localiza o dado $a_{ij}$?",
          answer: "Identificando a linha $i$ e a coluna $j$ correspondentes no enunciado.",
        },
      ],
      questions: [
        {
          id: "q-1",
          statement: "O baricentro de um triângulo é o ponto de encontro de suas:",
          alternatives: [
            { id: "a", text: "Alturas" },
            { id: "b", text: "Medianas" },
            { id: "c", text: "Bissetrizes" },
            { id: "d", text: "Mediatrizes" },
          ],
          correctAlternativeId: "b",
          explanation: "O material define o baricentro como o centro de gravidade do triângulo, ponto de encontro das três medianas.",
        },
        {
          id: "q-2",
          statement: "Qual é o baricentro do triângulo com vértices $A(0,0)$, $B(6,0)$ e $C(3,9)$?",
          alternatives: [
            { id: "a", text: "$(3, 3)$" },
            { id: "b", text: "$(9, 9)$" },
            { id: "c", text: "$\\left(\\dfrac{9}{2}, \\dfrac{9}{2}\\right)$" },
            { id: "d", text: "$(2, 3)$" },
          ],
          correctAlternativeId: "a",
          explanation: "$G = \\left(\\dfrac{0+6+3}{3}, \\dfrac{0+0+9}{3}\\right) = (3, 3)$.",
        },
        {
          id: "q-3",
          statement: "Qual dos pontos abaixo pertence à reta $x + y = 5$?",
          alternatives: [
            { id: "a", text: "$(2, 3)$" },
            { id: "b", text: "$(3, 3)$" },
            { id: "c", text: "$(1, 3)$" },
            { id: "d", text: "$(5, 5)$" },
          ],
          correctAlternativeId: "a",
          explanation:
            "Substituindo $(2,3)$: $2 + 3 = 5$, a igualdade é satisfeita. Nas demais opções, a soma não resulta em $5$.",
        },
        {
          id: "q-4",
          statement: "O ponto $P(m, 3)$ pertence à reta de equação $2x - y = 5$. Qual é o valor de $m$?",
          alternatives: [
            { id: "a", text: "$1$" },
            { id: "b", text: "$2$" },
            { id: "c", text: "$4$" },
            { id: "d", text: "$8$" },
          ],
          correctAlternativeId: "c",
          explanation:
            "Substituindo $x = m$ e $y = 3$ na equação: $2m - 3 = 5$, então $2m = 8$ e $m = 4$.",
        },
        {
          id: "q-5",
          statement: "Qual é o baricentro do triângulo de vértices $A(-1, 2)$, $B(5, 4)$ e $C(2, -3)$?",
          alternatives: [
            { id: "a", text: "$(6, 3)$" },
            { id: "b", text: "$\\left(3, \\dfrac{3}{2}\\right)$" },
            { id: "c", text: "$(2, 3)$" },
            { id: "d", text: "$(2, 1)$" },
          ],
          correctAlternativeId: "d",
          explanation:
            "$G = \\left(\\dfrac{-1 + 5 + 2}{3}, \\dfrac{2 + 4 + (-3)}{3}\\right) = \\left(\\dfrac{6}{3}, \\dfrac{3}{3}\\right) = (2, 1)$. A alternativa A esquece de dividir por 3, e a B divide por 2.",
        },
        {
          id: "q-6",
          statement:
            "Uma pessoa vai, em linha reta, do ponto $A(0, 0)$ até $B(3, 4)$ e, depois, de $B$ até $C(3, 10)$. Qual é a distância total percorrida?",
          alternatives: [
            { id: "a", text: "$\\sqrt{109}$" },
            { id: "b", text: "$11$" },
            { id: "c", text: "$10$" },
            { id: "d", text: "$5$" },
          ],
          correctAlternativeId: "b",
          explanation:
            "$d_1 = d_{AB} = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$ e $d_2 = d_{BC} = \\sqrt{0^2 + 6^2} = 6$. Total: $d = d_1 + d_2 = 11$. A alternativa A é a distância direta de $A$ até $C$, não o trajeto.",
        },
        {
          id: "q-7",
          statement: "Qual dos pontos abaixo NÃO pertence à reta $3x + y = 7$?",
          alternatives: [
            { id: "a", text: "$(2, 1)$" },
            { id: "b", text: "$(0, 7)$" },
            { id: "c", text: "$(1, 5)$" },
            { id: "d", text: "$(3, -2)$" },
          ],
          correctAlternativeId: "c",
          explanation:
            "Substituindo $(1, 5)$: $3 \\cdot 1 + 5 = 8 \\neq 7$, então ele não pertence à reta. Os demais satisfazem a equação: $6 + 1 = 7$, $0 + 7 = 7$ e $9 - 2 = 7$.",
        },
      ],
      videos: [],
    },
  ],

  // Videoaulas — cada playlist é cadastrada uma única vez e ligada às
  // partes que ela cobre (partIds). Ela aparece automaticamente na aba
  // "Vídeos" e no botão do topo dessas partes.
  generalVideos: [
    {
      id: "playlist-matrizes",
      title: "Playlist — Matrizes",
      description: "Videoaulas de matrizes para revisar as partes 1, 2 e 3.",
      author: "Prof. Fernando Grings",
      url: "https://www.youtube.com/playlist?list=PLE6qFDd4x9w9mmuAHJuBspzGI9mQ_sNVB",
      partIds: [
        "conceito-e-notacao-de-matrizes",
        "classificacao-das-matrizes",
        "operacoes-e-equacoes-matriciais",
      ],
    },
    {
      id: "playlist-geometria-analitica",
      title: "Playlist — Geometria Analítica",
      description: "Videoaulas de geometria analítica para revisar as partes 4 e 5.",
      author: "Sandro Curió",
      url: "https://www.youtube.com/playlist?list=PLaKmzX_hXWkLE10zBpt3bgE2TrNuOWgff",
      partIds: ["geometria-analitica-pontos-e-simetrias", "geometria-analitica-baricentro-e-retas"],
    },
  ],

  // ──────────────────────────────────────────────────────────────
  // QUESTÕES DISCURSIVAS — área própria (/discursivas)
  // Cada questão combina conteúdos de uma ou mais partes.
  // ──────────────────────────────────────────────────────────────
  discursiveQuestions: [
    {
      id: "disc-1",
      group: "Matrizes",
      statement:
        "Considere a matriz $A = (a_{ij})$ de ordem $3 \\times 2$, definida pela lei de formação $a_{ij} = 2i - j$.",
      items: [
        "Construa a matriz $A$, calculando cada elemento.",
        "Determine a matriz transposta $A^t$ e indique sua ordem.",
      ],
      resolutionSteps: [
        "A matriz tem 3 linhas e 2 colunas, então os elementos são $a_{11}, a_{12}, a_{21}, a_{22}, a_{31}, a_{32}$.",
        "Aplicando a lei $a_{ij} = 2i - j$: $a_{11} = 2 - 1 = 1$, $a_{12} = 2 - 2 = 0$, $a_{21} = 4 - 1 = 3$, $a_{22} = 4 - 2 = 2$, $a_{31} = 6 - 1 = 5$, $a_{32} = 6 - 2 = 4$.",
        "Logo, $A = \\begin{bmatrix}1 & 0\\\\3 & 2\\\\5 & 4\\end{bmatrix}$.",
        "Na transposta, cada linha de $A$ vira uma coluna: a linha $(1, 0)$ vira a 1ª coluna, $(3, 2)$ a 2ª e $(5, 4)$ a 3ª.",
      ],
      finalAnswer:
        "$A = \\begin{bmatrix}1 & 0\\\\3 & 2\\\\5 & 4\\end{bmatrix}$ e $A^t = \\begin{bmatrix}1 & 3 & 5\\\\0 & 2 & 4\\end{bmatrix}$, de ordem $2 \\times 3$.",
      relatedPartIds: ["conceito-e-notacao-de-matrizes", "classificacao-das-matrizes"],
    },
    {
      id: "disc-2",
      group: "Matrizes",
      statement:
        "Sabendo que $A = \\begin{bmatrix}x + y & 3\\\\1 & x - y\\end{bmatrix}$ e $B = \\begin{bmatrix}7 & 3\\\\1 & 1\\end{bmatrix}$ são iguais:",
      items: [
        "Determine os valores de $x$ e $y$.",
        "A matriz $A$ é simétrica? Justifique.",
      ],
      resolutionSteps: [
        "Matrizes iguais têm elementos correspondentes iguais ($a_{ij} = b_{ij}$). Assim: $x + y = 7$ e $x - y = 1$.",
        "Somando as duas equações: $2x = 8$, logo $x = 4$. Substituindo: $4 + y = 7$, logo $y = 3$.",
        "Com esses valores, $A = \\begin{bmatrix}7 & 3\\\\1 & 1\\end{bmatrix}$.",
        "Para ser simétrica, precisaria valer $a_{ij} = a_{ji}$. Mas $a_{12} = 3$ e $a_{21} = 1$, ou seja, $a_{12} \\neq a_{21}$.",
      ],
      finalAnswer: "$x = 4$ e $y = 3$. A matriz $A$ não é simétrica, pois $a_{12} \\neq a_{21}$ (logo $A^t \\neq A$).",
      relatedPartIds: ["operacoes-e-equacoes-matriciais", "classificacao-das-matrizes"],
    },
    {
      id: "disc-3",
      group: "Matrizes",
      statement:
        "Seja $B = \\begin{bmatrix}1 & 4 & 0\\\\2 & 3 & 6\\\\0 & -2 & 5\\end{bmatrix}$. Resolva a equação matricial $2X - I_3 = B$.",
      items: ["Determine a matriz $X$.", "Determine a matriz oposta $-X$."],
      resolutionSteps: [
        "Isolando a incógnita: $2X = B + I_3$.",
        "Somando $I_3$ (1 na diagonal principal, 0 no restante): $B + I_3 = \\begin{bmatrix}2 & 4 & 0\\\\2 & 4 & 6\\\\0 & -2 & 6\\end{bmatrix}$.",
        "Dividindo cada elemento por 2: $X = \\begin{bmatrix}1 & 2 & 0\\\\1 & 2 & 3\\\\0 & -1 & 3\\end{bmatrix}$.",
        "A oposta é obtida trocando o sinal de todos os elementos de $X$.",
      ],
      finalAnswer:
        "$X = \\begin{bmatrix}1 & 2 & 0\\\\1 & 2 & 3\\\\0 & -1 & 3\\end{bmatrix}$ e $-X = \\begin{bmatrix}-1 & -2 & 0\\\\-1 & -2 & -3\\\\0 & 1 & -3\\end{bmatrix}$.",
      relatedPartIds: ["operacoes-e-equacoes-matriciais", "classificacao-das-matrizes"],
    },
    {
      id: "disc-4",
      group: "Geometria Analítica",
      statement:
        "Uma pessoa sai do ponto $A(1, 1)$, caminha em linha reta até $B(4, 5)$ e depois até $C(7, 1)$. Os três pontos formam um triângulo.",
      items: [
        "Calcule a distância total percorrida $d = d_1 + d_2$ (de $A$ até $B$ e de $B$ até $C$).",
        "Determine as coordenadas do baricentro $G$ do triângulo $ABC$.",
        "Determine o ponto médio $M$ do segmento $\\overline{AC}$.",
      ],
      resolutionSteps: [
        "$d_1 = d_{AB} = \\sqrt{(4 - 1)^2 + (5 - 1)^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$.",
        "$d_2 = d_{BC} = \\sqrt{(7 - 4)^2 + (1 - 5)^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$.",
        "Distância total: $d = 5 + 5 = 10$.",
        "Baricentro: $G = \\left(\\dfrac{1 + 4 + 7}{3}, \\dfrac{1 + 5 + 1}{3}\\right) = \\left(4, \\dfrac{7}{3}\\right)$.",
        "Ponto médio de $\\overline{AC}$: $M = \\left(\\dfrac{1 + 7}{2}, \\dfrac{1 + 1}{2}\\right) = (4, 1)$.",
      ],
      finalAnswer: "$d = 10$; $G = \\left(4, \\dfrac{7}{3}\\right)$; $M = (4, 1)$.",
      relatedPartIds: ["geometria-analitica-pontos-e-simetrias", "geometria-analitica-baricentro-e-retas"],
    },
    {
      id: "disc-5",
      group: "Geometria Analítica",
      statement: "O ponto $P(m, 2)$ pertence à reta de equação $2x + y = 8$.",
      items: [
        "Determine o valor de $m$.",
        "Determine $P'$, o simétrico de $P$ em relação à origem.",
        "Calcule a distância entre $P$ e $P'$.",
      ],
      resolutionSteps: [
        "Se $P$ pertence à reta, suas coordenadas satisfazem a equação: $2m + 2 = 8$, logo $2m = 6$ e $m = 3$. Então $P(3, 2)$.",
        "Na simetria em relação à origem, trocam-se os sinais das duas coordenadas: $(x, y) \\to (-x, -y)$. Assim, $P'(-3, -2)$.",
        "$d_{PP'} = \\sqrt{(-3 - 3)^2 + (-2 - 2)^2} = \\sqrt{36 + 16} = \\sqrt{52} = 2\\sqrt{13}$.",
      ],
      finalAnswer: "$m = 3$; $P'(-3, -2)$; $d_{PP'} = \\sqrt{52} = 2\\sqrt{13}$.",
      relatedPartIds: ["geometria-analitica-baricentro-e-retas", "geometria-analitica-pontos-e-simetrias"],
    },
  ],
};
