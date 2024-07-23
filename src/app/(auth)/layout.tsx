import Image from 'next/image';
import Logo from '@/components/common/Logo';
function AuthLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className=''>
       <Logo/>
      </div>
      {children}
    </div>
  );
}

export default AuthLayout;
