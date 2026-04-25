# Mini CMS Notion - Aix Finance Club

## Configuration Notion

### 1. Créer la base de données Notion

Créez une nouvelle database Notion nommée **"AFC Articles"** avec les propriétés suivantes :

| Propriété | Type Notion | Description |
|-----------|-------------|-------------|
| Title | Title | Titre de l'article |
| Slug | Rich text | URL unique (ex: `masterclass-private-equity-jan-2026`) |
| Published | Checkbox | Cocher pour publier l'article |
| Date | Date | Date de publication |
| Excerpt | Rich text | Résumé court (160-220 caractères) |
| CoverUrl | URL | Lien vers l'image de couverture (Unsplash, Imgur, etc.) |
| Author | Select | Auteur (Président, Pôle Com, etc.) |
| Tags | Multi-select | Catégories (Marchés, M&A, Private Equity, Carrière, Événements) |
| ReadingTime | Number | Temps de lecture en minutes (optionnel) |

### 2. Créer une intégration Notion

1. Aller sur https://www.notion.so/my-integrations
2. Cliquer "New integration"
3. Nommer l'intégration (ex: "AFC Website")
4. Copier le **Internal Integration Token** (commence par `secret_`)

### 3. Connecter la database à l'intégration

1. Ouvrir la database "AFC Articles" dans Notion
2. Cliquer sur "..." en haut à droite → "Connections"
3. Ajouter l'intégration créée

### 4. Récupérer l'ID de la database

L'URL de la database ressemble à :
```
https://notion.so/XXXXXXXXXXXXXXXXXXXXXX?v=YYYY
```
L'ID est la partie `XXXXXXXXXXXXXXXXXXXXXX` (32 caractères).

## Variables d'environnement

Ajoutez ces variables dans Vercel (ou `.env.local` pour le dev) :

```env
NOTION_TOKEN=secret_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NOTION_DATABASE_ID=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
REVALIDATE_SECRET=votre_secret_aleatoire_pour_revalidation
```

## Workflow Rédacteur

### Publier un article

1. Ouvrir Notion → AFC Articles
2. Créer une nouvelle page
3. Remplir les propriétés :
   - **Title** : Titre de l'article
   - **Slug** : URL unique (en minuscules, tirets, pas d'accents)
   - **Excerpt** : Résumé court pour l'aperçu
   - **CoverUrl** : URL publique de l'image (utilisez Unsplash, Imgur, etc.)
   - **Date** : Date de publication
   - **Author** : Votre nom/pôle
   - **Tags** : Catégories pertinentes
4. Écrire le contenu dans la page Notion
5. Cocher **Published** = ✓
6. L'article apparaît sur le site en ~1 minute

### Modifier un article

1. Modifier le contenu dans Notion
2. L'article se met à jour automatiquement (délai ~1 minute)

### Dépublier un article

1. Décocher **Published**
2. L'article disparaît du site en ~1 minute

## Refresh automatique

Les articles sont mis à jour automatiquement toutes les 60 secondes grâce à ISR (Incremental Static Regeneration).

### Refresh manuel (optionnel)

Pour forcer un refresh immédiat :

```bash
curl -X POST https://votre-site.vercel.app/api/revalidate \
  -H "x-revalidate-secret: votre_secret"
```

Ou via GET :
```
https://votre-site.vercel.app/api/revalidate?secret=votre_secret
```

### Cron Vercel (optionnel)

Pour un refresh automatique plus fréquent, ajoutez un cron dans `vercel.json` :

```json
{
  "crons": [{
    "path": "/api/revalidate?secret=votre_secret",
    "schedule": "*/5 * * * *"
  }]
}
```

## Support des contenus Notion

Le CMS supporte les blocs suivants :
- Paragraphes (avec gras, italique, souligné, barré, code inline, liens)
- Titres (H1, H2, H3)
- Listes à puces et numérotées
- Citations
- Séparateurs
- Images
- Callouts
- Blocs de code

## Images

**Recommandation** : Utilisez toujours la propriété `CoverUrl` avec une URL publique permanente (Unsplash, Imgur, Cloudinary, etc.).

Les URLs d'images internes Notion expirent après ~1 heure et ne sont pas recommandées.
