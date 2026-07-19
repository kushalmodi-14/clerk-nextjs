import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchGraphQL } from "@/lib/graphql";
import { UserButton } from "@clerk/nextjs";

const GET_USER_DATA = `
  query GetUserData {
    users {
      id
      name
      email
      company {
        name
      }
    }
  }
`;

export default async function DashboardPage() {
  const { getToken, userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const token = await getToken();

  const { data, errors } = await fetchGraphQL(GET_USER_DATA, {}, token);

  const user = data?.users?.[0] || null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans">
      <header className="flex items-center justify-between px-8 py-6 border-b border-white/10 backdrop-blur-md bg-black/20 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-indigo-500/20">
            D
          </div>
          <span className="font-semibold text-xl tracking-tight">Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <UserButton appearance={{ elements: { avatarBox: "w-10 h-10 shadow-lg shadow-indigo-500/20 ring-2 ring-white/10" } }} />
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-8 mt-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to your Dashboard</h1>
          <p className="text-slate-400">Here is the data securely fetched from your backend GraphQL API.</p>
        </div>

        {errors && errors.length > 0 && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 mb-8">
            <h3 className="font-semibold mb-2">GraphQL Errors:</h3>
            <ul className="list-disc list-inside">
              {errors.map((err: any, i: number) => (
                <li key={i}>{err.message}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <h2 className="text-xl font-semibold mb-4 text-indigo-300">Your Profile</h2>
            {user ? (
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-slate-500 mb-1">Name</div>
                  <div className="text-lg font-medium">{user.name}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">Email</div>
                  <div className="text-lg font-medium">{user.email}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">Company</div>
                  <div className="text-lg font-medium">{user.company?.name || "None"}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">User ID</div>
                  <div className="text-xs font-mono bg-black/30 p-2 rounded text-slate-400 break-all">{user.id}</div>
                </div>
              </div>
            ) : (
              <div className="text-slate-400 py-4">
                No user profile found in the database. Ensure your backend is seeded and your user exists.
              </div>
            )}
          </div>
          
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <h2 className="text-xl font-semibold mb-4 text-indigo-300">Authentication Token</h2>
            <p className="text-sm text-slate-400 mb-4">
              This is the Clerk session token that was automatically attached to your GraphQL request in the <code>Authorization: Bearer</code> header.
            </p>
            <div className="bg-black/30 p-4 rounded-xl text-xs font-mono text-slate-300 overflow-x-auto break-all">
              {token}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
