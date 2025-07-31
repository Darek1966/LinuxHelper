# LinuxHelper – Aplikacja do wyszukiwania poleceń

---

## Uruchomienie aplikacji

```
PS E:\REPLIT\LinuxHelper> npm run dev
```

### Jak otworzyć aplikację?

1. Otwórz przeglądarkę internetową (np. Chrome, Edge, Firefox).
2. Wpisz w pasku adresu:

   [http://127.0.0.1:5000]([http://127.0.0.1:5000]())

   lub

   [http://localhost:5000]([http://localhost:5000]())
3. Naciśnij Enter.

---

## Przegląd

**LinuxHelper** to aplikacja internetowa, która pomaga użytkownikom znaleźć i zrozumieć polecenia systemu Linux poprzez wyszukiwanie w języku naturalnym. Aplikacja oferuje nowoczesny interfejs React z przejrzystym, responsywnym interfejsem oraz zaplecze Express.js, które obsługuje dane poleceń. Użytkownicy mogą wyszukiwać polecenia, używając języka potocznego, i filtrować je według kategorii, takich jak pliki, procesy, sieć i operacje systemowe.

## Ostatnie zmiany

- **30 lipca 2025 r.**:
- **Historia wyszukiwania**: Dodano trwałą historię wyszukiwania z funkcją localStorage, wyświetlającą ostatnie wyszukiwania z szybkim dostępem.
- **Naprawiono pole wyszukiwania**: Rozwiązano problem z uciekaniem kursora poprzez konwersję do komponentu kontrolowanego.
- **Ulepszone opcje eksportu**: Dodano wiele formatów eksportu (skrypty bash, aliasy, zwykły tekst).
- **29 lipca 2025 r.**:
- **Główna migracja bazy danych**: Zastąpiono pamięć masową w pamięci bazą danych PostgreSQL z wykorzystaniem Drizzle ORM.
- **Ulepszony algorytm wyszukiwania**: Zwiększono precyzję wyszukiwania, aby wyświetlać tylko trafne wyniki, filtrując często występujące słowa.
- **Eksport do skryptów bash**: Dodano funkcjonalność eksportu wybranych poleceń do wykonywalnych skryptów bash, aliasów i plików tekstowych.
- **Tryb ciemny/jasny**: Dodano przełączanie motywu z automatycznym wykrywaniem preferencji systemowych
- **Obsługa Windows WSL**: Dodano kompleksowe polecenia WSL (Podsystem Windows dla Linuksa)
- **Rozszerzona baza poleceń**: Dodano ponad 91 kompleksowych poleceń Linux i WSL obejmujących:
- Operacje na plikach: cp, mv, rm, cat, ls, mkdir, du, nano, grep, find, zip/unzip, chmod, chown, head, tail
- Zarządzanie procesami: ps, htop, pstree, kill, renice, nohup, jobs, lsof według procesu
- Monitorowanie systemu: uptime, uname, who, systemctl, journalctl, history, env, lscpu, meminfo
- Aktualizacje systemu: apt update/upgrade/dist-upgrade, yum update, dnf upgrade, pacman -Syu, zypper update, autoremove/autoclean
- Narzędzia sieciowe: ping, wget, traceroute, lsof, ip addr/route, curl, netstat, telnet, ssh, scp
- Każde polecenie zawiera szczegółowe wyjaśnienia w języku polskim, zestawienia parametrów i obszerne słowa kluczowe dla lepszego dopasowania wyszukiwania.
- **Architektura bazy danych**: Migracja z MemStorage do DatabaseStorage z pełnymi operacjami CRUD.
- **Trwałość danych**: Wszystkie polecenia są teraz przechowywane w PostgreSQL z odpowiednim schematem i migracjami.
- **Precyzja wyszukiwania**: Zwraca puste wyniki dla niepasujących zapytań, wyświetla tylko istotne polecenia.
- **Wiele formatów eksportu**: Użytkownicy mogą eksportować polecenia jako skrypty bash (.sh), aliasy bash (.alias) lub zwykły tekst (.txt).

## Preferencje użytkownika

Preferowany styl komunikacji: Prosty, potoczny język.

## Architektura systemu

### Architektura front-endu

- **Framework**: React 18 z TypeScript
- **Routing**: Wouter do lekkiego routingu po stronie klienta
- **Zarządzanie stanem**: TanStack Query (React Query) do zarządzania stanem serwera
- **Framework interfejsu użytkownika**: komponenty shadcn/ui zbudowane na prymitywach Radix UI
- **Stylizacja**: Tailwind CSS ze zmiennymi CSS do tworzenia motywów
- **Narzędzie do kompilacji**: Vite do szybkiego rozwoju i zoptymalizowanych kompilacji

### Architektura back-endu

- **Framework**: Express.js z TypeScript
- **Baza danych**: PostgreSQL z Drizzle ORM
- **Dostawca bazy danych**: Neon Database (bezserwerowy PostgreSQL)
- **Projektowanie API**: RESTful punkty końcowe do wyszukiwania i pobierania poleceń
- **Programowanie**: Wymiana modułów na gorąco za pomocą Vite Integracja

### Kluczowe decyzje projektowe

**Struktura Monorepo**: Aplikacja wykorzystuje współdzieloną strukturę obszaru roboczego z oddzielnymi katalogami `client/`, `server/` i `shared/`. Pozwala to na współdzielenie typów między frontendem a backendem, zachowując jednocześnie wyraźny podział zadań.

**Strategia bazy danych**: Wykorzystuje Drizzle ORM z PostgreSQL do obsługi bezpiecznych pod względem typów operacji bazodanowych. Schemat definiuje polecenia ze strukturalnymi metadanymi, w tym parametrami, słowami kluczowymi i kategoriami, co zapewnia efektywne wyszukiwanie.

**Strategia komponentów interfejsu użytkownika**: Wykorzystuje shadcn/ui do tworzenia spójnych, dostępnych komponentów z nowoczesnym systemem projektowania. Komponenty są zbudowane w oparciu o interfejs Radix UI, co zapewnia solidne funkcje ułatwień dostępu.

## Kluczowe komponenty

### Komponenty front-endu

- **Nagłówek**: Branding i nawigacja aplikacji
- **Sekcja wyszukiwania**: Wyszukiwanie w języku naturalnym z wyszukiwaniem w czasie rzeczywistym
- **Filtry kategorii**: Filtrowanie poleceń według kategorii (pliki, procesy, sieć, system)
- **Karta wyników poleceń**: Wyświetlanie szczegółów poleceń z funkcją kopiowania i objaśnieniami parametrów

### Komponenty back-endu

- **Warstwa pamięci masowej**: Abstrakcyjny interfejs pamięci masowej z implementacją w pamięci do celów programistycznych
- **Obsługa tras**: Punkty końcowe RESTful do wyszukiwania i pobierania poleceń
- **Schemat bazy danych**: Ustrukturyzowane przechowywanie poleceń z metadanymi

### Typy współdzielone

- **Schemat poleceń**: Definiuje strukturę poleceń z tytułem, poleceniem, kategorią, opisem, objaśnieniem, parametrami i słowami kluczowymi
- **Schemat użytkownika**: Podstawowa struktura użytkownika dla potencjalnych funkcji uwierzytelniania

## Dane Przepływ

1. **Przepływ wyszukiwania**: Użytkownik wprowadza zapytanie w języku naturalnym → Frontend odrzuca dane wejściowe → Wywołanie API do `/api/commands/search` → Backend przeszukuje polecenia według zapytania i kategorii → Zwracane i wyświetlane wyniki
2. **Filtrowanie kategorii**: Użytkownik wybiera kategorię → Frontend aktualizuje aktywną kategorię → Wywołanie API z filtrem kategorii → Wyświetlanie przefiltrowanych wyników
3. **Interakcja z poleceniami**: Użytkownik przegląda kartę poleceń → Może kopiować polecenia do schowka → Powiadomienie typu toast z prośbą o opinię użytkownika

## Zależności zewnętrzne

### Zależności frontendu

- **Ekosystem React**: React, React DOM, React Router (Wouter)
- **Biblioteki interfejsu użytkownika**: Komponenty interfejsu użytkownika Radix, ikony Lucide React
- **Narzędzia**: Zapytanie TanStack, date-fns, clsx, class-variance-authority
- **Programowanie**: TypeScript, Vite, Tailwind CSS

### Zależności backendu

- **Serwer**: Express.js, Node.js
- **Baza danych**: Drizzle ORM, @neondatabase/serverless, connect-pg-simple
- **Narzędzia**: Zod do walidacji, nanoid do generowania identyfikatorów
- **Programowanie**: tsx do wykonywania TypeScript, esbuild do kompilacji produkcyjnych

## Strategia wdrożenia

### Programowanie

- **Frontend**: Serwer deweloperski Vite z wymianą modułów na gorąco
- **Backend**: tsx do wykonywania TypeScript z automatycznym restartowaniem
- **Baza danych**: Połączenie z bazą danych Neon z konfiguracją opartą na środowisku

### Produkcja

- **Proces kompilacji**: Vite kompiluje frontend do `dist/public`, esbuild pakuje backend do `dist/index.js`
- **Serwerowanie statyczne**: Express udostępnia skompilowane pliki frontendu w środowisku produkcyjnym
- **Baza danych**: Produkcyjna baza danych PostgreSQL przez bazę danych Neon z połączeniem łączenie

### Konfiguracja

- **Zmienne środowiskowe**: `DATABASE_URL` dla połączenia z bazą danych
- **Skrypty kompilacji**: Oddzielne polecenia kompilacji dla frontendu i backendu z zewnętrznym pakowaniem pakietów
- **Migracje baz danych**: Drizzle Kit obsługuje migracje schematów za pomocą polecenia `db:push`

Aplikacja została zaprojektowana z myślą o łatwym wdrożeniu na platformach takich jak Replit, Vercel lub podobnych usługach hostingowych, przy minimalnej wymaganej konfiguracji.

---
