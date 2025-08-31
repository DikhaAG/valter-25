// src/components/signout-button.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, LoaderCircle, } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export function SignOutButton() {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const router = useRouter()

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/auth/signin")
          }
        }
      }); // Redirect ke halaman utama setelah sign-out
    } catch (error) {
      console.error('Failed to sign out', error);
      // Opsional: Tampilkan toast atau pesan error kepada pengguna
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleSignOut}
      disabled={isSigningOut}
      className='w-full hover:bg-foreground'
    >
      {isSigningOut ? (
        <>
          <LoaderCircle className="text-inherit mr-2 h-4 w-4 animate-spin" />
          Signing out...
        </>
      ) : (
        <>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </>
      )}
    </Button>
  );
}
