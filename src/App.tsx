import { Toaster } from "./components/ui/sonner";
import { CipherInterface } from "./components/CipherInterface";

function App() {
  return (
    <main className="dark bg-background text-foreground min-h-screen p-4 sm:p-6 md:p-8">
      <div className="container mx-auto">
        <CipherInterface />
        <Toaster />
      </div>
    </main>
  );
}

export default App;
