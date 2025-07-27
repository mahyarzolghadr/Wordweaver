# 🕸️ Wordweaver — Password Wordlist Generator

> **A CLI spellbook that weaves personal words into powerful password wordlists.**  
> Perfect for security testing, pentesting, or learning Node.js.

![CLI Example](https://via.placeholder.com/700x300?text=Wordweaver+CLI+Example "Wordweaver in action")
> *(Screenshot idea: Terminal showing prompts and generated output)*

---

## 🔥 What is Wordweaver?

**Wordweaver** generates custom password wordlists from personal information (like names, birth years, cities) and advanced patterns — including **case permutations**, **common substitutions**, and **custom keywords**.

It’s designed to help:
- 🔐 Security researchers create targeted wordlists
- 💻 Developers learn CLI & Node.js
- 🛡️ Red teams simulate real-world attacks (in authorized environments)

> ⚠️ **Note**: Use only on systems you have permission to test.

---

## 🚀 Features

- ✅ **Interactive CLI** – Easy step-by-step input
- ✅ **Smart Patterns** – Generates `name123`, `Name@city`, `city2025`, and more
- ✅ **Custom Keywords** – Add extra words like `admin`, `football`, `secret`
- ✅ **Case Permutations** – Generate `Ahmad`, `aHmad`, `aHMAD`, etc. (configurable by level)
- ✅ **Save to `.txt`** – Output ready for tools like `John the Ripper` or `Hydra`
- ✅ **No Dependencies** – Uses only built-in Node.js modules

---

## 📦 Installation

1. Make sure you have [Node.js](https://nodejs.org/) installed (v14 or higher).
2. Clone or download this repo:

```bash
git clone https://github.com/your-username/wordweaver.git
cd wordweaver
