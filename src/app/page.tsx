import LoginForm from "@/components/forms/LoginForm";
import Logo from "@/components/layout/Logo";

export default function Home() {
  return (
    <div className="flex bg-lightGrey flex-col items-center justify-center min-h-screen gap-[50px] max-sm:gap-12 max-sm:bg-white max-sm:p-[0px]">
      <Logo />
      <LoginForm/>
    </div>
    
  );
}
