import { signIn } from '@/auth';

export default function SignIn() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('traewelling');
      }}
    >
      <button type="submit">Signin with Traewelling</button>
    </form>
  );
}