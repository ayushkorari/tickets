'use client';

import { FormEvent, useState } from "react";
import useRequest from "@/hooks/use-request";
import { useRouter } from 'next/navigation'
import { useUser } from "@/context/user-context";

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useUser();
  const {doRequest, errors} = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {email, password},
    onSuccess: (data) => {
      login(data);
      router.push('/');
      router.refresh();
    }
  });
  const router = useRouter();

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    doRequest();
  }
  return (
    <form onSubmit={onSubmit}>
      <h1>Signin</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input value={email} onChange={e => setEmail(e.target.value)} className="form-control" />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" />
      </div>
      {
      !!errors!.length &&  
      <div className="alert alert-danger">
        <h4>Ooops...</h4>
        <ul className="my-0">
          {
            errors.map(
              (err: any) => <li key={err.message}>{err.message}</li>
            )
          }
        </ul>
      </div>
      }
      <button className="btn btn-primary">Signin</button>
    </form>
  );
}
