import { WorldPage } from "./components/WorldPage";
import { getWorldConfig } from "./worldConfig";

const worldCongig = getWorldConfig();

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      <main className="pt-16">
        <WorldPage config={worldCongig} />
      </main>
    </div>
  );
}

export default App;
