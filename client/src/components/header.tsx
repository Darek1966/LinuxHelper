import { Bookmark, History, Terminal } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
              <Terminal className="text-white w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">LinuxHelper</h1>
              <p className="text-sm text-slate-500">Twój asystent poleceń Linux</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center space-x-4">
            <button className="text-slate-600 hover:text-slate-800 transition-colors flex items-center space-x-2">
              <Bookmark className="w-4 h-4" />
              <span className="text-sm">Zapisane</span>
            </button>
            <button className="text-slate-600 hover:text-slate-800 transition-colors flex items-center space-x-2">
              <History className="w-4 h-4" />
              <span className="text-sm">Historia</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
