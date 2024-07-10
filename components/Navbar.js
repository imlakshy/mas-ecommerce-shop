"use client"
import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image'

const Navbar = () => {
  const { setTheme } = useTheme()
  return (
    <div class="bg-background lg:pb-12">
      <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
        <header class="flex items-center justify-between py-4 md:py-8">

          <a href="/" class="inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl" aria-label="logo">
            <img src="https://i.postimg.cc/K8VFC1p5/M-s-1.png" alt="Más" className="w-[100px]"/>
          </a>



          <nav class="hidden gap-12 lg:flex">
            <a href="#" class="text-lg font-semibold transition duration-100 hover:text-primary active:text-primary">Home</a>

            <a href="#" class="inline-flex items-center gap-1 text-lg font-semibold hover:text-primary active:text-primary ">
              Deals
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </a>

            <a href="#" class="text-lg font-semibold transition duration-100 hover:text-primary active:text-primary">New Arrivals</a>
            <a href="#" class="text-lg font-semibold transition duration-100 hover:text-primary active:text-primary">About</a>
            <a href="#" class="text-lg font-semibold transition duration-100 hover:text-primary active:text-primary">Help</a>
          </nav>



          <div class="-ml-8 hidden flex-col items-center gap-2.5 sm:flex-row sm:justify-center lg:flex lg:justify-start">
            <a href="#" class="inline-block rounded-lg px-4 py-3 text-center text-sm font-semibold text-gray-500 outline-none  transition duration-100 hover:text-primary focus-visible:ring active:text-primary md:text-base">Sign in</a>

            <a href="#" class="inline-block rounded-lg bg-primary px-8 py-3 text-center text-sm font-semibold text-primary-foreground outline-none  transition duration-100 hover:bg-primary focus-visible:ring active:bg-primary md:text-base">Sign up</a>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <button type="button" class="inline-flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-semibold focus-visible:ring active:text-primary md:text-base lg:hidden">

            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
            </svg>
          </button>

        </header>

      </div>
    </div>
  )
}

export default Navbar
