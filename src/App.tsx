import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { PatientsPage } from "./pages/patients/PatientsPage"

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen">
        <PatientsPage />
      </div>
    </QueryClientProvider>
  )
}
