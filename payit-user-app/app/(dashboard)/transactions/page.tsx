import { Button } from "../../../@/shad/ui/button";
import { Transactions } from "../../../components/Transactions";
import { getTransactions } from "../../lib/actions/getTransactions";

export default async function () {
  let demo = await getTransactions();
  return <Transactions transactions={demo}></Transactions>;
}
