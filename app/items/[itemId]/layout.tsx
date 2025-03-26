import Header from "@/app/ui/home/header";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex flex-col items-center  min-h-screen">
      <Header />
      <main className="w-full max-w-[1200px] grow p-4 md:p-6 flex flex-col bg-white items-center">{children}</main>
    </div>
  )
}
