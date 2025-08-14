# LinuxHelper

## Opis

LinuxHelper to aplikacja webowa zaprojektowana, aby pomóc użytkownikom w zarządzaniu i wyszukiwaniu poleceń systemu Linux. Narzędzie umożliwia przechowywanie, kategoryzowanie i wyszukiwanie poleceń wraz z ich szczegółowymi opisami i parametrami, co czyni je idealnym rozwiązaniem zarówno dla początkujących, jak i zaawansowanych użytkowników Linuxa.

## Funkcje

* **Wyszukiwanie poleceń** - szybkie znajdowanie poleceń po słowach kluczowych lub kategoriach
* **Kategoryzacja** - organizacja poleceń według kategorii dla łatwiejszego dostępu
* **Szczegółowe opisy** - każde polecenie zawiera tytuł, opis, szczegółowe wyjaśnienie i parametry
* **Eksport poleceń** - możliwość eksportu wybranych poleceń do skryptów bash
* **Interfejs użytkownika** - nowoczesny i responsywny interfejs zbudowany przy użyciu React i Tailwind CSS
* **Baza danych** - przechowywanie poleceń w relacyjnej bazie danych

## Instalacja

### Wymagania wstępne

* Node.js (wersja 16 lub nowsza)
* npm lub yarn
* Baza danych (projekt korzysta z Neon Database)

### Kroki instalacji

1. Sklonuj repozytorium:

```bash
git clone https://github.com/twoj-username/LinuxHelper.git
cd LinuxHelper
```

2. Zainstaluj zależności:

```bash
npm install
```

3. Skonfiguruj zmienne środowiskowe: Utwórz plik `.env` w głównym katalogu projektu i dodaj niezbędne zmienne środowiskowe:

```
DATABASE_URL=twoj_url_do_bazy_danych
PORT=3000
```

4. Uruchom migracje bazy danych:

```bash
npm run migrate
```

5. Uruchom aplikację w trybie deweloperskim:

```bash
npm run dev
```

## Użycie

### Przeglądanie poleceń

Po uruchomieniu aplikacji, możesz przeglądać dostępne polecenia na stronie głównej. Polecenia są pogrupowane według kategorii.

### Wyszukiwanie poleceń

Użyj paska wyszukiwania, aby znaleźć konkretne polecenia. Możesz wyszukiwać według słów kluczowych lub filtrować według kategorii.

### Dodawanie nowych poleceń

Zalogowani użytkownicy mogą dodawać nowe polecenia, podając:

* Tytuł polecenia
* Samo polecenie
* Kategorię
* Opis
* Szczegółowe wyjaśnienie
* Parametry
* Słowa kluczowe

### Eksport poleceń

Wybierz polecenia, które chcesz wyeksportować, a następnie kliknij przycisk "Eksportuj". Możesz wybrać format eksportu (np. skrypt bash).

## Technologie

### Frontend

* React
* TypeScript
* Tailwind CSS
* Radix UI (komponenty interfejsu)
* React Hook Form (zarządzanie formularzami)
* Vite (bundler)

### Backend

* Node.js
* Express
* TypeScript
* Drizzle ORM
* Neon Database (PostgreSQL)
* Zod (walidacja danych)

## Współpraca

Jeśli chcesz przyczynić się do rozwoju projektu, wykonaj następujące kroki:

1. Utwórz fork repozytorium
2. Utwórz branch dla swojej funkcji (`git checkout -b feature/amazing-feature`)
3. Zatwierdź swoje zmiany (`git commit -m 'Dodaj nową funkcję'`)
4. Wypchnij branch do swojego forka (`git push origin feature/amazing-feature`)
5. Otwórz Pull Request

### Wytyczne dotyczące współpracy

* Przestrzegaj istniejącego stylu kodu
* Aktualizuj dokumentację w razie potrzeby
* Dodawaj testy dla nowych funkcji
* Upewnij się, że wszystkie testy przechodzą przed złożeniem PR

## Licencja

Ten projekt jest licencjonowany na warunkach licencji MIT - szczegóły znajdziesz w pliku [LICENSE](vscode-webview://1qd8v1tula0u43gou3ukfl0snpfh7dthaabr622qdvjsb150mmrk/LICENSE).

## Kontakt

<div style="display: flex; align-items: center; gap: 15px;">
  <img src="logo.png" alt="Icon" width="70">
  <div style="display: flex; align-items: center; gap: 10px;">
    <span>netdark_1966</span>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
    <a href="mailto:netdark_1966@op.pl">netdark_1966</a>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
    <a href="https://github.com/Darek1966">GitHub — Darek1966</a>
  </div>
</div>

---

*LinuxHelper - Twój przewodnik po świecie poleceń Linux*

---
