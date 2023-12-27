'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { getLists } from '@/app/_utilities/lists';

export default function List() {
    const pathname = usePathname();
    const listIndex = pathname.split('/')[2];

    const [list, setList] = useState([]);
    useEffect(() => {
        setList(getLists()[listIndex]);
    }, []);

    return (
        <div>
            <div className="tasks-header">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
                </svg>

                <Link href="/">lists</Link>
            </div>
        </div>
    );
}
