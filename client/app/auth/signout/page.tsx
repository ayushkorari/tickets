'use client';

import { useEffect } from "react";
import useRequest from "@/hooks/use-request";
import { useRouter } from 'next/navigation'
import { useUser } from "@/context/user-context";

export default function Signout() {
  const { login } = useUser();
  const {doRequest} = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => {
      login(null);
      router.push('/');
      router.refresh();
    }
  });
  const router = useRouter();

  useEffect(() => {
    doRequest();
  },[]);

  return (
    <h1>Signing you out...</h1>
  );
}
