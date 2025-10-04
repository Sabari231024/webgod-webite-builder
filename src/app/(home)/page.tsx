import { ProjectForm } from "@/modules/home/ui/components/project-form";
import { ProjectsList } from "@/modules/home/ui/components/projects-list";
import Image from "next/image";

const Page = () => {
  return (
    <div className="flex flex-col max-2-5xl mx-auto w-full">
      <section className="space-y-6 py-[16vh] 2xl:py-68">
          <div className="flex flex-col items-center">
            <Image 
            src="/logo.png"
            alt="WebGod Logo"
            width={100}
            height={100}
            className="hidden md:block rounded-full"
            />
          </div>
          <h1 className="text-2xl md:text-5xl font-bold text-center"> 
            BUILD WITH GOD! 
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground text-center">
            Create apps and websites to the AI
          </p>
          <div className="max-w-3xl mx-auto w-full">
              <ProjectForm />
          </div>
      </section>
      <ProjectsList />
    </div>
  );
}
export default Page;