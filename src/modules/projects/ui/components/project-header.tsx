import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ChevronDownIcon, ChevronLastIcon, SunMoonIcon} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,

} from "@/components/ui/dropdown-menu";


interface Props { 
    projectId: string;
}

export const ProjectHeader = ({projectId}:Props)=>{
    const trpc = useTRPC();
    const {data: project} = useSuspenseQuery(trpc.projects.getOne.queryOptions({id:projectId}));
    const {setTheme, theme} = useTheme();

    return (
    <header className="p-2 flex justify-between items-center border-b">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                variant="ghost"
                size="sm"
                className="focus-visible:ring-0 hover:bg-transparent hover:opacity-75 transition-opacity pl-2!">

                    <Image 
                    src="/logo.png"
                    alt="WebGod Logo"
                    width={24}
                    height={24}
                    className="rounded-full"
                    />
                    <span className="text-sm font-medium">{project?.name?.toUpperCase()}</span>

                    <ChevronDownIcon className="size-4"/>
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="bottom" align="start">
                        <DropdownMenuItem asChild>
                            <Link href="/">
                            <ChevronLastIcon />
                            <span>Go to DashBoard</span>
                            </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuSub>
                                    <DropdownMenuSubTrigger className="gap-2">
                                        <SunMoonIcon className="size-4 text-muted-foreground" />
                                        <span>Appearance</span>
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                                                <DropdownMenuRadioItem value="light">
                                                    <span>Light</span>
                                                </DropdownMenuRadioItem>
                                                <DropdownMenuRadioItem value="dark">
                                                    <span>Dark</span>
                                                </DropdownMenuRadioItem>
                                                <DropdownMenuRadioItem value="System">
                                                    <span>System</span>
                                                </DropdownMenuRadioItem>
                                            </DropdownMenuRadioGroup>
                                            </DropdownMenuSubContent>

                                        </DropdownMenuPortal>
                            </DropdownMenuSub>
                    </DropdownMenuContent>
            </DropdownMenu>     
    </header>
    );
}

