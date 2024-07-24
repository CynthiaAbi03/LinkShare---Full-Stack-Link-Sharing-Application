import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
function AuthLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <div className="">
      <Navbar />
      {children}
    </div>
  );
}

export default AuthLayout;
