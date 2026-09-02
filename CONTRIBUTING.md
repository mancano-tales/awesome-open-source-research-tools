# Contributing

Thanks for your interest in improving this list! To keep it useful, every addition is checked against the criteria below rather than personal preference.

## Checklist for adding a tool

Before opening a pull request, confirm the tool meets **all** of these:

- [ ] **Open source**, under a recognized license (OSI-approved for code, or a comparable open license for the project as a whole).
- [ ] **Actively maintained** — some commit or release activity within roughly the last 12 months. Unmaintained but historically important tools may still be considered; say so explicitly in the PR description.
- [ ] **Supports some part of the research lifecycle** — data collection, data management, analysis (qualitative or quantitative), reproducibility, writing/publishing, reference management, collaboration, literature review/synthesis, or AI research agents. It does not need to be discipline-specific.
- [ ] **Minimal documentation exists** (a README, docs site, or wiki) so a newcomer can evaluate and start using it.
- [ ] **Not redundant** with an existing entry — if it overlaps heavily with something already listed, explain the differentiator in the PR description.

## How to submit

`data/tools.json` is the Single Source of Truth (SSOT) for this repository. All READMEs and web views are automatically compiled from it:

1. Fork the repository and create a branch.
2. Add your entry into `data/tools.json` with the required metadata (`id`, `name`, `url`, `categoryId`, `country`, `maintainer`, `institution`, `description` in EN and PT, and `tags`).
3. Compile the READMEs:
   ```bash
   npm run build-readmes
   ```
4. Verify data integrity and SSOT parity:
   ```bash
   npm test
   ```
5. Open a pull request. Briefly note in the description why the tool fits the checklist above.

If a category doesn't fit your entry, propose a new one in the PR description — categories follow the stages of a research project and can evolve.

## Other ways to contribute

- Fix broken links or outdated descriptions in `data/tools.json`.
- Flag entries that no longer meet the checklist (e.g., abandoned projects, license changes) by opening an issue.
- Improve the `README.pt-BR.md` translation in `data/tools.json`.
