import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
