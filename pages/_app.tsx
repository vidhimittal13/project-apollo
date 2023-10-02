import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {Head} from "next/document";
import {ThemeProvider} from "@/components/theme-provider";
import {SiteHeader} from "@/components/site-header";
import {Toaster} from "@/components/ui/toaster";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {User} from "@/interfaces";
import {UserContext} from "@/context/UserContext";
import {getAuth, onAuthStateChanged, User as FirebaseUser} from "@firebase/auth";
import {getOrCreateUserFromAuth} from "@/utils/client_side/authInterfaces";
import {getUserAuthToken} from "@/utils/client_side/clientUserUtils";

export default function App({Component, pageProps}: AppProps) {
    const auth = getAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [userAuth, setUserAuth] = useState<FirebaseUser | null>(null);
    const [user, setUser] = useState<User | null>(null);

    
    return (
            <UserContext.Provider value={{userAuth: userAuth, setUserAuth: setUserAuth, user: user, setUser: setUser}}>
                <ThemeProvider attribute="class" defaultTheme="dark">
                    <div className="relative flex min-h-screen flex-col">
                        <SiteHeader/>
                        <div className="flex-1">
                            <Component {...pageProps} />
                            <Toaster/>
                        </div>
                    </div>
                </ThemeProvider>
            </UserContext.Provider>

    )
}
