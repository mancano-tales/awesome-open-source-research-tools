# Awesome Open Source Research Tools [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)

> Uma lista curada de software de código aberto para qualquer etapa de um projeto de pesquisa rigorosa e sistemática — sem se limitar a uma única disciplina ou método.

Read this in [English](README.md).

## Escopo

Esta lista é agnóstica quanto a método e disciplina. Se uma ferramenta é de código aberto e apoia alguma parte do ciclo de pesquisa — coletar dados, organizá-los, analisá-los, tornar o trabalho reprodutível, escrevê-lo ou revisar a literatura existente — ela tem lugar aqui. Ciências sociais, ciências naturais, ciências da saúde, humanidades digitais: todas bem-vindas, desde que o software em si seja de código aberto.

## Conteúdo

- [Coleta de Dados](#coleta-de-dados)
- [Gestão e Organização de Dados](#gestão-e-organização-de-dados)
- [Análise Qualitativa](#análise-qualitativa)
- [Análise Quantitativa e Estatística](#análise-quantitativa-e-estatística)
- [Reprodutibilidade e Ambientes Computacionais](#reprodutibilidade-e-ambientes-computacionais)
- [Escrita e Publicação](#escrita-e-publicação)
- [Gestão de Referências e Citações](#gestão-de-referências-e-citações)
- [Colaboração e Gestão de Projetos](#colaboração-e-gestão-de-projetos)
- [Revisão de Literatura e Síntese](#revisão-de-literatura-e-síntese)
- [Ferramentas de IA e Agentes para Pesquisa](#ferramentas-de-ia-e-agentes-para-pesquisa)
- [Organizações Inspiradoras](#organizações-inspiradoras)
- [Como Contribuir](#como-contribuir)
- [Licença](#licença)

## Coleta de Dados

- [KoboToolbox](https://github.com/kobotoolbox) - Suíte de coleta de dados em campo (formulários, app móvel, servidor) construída sobre o ODK, amplamente usada em pesquisa social e humanitária.
- [LimeSurvey](https://github.com/LimeSurvey/LimeSurvey) - Plataforma de surveys online autogerenciável.
- [OmniVoice](https://github.com/k2-fsa/OmniVoice) - Sistema de código aberto de clonagem de voz e texto-para-fala (TTS) para mais de 600 idiomas, útil para produzir instrumentos de áudio multilíngues (surveys, roteiros) em trabalho de campo.
- [OpenRefine](https://github.com/OpenRefine/OpenRefine) - Ferramenta para limpar e transformar dados bagunçados antes da análise.
- [Scrapy](https://github.com/scrapy/scrapy) - Framework em Python para web scraping e extração estruturada de dados.
- [Vibe](https://github.com/thewh1teagle/vibe) - Aplicativo de transcrição de áudio/vídeo de código aberto e totalmente local (Whisper, Nemotron, Parakeet), com diarização de falantes, processamento em lote e amplo suporte a formatos de exportação.
- [VoiceStudio](https://github.com/debpalash/VoiceStudio) - Kit de ferramentas de voz de código aberto e totalmente local (transcrição, ditado, clonagem de voz, dublagem) em 646 idiomas, útil para transcrever entrevistas sem enviar áudio sensível para nuvens de terceiros.

## Gestão e Organização de Dados

- [Dataverse](https://github.com/IQSS/dataverse) - Software de repositório de dados de pesquisa de código aberto, usado por acervos institucionais e de projetos.
- [DVC](https://github.com/iterative/dvc) - Controle de versão para conjuntos de dados e pipelines de machine learning, projetado para funcionar junto do Git.
- [OSF (Open Science Framework)](https://github.com/CenterForOpenScience/osf.io) - Código-fonte da plataforma osf.io para gestão de projetos, pré-registro e arquivamento de dados/arquivos.

## Análise Qualitativa

- [Dicto](https://github.com/dictoapp/dicto) - CAQDAS para transcrever, anotar, tagear e publicar conteúdo de vídeo e áudio (entrevistas, história oral), projetado para interoperar com outras ferramentas de transcrição.
- [QualiLab](https://github.com/LuizPF42/QualiLab) - Ferramenta de código aberto para análise de dados qualitativos.
- [RQDA](https://github.com/RQDA/RQDA) - Pacote R para análise de dados qualitativos.
- [Taguette](https://github.com/remram44/taguette) - Ferramenta livre e de código aberto para codificação qualitativa, criada como alternativa acessível a softwares QDA comerciais.
- [Transcritório](https://github.com/antrologos/Transcritorio) - App desktop de código aberto e totalmente local para transcrever e diarizar entrevistas e grupos focais em português brasileiro, feito no IESP-UERJ/CERES, com exportação direta para NVivo.

## Análise Quantitativa e Estatística

- [JASP](https://github.com/jasp-stats/jasp-desktop) - Software estatístico de código aberto com interface gráfica, posicionado como alternativa livre ao SPSS.
- [pandas](https://github.com/pandas-dev/pandas) - Biblioteca Python para análise e manipulação de dados.
- [R](https://www.r-project.org/) - Ambiente de software livre para computação estatística e gráficos.

## Reprodutibilidade e Ambientes Computacionais

- [Docker](https://github.com/moby/moby) - Motor de containerização para empacotar um ambiente computacional reprodutível.
- [Jupyter](https://github.com/jupyter/notebook) - Notebooks de computação interativa que suportam dezenas de linguagens.
- [renv](https://github.com/rstudio/renv) - Gestão de dependências e ambientes para projetos R reprodutíveis.
- [Snakemake](https://github.com/snakemake/snakemake) - Sistema de gestão de workflows para análises de dados reprodutíveis e escaláveis.

## Escrita e Publicação

- [Pandoc](https://github.com/jgm/pandoc) - Conversor universal de documentos, motor por trás de muitas cadeias de escrita acadêmica.
- [Quarto](https://github.com/quarto-dev/quarto-cli) - Sistema de publicação científica e técnica de código aberto (documentos, sites, slides, livros) a partir de texto puro.
- [TeX Live](https://www.tug.org/texlive/) - Distribuição completa e livre de TeX/LaTeX para diagramação de manuscritos.

## Gestão de Referências e Citações

- [Zotero](https://github.com/zotero/zotero) - Gerenciador de referências livre e de código aberto, com integração ao navegador e plugins de processador de texto.

## Colaboração e Gestão de Projetos

- [GitLab Community Edition](https://gitlab.com/gitlab-org/gitlab) - Plataforma Git autogerenciável e de código aberto, com rastreamento de issues e CI/CD, utilizável como hub de colaboração de uma equipe de pesquisa.
- [Taiga](https://github.com/taigaio/taiga-back) - Ferramenta de gestão de projetos de código aberto (quadros Kanban/Scrum) adequada a pequenas equipes de pesquisa.

## Revisão de Literatura e Síntese

- [ASReview](https://github.com/asreview/asreview) - Ferramenta de código aberto assistida por IA para revisões sistemáticas de literatura e triagem de artigos.
- [metafor](https://github.com/wviechtb/metafor) - Pacote R para condução de meta-análises.

## Ferramentas de IA e Agentes para Pesquisa

- [DAAF (Data Analyst Augmentation Framework)](https://github.com/DAAF-Contribution-Community/daaf) - Kit de ferramentas de código aberto que transforma o Claude Code em um motor de pesquisa quantitativa auditável e reproduzível.
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) - Harness de agente de IA de código aberto, baseado em plugins, utilizável para automatizar e orquestrar workflows de pesquisa.

## Organizações Inspiradoras

Organizações (não ferramentas isoladas) cujo investimento sustentado em infraestrutura de pesquisa de código aberto merece destaque.

- [Center for Open Science](https://github.com/CenterForOpenScience) - Organização sem fins lucrativos por trás do Open Science Framework (OSF), que constrói infraestrutura e conduz iniciativas para pesquisa aberta e reprodutível.
- [Corporation for Digital Scholarship](https://github.com/DigitalScholar) - Organização sem fins lucrativos por trás do Zotero e do Tropy, construindo ferramentas livres e de código aberto para pesquisa acadêmica.
- [Posit](https://github.com/posit-dev) - Empresa de benefício público (antiga RStudio) por trás do RStudio, Quarto, Shiny, renv e outras ferramentas de pesquisa de código aberto amplamente usadas.
- [Social Science Data Lab](https://github.com/socialsciencedatalab) - Laboratório de pesquisa do Mannheim Centre for European Social Research (MZES) que publica ferramentas e recursos de código aberto para trabalho com dados em ciências sociais.
- [The Carpentries](https://github.com/carpentries) - Fundação sem fins lucrativos que ensina habilidades computacionais e de dados de código aberto a pesquisadores (Software Carpentry, Data Carpentry, Library Carpentry).

## Como Contribuir

Contribuições são bem-vindas! Leia as [diretrizes de contribuição](CONTRIBUTING.md) antes de abrir um pull request — adições são avaliadas por um checklist objetivo (licença de código aberto, manutenção ativa, documentação mínima, não-redundância), não por preferência pessoal.

## Licença

[![CC0](https://licensebuttons.net/p/zero/1.0/88x31.png)](https://creativecommons.org/publicdomain/zero/1.0/)

Na medida em que a lei permite, os contribuidores desta lista renunciaram a todos os direitos autorais e direitos conexos sobre esta obra. Veja [LICENSE](LICENSE).
