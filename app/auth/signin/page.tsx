import { getProviders, signIn } from "next-auth/react"
import Image from "next/image";
import SignInComponent from "./SignInComponent";

async function SignInPage() {

  const providers = await getProviders();

  return (
    <div className="grid justify-center items-center">
      <div>
        <Image
          src={'https://1000logos.net/wp-content/uploads/2021/10/logo-Meta.png'}
          alt="Meta Logo"
          width={500}
          height={500}
          className="rounded-full mx-2 object-cover"
        />
      </div>

      <SignInComponent providers={providers}/>
    </div>
  )
}

export default SignInPage