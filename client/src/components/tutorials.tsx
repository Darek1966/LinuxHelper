
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Circle, Play, ArrowRight, ArrowLeft, BookOpen, Terminal } from 'lucide-react';

interface TutorialStep {
  id: number;
  title: string;
  description: string;
  command: string;
  explanation: string;
  tips?: string;
  warning?: string;
}

interface Tutorial {
  id: string;
  title: string;
  description: string;
  difficulty: 'początkujący' | 'średnio-zaawansowany' | 'zaawansowany';
  estimatedTime: string;
  category: string;
  steps: TutorialStep[];
}

const tutorials: Tutorial[] = [
  {
    id: 'file-management',
    title: 'Zarządzanie plikami i katalogami',
    description: 'Naucz się podstawowych operacji na plikach: tworzenie, kopiowanie, przenoszenie i usuwanie',
    difficulty: 'początkujący',
    estimatedTime: '10 min',
    category: 'files',
    steps: [
      {
        id: 1,
        title: 'Sprawdź bieżący katalog',
        description: 'Zacznij od sprawdzenia, w którym katalogu aktualnie się znajdujesz',
        command: 'pwd',
        explanation: 'Polecenie pwd (print working directory) wyświetla pełną ścieżkę do katalogu, w którym obecnie pracujesz.',
        tips: 'To polecenie nie wymaga żadnych parametrów i zawsze jest bezpieczne do użycia.'
      },
      {
        id: 2,
        title: 'Zobacz zawartość katalogu',
        description: 'Wyświetl pliki i katalogi w bieżącej lokalizacji',
        command: 'ls -la',
        explanation: 'Polecenie ls pokazuje zawartość katalogu. Opcja -l wyświetla szczegółowe informacje, a -a pokazuje również ukryte pliki.',
        tips: 'Ukryte pliki w Linuxie zaczynają się od kropki (np. .bashrc)'
      },
      {
        id: 3,
        title: 'Utwórz nowy katalog',
        description: 'Stwórz katalog do ćwiczeń',
        command: 'mkdir tutorial_test',
        explanation: 'mkdir tworzy nowy katalog o podanej nazwie. Nazwa nie może zawierać spacji (użyj _ lub -).',
        tips: 'Możesz utworzyć kilka katalogów naraz: mkdir dir1 dir2 dir3'
      },
      {
        id: 4,
        title: 'Przejdź do nowego katalogu',
        description: 'Zmień bieżący katalog na utworzony',
        command: 'cd tutorial_test',
        explanation: 'cd (change directory) zmienia bieżący katalog roboczy na wskazany.',
        tips: 'Użyj "cd .." aby wrócić do katalogu nadrzędnego, lub "cd ~" aby przejść do katalogu domowego'
      },
      {
        id: 5,
        title: 'Utwórz plik testowy',
        description: 'Stwórz prosty plik tekstowy',
        command: 'touch test.txt',
        explanation: 'touch tworzy pusty plik lub aktualizuje datę modyfikacji istniejącego pliku.',
        tips: 'Możesz utworzyć kilka plików naraz: touch plik1.txt plik2.txt'
      },
      {
        id: 6,
        title: 'Skopiuj plik',
        description: 'Utwórz kopię pliku z nową nazwą',
        command: 'cp test.txt test_kopia.txt',
        explanation: 'cp kopiuje plik z pierwszej lokalizacji do drugiej. Oryginalny plik pozostaje nietknięty.',
        tips: 'Aby skopiować katalog, użyj opcji -r: "cp -r katalog1 katalog2"'
      },
      {
        id: 7,
        title: 'Przenieś plik',
        description: 'Zmień nazwę pliku lub przenieś go',
        command: 'mv test_kopia.txt renamed.txt',
        explanation: 'mv może służyć do przenoszenia plików między katalogami lub zmiany nazwy (jak w tym przypadku).',
        tips: 'mv nie tworzy kopii - oryginalny plik przestaje istnieć pod starą nazwą'
      },
      {
        id: 8,
        title: 'Usuń pliki',
        description: 'Wyczyść utworzone pliki testowe',
        command: 'rm test.txt renamed.txt',
        explanation: 'rm usuwa pliki. Bądź ostrożny - usunięte pliki nie trafiają do kosza!',
        warning: 'UWAGA: rm trwale usuwa pliki! Nie ma możliwości ich odzyskania.',
      }
    ]
  },
  {
    id: 'process-management',
    title: 'Zarządzanie procesami',
    description: 'Poznaj jak monitorować i kontrolować procesy w systemie Linux',
    difficulty: 'średnio-zaawansowany',
    estimatedTime: '15 min',
    category: 'processes',
    steps: [
      {
        id: 1,
        title: 'Zobacz wszystkie procesy',
        description: 'Wyświetl listę wszystkich uruchomionych procesów',
        command: 'ps aux',
        explanation: 'ps aux pokazuje wszystkie procesy w systemie z szczegółowymi informacjami o użyciu CPU i pamięci.',
        tips: 'Kolumny: USER (użytkownik), PID (ID procesu), %CPU (użycie CPU), %MEM (użycie pamięci), COMMAND (polecenie)'
      },
      {
        id: 2,
        title: 'Monitoruj procesy w czasie rzeczywistym',
        description: 'Uruchom interaktywny monitor procesów',
        command: 'top',
        explanation: 'top wyświetla procesy w czasie rzeczywistym, sortowane według użycia CPU.',
        tips: 'W top naciśnij "q" aby wyjść, "P" sortuj po CPU, "M" sortuj po pamięci'
      },
      {
        id: 3,
        title: 'Znajdź konkretny proces',
        description: 'Wyszukaj proces po nazwie',
        command: 'pgrep -l firefox',
        explanation: 'pgrep znajduje procesy pasujące do wzorca nazwy. Opcja -l pokazuje też nazwy procesów.',
        tips: 'Możesz używać wzorców: pgrep -l "python*" znajdzie wszystkie procesy Pythona'
      },
      {
        id: 4,
        title: 'Zakończ proces bezpiecznie',
        description: 'Wyślij sygnał TERM do procesu',
        command: 'kill PID',
        explanation: 'kill wysyła sygnały do procesów. Domyślnie wysyła TERM, który prosi proces o zakończenie.',
        tips: 'Zastąp PID rzeczywistym numerem procesu z poprzednich kroków'
      },
      {
        id: 5,
        title: 'Wymuś zakończenie procesu',
        description: 'Użyj sygnału KILL dla zablokowanych procesów',
        command: 'kill -9 PID',
        explanation: 'kill -9 (SIGKILL) natychmiast kończy proces bez możliwości czystego zamknięcia.',
        warning: 'Używaj -9 tylko gdy proces nie odpowiada na zwykły kill!'
      }
    ]
  },
  {
    id: 'system-monitoring',
    title: 'Monitorowanie systemu',
    description: 'Naucz się sprawdzać stan systemu, obciążenie i zasoby',
    difficulty: 'średnio-zaawansowany',
    estimatedTime: '12 min',
    category: 'system',
    steps: [
      {
        id: 1,
        title: 'Sprawdź czas działania systemu',
        description: 'Zobacz jak długo system jest uruchomiony',
        command: 'uptime',
        explanation: 'uptime pokazuje czas działania systemu, liczbę użytkowników i średnie obciążenie.',
        tips: 'Liczba load average: 1min, 5min, 15min - wartości poniżej liczby CPU są OK'
      },
      {
        id: 2,
        title: 'Sprawdź użycie dysku',
        description: 'Zobacz ile miejsca zajmują systemy plików',
        command: 'df -h',
        explanation: 'df pokazuje użycie przestrzeni dyskowej. Opcja -h wyświetla rozmiary w czytelnej formie (GB, MB).',
        tips: 'Zwróć uwagę na kolumnę "Use%" - wartości powyżej 90% mogą być problematyczne'
      },
      {
        id: 3,
        title: 'Sprawdź użycie pamięci',
        description: 'Zobacz stan pamięci RAM i swap',
        command: 'free -h',
        explanation: 'free pokazuje użycie pamięci RAM i przestrzeni wymiany (swap).',
        tips: 'Pamięć "available" to ilość rzeczywiście dostępna dla nowych aplikacji'
      },
      {
        id: 4,
        title: 'Sprawdź informacje o procesorze',
        description: 'Zobacz szczegóły dotyczące CPU',
        command: 'lscpu',
        explanation: 'lscpu wyświetla szczegółowe informacje o procesorze: model, rdzenie, częstotliwość.',
        tips: 'Przydatne do sprawdzenia wydajności i architektury systemu'
      },
      {
        id: 5,
        title: 'Zobacz aktywność dysku',
        description: 'Monitoruj operacje wejścia/wyjścia',
        command: 'iostat 2 5',
        explanation: 'iostat pokazuje statystyki I/O. Parametr "2 5" oznacza: odświeżaj co 2 sekundy, 5 razy.',
        tips: 'Wysokie wartości %iowait mogą oznaczać problemy z wydajnością dysku'
      }
    ]
  }
];

const difficultyColors = {
  'początkujący': 'bg-green-100 text-green-800',
  'średnio-zaawansowany': 'bg-yellow-100 text-yellow-800',
  'zaawansowany': 'bg-red-100 text-red-800'
};

export function Tutorials() {
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const handleStartTutorial = (tutorial: Tutorial) => {
    setSelectedTutorial(tutorial);
    setCurrentStep(0);
    setCompletedSteps(new Set());
  };

  const handleStepComplete = (stepId: number) => {
    setCompletedSteps(prev => new Set([...prev, stepId]));
  };

  const handleNextStep = () => {
    if (selectedTutorial && currentStep < selectedTutorial.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBackToTutorials = () => {
    setSelectedTutorial(null);
    setCurrentStep(0);
    setCompletedSteps(new Set());
  };

  const progress = selectedTutorial 
    ? (completedSteps.size / selectedTutorial.steps.length) * 100 
    : 0;

  if (!selectedTutorial) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-foreground mb-2">Interaktywne Samouczki</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Naucz się Linux krok po kroku dzięki praktycznym samouczkom. 
            Każdy tutorial zawiera szczegółowe wyjaśnienia i przydatne wskazówki.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tutorials.map((tutorial) => (
            <Card key={tutorial.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                  <Badge className={difficultyColors[tutorial.difficulty]}>
                    {tutorial.difficulty}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{tutorial.description}</p>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-muted-foreground">
                    📚 {tutorial.steps.length} kroków
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ⏱️ {tutorial.estimatedTime}
                  </span>
                </div>
                <Button 
                  onClick={() => handleStartTutorial(tutorial)}
                  className="w-full"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Rozpocznij Tutorial
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const currentStepData = selectedTutorial.steps[currentStep];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={handleBackToTutorials}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Powrót do tutoriali
        </Button>
        <Badge className={difficultyColors[selectedTutorial.difficulty]}>
          {selectedTutorial.difficulty}
        </Badge>
      </div>

      {/* Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="w-5 h-5" />
            {selectedTutorial.title}
          </CardTitle>
          <p className="text-muted-foreground">{selectedTutorial.description}</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Postęp: {completedSteps.size} z {selectedTutorial.steps.length} kroków</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </CardContent>
      </Card>

      {/* Current Step */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {completedSteps.has(currentStepData.id) ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : (
                <Circle className="w-6 h-6 text-muted-foreground" />
              )}
              <div>
                <CardTitle>Krok {currentStep + 1}: {currentStepData.title}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {currentStepData.description}
                </p>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Command */}
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono">
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-400">$</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigator.clipboard.writeText(currentStepData.command)}
                className="text-gray-400 hover:text-white"
              >
                Kopiuj
              </Button>
            </div>
            <code className="text-lg">{currentStepData.command}</code>
          </div>

          {/* Explanation */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">💡 Wyjaśnienie</h4>
            <p className="text-sm">{currentStepData.explanation}</p>
          </div>

          {/* Tips */}
          {currentStepData.tips && (
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 text-green-800">✨ Wskazówka</h4>
              <p className="text-sm text-green-700">{currentStepData.tips}</p>
            </div>
          )}

          {/* Warning */}
          {currentStepData.warning && (
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h4 className="font-semibold mb-2 text-red-800">⚠️ Ostrzeżenie</h4>
              <p className="text-sm text-red-700">{currentStepData.warning}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handlePrevStep}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Poprzedni
            </Button>

            <div className="flex gap-2">
              <Button
                variant={completedSteps.has(currentStepData.id) ? "secondary" : "default"}
                onClick={() => handleStepComplete(currentStepData.id)}
              >
                {completedSteps.has(currentStepData.id) ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Ukończone
                  </>
                ) : (
                  "Oznacz jako ukończone"
                )}
              </Button>

              <Button
                onClick={handleNextStep}
                disabled={currentStep === selectedTutorial.steps.length - 1}
              >
                Następny
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Steps Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Przegląd kroków</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {selectedTutorial.steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                  index === currentStep 
                    ? 'bg-blue-50 border border-blue-200' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setCurrentStep(index)}
              >
                {completedSteps.has(step.id) ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground" />
                )}
                <div className="flex-1">
                  <div className="font-medium">Krok {index + 1}: {step.title}</div>
                  <div className="text-sm text-muted-foreground font-mono">
                    {step.command}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
