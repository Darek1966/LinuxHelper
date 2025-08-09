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

Jeśli masz pytania lub sugestie dotyczące projektu, skontaktuj się z nami:

* Autor: [Twoje Imię i Nazwisko]
* Email: [twój-email@example.com]
* GitHub: [twój-profil-github]
* Strona projektu: [adres-strony-projektu]

---

*LinuxHelper - Twój przewodnik po świecie poleceń Linux*

---
