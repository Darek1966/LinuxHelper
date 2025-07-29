import { db } from "./db";
import { commands } from "@shared/schema";
import { randomUUID } from "crypto";
import type { CommandParameter } from "@shared/schema";

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
  }
];

async function migrateCommands() {
  try {
    console.log("Migrating commands to database...");
    
    // Clear existing commands first
    await db.delete(commands);
    
    // Insert all commands
    for (const command of initialCommands) {
      await db.insert(commands).values(command);
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