'use client';

import dynamic from 'next/dynamic';

const Gantt = dynamic(
    () =>
        import('@toyokoh/frappe-gantt-react').then((mod) => mod.FrappeGantt),
    { ssr: false }
);

export default function Home() {

    const tasks = [
        {
            id: 'T1',
            name: 'Site Preparation',
            start: '2025-08-01',
            end: '2025-08-03',
            progress: 100,
        },
        {
            id: 'T2',
            name: 'Foundation Laying',
            start: '2025-08-04',
            end: '2025-08-07',
            progress: 80,
            dependencies: 'T1',
        },
        {
            id: 'T3',
            name: 'Structural Framework',
            start: '2025-08-08',
            end: '2025-08-15',
            progress: 60,
            dependencies: 'T2',
        },
        {
            id: 'T4',
            name: 'Roof Installation',
            start: '2025-08-16',
            end: '2025-08-18',
            progress: 40,
            dependencies: 'T3',
        },
        {
            id: 'T5',
            name: 'Electrical Wiring',
            start: '2025-08-19',
            end: '2025-08-21',
            progress: 30,
            dependencies: 'T4',
        },
        {
            id: 'T6',
            name: 'Plumbing Installation',
            start: '2025-08-22',
            end: '2025-08-24',
            progress: 25,
            dependencies: 'T5',
        },
        {
            id: 'T7',
            name: 'Interior Walls',
            start: '2025-08-25',
            end: '2025-08-27',
            progress: 20,
            dependencies: 'T6',
        },
        {
            id: 'T8',
            name: 'Painting',
            start: '2025-08-28',
            end: '2025-08-30',
            progress: 10,
            dependencies: 'T7',
        },
        {
            id: 'T9',
            name: 'Flooring',
            start: '2025-08-31',
            end: '2025-09-02',
            progress: 0,
            dependencies: 'T8',
        },
        {
            id: 'T10',
            name: 'Final Inspection',
            start: '2025-09-03',
            end: '2025-09-04',
            progress: 0,
            dependencies: 'T9',
        },
    ];


    return (
        <div style={{ padding: 20 }}>
            <h1>Project Gantt Chart</h1>
            <Gantt
                tasks={tasks}
                viewMode="Day"
                onClick={(task) => console.log(task)}
            />
        </div>
    );
}
