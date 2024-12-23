import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DeviceManagement } from './pages/DeviceManagement';
import { EmployeeManagement } from './pages/EmployeeManagement';
import Layout from './components/layout/Sidebar';
import { useEffect } from 'react';

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    // Add dark class to html element
    document.documentElement.classList.add('dark')
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<DeviceManagement />} />
            <Route path="/employees" element={<EmployeeManagement />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
