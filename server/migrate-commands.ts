import { db } from "./db";
import { commands } from "@shared/schema";
import { randomUUID } from "crypto";
import type { CommandParameter } from "@shared/schema";

async function ensureCommandsTable() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS commands (
      id UUID PRIMARY KEY,
      title TEXT NOT NULL,
      command TEXT NOT NULL,
      category TEXT,
      description TEXT,
      explanation TEXT,
      parameters JSONB,
      keywords JSONB
    );
  `);
}

const initialCommands = [
  {
    id: randomUUID(),
    title: "Znajdź pliki większe niż określony rozmiar",
    command: "find . -size +100M -type f",
    category: "files",
    description: "Znajdź pliki większe niż 100MB w bieżącym katalogu",
    explanation: "To polecenie przeszukuje bieżący katalog (.) w poszukiwaniu plików (-type f) większych niż 100 megabajtów (-size +100M).",
    parameters: [
      { flag: "-size +100M", description: "Pliki większe niż 100MB" },
      { flag: "-type f", description: "Tylko zwykłe pliki" },
      { flag: ".", description: "Bieżący katalog" }
    ] as CommandParameter[],
    keywords: ["znajdź", "pliki", "duże", "rozmiar", "większe", "100MB", "find"]
  },
  {
    id: randomUUID(),
    title: "Pokaż procesy używające najwięcej CPU",
    command: "top -o %CPU",
    category: "processes",
    description: "Wyświetl procesy posortowane według użycia CPU",
    explanation: "Uruchamia program top posortowany według użycia CPU (-o %CPU), pokazując procesy zużywające najwięcej zasobów procesora na górze listy.",
    parameters: [
      { flag: "top", description: "Monitor procesów w czasie rzeczywistym" },
      { flag: "-o %CPU", description: "Sortuj według użycia CPU" }
    ] as CommandParameter[],
    keywords: ["procesy", "cpu", "top", "performance", "wydajność", "monitoring"]
  },
  {
    id: randomUUID(),
    title: "Sprawdź wolne miejsce na dysku",
    command: "df -h",
    category: "system",
    description: "Wyświetl informacje o wykorzystaniu przestrzeni dyskowej",
    explanation: "Wyświetla informacje o wykorzystaniu przestrzeni dyskowej (df) w formacie czytelnym dla człowieka (-h) z jednostkami MB, GB, TB.",
    parameters: [
      { flag: "df", description: "Disk free - informacje o dysku" },
      { flag: "-h", description: "Human readable - czytelny format" }
    ] as CommandParameter[],
    keywords: ["dysk", "miejsce", "wolne", "space", "df", "disk", "storage"]
  },
  {
    id: randomUUID(),
    title: "Znajdź pliki według nazwy",
    command: "find . -name \"*.txt\"",
    category: "files",
    description: "Znajdź wszystkie pliki z określonym rozszerzeniem",
    explanation: "Przeszukuje bieżący katalog i podkatalogi w poszukiwaniu plików pasujących do wzorca nazwy.",
    parameters: [
      { flag: "find", description: "Polecenie wyszukiwania" },
      { flag: ".", description: "Przeszukuj od bieżącego katalogu" },
      { flag: "-name \"*.txt\"", description: "Pliki z rozszerzeniem .txt" }
    ] as CommandParameter[],
    keywords: ["znajdź", "pliki", "nazwa", "rozszerzenie", "txt", "search", "name"]
  },
  {
    id: randomUUID(),
    title: "Pokaż aktywne połączenia sieciowe",
    command: "netstat -an",
    category: "network",
    description: "Wyświetl wszystkie aktywne połączenia sieciowe",
    explanation: "Pokazuje wszystkie aktywne połączenia sieciowe (-a) z adresami numerycznymi (-n) zamiast nazw hostów.",
    parameters: [
      { flag: "netstat", description: "Wyświetla połączenia sieciowe" },
      { flag: "-a", description: "Wszystkie połączenia" },
      { flag: "-n", description: "Adresy numeryczne" }
    ] as CommandParameter[],
    keywords: ["sieć", "połączenia", "network", "netstat", "tcp", "udp", "porty"]
  },
  {
    id: randomUUID(),
    title: "Zabij proces według nazwy",
    command: "pkill firefox",
    category: "processes",
    description: "Zakończ wszystkie procesy o określonej nazwie",
    explanation: "Kończy wszystkie procesy pasujące do podanej nazwy. Używaj ostrożnie!",
    parameters: [
      { flag: "pkill", description: "Zakończ proces według nazwy" },
      { flag: "firefox", description: "Nazwa procesu do zakończenia" }
    ] as CommandParameter[],
    keywords: ["zabij", "proces", "kill", "pkill", "zakończ", "stop"]
  },
  {
    id: randomUUID(),
    title: "Sprawdź wykorzystanie pamięci",
    command: "free -h",
    category: "system",
    description: "Wyświetl informacje o wykorzystaniu pamięci RAM",
    explanation: "Pokazuje ilość używanej i wolnej pamięci w systemie w czytelnym formacie.",
    parameters: [
      { flag: "free", description: "Informacje o pamięci" },
      { flag: "-h", description: "Format czytelny dla człowieka" }
    ] as CommandParameter[],
    keywords: ["pamięć", "ram", "memory", "free", "wykorzystanie"]
  },
  {
    id: randomUUID(),
    title: "Archiwizuj katalog",
    command: "tar -czf backup.tar.gz /home/user/documents",
    category: "files",
    description: "Utwórz skompresowane archiwum katalogu",
    explanation: "Tworzy skompresowane archiwum tar.gz z określonego katalogu.",
    parameters: [
      { flag: "tar", description: "Narzędzie archiwizacji" },
      { flag: "-c", description: "Utwórz archiwum" },
      { flag: "-z", description: "Kompresja gzip" },
      { flag: "-f", description: "Nazwa pliku archiwum" }
    ] as CommandParameter[],
    keywords: ["archiwum", "backup", "tar", "kompresja", "zip", "kopia"]
  },
  {
    id: randomUUID(),
    title: "Pokaż otwarte porty",
    command: "ss -tulpn",
    category: "network",
    description: "Wyświetl wszystkie otwarte porty i nasłuchujące usługi",
    explanation: "Nowoczesna alternatywa dla netstat pokazująca otwarte porty TCP i UDP.",
    parameters: [
      { flag: "ss", description: "Socket statistics" },
      { flag: "-t", description: "Porty TCP" },
      { flag: "-u", description: "Porty UDP" },
      { flag: "-l", description: "Tylko nasłuchujące" },
      { flag: "-p", description: "Pokaż procesy" },
      { flag: "-n", description: "Adresy numeryczne" }
    ] as CommandParameter[],
    keywords: ["porty", "ports", "ss", "tcp", "udp", "nasłuchujące", "listening"]
  },
  {
    id: randomUUID(),
    title: "Zmień uprawnienia pliku",
    command: "chmod 755 script.sh",
    category: "files",
    description: "Ustaw uprawnienia do pliku",
    explanation: "Zmienia uprawnienia pliku - 755 oznacza pełne uprawnienia dla właściciela, odczyt i wykonanie dla innych.",
    parameters: [
      { flag: "chmod", description: "Zmiana uprawnień" },
      { flag: "755", description: "Uprawnienia: rwxr-xr-x" },
      { flag: "script.sh", description: "Nazwa pliku" }
    ] as CommandParameter[],
    keywords: ["uprawnienia", "chmod", "permissions", "755", "777", "644"]
  },
  {
    id: randomUUID(),
    title: "Skopiuj pliki między katalogami",
    command: "cp -r /source/path /destination/path",
    category: "files",
    description: "Kopiuj pliki i katalogi rekursywnie",
    explanation: "Kopiuje pliki z jednego miejsca do drugiego. Opcja -r pozwala kopiować całe katalogi wraz z zawartością.",
    parameters: [
      { flag: "cp", description: "Polecenie kopiowania" },
      { flag: "-r", description: "Kopiowanie rekursywne (katalogi)" },
      { flag: "/source/path", description: "Ścieżka źródłowa" },
      { flag: "/destination/path", description: "Ścieżka docelowa" }
    ] as CommandParameter[],
    keywords: ["kopiuj", "copy", "cp", "pliki", "katalogi", "rekursywnie"]
  },
  {
    id: randomUUID(),
    title: "Przenieś lub zmień nazwę pliku",
    command: "mv oldname.txt newname.txt",
    category: "files",
    description: "Przenieś plik lub zmień jego nazwę",
    explanation: "Przenosi plik do nowej lokalizacji lub zmienia jego nazwę. Może być używane zarówno do przenoszenia jak i zmiany nazwy.",
    parameters: [
      { flag: "mv", description: "Move - przenieś/zmień nazwę" },
      { flag: "oldname.txt", description: "Stara nazwa pliku" },
      { flag: "newname.txt", description: "Nowa nazwa pliku" }
    ] as CommandParameter[],
    keywords: ["przenieś", "move", "mv", "zmień nazwę", "rename"]
  },
  {
    id: randomUUID(),
    title: "Usuń pliki i katalogi",
    command: "rm -rf folder_name",
    category: "files",
    description: "Usuń pliki lub katalogi (ostrożnie!)",
    explanation: "Usuwa pliki lub katalogi. Opcja -r usuwa rekursywnie, -f wymusza usunięcie. UWAGA: Operacja nieodwracalna!",
    parameters: [
      { flag: "rm", description: "Remove - usuń" },
      { flag: "-r", description: "Rekursywnie (katalogi)" },
      { flag: "-f", description: "Wymuś usunięcie" },
      { flag: "folder_name", description: "Nazwa katalogu do usunięcia" }
    ] as CommandParameter[],
    keywords: ["usuń", "delete", "rm", "remove", "katalog", "folder"]
  },
  {
    id: randomUUID(),
    title: "Wyświetl zawartość pliku",
    command: "cat filename.txt",
    category: "files",
    description: "Pokaż całą zawartość pliku tekstowego",
    explanation: "Wyświetla całą zawartość pliku tekstowego w terminalu. Przydatne do szybkiego podglądu krótkich plików.",
    parameters: [
      { flag: "cat", description: "Concatenate - wyświetl zawartość" },
      { flag: "filename.txt", description: "Nazwa pliku do wyświetlenia" }
    ] as CommandParameter[],
    keywords: ["wyświetl", "pokaż", "cat", "zawartość", "plik", "tekst"]
  },
  {
    id: randomUUID(),
    title: "Wyświetl proces według PID",
    command: "ps aux | grep process_name",
    category: "processes",
    description: "Znajdź proces według nazwy",
    explanation: "Wyświetla wszystkie procesy (ps aux) i filtruje wyniki według nazwy procesu używając grep.",
    parameters: [
      { flag: "ps aux", description: "Lista wszystkich procesów" },
      { flag: "|", description: "Pipe - przekaż wynik dalej" },
      { flag: "grep process_name", description: "Filtruj według nazwy" }
    ] as CommandParameter[],
    keywords: ["proces", "process", "ps", "grep", "znajdź", "pid"]
  },
  {
    id: randomUUID(),
    title: "Monitoruj procesy w czasie rzeczywistym",
    command: "htop",
    category: "processes",
    description: "Interaktywny monitor procesów",
    explanation: "Uruchamia htop - interaktywną wersję programu top z kolorowym interfejsem i możliwością zarządzania procesami.",
    parameters: [
      { flag: "htop", description: "Interaktywny monitor procesów" }
    ] as CommandParameter[],
    keywords: ["htop", "monitor", "procesy", "interaktywny", "performance"]
  },
  {
    id: randomUUID(),
    title: "Sprawdź obciążenie systemu",
    command: "uptime",
    category: "system", 
    description: "Pokaż czas działania i obciążenie systemu",
    explanation: "Wyświetla czas działania systemu, liczbę zalogowanych użytkowników i średnie obciążenie systemu.",
    parameters: [
      { flag: "uptime", description: "Czas działania i obciążenie" }
    ] as CommandParameter[],
    keywords: ["uptime", "obciążenie", "load", "system", "czas działania"]
  },
  {
    id: randomUUID(),
    title: "Wyświetl informacje o systemie",
    command: "uname -a",
    category: "system",
    description: "Pokaż szczegółowe informacje o systemie",
    explanation: "Wyświetla wszystkie dostępne informacje o systemie: nazwę, wersję jądra, architekturę i inne szczegóły.",
    parameters: [
      { flag: "uname", description: "Unix name - informacje o systemie" },
      { flag: "-a", description: "All - wszystkie informacje" }
    ] as CommandParameter[],
    keywords: ["system", "uname", "informacje", "kernel", "wersja"]
  },
  {
    id: randomUUID(),
    title: "Sprawdź kto jest zalogowany",
    command: "who",
    category: "system",
    description: "Pokaż zalogowanych użytkowników",
    explanation: "Wyświetla listę wszystkich aktualnie zalogowanych użytkowników w systemie wraz z informacjami o sesji.",
    parameters: [
      { flag: "who", description: "Zalogowani użytkownicy" }
    ] as CommandParameter[],
    keywords: ["who", "użytkownicy", "zalogowani", "users", "sesja"]
  },
  {
    id: randomUUID(),
    title: "Testuj połączenie sieciowe",
    command: "ping google.com",
    category: "network",
    description: "Sprawdź łączność z serwerem",
    explanation: "Wysyła pakiety ICMP do określonego hosta aby sprawdzić łączność sieciową i czas odpowiedzi.",
    parameters: [
      { flag: "ping", description: "Test połączenia sieciowego" },
      { flag: "google.com", description: "Adres docelowy" }
    ] as CommandParameter[],
    keywords: ["ping", "test", "połączenie", "sieć", "internet", "łączność"]
  },
  {
    id: randomUUID(),
    title: "Pobierz plik z internetu",
    command: "wget https://example.com/file.zip",
    category: "network",
    description: "Pobierz plik używając wget",
    explanation: "Pobiera plik z określonego adresu URL i zapisuje go lokalnie. Wget obsługuje HTTP, HTTPS i FTP.",
    parameters: [
      { flag: "wget", description: "Web get - pobieranie plików" },
      { flag: "https://example.com/file.zip", description: "URL pliku do pobrania" }
    ] as CommandParameter[],
    keywords: ["wget", "pobierz", "download", "internet", "url", "http"]
  },
  {
    id: randomUUID(),
    title: "Sprawdź trasę do serwera",
    command: "traceroute google.com",
    category: "network",
    description: "Pokaż trasę pakietów do hosta",
    explanation: "Wyświetla wszystkie routery przez które przechodzą pakiety w drodze do określonego hosta.",
    parameters: [
      { flag: "traceroute", description: "Śledzenie trasy pakietów" },
      { flag: "google.com", description: "Host docelowy" }
    ] as CommandParameter[],
    keywords: ["traceroute", "trasa", "route", "routing", "sieć"]
  },
  {
    id: randomUUID(),
    title: "Wyświetl ostatnie logi systemowe",
    command: "journalctl -n 50",
    category: "system",
    description: "Pokaż ostatnie wpisy w dzienniku systemowym",
    explanation: "Wyświetla ostatnie 50 wpisów z dziennika systemowego (systemd journal). Przydatne do diagnozy problemów.",
    parameters: [
      { flag: "journalctl", description: "System journal viewer" },
      { flag: "-n 50", description: "Ostatnie 50 wpisów" }
    ] as CommandParameter[],
    keywords: ["journalctl", "logi", "logs", "dziennik", "systemd", "debug"]
  },
  {
    id: randomUUID(),
    title: "Znajdź proces używający portu",
    command: "lsof -i :8080",
    category: "network",
    description: "Sprawdź który proces używa określonego portu",
    explanation: "Wyświetla informacje o procesie który nasłuchuje na określonym porcie. Przydatne gdy port jest zajęty.",
    parameters: [
      { flag: "lsof", description: "List open files" },
      { flag: "-i :8080", description: "Internet connections na porcie 8080" }
    ] as CommandParameter[],
    keywords: ["lsof", "port", "proces", "zajęty", "listening", "network"]
  },
  {
    id: randomUUID(),
    title: "Kompresuj pliki do archiwum",
    command: "zip -r archive.zip folder/",
    category: "files",
    description: "Utwórz archiwum ZIP z katalogu",
    explanation: "Tworzy skompresowane archiwum ZIP zawierające wszystkie pliki z określonego katalogu.",
    parameters: [
      { flag: "zip", description: "Narzędzie kompresji ZIP" },
      { flag: "-r", description: "Rekursywnie (z podkatalogami)" },
      { flag: "archive.zip", description: "Nazwa archiwum" },
      { flag: "folder/", description: "Katalog do spakowania" }
    ] as CommandParameter[],
    keywords: ["zip", "kompresja", "archiwum", "pack", "backup"]
  },
  {
    id: randomUUID(),
    title: "Rozpakuj archiwum",
    command: "unzip archive.zip",
    category: "files",
    description: "Rozpakuj archiwum ZIP",
    explanation: "Wypakowuje wszystkie pliki z archiwum ZIP do bieżącego katalogu lub określonej lokalizacji.",
    parameters: [
      { flag: "unzip", description: "Narzędzie dekompresji ZIP" },
      { flag: "archive.zip", description: "Archiwum do rozpakowania" }
    ] as CommandParameter[],
    keywords: ["unzip", "rozpakuj", "extract", "archiwum", "zip"]
  },
  {
    id: randomUUID(),
    title: "Pokaż użycie procesora przez procesy",
    command: "ps aux --sort=-%cpu | head -10",
    category: "processes",
    description: "Wyświetl procesy zużywające najwięcej CPU",
    explanation: "Sortuje procesy według użycia CPU i pokazuje 10 najbardziej zasobożernych procesów.",
    parameters: [
      { flag: "ps aux", description: "Lista procesów" },
      { flag: "--sort=-%cpu", description: "Sortuj po CPU (malejąco)" },
      { flag: "head -10", description: "Pokaż pierwszych 10" }
    ] as CommandParameter[],
    keywords: ["cpu", "procesy", "performance", "top", "sort", "zasobożerne"]
  },
  {
    id: randomUUID(),
    title: "Znajdź tekst w plikach",
    command: "grep -r \"search_text\" /path/to/search",
    category: "files",
    description: "Wyszukaj tekst w plikach rekursywnie",
    explanation: "Przeszukuje wszystkie pliki w katalogu i podkatalogach w poszukiwaniu określonego tekstu.",
    parameters: [
      { flag: "grep", description: "Narzędzie wyszukiwania tekstu" },
      { flag: "-r", description: "Rekursywne przeszukiwanie" },
      { flag: "\"search_text\"", description: "Szukany tekst" },
      { flag: "/path/to/search", description: "Katalog do przeszukania" }
    ] as CommandParameter[],
    keywords: ["grep", "szukaj", "tekst", "search", "find", "recursive"]
  },
  {
    id: randomUUID(),
    title: "Wyświetl zawartość katalogu szczegółowo",
    command: "ls -la",
    category: "files",
    description: "Pokaż szczegółową listę plików i katalogów",
    explanation: "Wyświetla wszystkie pliki (-a) w długim formacie (-l) z uprawnieniami, właścicielem, rozmiarem i datą modyfikacji.",
    parameters: [
      { flag: "ls", description: "List - lista plików" },
      { flag: "-l", description: "Long format - format długi" },
      { flag: "-a", description: "All files - wszystkie pliki (z ukrytymi)" }
    ] as CommandParameter[],
    keywords: ["ls", "lista", "pliki", "katalog", "directory", "szczegóły"]
  },
  {
    id: randomUUID(),
    title: "Utwórz nowy katalog",
    command: "mkdir -p /path/to/new/directory",
    category: "files",
    description: "Stwórz nowy katalog wraz z rodzicielskimi",
    explanation: "Tworzy nowy katalog. Opcja -p tworzy wszystkie brakujące katalogi rodzicielskie w ścieżce.",
    parameters: [
      { flag: "mkdir", description: "Make directory - utwórz katalog" },
      { flag: "-p", description: "Parents - utwórz katalogi rodzicielskie" },
      { flag: "/path/to/new/directory", description: "Ścieżka nowego katalogu" }
    ] as CommandParameter[],
    keywords: ["mkdir", "katalog", "folder", "utwórz", "directory", "create"]
  },
  {
    id: randomUUID(),
    title: "Wyświetl rozmiar katalogu",
    command: "du -sh /path/to/directory",
    category: "files",
    description: "Sprawdź rozmiar katalogu",
    explanation: "Wyświetla całkowity rozmiar katalogu w czytelnym formacie. Opcja -s pokazuje sumę, -h format czytelny.",
    parameters: [
      { flag: "du", description: "Disk usage - użycie dysku" },
      { flag: "-s", description: "Summary - podsumowanie" },
      { flag: "-h", description: "Human readable - czytelny format" },
      { flag: "/path/to/directory", description: "Ścieżka katalogu" }
    ] as CommandParameter[],
    keywords: ["du", "rozmiar", "size", "katalog", "disk", "usage"]
  },
  {
    id: randomUUID(),
    title: "Edytuj plik w terminalu",
    command: "nano filename.txt",
    category: "files",
    description: "Otwórz plik w edytorze nano",
    explanation: "Uruchamia prosty edytor tekstowy nano do edycji pliku. Ctrl+X aby wyjść, Ctrl+O aby zapisać.",
    parameters: [
      { flag: "nano", description: "Edytor tekstowy nano" },
      { flag: "filename.txt", description: "Nazwa pliku do edycji" }
    ] as CommandParameter[],
    keywords: ["nano", "edytor", "edit", "plik", "tekst", "terminal", "edytuj"]
  },
  {
    id: randomUUID(),
    title: "Pokaż proces w drzewie",
    command: "pstree",
    category: "processes",
    description: "Wyświetl procesy w strukturze drzewa",
    explanation: "Pokazuje wszystkie procesy systemowe w strukturze drzewa, ukazując relacje rodzic-dziecko między procesami.",
    parameters: [
      { flag: "pstree", description: "Process tree - drzewo procesów" }
    ] as CommandParameter[],
    keywords: ["pstree", "drzewo", "procesy", "hierarchia", "parent", "child"]
  },
  {
    id: randomUUID(),
    title: "Sprawdź status usługi systemd",
    command: "systemctl status nginx",
    category: "system",
    description: "Sprawdź status usługi systemowej",
    explanation: "Wyświetla aktualny status określonej usługi systemd - czy jest uruchomiona, zatrzymana czy ma błędy.",
    parameters: [
      { flag: "systemctl", description: "System control - kontrola systemu" },
      { flag: "status", description: "Sprawdź status" },
      { flag: "nginx", description: "Nazwa usługi" }
    ] as CommandParameter[],
    keywords: ["systemctl", "status", "usługa", "service", "systemd", "nginx"]
  },
  {
    id: randomUUID(),
    title: "Uruchom usługę systemd",
    command: "sudo systemctl start nginx",
    category: "system",
    description: "Uruchom usługę systemową",
    explanation: "Uruchamia określoną usługę systemd. Wymaga uprawnień administratora (sudo).",
    parameters: [
      { flag: "sudo", description: "Super user do - uprawnienia admina" },
      { flag: "systemctl", description: "System control" },
      { flag: "start", description: "Uruchom usługę" },
      { flag: "nginx", description: "Nazwa usługi" }
    ] as CommandParameter[],
    keywords: ["systemctl", "start", "uruchom", "usługa", "service", "sudo"]
  },
  {
    id: randomUUID(),
    title: "Wyświetl konfigurację sieci",
    command: "ip addr show",
    category: "network",
    description: "Pokaż konfigurację interfejsów sieciowych",
    explanation: "Wyświetla wszystkie interfejsy sieciowe z ich adresami IP, maskumi sieci i statusem połączenia.",
    parameters: [
      { flag: "ip", description: "IP utilities - narzędzia IP" },
      { flag: "addr", description: "Address - adresy" },
      { flag: "show", description: "Pokaż informacje" }
    ] as CommandParameter[],
    keywords: ["ip", "sieć", "interfejs", "adres", "network", "interface"]
  },
  {
    id: randomUUID(),
    title: "Sprawdź tablicę routingu",
    command: "ip route show",
    category: "network",
    description: "Wyświetl tabele routingu",
    explanation: "Pokazuje wszystkie trasy sieciowe skonfigurowane w systemie, w tym bramę domyślną.",
    parameters: [
      { flag: "ip", description: "IP utilities" },
      { flag: "route", description: "Routing table - tabela routingu" },
      { flag: "show", description: "Wyświetl" }
    ] as CommandParameter[],
    keywords: ["ip", "route", "routing", "trasa", "gateway", "sieć"]
  },
  {
    id: randomUUID(),
    title: "Pobierz plik używając curl",
    command: "curl -O https://example.com/file.zip",
    category: "network",
    description: "Pobierz plik używając curl",
    explanation: "Pobiera plik z URL używając curl. Opcja -O zapisuje plik pod oryginalną nazwą.",
    parameters: [
      { flag: "curl", description: "Client URL - klient HTTP" },
      { flag: "-O", description: "Output - zapisz pod oryginalną nazwą" },
      { flag: "https://example.com/file.zip", description: "URL pliku" }
    ] as CommandParameter[],
    keywords: ["curl", "pobierz", "download", "http", "url", "internet"]
  },
  {
    id: randomUUID(),
    title: "Monitoruj ruch sieciowy",
    command: "sudo netstat -tuln",
    category: "network",
    description: "Pokaż nasłuchujące porty i połączenia",
    explanation: "Wyświetla wszystkie porty TCP (-t) i UDP (-u) w trybie nasłuchiwania (-l) z adresami numerycznymi (-n).",
    parameters: [
      { flag: "sudo", description: "Uprawnienia administratora" },
      { flag: "netstat", description: "Network statistics" },
      { flag: "-t", description: "TCP connections" },
      { flag: "-u", description: "UDP connections" },
      { flag: "-l", description: "Listening - nasłuchujące" },
      { flag: "-n", description: "Numerical - adresy numeryczne" }
    ] as CommandParameter[],
    keywords: ["netstat", "porty", "listening", "tcp", "udp", "network"]
  },
  {
    id: randomUUID(),
    title: "Sprawdź historię poleceń",
    command: "history",
    category: "system",
    description: "Wyświetl historię wykonanych poleceń",
    explanation: "Pokazuje listę ostatnio wykonanych poleceń z numerami. Można użyć !numer aby powtórzyć polecenie.",
    parameters: [
      { flag: "history", description: "Historia poleceń" }
    ] as CommandParameter[],
    keywords: ["history", "historia", "polecenia", "commands", "bash"]
  },
  {
    id: randomUUID(),
    title: "Znajdź pliki według daty modyfikacji",
    command: "find /path -mtime -7",
    category: "files",
    description: "Znajdź pliki zmodyfikowane w ostatnich 7 dniach",
    explanation: "Przeszukuje katalog w poszukiwaniu plików zmodyfikowanych w określonym czasie. -7 oznacza ostatnie 7 dni.",
    parameters: [
      { flag: "find", description: "Narzędzie wyszukiwania" },
      { flag: "/path", description: "Ścieżka do przeszukania" },
      { flag: "-mtime -7", description: "Zmodyfikowane w ostatnich 7 dniach" }
    ] as CommandParameter[],
    keywords: ["find", "data", "modyfikacja", "time", "recent", "pliki"]
  },
  {
    id: randomUUID(),
    title: "Wyświetl zmienne środowiskowe",
    command: "env",
    category: "system",
    description: "Pokaż wszystkie zmienne środowiskowe",
    explanation: "Wyświetla wszystkie zmienne środowiskowe ustawione w bieżącej sesji, takie jak PATH, HOME, USER.",
    parameters: [
      { flag: "env", description: "Environment - środowisko" }
    ] as CommandParameter[],
    keywords: ["env", "zmienne", "environment", "variables", "PATH", "system"]
  },
  {
    id: randomUUID(),
    title: "Zmień właściciela pliku",
    command: "sudo chown user:group filename",
    category: "files",
    description: "Zmień właściciela i grupę pliku",
    explanation: "Zmienia właściciela (user) i grupę (group) określonego pliku. Wymaga uprawnień administratora.",
    parameters: [
      { flag: "sudo", description: "Uprawnienia administratora" },
      { flag: "chown", description: "Change owner - zmień właściciela" },
      { flag: "user:group", description: "Użytkownik:grupa" },
      { flag: "filename", description: "Nazwa pliku" }
    ] as CommandParameter[],
    keywords: ["chown", "właściciel", "owner", "grupa", "group", "uprawnienia"]
  },
  {
    id: randomUUID(),
    title: "Sprawdź port czy jest otwarty",
    command: "telnet localhost 8080",
    category: "network",
    description: "Testuj czy port jest dostępny",
    explanation: "Próbuje połączyć się z określonym portem aby sprawdzić czy jest otwarty i dostępny.",
    parameters: [
      { flag: "telnet", description: "Terminal network protocol" },
      { flag: "localhost", description: "Adres docelowy" },
      { flag: "8080", description: "Numer portu" }
    ] as CommandParameter[],
    keywords: ["telnet", "port", "test", "otwarty", "dostępny", "connection"]
  },
  {
    id: randomUUID(),
    title: "Wyszukaj tekst w plikach",
    command: "grep -r \"pattern\" /path/to/search",
    category: "files",
    description: "Znajdź tekst w plikach rekursywnie",
    explanation: "Przeszukuje pliki w katalogu i podkatalogach w poszukiwaniu określonego wzorca tekstu. Opcja -r oznacza rekursywne przeszukiwanie.",
    parameters: [
      { flag: "grep", description: "Global Regular Expression Print" },
      { flag: "-r", description: "Rekursywnie (w podkatalogach)" },
      { flag: "\"pattern\"", description: "Szukany tekst/wzorzec" },
      { flag: "/path/to/search", description: "Ścieżka do przeszukania" }
    ] as CommandParameter[],
    keywords: ["grep", "szukaj", "tekst", "find", "search", "wzorzec", "pattern"]
  },
  {
    id: randomUUID(),
    title: "Wyświetl zawartość katalogu",
    command: "ls -la",
    category: "files",
    description: "Pokaż szczegółową listę plików i katalogów",
    explanation: "Wyświetla wszystkie pliki i katalogi (-a) z szczegółowymi informacjami (-l) włączając ukryte pliki.",
    parameters: [
      { flag: "ls", description: "List - lista plików" },
      { flag: "-l", description: "Long format - szczegółowy format" },
      { flag: "-a", description: "All - wszystkie pliki (z ukrytymi)" }
    ] as CommandParameter[],
    keywords: ["ls", "lista", "pliki", "katalog", "directory", "list", "pokaż"]
  },
  {
    id: randomUUID(),
    title: "Skompresuj pliki do archiwum zip",
    command: "zip -r archive.zip folder/",
    category: "files",
    description: "Utwórz archiwum ZIP z katalogu",
    explanation: "Tworzy skompresowane archiwum ZIP z określonego katalogu. Opcja -r kompresuje rekursywnie wszystkie podkatalogi.",
    parameters: [
      { flag: "zip", description: "Narzędzie kompresji ZIP" },
      { flag: "-r", description: "Rekursywnie (z podkatalogami)" },
      { flag: "archive.zip", description: "Nazwa archiwum" },
      { flag: "folder/", description: "Katalog do skompresowania" }
    ] as CommandParameter[],
    keywords: ["zip", "kompresja", "archiwum", "compress", "pakuj", "backup"]
  },
  {
    id: randomUUID(),
    title: "Rozpakuj archiwum zip",
    command: "unzip archive.zip",
    category: "files",
    description: "Rozpakuj archiwum ZIP",
    explanation: "Wypakowuje zawartość archiwum ZIP do bieżącego katalogu. Użyj -d katalog aby określić miejsce docelowe.",
    parameters: [
      { flag: "unzip", description: "Narzędzie do rozpakowywania ZIP" },
      { flag: "archive.zip", description: "Nazwa archiwum do rozpakowania" }
    ] as CommandParameter[],
    keywords: ["unzip", "rozpakuj", "archiwum", "extract", "wypakowuj"]
  },
  {
    id: randomUUID(),
    title: "Monitoruj logi w czasie rzeczywistym",
    command: "tail -f /var/log/syslog",
    category: "system",
    description: "Śledź logi na żywo",
    explanation: "Wyświetla ostatnie linie pliku logu i kontynuuje wyświetlanie nowych wpisów w czasie rzeczywistym. Opcja -f oznacza follow.",
    parameters: [
      { flag: "tail", description: "Wyświetl koniec pliku" },
      { flag: "-f", description: "Follow - śledź na żywo" },
      { flag: "/var/log/syslog", description: "Ścieżka do pliku logu" }
    ] as CommandParameter[],
    keywords: ["tail", "logi", "logs", "monitor", "real-time", "śledź", "follow"]
  },
  {
    id: randomUUID(),
    title: "Wyświetl pierwsze linie pliku",
    command: "head -20 filename.txt",
    category: "files",
    description: "Pokaż początek pliku",
    explanation: "Wyświetla pierwsze 20 linii określonego pliku. Przydatne do szybkiego podglądu zawartości dużych plików.",
    parameters: [
      { flag: "head", description: "Wyświetl początek pliku" },
      { flag: "-20", description: "Liczba linii do wyświetlenia" },
      { flag: "filename.txt", description: "Nazwa pliku" }
    ] as CommandParameter[],
    keywords: ["head", "początek", "pierwszych", "linie", "podgląd", "preview"]
  },
  {
    id: randomUUID(),
    title: "Skopiuj pliki przez SSH",
    command: "scp file.txt user@server:/path/",
    category: "network",
    description: "Prześlij plik na zdalny serwer",
    explanation: "Kopiuje plik na zdalny serwer używając protokołu SSH. Wymaga dostępu SSH do serwera docelowego.",
    parameters: [
      { flag: "scp", description: "Secure Copy - bezpieczne kopiowanie" },
      { flag: "file.txt", description: "Plik do przesłania" },
      { flag: "user@server", description: "Użytkownik i adres serwera" },
      { flag: ":/path/", description: "Ścieżka docelowa na serwerze" }
    ] as CommandParameter[],
    keywords: ["scp", "ssh", "kopiuj", "zdalny", "serwer", "transfer", "upload"]
  },
  {
    id: randomUUID(),
    title: "Połącz się z serwerem SSH",
    command: "ssh user@hostname",
    category: "network",
    description: "Zaloguj się zdalnie przez SSH",
    explanation: "Nawiązuje bezpieczne połączenie SSH z zdalnym serwerem. Po połączeniu możesz wykonywać polecenia na zdalnej maszynie.",
    parameters: [
      { flag: "ssh", description: "Secure Shell - bezpieczna powłoka" },
      { flag: "user@hostname", description: "Użytkownik i adres serwera" }
    ] as CommandParameter[],
    keywords: ["ssh", "zdalny", "połączenie", "serwer", "logowanie", "terminal"]
  },
  {
    id: randomUUID(),
    title: "Wyświetl aktywne połączenia SSH",
    command: "who -u",
    category: "system",
    description: "Pokaż zalogowanych użytkowników SSH",
    explanation: "Wyświetla wszystkich aktualnie zalogowanych użytkowników wraz z informacjami o ich sesjach, w tym połączeniach SSH.",
    parameters: [
      { flag: "who", description: "Pokaż zalogowanych użytkowników" },
      { flag: "-u", description: "Show idle time - pokaż czas bezczynności" }
    ] as CommandParameter[],
    keywords: ["who", "ssh", "zalogowani", "users", "sesje", "connections"]
  },
  {
    id: randomUUID(),
    title: "Sprawdź użycie dysku przez katalogi",
    command: "du -h --max-depth=1",
    category: "system",
    description: "Pokaż rozmiar katalogów na pierwszym poziomie",
    explanation: "Wyświetla rozmiar wszystkich katalogów w bieżącej lokalizacji, bez schodzenia głębiej niż jeden poziom.",
    parameters: [
      { flag: "du", description: "Disk usage - użycie dysku" },
      { flag: "-h", description: "Human readable - czytelny format" },
      { flag: "--max-depth=1", description: "Tylko pierwszy poziom katalogów" }
    ] as CommandParameter[],
    keywords: ["du", "rozmiar", "katalogi", "disk", "space", "usage", "folders"]
  },
  {
    id: randomUUID(),
    title: "Znajdź największe pliki",
    command: "find . -type f -exec ls -lh {} \\; | sort -k5 -hr | head -10",
    category: "files",
    description: "Wyświetl 10 największych plików",
    explanation: "Znajduje wszystkie pliki, sortuje je według rozmiaru i wyświetla 10 największych. Przydatne do znajdowania plików zajmujących dużo miejsca.",
    parameters: [
      { flag: "find . -type f", description: "Znajdź wszystkie pliki" },
      { flag: "-exec ls -lh", description: "Wykonaj ls dla każdego pliku" },
      { flag: "sort -k5 -hr", description: "Sortuj po rozmiarze" },
      { flag: "head -10", description: "Pokaż 10 pierwszych" }
    ] as CommandParameter[],
    keywords: ["find", "biggest", "największe", "pliki", "rozmiar", "sort", "duże"]
  },
  {
    id: randomUUID(),
    title: "Zabij proces według PID",
    command: "kill -9 12345",
    category: "processes",
    description: "Wymuś zakończenie procesu",
    explanation: "Wymusza zakończenie procesu o określonym PID. Sygnał -9 (SIGKILL) nie może być zignorowany przez proces.",
    parameters: [
      { flag: "kill", description: "Zakończ proces" },
      { flag: "-9", description: "SIGKILL - wymuś zakończenie" },
      { flag: "12345", description: "PID procesu do zakończenia" }
    ] as CommandParameter[],
    keywords: ["kill", "pid", "proces", "zabij", "zakończ", "force", "signal"]
  },
  {
    id: randomUUID(),
    title: "Pokaż procesy w drzewie z PID",
    command: "pstree -p",
    category: "processes",
    description: "Wyświetl drzewo procesów z numerami PID",
    explanation: "Pokazuje strukturę procesów w formie drzewa wraz z numerami PID każdego procesu.",
    parameters: [
      { flag: "pstree", description: "Process tree - drzewo procesów" },
      { flag: "-p", description: "Show PIDs - pokaż numery PID" }
    ] as CommandParameter[],
    keywords: ["pstree", "pid", "drzewo", "procesy", "hierarchia", "tree"]
  },
  {
    id: randomUUID(),
    title: "Sprawdź otwarte pliki przez proces",
    command: "lsof -p 12345",
    category: "processes",
    description: "Pokaż pliki otwarte przez proces",
    explanation: "Wyświetla wszystkie pliki, katalogi i połączenia sieciowe otwarte przez określony proces.",
    parameters: [
      { flag: "lsof", description: "List open files" },
      { flag: "-p 12345", description: "PID procesu do sprawdzenia" }
    ] as CommandParameter[],
    keywords: ["lsof", "otwarte", "pliki", "proces", "pid", "files", "open"]
  },
  {
    id: randomUUID(),
    title: "Zmień priorytet procesu",
    command: "renice -10 12345",
    category: "processes",
    description: "Ustaw priorytet uruchomionego procesu",
    explanation: "Zmienia priorytet (nice value) uruchomionego procesu. Niższe wartości = wyższy priorytet.",
    parameters: [
      { flag: "renice", description: "Change process priority" },
      { flag: "-10", description: "Nowa wartość priorytetu" },
      { flag: "12345", description: "PID procesu" }
    ] as CommandParameter[],
    keywords: ["renice", "priorytet", "priority", "nice", "proces", "performance"]
  },
  {
    id: randomUUID(),
    title: "Sprawdź informacje o procesorze",
    command: "lscpu",
    category: "system",
    description: "Wyświetl informacje o procesorze",
    explanation: "Pokazuje szczegółowe informacje o procesorze: architekturę, liczbę rdzeni, częstotliwość i inne parametry.",
    parameters: [
      { flag: "lscpu", description: "List CPU information" }
    ] as CommandParameter[],
    keywords: ["lscpu", "cpu", "procesor", "cores", "rdzenie", "architecture", "info"]
  },
  {
    id: randomUUID(),
    title: "Pokaż informacje o pamięci",
    command: "cat /proc/meminfo",
    category: "system",
    description: "Szczegółowe informacje o pamięci",
    explanation: "Wyświetla kompletne informacje o pamięci systemowej z pliku /proc/meminfo, w tym dostępną, używaną i różne typy pamięci.",
    parameters: [
      { flag: "cat", description: "Wyświetl zawartość pliku" },
      { flag: "/proc/meminfo", description: "Plik z informacjami o pamięci" }
    ] as CommandParameter[],
    keywords: ["meminfo", "pamięć", "memory", "ram", "system", "proc", "info"]
  },
  {
    id: randomUUID(),
    title: "Uruchom polecenie w tle",
    command: "nohup command &",
    category: "processes",
    description: "Uruchom proces w tle, niezależnie od terminala",
    explanation: "Uruchamia polecenie w tle i chroni je przed zakończeniem po zamknięciu terminala. Wyjście zapisywane do nohup.out.",
    parameters: [
      { flag: "nohup", description: "No hang up - nie przerywaj" },
      { flag: "command", description: "Polecenie do uruchomienia" },
      { flag: "&", description: "Uruchom w tle" }
    ] as CommandParameter[],
    keywords: ["nohup", "background", "tle", "daemon", "service", "detach"]
  },
  {
    id: randomUUID(),
    title: "Wyświetl aktywne zadania",
    command: "jobs",
    category: "processes",
    description: "Pokaż zadania uruchomione w tle",
    explanation: "Wyświetla listę wszystkich zadań uruchomionych w bieżącej sesji terminala, zarówno w tle jak i zatrzymanych.",
    parameters: [
      { flag: "jobs", description: "Lista zadań w sesji" }
    ] as CommandParameter[],
    keywords: ["jobs", "zadania", "background", "tle", "processes", "session"]
  },
  {
    id: randomUUID(),
    title: "Aktualizuj listę pakietów (Ubuntu/Debian)",
    command: "sudo apt update",
    category: "system",
    description: "Odśwież listę dostępnych pakietów",
    explanation: "Pobiera najnowsze informacje o pakietach z repozytoriów. To pierwsze polecenie przed instalacją lub aktualizacją pakietów w systemach Ubuntu/Debian.",
    parameters: [
      { flag: "sudo", description: "Uruchom z uprawnieniami administratora" },
      { flag: "apt", description: "Advanced Package Tool" },
      { flag: "update", description: "Zaktualizuj listę pakietów" }
    ] as CommandParameter[],
    keywords: ["apt", "update", "aktualizuj", "pakiety", "ubuntu", "debian", "lista", "refresh"]
  },
  {
    id: randomUUID(),
    title: "Zaktualizuj wszystkie pakiety (Ubuntu/Debian)",
    command: "sudo apt upgrade",
    category: "system",
    description: "Aktualizuj zainstalowane pakiety do najnowszych wersji",
    explanation: "Instaluje najnowsze wersje wszystkich zainstalowanych pakietów. Należy najpierw uruchomić 'apt update' aby odświeżyć listę pakietów.",
    parameters: [
      { flag: "sudo", description: "Uruchom z uprawnieniami administratora" },
      { flag: "apt", description: "Advanced Package Tool" },
      { flag: "upgrade", description: "Aktualizuj pakiety" }
    ] as CommandParameter[],
    keywords: ["apt", "upgrade", "aktualizuj", "pakiety", "ubuntu", "debian", "update", "najnowsze"]
  },
  {
    id: randomUUID(),
    title: "Pełna aktualizacja systemu (Ubuntu/Debian)",
    command: "sudo apt dist-upgrade",
    category: "system",
    description: "Inteligentna aktualizacja z rozwiązywaniem zależności",
    explanation: "Wykonuje pełną aktualizację systemu, może usuwać i instalować pakiety aby rozwiązać konflikty zależności. Bardziej zaawansowane niż zwykły upgrade.",
    parameters: [
      { flag: "sudo", description: "Uruchom z uprawnieniami administratora" },
      { flag: "apt", description: "Advanced Package Tool" },
      { flag: "dist-upgrade", description: "Distribution upgrade - pełna aktualizacja" }
    ] as CommandParameter[],
    keywords: ["apt", "dist-upgrade", "pełna", "aktualizacja", "ubuntu", "debian", "system", "upgrade"]
  },
  {
    id: randomUUID(),
    title: "Aktualizuj system (CentOS/RHEL/Fedora)",
    command: "sudo yum update",
    category: "system",
    description: "Zaktualizuj pakiety w systemach Red Hat",
    explanation: "Aktualizuje wszystkie zainstalowane pakiety do najnowszych wersji w systemach bazujących na Red Hat (CentOS, RHEL, Fedora starsze wersje).",
    parameters: [
      { flag: "sudo", description: "Uruchom z uprawnieniami administratora" },
      { flag: "yum", description: "Yellowdog Updater Modified" },
      { flag: "update", description: "Aktualizuj pakiety" }
    ] as CommandParameter[],
    keywords: ["yum", "update", "aktualizuj", "centos", "rhel", "redhat", "fedora", "pakiety"]
  },
  {
    id: randomUUID(),
    title: "Aktualizuj system (Fedora nowe wersje)",
    command: "sudo dnf upgrade",
    category: "system",
    description: "Zaktualizuj pakiety używając DNF",
    explanation: "DNF to następca YUM w nowszych wersjach Fedora. Aktualizuje wszystkie zainstalowane pakiety do najnowszych wersji.",
    parameters: [
      { flag: "sudo", description: "Uruchom z uprawnieniami administratora" },
      { flag: "dnf", description: "Dandified YUM - następca YUM" },
      { flag: "upgrade", description: "Aktualizuj pakiety" }
    ] as CommandParameter[],
    keywords: ["dnf", "upgrade", "aktualizuj", "fedora", "pakiety", "system", "update"]
  },
  {
    id: randomUUID(),
    title: "Aktualizuj system (Arch Linux)",
    command: "sudo pacman -Syu",
    category: "system",
    description: "Pełna aktualizacja systemu Arch Linux",
    explanation: "Synchronizuje bazy danych pakietów (-Sy) i aktualizuje system (-u). To standardowy sposób aktualizacji w Arch Linux.",
    parameters: [
      { flag: "sudo", description: "Uruchom z uprawnieniami administratora" },
      { flag: "pacman", description: "Package Manager Arch Linux" },
      { flag: "-S", description: "Sync - synchronizuj" },
      { flag: "-y", description: "Refresh - odśwież bazy danych" },
      { flag: "-u", description: "Upgrade - aktualizuj" }
    ] as CommandParameter[],
    keywords: ["pacman", "syu", "aktualizuj", "arch", "linux", "system", "sync", "upgrade"]
  },
  {
    id: randomUUID(),
    title: "Aktualizuj system (openSUSE)",
    command: "sudo zypper update",
    category: "system",
    description: "Zaktualizuj pakiety w openSUSE",
    explanation: "Aktualizuje zainstalowane pakiety do najnowszych wersji w systemie openSUSE używając menedżera pakietów zypper.",
    parameters: [
      { flag: "sudo", description: "Uruchom z uprawnieniami administratora" },
      { flag: "zypper", description: "Menedżer pakietów openSUSE" },
      { flag: "update", description: "Aktualizuj pakiety" }
    ] as CommandParameter[],
    keywords: ["zypper", "update", "aktualizuj", "opensuse", "suse", "pakiety", "system"]
  },
  {
    id: randomUUID(),
    title: "Wyczyść cache pakietów (Ubuntu/Debian)",
    command: "sudo apt autoremove && sudo apt autoclean",
    category: "system",
    description: "Usuń niepotrzebne pakiety i wyczyść cache",
    explanation: "Usuwa pakiety które nie są już potrzebne (autoremove) oraz czyści cache pobranych pakietów (autoclean). Pomaga zwolnić miejsce na dysku.",
    parameters: [
      { flag: "sudo apt autoremove", description: "Usuń niepotrzebne pakiety" },
      { flag: "&&", description: "Wykonaj kolejne polecenie jeśli pierwsze się powiedzie" },
      { flag: "sudo apt autoclean", description: "Wyczyść cache pakietów" }
    ] as CommandParameter[],
    keywords: ["apt", "autoremove", "autoclean", "clean", "cache", "wyczyść", "miejsce", "dysk"]
  },
  {
    id: randomUUID(),
    title: "Sprawdź dostępne aktualizacje (Ubuntu/Debian)",
    command: "apt list --upgradable",
    category: "system",
    description: "Pokaż pakiety dostępne do aktualizacji",
    explanation: "Wyświetla listę pakietów które mogą być zaktualizowane do nowszych wersji. Przydatne do sprawdzenia co zostanie zaktualizowane przed uruchomieniem upgrade.",
    parameters: [
      { flag: "apt list", description: "Lista pakietów" },
      { flag: "--upgradable", description: "Tylko pakiety do aktualizacji" }
    ] as CommandParameter[],
    keywords: ["apt", "list", "upgradable", "aktualizacje", "dostępne", "pakiety", "sprawdź"]
  },
  {
    id: randomUUID(),
    title: "Aktualizuj jądro systemu (Ubuntu/Debian)",
    command: "sudo apt update && sudo apt install linux-generic",
    category: "system",
    description: "Zaktualizuj jądro Linux do najnowszej wersji",
    explanation: "Instaluje najnowszą wersję jądra Linux. Po aktualizacji jądra należy zrestartować system aby zmiany zaczęły obowiązywać.",
    parameters: [
      { flag: "sudo apt update", description: "Odśwież listę pakietów" },
      { flag: "&&", description: "Wykonaj kolejne polecenie po sukcesie" },
      { flag: "sudo apt install linux-generic", description: "Zainstaluj najnowsze jądro" }
    ] as CommandParameter[],
    keywords: ["kernel", "jądro", "linux-generic", "aktualizuj", "system", "ubuntu", "debian"]
  },
  {
    id: randomUUID(),
    title: "Restartuj system po aktualizacji",
    command: "sudo reboot",
    category: "system",
    description: "Zrestartuj komputer",
    explanation: "Restartuje system. Wymagane po niektórych aktualizacjach, szczególnie jądra systemu, aby zmiany zaczęły obowiązywać.",
    parameters: [
      { flag: "sudo", description: "Uruchom z uprawnieniami administratora" },
      { flag: "reboot", description: "Zrestartuj system" }
    ] as CommandParameter[],
    keywords: ["reboot", "restart", "restartuj", "system", "aktualizacja", "kernel"]
  },
  {
    id: randomUUID(),
    title: "Sprawdź wersję systemu",
    command: "lsb_release -a",
    category: "system",
    description: "Wyświetl informacje o wersji dystrybucji",
    explanation: "Pokazuje szczegółowe informacje o zainstalowanej dystrybucji Linux: nazwę, wersję, codename. Przydatne przed i po aktualizacjach.",
    parameters: [
      { flag: "lsb_release", description: "Linux Standard Base release info" },
      { flag: "-a", description: "All - wszystkie informacje" }
    ] as CommandParameter[],
    keywords: ["lsb_release", "wersja", "system", "dystrybucja", "ubuntu", "debian", "info"]
  },
  {
    id: randomUUID(),
    title: "Zainstaluj WSL (Windows Subsystem for Linux)",
    command: "wsl --install",
    category: "system",
    description: "Zainstaluj Windows Subsystem for Linux",
    explanation: "Instaluje WSL w systemie Windows. Domyślnie instaluje Ubuntu. Wymaga uprawnień administratora i restartu systemu.",
    parameters: [
      { flag: "wsl", description: "Windows Subsystem for Linux" },
      { flag: "--install", description: "Zainstaluj WSL" }
    ] as CommandParameter[],
    keywords: ["wsl", "install", "windows", "subsystem", "linux", "ubuntu", "zainstaluj"]
  },
  {
    id: randomUUID(),
    title: "Lista dostępnych dystrybucji WSL",
    command: "wsl --list --online",
    category: "system",
    description: "Wyświetl dostępne dystrybucje Linux do zainstalowania",
    explanation: "Pokazuje listę wszystkich dystrybucji Linux dostępnych do instalacji w WSL, włączając Ubuntu, Debian, SUSE, Kali Linux.",
    parameters: [
      { flag: "wsl", description: "Windows Subsystem for Linux" },
      { flag: "--list", description: "Lista dystrybucji" },
      { flag: "--online", description: "Dostępne online" }
    ] as CommandParameter[],
    keywords: ["wsl", "list", "online", "dystrybucje", "ubuntu", "debian", "kali", "suse"]
  },
  {
    id: randomUUID(),
    title: "Zainstaluj konkretną dystrybucję WSL",
    command: "wsl --install -d Ubuntu-22.04",
    category: "system",
    description: "Zainstaluj określoną dystrybucję Linux",
    explanation: "Instaluje konkretną wersję dystrybucji Linux. Popularne opcje: Ubuntu-22.04, Ubuntu-20.04, Debian, kali-linux.",
    parameters: [
      { flag: "wsl", description: "Windows Subsystem for Linux" },
      { flag: "--install", description: "Zainstaluj" },
      { flag: "-d Ubuntu-22.04", description: "Nazwa dystrybucji" }
    ] as CommandParameter[],
    keywords: ["wsl", "install", "ubuntu", "debian", "kali", "dystrybucja", "konkretna"]
  },
  {
    id: randomUUID(),
    title: "Lista zainstalowanych dystrybucji WSL",
    command: "wsl --list --verbose",
    category: "system",
    description: "Pokaż zainstalowane dystrybucje i ich status",
    explanation: "Wyświetla wszystkie zainstalowane dystrybucje WSL, ich wersję WSL (1 lub 2) i aktualny status (Running/Stopped).",
    parameters: [
      { flag: "wsl", description: "Windows Subsystem for Linux" },
      { flag: "--list", description: "Lista dystrybucji" },
      { flag: "--verbose", description: "Szczegółowe informacje" }
    ] as CommandParameter[],
    keywords: ["wsl", "list", "verbose", "zainstalowane", "status", "running", "stopped"]
  },
  {
    id: randomUUID(),
    title: "Uruchom konkretną dystrybucję WSL",
    command: "wsl -d Ubuntu-22.04",
    category: "system",
    description: "Uruchom określoną dystrybucję Linux",
    explanation: "Uruchamia konkretną dystrybucję WSL. Jeśli nie podasz nazwy, uruchomi domyślną dystrybucję.",
    parameters: [
      { flag: "wsl", description: "Windows Subsystem for Linux" },
      { flag: "-d Ubuntu-22.04", description: "Nazwa dystrybucji do uruchomienia" }
    ] as CommandParameter[],
    keywords: ["wsl", "uruchom", "start", "dystrybucja", "ubuntu", "debian"]
  },
  {
    id: randomUUID(),
    title: "Zatrzymaj dystrybucję WSL",
    command: "wsl --terminate Ubuntu-22.04",
    category: "system",
    description: "Zatrzymaj działającą dystrybucję",
    explanation: "Natychmiast zatrzymuje działającą dystrybucję WSL. Wszystkie procesy w tej dystrybucji zostaną zakończone.",
    parameters: [
      { flag: "wsl", description: "Windows Subsystem for Linux" },
      { flag: "--terminate", description: "Zatrzymaj dystrybucję" },
      { flag: "Ubuntu-22.04", description: "Nazwa dystrybucji" }
    ] as CommandParameter[],
    keywords: ["wsl", "terminate", "stop", "zatrzymaj", "zakończ", "dystrybucja"]
  },
  {
    id: randomUUID(),
    title: "Zatrzymaj wszystkie dystrybucje WSL",
    command: "wsl --shutdown",
    category: "system",
    description: "Zatrzymaj wszystkie działające dystrybucje WSL",
    explanation: "Zatrzymuje wszystkie działające dystrybucje WSL i usługę WSL. WSL zostanie automatycznie uruchomiony przy następnym użyciu.",
    parameters: [
      { flag: "wsl", description: "Windows Subsystem for Linux" },
      { flag: "--shutdown", description: "Zatrzymaj wszystkie" }
    ] as CommandParameter[],
    keywords: ["wsl", "shutdown", "zatrzymaj", "wszystkie", "restart", "usługa"]
  },
  {
    id: randomUUID(),
    title: "Ustaw domyślną dystrybucję WSL",
    command: "wsl --set-default Ubuntu-22.04",
    category: "system",
    description: "Ustaw domyślną dystrybucję Linux",
    explanation: "Ustawia którą dystrybucję WSL uruchomić domyślnie gdy wykonasz polecenie 'wsl' bez parametrów.",
    parameters: [
      { flag: "wsl", description: "Windows Subsystem for Linux" },
      { flag: "--set-default", description: "Ustaw jako domyślną" },
      { flag: "Ubuntu-22.04", description: "Nazwa dystrybucji" }
    ] as CommandParameter[],
    keywords: ["wsl", "set-default", "domyślna", "default", "główna", "dystrybucja"]
  },
  {
    id: randomUUID(),
    title: "Konwertuj dystrybucję do WSL2",
    command: "wsl --set-version Ubuntu-22.04 2",
    category: "system",
    description: "Zmień dystrybucję na WSL2",
    explanation: "Konwertuje dystrybucję z WSL1 do WSL2. WSL2 oferuje lepszą wydajność i pełną kompatybilność z jądrem Linux.",
    parameters: [
      { flag: "wsl", description: "Windows Subsystem for Linux" },
      { flag: "--set-version", description: "Ustaw wersję WSL" },
      { flag: "Ubuntu-22.04", description: "Nazwa dystrybucji" },
      { flag: "2", description: "Wersja WSL (1 lub 2)" }
    ] as CommandParameter[],
    keywords: ["wsl", "set-version", "wsl2", "convert", "konwertuj", "wydajność"]
  },
  {
    id: randomUUID(),
    title: "Usuń dystrybucję WSL",
    command: "wsl --unregister Ubuntu-22.04",
    category: "system",
    description: "Usuń dystrybucję WSL całkowicie",
    explanation: "Całkowicie usuwa dystrybucję WSL wraz z wszystkimi danymi. Ta operacja jest nieodwracalna!",
    parameters: [
      { flag: "wsl", description: "Windows Subsystem for Linux" },
      { flag: "--unregister", description: "Usuń dystrybucję" },
      { flag: "Ubuntu-22.04", description: "Nazwa dystrybucji do usunięcia" }
    ] as CommandParameter[],
    keywords: ["wsl", "unregister", "usuń", "delete", "remove", "dystrybucja"]
  },
  {
    id: randomUUID(),
    title: "Eksportuj dystrybucję WSL",
    command: "wsl --export Ubuntu-22.04 C:\\backup\\ubuntu.tar",
    category: "system",
    description: "Utwórz kopię zapasową dystrybucji",
    explanation: "Eksportuje całą dystrybucję WSL do pliku tar. Przydatne do tworzenia kopii zapasowych lub przenoszenia na inny komputer.",
    parameters: [
      { flag: "wsl", description: "Windows Subsystem for Linux" },
      { flag: "--export", description: "Eksportuj dystrybucję" },
      { flag: "Ubuntu-22.04", description: "Nazwa dystrybucji" },
      { flag: "C:\\backup\\ubuntu.tar", description: "Ścieżka do pliku backup" }
    ] as CommandParameter[],
    keywords: ["wsl", "export", "backup", "kopia", "zapasowa", "tar", "eksport"]
  },
  {
    id: randomUUID(),
    title: "Importuj dystrybucję WSL",
    command: "wsl --import MyUbuntu C:\\WSL\\MyUbuntu C:\\backup\\ubuntu.tar",
    category: "system",
    description: "Przywróć dystrybucję z kopii zapasowej",
    explanation: "Importuje dystrybucję WSL z pliku tar. Pozwala na przywrócenie kopii zapasowej lub sklonowanie dystrybucji.",
    parameters: [
      { flag: "wsl", description: "Windows Subsystem for Linux" },
      { flag: "--import", description: "Importuj dystrybucję" },
      { flag: "MyUbuntu", description: "Nazwa nowej dystrybucji" },
      { flag: "C:\\WSL\\MyUbuntu", description: "Katalog instalacji" },
      { flag: "C:\\backup\\ubuntu.tar", description: "Plik backup do importu" }
    ] as CommandParameter[],
    keywords: ["wsl", "import", "przywróć", "restore", "backup", "tar", "sklonuj"]
  },
  {
    id: randomUUID(),
    title: "Sprawdź status WSL",
    command: "wsl --status",
    category: "system",
    description: "Wyświetl informacje o WSL",
    explanation: "Pokazuje informacje o systemie WSL: domyślną dystrybucję, wersję WSL, status automatycznych aktualizacji jądra.",
    parameters: [
      { flag: "wsl", description: "Windows Subsystem for Linux" },
      { flag: "--status", description: "Status systemu WSL" }
    ] as CommandParameter[],
    keywords: ["wsl", "status", "informacje", "info", "domyślna", "wersja"]
  },
  {
    id: randomUUID(),
    title: "Uruchom polecenie w WSL z Windows",
    command: "wsl ls -la",
    category: "system",
    description: "Wykonaj polecenie Linux z wiersza poleceń Windows",
    explanation: "Uruchamia polecenie Linux w domyślnej dystrybucji WSL bez otwierania shell'a. Przydatne w skryptach Windows.",
    parameters: [
      { flag: "wsl", description: "Windows Subsystem for Linux" },
      { flag: "ls -la", description: "Polecenie Linux do wykonania" }
    ] as CommandParameter[],
    keywords: ["wsl", "polecenie", "command", "execute", "linux", "windows", "cmd"]
  },
  {
    id: randomUUID(),
    title: "Otwórz folder Windows w WSL",
    command: "wsl --cd /mnt/c/Users",
    category: "system",
    description: "Uruchom WSL w określonym katalogu",
    explanation: "Uruchamia WSL i automatycznie przechodzi do podanego katalogu. Katalogi Windows są dostępne w /mnt/c/.",
    parameters: [
      { flag: "wsl", description: "Windows Subsystem for Linux" },
      { flag: "--cd", description: "Change directory - zmień katalog" },
      { flag: "/mnt/c/Users", description: "Ścieżka do katalogu" }
    ] as CommandParameter[],
    keywords: ["wsl", "cd", "katalog", "directory", "folder", "mnt", "windows"]
  }
];

///function toPostgresArray(arr: string[]): string {
///  return '{' + arr.map(s => `"${s.replace(/"/g, '\\"')}"`).join(',') + '}';
///}

async function migrateCommands() {
  try {
    console.log("Migrating commands to database...");

    await db.execute(`DROP TABLE IF EXISTS commands;`);
    await ensureCommandsTable();

    for (const command of initialCommands) {
      await db.insert(commands).values({
        ...command,
        keywords: command.keywords, // przekazujemy zwykłą tablicę JS
      });
    }

    console.log(`Successfully migrated ${initialCommands.length} commands to database!`);
  } catch (error) {
    console.error("Error migrating commands:", error);
    process.exit(1);
  }
}

// Run migration if this file is executed directly
migrateCommands().then(() => {
  console.log("Migration completed!");
  process.exit(0);
});

export { migrateCommands };