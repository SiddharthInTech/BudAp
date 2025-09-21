import React from 'react'
import { SignedOut, SignInButton, SignUpButton, SignedIn, UserButton } from "@clerk/nextjs"
import Image from 'next/image'
import Link from "next/link"
import { Button } from "@/components/ui/button";
import { LayoutDashboard, PenBox } from 'lucide-react';
import { checkUser } from '@/lib/checkuser';


const Header = async () => {
  await checkUser();
  return (
    <div className='fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b '>

      <nav className='container mx-auto py-4 flex items-center justify-between'>
        <Link href="/">
          <Image
            src="/logo1.png"
            alt='logo image'
            width={100} height={20}
            className='h-20 w-auto object-contain' />
        </Link>

        <div className='flex items-center space-x-2 lg:space-x-4'>

          <SignedIn>
            <Link href={"/dashboard"}>
              <Button variant="outline" className={"cursor-pointer px-6 py-6 rounded-2xl text-md bg-white text-black hover:bg-white"} >
                <LayoutDashboard size={18} />
                <span className='hidden md:inline' >Dashboard</span>
              </Button>
            </Link>

            <Link href={"/transaction/create"}>
              <Button varient="outline" className={"cursor-pointer px-6 py-6 rounded-2xl text-md hover:text-white"} >
                <PenBox size={18} />
                <span className='hidden md:inline' >Add transaction</span>
              </Button>
            </Link>
          </SignedIn>

          <SignedOut>
            <div className='flex gap-3 items-center justify-center'>
              <SignInButton forceRedirectUrl='/dashboard' >
                <Button varient="outline" className={"cursor-pointer px-6 py-6 rounded-2xl text-md"} >Login</Button>
              </SignInButton>
              <SignUpButton>
                <button className="bg-[#6c47ff] text-white rounded-2xl font-small text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                variables: {
                  avatarBoxSize: "72px", // or "72px", "80px", etc.
                }
              }}
            />


          </SignedIn>
        </div>
      </nav>
    </div>
  )
}

export default Header
