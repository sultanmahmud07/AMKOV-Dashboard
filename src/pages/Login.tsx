import loginImg from "@/assets/images/login-img-2.jpg";
import { LoginForm } from "@/components/modules/Authentication/LoginForm";

export default function Login() {
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-[800px] mt-20">
      {/* Left Side: Form */}
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="mx-auto grid w-full max-w-[450px] gap-6">
          <LoginForm />
        </div>
      </div>

      {/* Right Side: Image */}
      <div className="hidden bg-muted lg:block relative overflow-hidden">
        <img
          src={loginImg}
          alt="Login Visual"
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
        />
        {/* Optional: Dark Overlay for better contrast if you add text later */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
    </div>
  );
}