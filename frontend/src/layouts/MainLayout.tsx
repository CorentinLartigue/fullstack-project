import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'
import userService from '../services/userService'
import type { User } from '../services/userService'
import '../css/MainLayout.css'

export default function MainLayout() {
    const [usersCount, setUsersCount] = useState(0);

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const response = await userService.getAll();
                const data = response.data;
                const userList: User[] = (data as any).data || data;
                if (Array.isArray(userList)) {
                    setUsersCount(userList.length);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération du nombre d'utilisateurs", error);
            }
        };

        fetchCount();
    }, []);

    return (
        <div className="main-layout">
            <Navbar count={usersCount} />
            <main className="main-content">
                <Outlet context={{ setUsersCount }} />
            </main>
        </div>
    )
}
