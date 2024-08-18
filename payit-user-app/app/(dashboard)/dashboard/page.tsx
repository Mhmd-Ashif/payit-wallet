import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";
import { DashboardPage } from "../../../components/DashboardPage";
import { getDetails } from "../../lib/actions/getDetails";
import { getTransactions } from "../../lib/actions/getTransactions";
export default async function () {
  const session = await getServerSession(authOptions);
  const res = await getDetails();
  let { allTransactions } = await getTransactions();
  if (!session) {
    redirect("/errorpage");
  } else {
    return (
      <>
        <DashboardPage
          name={res?.name || "null"}
          amount={res?.Balance[0]?.amount || 0}
          recent={allTransactions || null}
        ></DashboardPage>
      </>
    );
  }
}
