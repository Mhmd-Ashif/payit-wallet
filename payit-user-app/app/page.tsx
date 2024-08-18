import { Dashboard } from "../components/Dashboard";

export default async function Page() {
  return (
    <>
      <Dashboard></Dashboard>
    </>
  );
  // const session = await getServerSession(authOptions);
  // if (session?.user) {
  //   redirect('/dashboard')
  // } else {
  //   redirect('/api/auth/signin')
  // }
}
