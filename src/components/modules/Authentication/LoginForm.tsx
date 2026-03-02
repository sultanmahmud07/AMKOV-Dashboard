import { useState } from "react"; // Import useState
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import config from "@/config";
import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { IApiError } from "@/types";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router"; 
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
// Added Eye and EyeOff icons
import { User, Package, Eye, EyeOff } from "lucide-react"; 

export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();
  const form = useForm({});
  const { setValue } = form; 

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await login(data).unwrap();
      console.log(res);

      if (res.success) {
        toast.success("Logged in successfully");
        if (res.data.user.role === "SENDER") {
          navigate("/sender/overview");
        } else if (res.data.user.role === "RECEIVER") {
          navigate("/receiver/overview");
        } else if (
          res.data.user.role === "SUPER_ADMIN" ||
          res.data.user.role === "ADMIN"
        ) {
          navigate("/admin/analytics");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      console.log(err);
      const error = err as IApiError;
      toast.error(`${error.data.message}`);
    }
  };

  const fillCredentials = (role: 'sender' | 'receiver') => {
    if (role === 'sender') {
      setValue("email", "sender@gmail.com");
      setValue("password", "S@12345678");
    } else {
      setValue("email", "receiver@gmail.com");
      setValue("password", "R@12345678");
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-[#111827] dark:text-white">
          Welcome back
        </h1>
        <p className="text-balance text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button 
          variant="outline" 
          onClick={() => fillCredentials('sender')}
          className="flex flex-col h-auto py-3 items-center gap-1 border-dashed border-gray-300 dark:border-gray-700 hover:border-[#FA4318] hover:text-[#FA4318] hover:bg-[#FA4318]/5 transition-colors"
        >
          <Package size={20} className="mb-1" />
          <span className="font-semibold text-xs uppercase">Demo Sender</span>
        </Button>

        <Button 
          variant="outline" 
          onClick={() => fillCredentials('receiver')}
          className="flex flex-col h-auto py-3 items-center gap-1 border-dashed border-gray-300 dark:border-gray-700 hover:border-[#FA4318] hover:text-[#FA4318] hover:bg-[#FA4318]/5 transition-colors"
        >
          <User size={20} className="mb-1" />
          <span className="font-semibold text-xs uppercase">Demo Receiver</span>
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    className="h-12 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus-visible:ring-[#FA4318]"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  {/* <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-[#FA4318] hover:underline"
                  >
                    Forgot password?
                  </Link> */}
                </div>
                <FormControl>
                  <div className="relative">
                    <Input
                      // Toggle between 'text' and 'password'
                      type={showPassword ? "text" : "password"} 
                      placeholder="********"
                      className="h-12 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus-visible:ring-[#FA4318] pr-10"
                      {...field}
                      value={field.value || ""}
                    />
                    {/* The Eye Button */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#FA4318] transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full h-12 bg-[#FA4318] hover:bg-orange-700 text-white font-bold text-base shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-200 dark:border-gray-700" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <Button
        onClick={() => window.open(`${config.baseUrl}/auth/google`)}
        type="button"
        variant="outline"
        className="w-full h-12 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 flex items-center gap-2 font-medium"
      >
        <FcGoogle className="h-5 w-5" />
        Login with Google
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link 
          to="/register" 
          replace 
          className="font-semibold text-[#FA4318] hover:underline underline-offset-4"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}