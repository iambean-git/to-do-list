import Header from "@/app/ui/home/header";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex flex-col items-center">
      <Header />
      <main className="w-full max-w-[1200px] p-6 flex flex-col ">{children}</main>
    </div>
  )
}
