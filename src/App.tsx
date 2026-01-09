import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { PatientsPage } from "./pages/patients/PatientsPage"
import { Sidebar } from "./components/Sidebar"

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen">
        <Sidebar />
        <PatientsPage />
      </div>
    </QueryClientProvider>
  )
}
