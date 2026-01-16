# 🎯 Goal Tracker

<div align="center">

![Goal Tracker](https://img.shields.io/badge/Goal%20Tracker-Productivity%20App-4F46E5?style=for-the-badge&logo=target&logoColor=white)

[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React%20Router-6.14-CA4245?style=flat-square&logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

**A modern, feature-rich Goal Tracking Application built with React.js to help you manage your goals, deadlines, priorities, and sub-tasks efficiently.**

*Stay productive, stay organized* 🚀

[Features](#-features) • [Screenshots](#-screenshots) • [Installation](#-installation) • [Usage](#-usage) • [Contributing](#-contributing)

</div>

---

## 📸 Screenshots

<div align="center">

### 🏠 Main Dashboard
![Dashboard](./assets/dashboard.png)
*Track all your goals at a glance with intuitive dashboard*

### ✅ Goal Management
![Goals](./assets/goals.png)
*Create, edit, and manage your goals with ease*

### 🌙 Dark Mode
![Dark Mode](./assets/dark-mode.png)
*Beautiful dark theme for comfortable night-time productivity*

</div>

---

## ✨ Features

### 📝 Goal Management
| Feature | Description |
|---------|-------------|
| ➕ **Create Goals** | Add new goals with title, due date, priority, and category |
| ✏️ **Edit Goals** | Modify goals anytime as your plans change |
| ✅ **Complete/Undo** | Mark goals as complete or revert to pending |
| 🗑️ **Delete Goals** | Remove goals with confirmation dialog |
| 📦 **Archive System** | Archive and restore goals instead of permanent deletion |

### 📂 Sub-Tasks Management
| Feature | Description |
|---------|-------------|
| ➕ **Add Sub-tasks** | Break down goals into smaller, manageable tasks |
| ✅ **Track Progress** | Mark sub-tasks as complete/undo |
| 📊 **Progress Bar** | Visual completion percentage for each goal |
| ✏️ **Edit Sub-tasks** | Modify or delete sub-tasks as needed |

### 🗂 Categories & Filtering
| Category | Icon |
|----------|------|
| Personal | 👤 |
| Work | 💼 |
| Study | 📚 |
| Health | 💪 |

- 🔍 **Search** - Find goals by text instantly
- 🗂 **Filter** - View goals by specific category

### ⚡ Advanced Sorting
| Sort Option | Description |
|-------------|-------------|
| 🔥 **Priority** | High → Medium → Low |
| 📅 **Due Date** | Upcoming deadlines first |
| 🔤 **Alphabetical** | A-Z ordering |
| 🔄 **Toggle Direction** | Ascending ⬆️ / Descending ⬇️ |

### 📊 Dashboard & Statistics
- 📌 **Total Goals** - Count of all goals
- ✅ **Completed** - Number of finished goals
- ⏳ **Pending** - Goals still in progress
- 📈 **Completion Rate** - Overall percentage

### 🔔 Reminders & Notifications
- ⏰ **Browser Notifications** - Alerts for goals due today
- 🔔 **Manual Reminders** - Set reminders for any goal

### 🎨 User Interface
| Feature | Description |
|---------|-------------|
| 🌞 **Light Mode** | Clean, bright interface |
| 🌙 **Dark Mode** | Eye-friendly dark theme |
| 🎯 **Priority Styling** | Color-coded priority levels |
| 📱 **Responsive** | Works on all screen sizes |

### 💾 Data Management
- 💾 **Local Storage** - Goals persist in browser
- 📤 **Export JSON** - Backup your data
- 📥 **Import JSON** - Restore from backup

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.2 | UI Framework |
| **Vite** | 7.0.4 | Build Tool & Dev Server |
| **React Router** | 6.14.2 | Client-side Routing |
| **CSS3** | - | Styling & Animations |
| **LocalStorage** | - | Data Persistence |

---

## 🚀 Installation

### Prerequisites

- **Node.js** (v20.x or higher)
- **npm** (v10.x or higher)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/goal-tracker.git
   cd goal-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
goal-tracker/
├── public/
│   └── vite.webp              # Favicon
│
├── src/
│   ├── assets/                # Static assets
│   │   └── vite.webp
│   ├── App.jsx                # Main application component
│   ├── App.css                # App-specific styles
│   ├── main.jsx               # Entry point
│   └── styles.css             # Global styles
│
├── assets/                    # README images
│   ├── dashboard.png
│   ├── goals.png
│   └── dark-mode.png
│
├── index.html                 # HTML template
├── package.json               # Dependencies & scripts
├── vite.config.js             # Vite configuration
├── eslint.config.js           # ESLint rules
└── README.md                  # This file
```

---

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create optimized production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |

---

## 🎯 Usage Guide

### Creating a Goal
1. Click the **"Add Goal"** button
2. Enter goal title and description
3. Set due date, priority, and category
4. Click **"Save"**

### Managing Sub-tasks
1. Open a goal by clicking on it
2. Click **"Add Sub-task"**
3. Enter sub-task details
4. Track progress with the visual progress bar

### Exporting/Importing Data
- **Export**: Click export button to download JSON backup
- **Import**: Click import and select a JSON file to restore

---

## 🎨 Theme Customization

Toggle between themes using the theme switch in the header:

| Theme | Description |
|-------|-------------|
| ☀️ **Light** | Clean, professional appearance |
| 🌙 **Dark** | Reduced eye strain, modern look |

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/NewFeature`)
3. **Commit** changes (`git commit -m 'Add NewFeature'`)
4. **Push** to branch (`git push origin feature/NewFeature`)
5. **Open** a Pull Request

### Guidelines
- Follow existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 📋 Roadmap

- [ ] Cloud sync with backend
- [ ] User authentication
- [ ] Collaborative goals
- [ ] Mobile app (React Native)
- [ ] Calendar integration
- [ ] Email notifications
- [ ] Analytics dashboard
- [ ] Goal templates

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Akash Singh**

- GitHub: [@akashsingh](https://github.com/akashsingh)

---

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite for lightning-fast development
- Open source community for inspiration

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge)
![Built with React](https://img.shields.io/badge/Built%20with-React-61DAFB?style=for-the-badge&logo=react&logoColor=white)

</div>  
