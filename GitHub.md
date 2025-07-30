## Nowe repozytorium w GitHub

Na stronie GitHub utwórz nowe repozytorium.

## Wypchnij pliki do utworzonego repozytorium

Oto kroki, aby wypchnąć (pushować) pliki z folderu `LinuxHelper` do Twojego repozytorium na GitHub o nazwie `LinuxHelper`:

1. **Wejdź do folderu projektu w terminalu:**

   ```
   cd E:\REPLIT\LinuxHelper
   ```
2. **Zainicjuj repozytorium git (jeśli jeszcze nie jest):**

   ```
   git init
   ```
3. **Dodaj wszystkie pliki do repozytorium:**

   ```
   git add .
   ```
4. **Zrób pierwszy commit:

   ```
   git commit-m"Initial commit"
   ```
5. Dodaj zdalne repozytorium GitHub (zamień TWOJ_LOGIN na swój login):

```
git remote add origin https://github.com/TWOJ_LOGIN/LinuxHelper.git
```

6.  Wypchnij pliki na GitHub (na główną gałąź):

```
git branch -M maingit push -u origin main
```


 Po tych krokach Twoje pliki będą na GitHubie!


---
