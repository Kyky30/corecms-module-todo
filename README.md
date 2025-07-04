# 📝 Module Todo - CoreCMS

Module simple de gestion des tâches pour CoreCMS.

## 🎯 Fonctionnalités

- ✅ **Création, modification, suppression** de tâches
- ✅ **Système de priorités** (Basse, Moyenne, Haute)
- ✅ **Dates limites** avec alertes pour les tâches en retard
- ✅ **Statistiques en temps réel** (total, terminées, en cours, en retard)
- ✅ **Interface d'administration intuitive** avec emojis et couleurs
- ✅ **API REST complète** pour intégrations externes

## 🚀 Installation

Ce module s'installe automatiquement via l'interface CoreCMS :

1. Accédez à `/admin/modules`
2. Cliquez sur **"Installer depuis GitHub"**
3. Collez l'URL : `https://github.com/Kyky30/corecms-module-todo`
4. Cliquez sur **"Installer"**

## 📋 Configuration requise

- CoreCMS ≥ 1.0.0
- Node.js ≥ 18.0.0
- Base de données PostgreSQL

## 🎨 Interface

### 📊 Dashboard
- **4 cartes de statistiques** avec icônes
- **Total** des tâches créées
- **Terminées** (compteur vert)
- **En cours** (compteur bleu)
- **En retard** (compteur rouge)

### ✏️ Création de tâches
- **Titre** (obligatoire)
- **Description** (optionnelle)
- **Priorité** : 🟢 Basse | 🟡 Moyenne | 🔴 Haute
- **Date limite** (optionnelle)

### 📋 Liste des tâches
- **Checkbox** pour marquer comme terminée
- **Badges colorés** pour les priorités
- **Alertes visuelles** pour les tâches en retard
- **Bouton de suppression** rapide

## 🔌 API

### Endpoints disponibles

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/api/todo/tasks` | Liste toutes les tâches |
| `GET` | `/api/todo/tasks?completed=true` | Filtre par statut |
| `GET` | `/api/todo/tasks?priority=HIGH` | Filtre par priorité |
| `POST` | `/api/todo/tasks` | Crée une nouvelle tâche |
| `PUT` | `/api/todo/tasks` | Met à jour une tâche |
| `DELETE` | `/api/todo/tasks?id=xxx` | Supprime une tâche |
| `GET` | `/api/todo/stats` | Statistiques globales |

### 💡 Exemples d'utilisation

```javascript
// Récupérer toutes les tâches
const response = await fetch('/api/todo/tasks')
const { data: tasks } = await response.json()

// Créer une nouvelle tâche
const newTask = await fetch('/api/todo/tasks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Ma nouvelle tâche',
    description: 'Description détaillée',
    priority: 'HIGH',
    dueDate: '2024-12-31'
  })
})

// Marquer comme terminée
await fetch('/api/todo/tasks', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    id: 'task-id',
    completed: true
  })
})

// Récupérer les statistiques
const stats = await fetch('/api/todo/stats')
const { data } = await stats.json()
console.log(`${data.totalTasks} tâches au total`)
```

## 🗄️ Structure des données

### Tâche (TodoTask)
```typescript
interface TodoTask {
  id: string
  title: string                    // Titre de la tâche
  description?: string             // Description optionnelle
  completed: boolean               // État de completion
  priority: 'LOW' | 'MEDIUM' | 'HIGH' // Niveau de priorité
  dueDate?: Date | null           // Date limite optionnelle
  createdAt: Date                 // Date de création
  updatedAt: Date                 // Dernière modification
}
```

### Statistiques (TodoStats)
```typescript
interface TodoStats {
  totalTasks: number      // Nombre total de tâches
  completedTasks: number  // Tâches terminées
  pendingTasks: number    // Tâches en cours
  overdueTasks: number    // Tâches en retard
}
```

## 🎨 Cas d'usage

### 👨‍💼 Gestion de projet
- Créer des tâches par priorité
- Suivre l'avancement global
- Identifier les retards

### 📅 Planning quotidien
- Organiser les tâches du jour
- Marquer les urgences en rouge
- Suivre la productivité

### 🏢 Équipe
- Partager les tâches communes
- Suivre les statistiques d'équipe
- Identifier les goulots d'étranglement

## 🔧 Développement

### Structure du module
```
corecms-module-todo/
├── plugin.json          # Manifeste du module
├── README.md            # Cette documentation
├── admin-ui/
│   └── index.tsx       # Interface React d'administration
├── api/
│   └── route.ts        # Endpoints API REST
├── backend/
│   └── handlers.ts     # Logique métier
├── prisma/
│   └── schema.prisma   # Schéma de base de données
├── types/
│   └── index.ts        # Types TypeScript
└── package.json        # Métadonnées npm
```

### Base de données
Le module crée automatiquement une table `todo_tasks` avec :
- ID unique (cuid)
- Titre et description
- Statut de completion
- Priorité (LOW/MEDIUM/HIGH)
- Date limite optionnelle
- Timestamps automatiques

## 📈 Roadmap

### v1.1.0 (prochaine version)
- [ ] Catégories de tâches
- [ ] Assignation d'utilisateurs
- [ ] Notifications email

### v1.2.0
- [ ] Commentaires sur les tâches
- [ ] Sous-tâches
- [ ] Export CSV/PDF

### v2.0.0
- [ ] Mode Kanban
- [ ] Intégration calendrier
- [ ] Templates de tâches

## 🐛 Support

Pour signaler un bug ou demander une fonctionnalité :
1. Ouvrez une [issue sur GitHub](https://github.com/Kyky30/corecms-module-todo/issues)
2. Décrivez le problème en détail
3. Incluez les étapes de reproduction

## 📄 Licence

MIT License - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 🚀 Module créé avec CoreCMS

Ce module utilise l'architecture modulaire de CoreCMS pour une intégration transparente et des performances optimales. 