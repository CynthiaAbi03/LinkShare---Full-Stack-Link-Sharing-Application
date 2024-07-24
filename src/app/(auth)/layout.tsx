import Image from 'next/image';
import Logo from '@/components/layout/Logo';
function AuthLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <div className="flex bg-lightGrey flex-col items-center justify-center min-h-screen gap-[50px]">
      <Logo />
      {children}
    </div>
  );
}

export default AuthLayout;
