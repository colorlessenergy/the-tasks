'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { getLists } from '@/app/_utilities/lists';

export default function List() {
    const pathname = usePathname();
    const listIndex = pathname.split('/')[2];

    const [list, setList] = useState([]);
    useEffect(() => {
        setList(getLists()[listIndex]);
    }, []);

    return <h1>list</h1>;
}
