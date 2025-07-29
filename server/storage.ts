import { type User, type InsertUser, type Command, type InsertCommand, type CommandParameter } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  searchCommands(query: string, category?: string): Promise<Command[]>;
  getCommandsByCategory(category: string): Promise<Command[]>;
  getAllCommands(): Promise<Command[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private commands: Map<string, Command>;

  constructor() {
    this.users = new Map();
    this.commands = new Map();
    this.initializeCommands();
  }

  private initializeCommands() {
    const initialCommands: Command[] = [
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
        ],
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
        ],
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
        ],
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
        ],
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
        ],
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
        ],
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
        ],
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
        ],
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
        ],
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
        ],
        keywords: ["uprawnienia", "chmod", "permissions", "755", "777", "644"]
      }
    ];

    initialCommands.forEach(command => {
      this.commands.set(command.id, command);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async searchCommands(query: string, category?: string): Promise<Command[]> {
    const allCommands = Array.from(this.commands.values());
    
    if (!query && !category) {
      return allCommands;
    }

    let filteredCommands = allCommands;

    // Filter by category if specified
    if (category && category !== 'all') {
      filteredCommands = filteredCommands.filter(cmd => cmd.category === category);
    }

    // Search by query if specified
    if (query) {
      const searchTerms = query.toLowerCase().split(' ');
      filteredCommands = filteredCommands.filter(cmd => {
        const searchableText = [
          cmd.title,
          cmd.description,
          cmd.explanation,
          cmd.command,
          ...cmd.keywords
        ].join(' ').toLowerCase();

        return searchTerms.some(term => searchableText.includes(term));
      });
    }

    return filteredCommands;
  }

  async getCommandsByCategory(category: string): Promise<Command[]> {
    const allCommands = Array.from(this.commands.values());
    if (category === 'all') {
      return allCommands;
    }
    return allCommands.filter(cmd => cmd.category === category);
  }

  async getAllCommands(): Promise<Command[]> {
    return Array.from(this.commands.values());
  }
}

export const storage = new MemStorage();
