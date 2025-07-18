<p align="center">
    <img src="https://cdn-icons-png.flaticon.com/512/6295/6295417.png" align="center" width="30%">
</p>

<h1 align="center">SIHHACKTHON</h1>

<p align="center">
	<em>A next-gen e-commerce platform empowering vendors, customers, and delivery agents alike.</em>
</p>

<p align="center">
	<img src="https://img.shields.io/github/license/RishiKumarGade/SIHhackthon?style=default&logo=opensourceinitiative&logoColor=white&color=00ffe9" alt="license">
	<img src="https://img.shields.io/github/last-commit/RishiKumarGade/SIHhackthon?style=default&logo=git&logoColor=white&color=00ffe9" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/RishiKumarGade/SIHhackthon?style=default&color=00ffe9" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/RishiKumarGade/SIHhackthon?style=default&color=00ffe9" alt="repo-language-count">
</p>

---

## 🔗 Table of Contents

- [📍 Overview](#-overview)
- [👾 Features](#-features)
- [📁 Project Structure](#-project-structure)
  - [📂 Project Index](#-project-index)
- [🚀 Getting Started](#-getting-started)
  - [☑️ Prerequisites](#-prerequisites)
  - [⚙️ Installation](#-installation)
  - [🤖 Usage](#🤖-usage)
  - [🧪 Testing](#🧪-testing)
- [📌 Project Roadmap](#-project-roadmap)
- [🔰 Contributing](#-contributing)
- [🎗 License](#-license)
- [🙌 Acknowledgments](#-acknowledgments)

---

## 📍 Overview

**SIHHACKTHON** is a full-stack e-commerce application designed to connect customers directly with vendors, promoting authentic products and eliminating unnecessary intermediaries. Users can register as vendors, delivery agents, or customers, allowing a decentralized and fair trade system. The platform enables transparent pricing and easy logistics handling across various regions.

---

## 👾 Features

- 🔄 **Multi-role Support**: Any user can act as a **vendor**, **delivery person**, or **customer**.
- 🛍️ **Direct Purchase from Vendors**: Ensure quality and transparency by eliminating intermediaries.
- 📦 **Real-Time Order Management**: Handle product listings, orders, and deliveries seamlessly.
- 🔔 **Smart Notifications**: Users receive real-time updates regarding orders and responses.
- 🔍 **Search & Filtering**: Users can find products quickly using smart search capabilities.
- ☁️ **Cloudinary Upload Integration**: Product images are uploaded efficiently to the cloud.
- 🔒 **Authentication & Status Management**: Secure login, role-based access, and user status updates.

---

## 📁 Project Structure

```

Refer to the section below for a complete breakdown of files and folders.

````

### 📂 Project Index

<details open>
<summary><b><code>SIHHACKTHON/</code></b></summary>
<blockquote>

| File/Directory | Description |
|----------------|-------------|
| `package.json` | Project dependencies and npm scripts |
| `tsconfig.json` | TypeScript config |
| `next.config.js` | Next.js project configuration |
| `tailwind.config.ts` | Tailwind CSS configuration |
| `postcss.config.js` | PostCSS plugin configuration |
| `package-lock.json` | Dependency lock file |
| `src/components` | Reusable UI components (Product, NotificationBox, etc.) |
| `src/app` | Main application routes and pages |
| `src/app/api` | API routes for orders, users, products, etc. |
| `src/models` | Mongoose models for MongoDB |
| `src/dbConfig` | Database connection and config |
| `src/enums` | Enumerations for notifications, categories, etc. |
| `src/helpers` | Utility functions like image uploads |
| `src/cloudinaryConfig` | Cloudinary API setup |
| `src/middleware.ts` | Middleware for route protection/authentication |

</blockquote>
</details>

---

## 🚀 Getting Started

### ☑️ Prerequisites

Before getting started with SIHHACKTHON, ensure your system supports:

- **Node.js** (v16 or higher)
- **npm**
- **MongoDB** instance (local or cloud)

---

### ⚙️ Installation

**Clone the repository:**

```bash
git clone https://github.com/RishiKumarGade/SIHhackthon
cd SIHhackthon
````

**Install dependencies:**

```bash
npm install
```

---

### 🤖 Usage

Start the development server:

```bash
npm start
```

The app will typically be available at `http://localhost:3000`.

---

### 🧪 Testing

To run test suites (if integrated):

```bash
npm test
```

> *Note: Add your test strategy in the future roadmap if not implemented yet.*

---

## 📌 Project Roadmap

* ✅ **Task 1**: <strike>Implement core product and vendor APIs</strike>
* ⏳ **Task 2**: Build multi-role dashboards
* ⏳ **Task 3**: Integrate push notification system
* ⏳ **Task 4**: Implement reviews/ratings for vendors
* ⏳ **Task 5**: Add payment gateway integration

---

## 🔰 Contributing

We welcome contributions from developers of all levels.

* 💬 [Join Discussions](https://github.com/RishiKumarGade/SIHhackthon/discussions)
* 🐛 [Report Issues](https://github.com/RishiKumarGade/SIHhackthon/issues)
* 💡 [Submit Pull Requests](https://github.com/RishiKumarGade/SIHhackthon/blob/main/CONTRIBUTING.md)

<details>
<summary><b>Contributor Guidelines</b></summary>

1. **Fork** the repository.
2. **Clone** your forked repo:

   ```bash
   git clone https://github.com/YOUR-USERNAME/SIHhackthon
   ```
3. **Create a new branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Commit your changes**:

   ```bash
   git commit -m "Added feature x"
   ```
5. **Push to GitHub**:

   ```bash
   git push origin feature/your-feature-name
   ```
6. **Open a Pull Request** from your branch.

</details>

<details>
<summary><b>Contributor Graph</b></summary>
<br>
<p align="left">
   <a href="https://github.com/RishiKumarGade/SIHhackthon/graphs/contributors">
      <img src="https://contrib.rocks/image?repo=RishiKumarGade/SIHhackthon">
   </a>
</p>
</details>

---

## 🎗 License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).
See the [LICENSE](https://github.com/RishiKumarGade/SIHhackthon/blob/main/LICENSE) file for full text.

---

## 🙌 Acknowledgments

* Government of India – Smart India Hackathon
* Inspiration from local-first supply chain models
---
