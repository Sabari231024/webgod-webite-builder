"use client";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { MessagesContainer } from "../components/messages-containers";
import { Fragment, Suspense, useState } from "react";
import { Fragment } from "@/generated/prisma";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectHeader } from "../components/project-header";
import { FragmentWeb } from "../components/fragment-web";
import { EyeIcon, CodeIcon, CrownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CodeView } from "@/components/code-view";
import { FileExplorer } from "@/components/file-explorer";

interface Props {
    projectId: string;
};

export const ProjectView  = ({projectId}:Props)=> {
    const [activeFragment, setActiveFragment] = useState<Fragment|null>(null);
    const [tabState, setTabState] = useState<"Preview"|"Code">("Preview");
    return (
        <div className="h-screen">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel 
                    defaultSize={35}
                    minSize={20}
                    className="flex flex-col min-h-0">
                    <Suspense fallback={<p>Loading...</p>}>
                        <ProjectHeader projectId={projectId}/>
                    </Suspense>
                    <Suspense fallback={<p>Loading...</p>}>
                        <MessagesContainer 
                        projectId={projectId}
                        activeFragment={activeFragment}
                        setActiveFragment={setActiveFragment}
                        />
                    </Suspense>
                </ResizablePanel>
                <ResizableHandle withHandle/>
                <ResizablePanel
                defaultSize={65}
                minSize={50}>
                    <Tabs
                    className="h-full gap-y-0"
                    defaultValue="Preview"
                    value={tabState}
                    onValueChange={(value) => setTabState(value as "Preview" | "Code")}
                    >
                        <div className="w-full flex items-center p-2 border-b gap-x-2">
                        <TabsList className="h-8 p-0 border rounded-md">
                            <TabsTrigger value="Preview" className="rounded-md">
                               <EyeIcon>
                                <span>Preview</span>
                               </EyeIcon>
                               </TabsTrigger>
                               <TabsTrigger value="Code" className="rounded-md">
                               <CodeIcon>
                                <span>Code</span>
                               </CodeIcon>
                               </TabsTrigger>
                            {!!activeFragment && <FragmentWeb data={activeFragment}/>}
                            </TabsList>
                            <div className="ml-auto flex items-center-center gap-x-2">
                                <Button asChild size="sm" variant="default">
                                    <Link href="/pricing">
                                    <CrownIcon /> Upgrade
                                    </Link>
                                </Button>
                            </div>
                        </div>
                        <TabsContent value="Preview">
                            {!!activeFragment && <FragmentWeb data={activeFragment}/>}
                        </TabsContent>
                        <TabsContent value="Code" className="min-h-0">
                            {!!activeFragment?.files && (
                                <FileExplorer
                                files={activeFragment.files as {[path:string]:string}}
                                />
                            )}
                        </TabsContent>
                    </Tabs>
                    
                </ResizablePanel>
            
            </ResizablePanelGroup>
            </div>
    )
}; 