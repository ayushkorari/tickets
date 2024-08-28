import axios from "axios";
import { cookies, headers } from "next/headers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Ticketing",
};

export default async function Home() {
  try {
    const headersList = headers()
    const res = await axios.get(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
      {
        headers: headersList as any
      } 
    );
    console.log(res.data, cookies().get('session'), '====')
    return (
      <h1>
        {res.data.currentUser ? "Signed In" : "Not signed in"}
      </h1>
    );
  } catch (error) {
    return <h1>error</h1>
  }
}