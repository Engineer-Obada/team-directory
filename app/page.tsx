import TeamDirectory from "@/components/team-directory/TeamDirectory";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F6F0] px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-[#08291F]">
            Team Directory
          </h1>

          <p className="mt-2 text-[#52645B]">
            Browse and manage your team members.
          </p>
        </header>

        <TeamDirectory />
      </div>
    </main>
  );
}