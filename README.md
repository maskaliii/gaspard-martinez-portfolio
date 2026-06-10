# Portfolio de Gaspard Martinez

Site vitrine statique pour présenter l'activité de développeur web de Gaspard Martinez.

## Fichiers

- `index.html` : structure et contenu du site
- `styles.css` : design responsive
- `script.js` : navigation mobile, liens actifs et formulaire de contact
- `assets/` : visuels du site

## Utilisation

Ouvrir `index.html` dans un navigateur.

## Publication GitHub Pages

Une fois connecté à GitHub CLI :

```powershell
gh auth login
gh repo create gaspard-martinez-portfolio --public --source=. --remote=origin --push
gh api repos/:owner/gaspard-martinez-portfolio/pages -X POST -f source.branch=codex/portfolio-polish -f source.path=/
```

Le site sera ensuite disponible à une adresse du type :

```text
https://VOTRE-PSEUDO.github.io/gaspard-martinez-portfolio/
```

## Contact

- Email : gaspard.martinez.pro@gmail.com
- Téléphone : 06 50 83 08 25
