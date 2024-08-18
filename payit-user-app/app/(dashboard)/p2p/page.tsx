import { getServerSession } from "next-auth";
import { SendCard } from "../../../components/SendCard";
import { getAllUsers } from "../../lib/actions/getAllUsers";
import { authOptions } from "../../lib/auth";

export default async function () {
  const { user } = await getServerSession(authOptions);
  let res = await getAllUsers();
  const filterU = res?.msg.filter((v: any) => {
    if (v.name != user.name) {
      return v;
    }
  });
  return (
    <div className="w-full h-screen ">
      <div className="text-4xl antialiased text-black text-center pt-8 mb-8 mt-4 md:mt-8 font-bold ml-2 mr-2">
        Peer to Peer Transaction
      </div>
      <div className="flex w-full justify-center">
        <SendCard alluser={filterU} />
      </div>
    </div>
  );
}
